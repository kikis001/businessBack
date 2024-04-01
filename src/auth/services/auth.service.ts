import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';

import * as bcrypt from 'bcrypt'
import { User } from 'src/users/entities/user.entity';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email)
    if(user) {
      const isMatch = await bcrypt.compare(password, user.password)
      if(isMatch) {
        const { password, ...rta } = user.toJSON()
        return rta
      }
    }
    return null
  }

  generateJWT(user: User) {
    const payload: PayloadToken = { role: user.role , sub: user._id }
    return {
      access_token: this.jwtService.sign(payload),
      user
    }
  }

  async register(userDto: any): Promise<any> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const newUser = await this.usersService.create({
      ...userDto,
      password: hashedPassword
    });
    return this.generateJWT(newUser);
  }

}
