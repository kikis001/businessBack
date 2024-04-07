import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt'
import { AuthService } from 'src/auth/services/auth.service';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(data: CreateUserDto): Promise<any> {
    const newUser = new this.userModel(data);
    const existEmail = await this.findByEmail(newUser.email)
    if(existEmail != null) {
      throw new HttpException('El usuario ya existe', HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(newUser.password, 10)
    newUser.password = hashPassword
    const user = await newUser.save()
    const { password, ...rta } = user.toJSON()
    return rta
  }

  async findByEmail(email: string) {
    const userEmail = await this.userModel.findOne({email}).exec()
    return userEmail;
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
    return await this.userModel.findById(id).exec()
  }
}
