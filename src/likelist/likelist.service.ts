import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import { CreateLikelistDto } from './dto/create-likelist.dto';
import { IdUtils } from '../shared/utils/id.utils';
import { UpdateLikelistDto } from './dto/update-likelist.dto';

@Injectable()
export class LikelistService {
  @InjectRepository(Like)
  private readonly likelistRepository: Repository<Like>;

  async create(createLikelistDto: CreateLikelistDto): Promise<Like> {
    const like: Like = new Like();
    like.user = IdUtils.objectIdFromString(createLikelistDto.user);
    like.appid = createLikelistDto.appid;
    return await this.likelistRepository.save(like);
  }

  async findAll(userId: string): Promise<Like[]> {
    return await this.likelistRepository.findBy({
      user: IdUtils.objectIdFromString(userId),
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
