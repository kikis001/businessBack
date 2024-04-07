import { Controller, Get } from '@nestjs/common';
import { RoomsService } from '../services/rooms.service';
import { WinnerService } from '../services/winner.service';

@Controller('winner')
export class WinnerController {
  constructor(private winnerService: WinnerService) {}

  @Get()
  getAll() {
    return this.winnerService.get()
  }
}
