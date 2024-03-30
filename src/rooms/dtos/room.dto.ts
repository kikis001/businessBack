import { PartialType } from "@nestjs/swagger";
import { IsString, IsNotEmpty, ValidateNested, IsMongoId, IsArray } from "class-validator";

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  readonly nameRoom: string

  @IsMongoId()
  readonly quiz: string;

  @IsArray()
  readonly teams: string[] = []
}

export class UpdateRoomDto extends PartialType(CreateRoomDto) {}
