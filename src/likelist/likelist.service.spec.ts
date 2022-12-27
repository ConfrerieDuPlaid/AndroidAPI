import { Test, TestingModule } from '@nestjs/testing';
import { LikelistService } from './likelist.service';

describe('LikelistService', () => {
  let service: LikelistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikelistService],
    }).compile();

    service = module.get<LikelistService>(LikelistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
