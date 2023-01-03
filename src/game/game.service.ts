import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { HttpUtils } from '../shared/utils/http.utils';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  private top100SteamURL =
    'https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/';
  private gameEndpoint = 'https://store.steampowered.com/api/appdetails';

  create(createGameDto: CreateGameDto) {
    return 'This action adds a new game';
  }

  async findTop100(): Promise<any> {
    let results = await HttpUtils.get(this.top100SteamURL);
    const games: Map<string, Game> = await this.getGamesFromSource(
      results['response']['ranks'],
    );

    results = results['response']['ranks'].map((gameRank) => {
      return {
        rank: gameRank.rank,
        appid: gameRank.appid,
        gameData: games.get(gameRank.appid),
      };
    });
    return results;
  }

  async findOne(internalId: string) {
    return `This method returns the #${internalId} game`;
  }

  async findOneFromSteam(id: number): Promise<Game> {
    const result = await HttpUtils.get(this.gameEndpoint + `?appids=${id}`);
    const gameData = result[`${id}`]['data'];
    if (!gameData) return null;
    const game: Game = new Game();
    game.steamAppid = gameData['steam_appid'];
    game.name = gameData['name'];
    game.publishers = gameData['publishers'];
    game.description = gameData['detailed_description'];
    game.headerImage = gameData['header_image'];
    game.backgroundImage = gameData['background'];
    game.priceInCents = this.getMaxGamePrice(gameData['package_groups']);
    return game;
  }

  private getMaxGamePrice(gamePackages: any): number {
    let max = 0;
    gamePackages.forEach((packageGroup) => {
      packageGroup.subs.forEach((pack) => {
        if (pack['price_in_cents_with_discount'] > max)
          max = pack['price_in_cents_with_discount'];
      });
    });
    return max;
  }

  async getGamesFromSource(sources: any): Promise<Map<string, Game>> {
    const games: Map<string, Game> = new Map<string, Game>();
    for (const src of sources) {
      const game = await this.findOneFromSteam(src.appid);
      games.set(src.appid, game);
    }
    return games;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
