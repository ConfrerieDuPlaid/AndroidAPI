import { IsNotEmpty } from 'class-validator';

export class CreateLikelistDto {
  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  appid: string;
}
