import { PartialType } from "@nestjs/swagger";
import { ArrayMaxSize, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly nameTeam: string;

  @IsString({ each: true })
  @ArrayMaxSize(10, { message: 'La longitud debe ser menor a 10'})
  @IsNotEmpty()
  readonly members: string[];

  @IsNumber()
  readonly score: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto){}
