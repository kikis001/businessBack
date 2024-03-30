import { Controller, Get, Body, Post, Put, Param, NotFoundException } from '@nestjs/common';
import { RoomsService } from '../services/rooms.service';
import { CreateRoomDto, UpdateRoomDto } from '../dtos/room.dto';
import { RoomsGateway } from '../gateways/rooms.gateway';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { AnswerDto } from '../dtos/answer.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private roomsServices: RoomsService) {}

  @Get()
  getAll() {
    return this.roomsServices.get();
  }

  @Post()
  create(@Body() payload: CreateRoomDto) {
    return this.roomsServices.create(payload);
  }

  @Put(':roomId/addTeam/:teamId')
  async addTeam(@Param('roomId') roomId: string, @Param('teamId') teamId: string) {
    return await this.roomsServices.addTeamToRoom(roomId, teamId);
  }

  @Post(':roomId/teams/:teamId/submit-answers')
  async submitAnswers(@Param('roomId') roomId: string, @Param('teamId') teamId: string, @Body() answers: AnswerDto){
    try {
       await this.roomsServices.submitAnswer(roomId, teamId, answers)
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}

/*
equipo: 6605143f66254ef006d7a85c
sala: 6604f41eacb84695fc2b962a
*/
