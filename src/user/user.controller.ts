import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UserResponse } from './entities/user.response';

@Controller('user')
@UseFilters()
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    const userCreated = await this.userService.create(createUserDto);
    return new UserResponse(userCreated);
  }

  @Post('/login')
  async findByEmailAndPassword(
    @Body() getUserDto: GetUserDto,
  ): Promise<UserResponse> {
    const userFound = await this.userService.findByEmailAndPassword(getUserDto);
    return new UserResponse(userFound);
  }

  @Get()
  async findAll(): Promise<UserResponse[]> {
    const users = await this.userService.findAll();
    return users.map((user) => new UserResponse(user));
  }

  @Get(':id')
  @HttpCode(416)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(416)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
