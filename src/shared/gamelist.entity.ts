import { ObjectID } from 'typeorm';
import { Game } from '../game/entities/game.entity';

export class Gamelist {
  _id: string;
  appid: string;
  user: string;
  gameData: Game;
}
