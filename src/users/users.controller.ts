import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../Dto/CreateUserDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto } from '../Dto/UpdateUserDto';

@Controller('/user')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/create')
  async createUser(@Body() createUserDTO: CreateUserDto) {
    return await this.usersService.create(createUserDTO);
  }

  @Get('/all')
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Get(':username')
  async getUserByUsername(@Param('username') username) {
    return await this.usersService.findOne(username);
  }

  @Post('/attachRole')
  async attachRole(@Body() params) {
    return await this.usersService.attachRole(params.userId, params.roleId);
  }

  @Put(':id')
  async updateUser(@Param('id') userId, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.updateUser(userId, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId) {
    return await this.usersService.deleteUser(userId);
  }
}
