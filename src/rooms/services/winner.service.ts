import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Winner } from '../entities/winner.entity';
import { Model } from 'mongoose';

@Injectable()
export class WinnerService {
  constructor(@InjectModel(Winner.name) private winnerModel: Model<Winner>){}

  async get() {
    const winners = await this.winnerModel.find().populate('idRoom').populate('WinnerTeamName').exec()
    return winners
  }

  async createWinner(roomId: string) {
    const newWinner = new this.winnerModel({ idRoom: roomId })
    return await newWinner.save()
  }

  async update(idRoom: string, idTeam: string, validtor: boolean) {
    const roomWinner = await this.winnerModel.findOne({idRoom}).exec()
    if(!roomWinner) {
      throw new NotFoundException('Sala no encontrada')
    }
    if(validtor) {
      roomWinner.WinnerTeamName.push(idTeam)
    }else {
      roomWinner.WinnerTeamName[0] = idTeam
    }
    await roomWinner.save()
    return roomWinner;
  }

  // async updateIndex(idRoom: string, idTeam: string) {
  //   const winner = await this.winnerModel.findOne({idRoom}).exec()
  //   if(!winner) {
  //     throw new NotFoundException('Sala no encontrada')
  //   }
  //   winner.WinnerTeamName[] = (idTeam)
  //   await winner.save()
  //   return winner;
  // }

}

