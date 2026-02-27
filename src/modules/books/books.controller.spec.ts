import { Test, TestingModule } from '@nestjs/testing';
import { LivrosController } from './books.controller';
import { LivrosService } from './books.service';

describe('LivrosController', () => {
  let controller: LivrosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LivrosController],
      providers: [LivrosService],
    }).compile();

    controller = module.get<LivrosController>(LivrosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
