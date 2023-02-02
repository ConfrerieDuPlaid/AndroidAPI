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
import { User } from './entities/user.entity';
import { UserExceptionFilter } from './user.filter';

@Controller('user')
@UseFilters(new UserExceptionFilter())
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

  @Patch('/recPwd/:email')
  async findByEmail(@Param('email') email: string): Promise<{ token: string }> {
    const resetPasswordToken = await this.userService.generateResetToken(email);
    return { token: resetPasswordToken };
  }

  @Patch(':token')
  async update(
    @Param('token') token: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const res = await this.userService.update(token, updateUserDto);
    console.log(`${new Date()} res : ${res}`);
    return res;
  }

  @Delete(':id')
  @HttpCode(416)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
