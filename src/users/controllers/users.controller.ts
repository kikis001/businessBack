import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Post()
  createUser(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
    // return res.status(201).json({ message: 'Usuario creado con satifacción', userId: user.id})
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() changes: UpdateUserDto) {
    return this.usersService.update(id, changes);
  }

}
