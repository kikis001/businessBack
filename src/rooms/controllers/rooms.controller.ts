import { Controller, Get, Body, Post, Put, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { RoomsService } from '../services/rooms.service';
import { CreateRoomDto } from '../dtos/room.dto';
import { AnswerDto } from '../dtos/answer.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private roomsServices: RoomsService) {}

  @Public()
  @Get()
  getAll() {
    return this.roomsServices.get();
  }

  @Public()
  @Get(':id')
  getElement(@Param('id') id: string) {
    return this.roomsServices.getOne(id)
  }

  @Public()
  @Get(':roomId/existUserRoom/:teamId')
  getOne(@Param('roomId') roomId: string, @Param('teamId') teamId: string) {
    return this.roomsServices.validateExistUser(roomId, teamId)
  }

  @Public()
  @Post()
  create(@Body() payload: CreateRoomDto) {
    return this.roomsServices.create(payload);
  }

  @Put(':roomId/addTeam/:teamId')
  async addTeam(@Param('roomId') roomId: string, @Param('teamId') teamId: string) {
    return await this.roomsServices.addTeamToRoom(roomId, teamId);
  }

  @Post(':roomId/teams/:teamId/submit-answers')
  async submitAnswers(@Param('roomId') roomId: string, @Param('teamId') teamId: string, @Body() answers: number[]){
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
