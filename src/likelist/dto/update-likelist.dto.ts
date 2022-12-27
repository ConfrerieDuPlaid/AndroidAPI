import { PartialType } from '@nestjs/mapped-types';
import { CreateLikelistDto } from './create-likelist.dto';

export class UpdateLikelistDto extends PartialType(CreateLikelistDto) {}
