import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoomDto, UpdateRoomDto } from '../dtos/room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { Room } from '../entities/room.entity';
import { User } from 'src/users/entities/user.entity';
import { Quiez } from '../entities/quiez.entity';
import { Winner } from '../entities/winner.entity';
import { UsersService } from 'src/users/services/users.service';
import { AnswerDto } from '../dtos/answer.dto';
import { WinnerService } from './winner.service';
import { RoomsGateway } from '../gateways/rooms.gateway';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<Room>,
    private usersService: UsersService,
    private winnerService: WinnerService
  ) {}

  async get() {
    const rooms = await this.roomModel
      .find()
      .populate('quiz')
      .populate('teams')
      .exec();
    return rooms;
  }

  async getOne(id: string) {
    const room = await this.roomModel
      .findById(id)
      .populate('quiz')
      .populate('teams')
      .exec();
    if (!room) {
      throw new NotFoundException(`Room #${id} not found`);
    }
    return room;
  }

  // async getUser(roomId: string, teamId: string) {
  //   const room = await this.roomModel.findById(roomId);
  //   const userExiste = room.teams.findIndex((team) => {
  //     team._id === teamId;
  //   });
  //   if (userExiste === -1) {
  //     console.log('Hola');
  //   } else {
  //     console.log('No');
  //   }
  // }

  async getAllWithUserCount(): Promise<any> {
    const rooms = await this.roomModel.find();
    const roomsWithUserCount = await Promise.all(
      rooms.map(async (room) => {
        const userCount = await this.countUsersInRoom(room._id);
        return { ...room.toJSON(), userCount };
      }),
    );
    return roomsWithUserCount;
  }

  async countUsersInRoom(roomId: string) {
    const room = await this.roomModel.findById(roomId).populate('users').exec();
    return room.teams.length;
  }

  async addTeamToRoom(roomId: string, teamId: string) {
    const room = await this.roomModel.findById(roomId).exec();

    if (!room) {
      throw new NotFoundException(`La sala #${roomId} no se ha encontrado`);
    }

    const userExists = await this.getBoolUser(roomId, teamId);

    console.log(userExists);

    if (!userExists) {
      if (room.teams.length >= 2) {
        throw new ConflictException('Máximo número de equipos');
      } else {
        await this.usersService.update(teamId, { score: 0 });
        room.teams.push(teamId);
        await room.save();
        return room
        // return room.temas.
      }
    } else {
      return room;
    }

    // if (room.teams.length < 2 || !userExists) {
    //   await this.usersService.update(teamId, {score: 0});
    //   room.teams.push(teamId);
    //   await room.save();
    //   return room;
    // }

    // if(room.teams.length >= 2 && userExists) {
    //   return room
    // }

    // throw new ConflictException('Máximo de equipos');
    // if(existUser) {

    // }

    // if(!existUser) {
    //   if(room.teams.length >= 2) {
    //     throw new ConflictException('Máximo de equipos')
    //   }else {
    //     this.usersService.update(teamId, {score: 0})
    //     room.teams.push(teamId);
    //     await room.save();
    //     return room;
    //   }
    // }else {
    //   return room
    // }
  }

  async getBoolUser(roomId: string, teamId: string) {
    const room = await this.roomModel.findById(roomId).populate('teams').exec();
    const existUser = room.teams.findIndex((team) => {
      return team._id.toString() === teamId;
    });
    if (existUser === -1) {
      return false;
    } else {
      return true;
    }
  }

  async validateExistUser(roomId: string, teamId: string) {
    const existUser = await this.getBoolUser(roomId, teamId);
    const room = await this.roomModel.findById(roomId).exec();
    if (!existUser) {
      if (room.teams.length >= 2) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  async create(payload: CreateRoomDto) {
    const newRoom = new this.roomModel(payload);
    const roomSave = await newRoom.save();
    await this.winnerService.createWinner(roomSave.id);
    return roomSave;
  }

  async submitAnswer(roomId: string, teamId: string, answers: number[]) {
    const room = await this.roomModel
      .findById(roomId)
      .populate('quiz')
      .populate('teams')
      .exec();
    if (!room) {
      throw new NotFoundException(`La sala #${roomId} no existe`);
    }

    const teamIndex = room.teams.findIndex((team) => {
      return team._id.toString() === teamId;
    });

    if (teamIndex === -1) {
      throw new NotFoundException(`El usuario no pertenece a la sala`);
    }

    const team = room.teams[teamIndex];
    if (team.answersSubmitted) {
      throw new BadRequestException(
        `El equipo ${team.nameTeam} ya ha enviado sus respuestas`,
      );
    }

    const quiz = room.quiz as Quiez;
    const correctAnswers = quiz.correctAnswers;
    const teamsAnswers = answers;
    let scoreTeam = 0;
    for (let i = 0; i < correctAnswers.length; i++) {
      if (correctAnswers[i] === teamsAnswers[i]) {
        scoreTeam++;
      }
    }

    let validator: boolean = undefined;

    if (scoreTeam == room.scoreMax) {
      room.scoreMax = scoreTeam;
      room.winnerTeamId.push(room.teams[teamIndex].id);
      validator = true;
    } else if (scoreTeam > room.scoreMax) {
      room.scoreMax = scoreTeam;
      room.winnerTeamId[0] = room.teams[teamIndex].id;
      validator = false;
    }

    await this.winnerService.update(roomId, teamId, validator);
    const pro = {
      answers: teamsAnswers,
      score: scoreTeam,
      answersSubmitted: true,
    };

    this.usersService.update(teamId, pro);
    await room.save();
    return room;
  }
}
