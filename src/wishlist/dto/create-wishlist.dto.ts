import { IsNotEmpty } from 'class-validator';

export class CreateWishlistDto {
  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  appid: string;
}
