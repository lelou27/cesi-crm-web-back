import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../Schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../Dto/CreateUserDto';
const bcrypt = require('bcryptjs');

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);
    return await new this.UserModel(createUserDto).save();
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.UserModel.findOne({ username: username });
    return await user.populate('role').execPopulate();
  }

  async getAllUsers(): Promise<User[]> {
    return await this.UserModel.find().populate('role').exec();
  }

  async attachRole(userId, roleId): Promise<User> {
    let user = await this.UserModel.findById(userId).populate('role');
    user.role = roleId;
    await user.save();

    user = await user.populate('role').execPopulate();
    return await user.save();
  }
}
