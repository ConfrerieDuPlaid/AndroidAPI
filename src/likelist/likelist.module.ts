import { Module } from '@nestjs/common';
import { LikelistService } from './likelist.service';
import { LikelistController } from './likelist.controller';

@Module({
  controllers: [LikelistController],
  providers: [LikelistService]
})
export class LikelistModule {}
