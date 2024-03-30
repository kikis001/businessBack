import { PartialType } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
} from 'class-validator';

export class CreateQuiezDto {
  @IsArray()
  @ArrayMinSize(1, { message: '1. Debe de haber al menos una pregunta' })
  @ArrayMaxSize(5, { message: '1. No debe de haber más de 5 preguntas ' })
  readonly questions: string[];

  @IsArray({ each: true })
  @ArrayMinSize(1, { message: '2. Debe de haber al menos 1 opción' })
  @ArrayMaxSize(5, { message: '2. No debe de haber más de 5 opciones' })
  @IsArray()
  @ArrayMinSize(1, { message: '2.1 Debe de haber al menos 1 opción' })
  @ArrayMaxSize(5, { message: '2.1 No debe de haber más de 3 opciones' })
  readonly options: string[][];

  @IsArray()
  @ArrayMinSize(1, { message: '3. Debe de haber al menos 1 opción' })
  @ArrayMaxSize(5, { message: '3. No debe de haber más de 5 opciones' })
  readonly correctAnswers: number[];
}

export class UpdateQuiezDto extends PartialType(CreateQuiezDto) {}
