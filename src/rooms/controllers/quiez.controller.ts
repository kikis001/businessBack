import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CreateQuiezDto, UpdateQuiezDto } from '../dtos/quiez.dto';
import { QuiezService } from '../services/quiez.service';

@Controller('quiez')
export class QuiezController {
  constructor(private quiezService: QuiezService) {}

  @Post()
  create(@Body() payload: CreateQuiezDto) {
    return this.quiezService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() changes: UpdateQuiezDto) {
    return this.quiezService.update(id, changes);
  }
}
// {
//   "nameRoom": "Sala 1",
//   "quiz": {
//       "questions": [ "¿Qué son los costos?", "¿Qué es un plan de negocio?"],
//       "options": [
//           ["un tipo de blabla", "bblblaa", "blabla"],
//           ["comida de tal tipo", "bababa", "bakss"]
//       ],
//       "correctAnswers": [1,2]
//   }
// }
