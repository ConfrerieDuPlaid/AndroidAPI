import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RandomGenerator } from 'typeorm/util/RandomGenerator';
import { generateRandomToken } from '../shared/utils/token.utils';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findByEmailAndPassword(getUserDto: GetUserDto): Promise<User> {
    const user: User = new User();
    user.email = getUserDto.email;
    user.password = getUserDto.password;
    return await this.userRepository.findOneBy({
      email: getUserDto.email,
      password: getUserDto.password,
    });
  }

  async generateResetToken(email: string): Promise<string> {
    const resetToken = generateRandomToken();
    await this.userRepository.update(
      { email: email },
      { token: resetToken.toString() },
    );
    return resetToken.toString();
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  async update(token: string, updateUserDto: UpdateUserDto): Promise<number> {
    const updateResult = await this.userRepository.update(
      { token: token },
      {
        password: updateUserDto.password,
        token: null,
      },
    );
    return updateResult.affected.valueOf();
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
