import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(data: CreateUserDto) {
    const newUser = new this.userModel(data);
    return newUser.save();
  }

  getAll() {
    return this.userModel.find();
  }

  async update(id: string, changes: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(id, {$set: changes, new: true}).exec()
    if (!user) {
      throw new NotFoundException(`El usuario #${id} no se ha encontrado`);
    }
    return user;
  }

  async findUser(id: string) {
    return await this.userModel.findById(id);
  }
}
