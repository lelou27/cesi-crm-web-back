import { Controller, Post, UseGuards, Res, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../Dto/CreateUserDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/user/create')
  async createUser(@Body() createUserDTO: CreateUserDto) {
    return await this.usersService.create(createUserDTO);
  }
}
