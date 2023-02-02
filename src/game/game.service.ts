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
  private gameSearchEndpoint = 'https://steamcommunity.com/actions/SearchApps';

  private gamesCache: Map<string, Game> = new Map<string, Game>();

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

  async findOne(id: string): Promise<Game> {
    if (this.gamesCache.has(id.toString())) {
      return this.gamesCache.get(id.toString());
    } else {
      const game = await this.findOneFromSteam(id);
      this.gamesCache.set(id.toString(), game);
      return game;
    }
  }

  async findOneFromSteam(id: string): Promise<Game> {
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
    game.priceInCents = this.getMinGamePrice(gameData);
    game.screenshots = gameData['screenshots'].map((screenshot) => {
      return screenshot['path_thumbnail'];
    });
    return game;
  }

  async findByName(name: string): Promise<any> {
    let results = await HttpUtils.get(`${this.gameSearchEndpoint}/${name}`);
    const games: Map<string, Game> = await this.getGamesFromSource(results);

    results = results.map((res) => {
      return {
        appid: res.appid,
        gameData: games.get(res.appid),
      };
    });
    return results;
  }

  private getMinGamePrice(gameData: any): number {
    if (!gameData['price_overview']) return 0.0;
    return gameData['price_overview']['final'];
  }

  async getGamesFromSource(sources: any): Promise<Map<string, Game>> {
    const games: Map<string, Game> = new Map<string, Game>();
    for (const src of sources) {
      const game = await this.findOne(src.appid);
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

  clearCache() {
    this.gamesCache.clear();
  }
}
