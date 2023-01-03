import { Module } from '@nestjs/common';
import { LikelistService } from './likelist.service';
import { LikelistController } from './likelist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { GameService } from '../game/game.service';

@Module({
  imports: [TypeOrmModule.forFeature([Like])],
  controllers: [LikelistController],
  providers: [LikelistService, GameService],
})
export class LikelistModule {}
