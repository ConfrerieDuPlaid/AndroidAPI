import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { LikelistModule } from './likelist/likelist.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { GameModule } from './game/game.module';
import { Wish } from './wishlist/entities/wish.entity';
import { Like } from './likelist/entities/like.entity';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'mongodb',
          url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_SECRET}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
          useNewUrlParser: true,
          synchronize: true,
          logging: true,
          entities: [User, Wish, Like],
        };
      },
    }),
    UserModule,
    LikelistModule,
    WishlistModule,
    GameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
