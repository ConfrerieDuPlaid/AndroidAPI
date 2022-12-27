import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikelistService } from './likelist.service';
import { CreateLikelistDto } from './dto/create-likelist.dto';
import { UpdateLikelistDto } from './dto/update-likelist.dto';

@Controller('likelist')
export class LikelistController {
  constructor(private readonly likelistService: LikelistService) {}

  @Post()
  create(@Body() createLikelistDto: CreateLikelistDto) {
    return this.likelistService.create(createLikelistDto);
  }

  @Get()
  findAll() {
    return this.likelistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likelistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikelistDto: UpdateLikelistDto) {
    return this.likelistService.update(+id, updateLikelistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likelistService.remove(+id);
  }
}
