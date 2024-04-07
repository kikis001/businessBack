import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quiez } from '../entities/quiez.entity';
import { Model } from 'mongoose';
import { CreateQuiezDto, UpdateQuiezDto } from '../dtos/quiez.dto';

@Injectable()
export class QuiezService {
  constructor(@InjectModel(Quiez.name) private quizModel: Model<Quiez>) {}

  get() {
    return this.quizModel.find().exec()
  }

  create(payload: CreateQuiezDto) {
    const newQuiz = new this.quizModel(payload);
    return newQuiz.save();
  }

  async update(id: string, changes: UpdateQuiezDto) {
    const quiez = await this.quizModel.findByIdAndUpdate(
      id,
      { $set: changes },
      { new: true },
    );
    if (!quiez) {
      throw new NotFoundException(`El quiez #${id} no se ha encontrado`);
    }
    return quiez;
  }
}
