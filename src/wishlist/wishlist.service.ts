import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';
import { IdUtils } from '../shared/utils/id.utils';
import { GameService } from '../game/game.service';
import { Gamelist } from '../shared/gamelist.entity';

@Injectable()
export class WishlistService {
  @InjectRepository(Wish)
  private readonly wishlistRepository: Repository<Wish>;

  constructor(private readonly gameService: GameService) {}

  async create(createWishlistDto: CreateWishlistDto): Promise<Wish> {
    const wish: Wish = new Wish();
    wish.user = IdUtils.objectIdFromString(createWishlistDto.user);
    wish.appid = createWishlistDto.appid;
    const existingWish = await this.wishlistRepository.findOneBy({
      user: wish.user,
      appid: wish.appid,
    });
    if (existingWish) return existingWish;
    return await this.wishlistRepository.save(wish);
  }

  async findAll(userId: string, simplified: boolean): Promise<Gamelist[]> {
    const wishes = await this.wishlistRepository.findBy({
      user: IdUtils.objectIdFromString(userId),
    });

    const games = await this.gameService.getGamesFromSource(wishes);

    return wishes.map((wish) => {
      const gamelist = new Gamelist();
      gamelist._id = wish._id.toString();
      gamelist.appid = wish.appid;
      gamelist.user = wish.user.toString();
      if (!simplified) gamelist.gameData = games.get(wish.appid);
      return gamelist;
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} wishlist`;
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return `This action updates a #${id} wishlist`;
  }

  async remove(id: string): Promise<number> {
    const deleteResult = await this.wishlistRepository.delete(
      IdUtils.objectIdFromString(id),
    );
    return deleteResult.affected;
  }
}
