import { IsArray, IsNotEmpty } from "class-validator";

export class AnswerDto {
  @IsNotEmpty()
  @IsArray()
  readonly answers: number[]
}
