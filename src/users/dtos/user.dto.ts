import { PartialType } from "@nestjs/swagger";
import { ArrayMaxSize, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Role } from "src/auth/models/roles.model";

export class CreateUserDto {

  @IsEmail()
  @IsNotEmpty()
  readonly email: string

  @IsString()
  readonly password: string

  @IsString()
  @IsNotEmpty()
  readonly nameTeam: string;

  @IsString()
  @IsOptional()
  readonly role: string = Role.ALUMNO

  // @IsString({ each: true })
  // @ArrayMaxSize(10, { message: 'La longitud debe ser menor a 10'})
  // @IsNotEmpty()
  // readonly members: string[];

  @IsNumber()
  @IsOptional()
  readonly score: number = 0;
}

export class UpdateUserDto extends PartialType(CreateUserDto){}
