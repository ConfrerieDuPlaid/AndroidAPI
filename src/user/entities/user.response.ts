import { User } from './user.entity';

export class UserResponse {
  public id: string;
  public email: string;
  public username: string;

  constructor(user: User) {
    this.id = user._id.toString();
    this.username = user.username;
    this.email = user.email;
  }
}
