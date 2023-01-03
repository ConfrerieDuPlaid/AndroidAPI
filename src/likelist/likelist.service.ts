import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import { CreateLikelistDto } from './dto/create-likelist.dto';
import { IdUtils } from '../shared/utils/id.utils';
import { UpdateLikelistDto } from './dto/update-likelist.dto';
import { GameService } from '../game/game.service';
import { Gamelist } from '../shared/gamelist.entity';

@Injectable()
export class LikelistService {
  @InjectRepository(Like)
  private readonly likelistRepository: Repository<Like>;

  constructor(private readonly gameService: GameService) {}

  async create(createLikelistDto: CreateLikelistDto): Promise<Like> {
    const like: Like = new Like();
    like.user = IdUtils.objectIdFromString(createLikelistDto.user);
    like.appid = createLikelistDto.appid;
    return await this.likelistRepository.save(like);
  }

  async findAll(userId: string): Promise<Gamelist[]> {
    const likes = await this.likelistRepository.findBy({
      user: IdUtils.objectIdFromString(userId),
    });

    const games = await this.gameService.getGamesFromSource(likes);

    return likes.map((like) => {
      const gamelist = new Gamelist();
      gamelist._id = like._id.toString();
      gamelist.appid = like.appid;
      gamelist.user = like.user.toString();
      gamelist.gameData = games.get(like.appid);
      return gamelist;
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} likelist`;
  }

  update(id: number, updateLikelistDto: UpdateLikelistDto) {
    return `This action updates a #${id} likelist`;
  }

  async remove(id: string): Promise<number> {
    const deleteResult = await this.likelistRepository.delete(
      IdUtils.objectIdFromString(id),
    );
    return deleteResult.affected;
  }
}
