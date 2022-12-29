import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';
import { IdUtils } from '../shared/utils/id.utils';

@Injectable()
export class WishlistService {
  @InjectRepository(Wish)
  private readonly wishlistRepository: Repository<Wish>;

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

  async findAll(userId: string): Promise<Wish[]> {
    return await this.wishlistRepository.findBy({
      user: IdUtils.objectIdFromString(userId),
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
