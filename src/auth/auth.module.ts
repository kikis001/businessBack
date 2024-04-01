import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersService } from 'src/users/services/users.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import config from 'src/config';
import { ConfigService, ConfigType } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.registerAsync({
    inject: [config.KEY],
    useFactory: (ConfigService: ConfigType<typeof config>) => {
      return {
        secret: ConfigService.jwt,
        signOptions: {
          expiresIn: '3h'
        }
      }
    }
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
