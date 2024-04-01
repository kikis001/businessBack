import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from './enviroments';
import { RoomsModule } from './rooms/rooms.module';
import { AuthModule } from './auth/auth.module';

import config from './config'
@Module({
  imports: [UsersModule, DatabaseModule,
  ConfigModule.forRoot({
    envFilePath:enviroments[process.env.NODE_ENV] || '.env',
    load: [config],
    isGlobal: true,
  }),
  RoomsModule,
  AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
