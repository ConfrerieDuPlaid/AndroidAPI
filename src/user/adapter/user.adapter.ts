import { User } from '../entities/user.entity';
import { UserResponse } from '../entities/user.response';

export class UserAdapter {
  public static toUserResponse(user: User): UserResponse {
    return new UserResponse(user._id.toString(), user.email);
  }
}
