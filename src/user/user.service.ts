import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdUtils } from '../shared/utils/id.utils';

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

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<number> {
    const updateResult = await this.userRepository.update(
      { _id: IdUtils.objectIdFromString(id) },
      updateUserDto,
    );
    return updateResult.affected.valueOf();
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
