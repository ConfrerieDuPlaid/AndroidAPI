import { Injectable } from '@nestjs/common';
import { CreateLikelistDto } from './dto/create-likelist.dto';
import { UpdateLikelistDto } from './dto/update-likelist.dto';

@Injectable()
export class LikelistService {
  create(createLikelistDto: CreateLikelistDto) {
    return 'This action adds a new likelist';
  }

  findAll() {
    return `This action returns all likelist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} likelist`;
  }

  update(id: number, updateLikelistDto: UpdateLikelistDto) {
    return `This action updates a #${id} likelist`;
  }

  remove(id: number) {
    return `This action removes a #${id} likelist`;
  }
}
