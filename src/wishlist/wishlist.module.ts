import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { GameService } from '../game/game.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wish])],
  controllers: [WishlistController],
  providers: [WishlistService, GameService],
})
export class WishlistModule {}
