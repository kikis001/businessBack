import { PartialType } from "@nestjs/swagger";
import { IsAlpha, IsArray, IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateWinnerDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly nameRoom: string

  @IsNotEmpty()
  @IsArray()
  readonly WinnerTeamName: string[]
}

export class UpdateWinnerDto extends PartialType(CreateWinnerDto){}
