import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Winner } from '../entities/winner.entity';
import { Model } from 'mongoose';
import { CreateWinnerDto } from '../dtos/winner.dto';

@Injectable()
export class WinnerService {
  constructor(@InjectModel(Winner.name) private winnerModel: Model<Winner>){}

  async create(payload: CreateWinnerDto){
    const newTeam = new this.winnerModel(payload)
    await newTeam.save()
  }
}

