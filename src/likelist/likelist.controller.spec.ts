import { Test, TestingModule } from '@nestjs/testing';
import { LikelistController } from './likelist.controller';
import { LikelistService } from './likelist.service';

describe('LikelistController', () => {
  let controller: LikelistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikelistController],
      providers: [LikelistService],
    }).compile();

    controller = module.get<LikelistController>(LikelistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
