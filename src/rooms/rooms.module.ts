import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiez, QuizSchema } from './entities/quiez.entity';
import { Room, RoomSchema } from './entities/room.entity';
import { QuiezController } from './controllers/quiez.controller';
import { QuiezService } from './services/quiez.service';
import { RoomsController } from './controllers/rooms.controller';
import { RoomsService } from './services/rooms.service';
import { RoomsGateway } from './gateways/rooms.gateway';
import { Winner, WinnerSchema } from './entities/winner.entity';
import { UsersModule } from 'src/users/users.module';
import { WinnerService } from './services/winner.service';
import { WinnerController } from './controllers/winner.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Winner.name, schema: WinnerSchema },
      { name: Quiez.name, schema: QuizSchema },
      { name: Room.name, schema: RoomSchema }
    ]),
    UsersModule
  ],
  controllers: [QuiezController, RoomsController, WinnerController],
  providers: [QuiezService, RoomsService, RoomsGateway, WinnerService]
})
export class RoomsModule {}
