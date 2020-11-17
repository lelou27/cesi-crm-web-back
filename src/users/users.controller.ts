import {
  Controller,
  Post,
  UseGuards,
  Res,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../Dto/CreateUserDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBody, ApiProperty, ApiQuery } from '@nestjs/swagger';

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

  @Post('/attachRole')
  async attachRole(@Body() params) {
    return await this.usersService.attachRole(params.userId, params.roleId);
  }
}
