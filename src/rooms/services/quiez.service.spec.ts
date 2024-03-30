import { Test, TestingModule } from '@nestjs/testing';
import { QuiezService } from './quiez.service';

describe('QuizService', () => {
  let service: QuiezService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuiezService],
    }).compile();

    service = module.get<QuiezService>(QuiezService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
