import { PartialType } from "@nestjs/swagger";
import { IsArray, IsMongoId, IsNotEmpty } from "class-validator";

export class CreateWinnerDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly idRoom: string

  @IsArray()
  readonly WinnerTeamName: string[] = []
}

export class UpdateWinnerDto extends PartialType(CreateWinnerDto){}
