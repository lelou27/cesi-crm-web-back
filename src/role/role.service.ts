import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from '../Schemas/role.schema';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async getAllRoles(): Promise<Role[]> {
    const createdRole = await this.roleModel.find().exec();
    return createdRole;
  }

  async getById(id: string): Promise<Role> {
    return this.roleModel.findById(id);
  }

  async getByName(name: string): Promise<Role> {
    return this.roleModel.findOne({ role: name });
  }

  async createRole(role: Role): Promise<Role | Error> {
    try {
      return await new this.roleModel(role).save();
    } catch (e) {
      if (e.code === 11000) {
        throw new HttpException(
          'Une valeur existe déja pour ce rôle.',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Impossible de créer le rôle.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async updateRole(role: Role, id): Promise<Role | Error> {
    try {
      return await this.roleModel.findOneAndUpdate(id, { role: role.role }).exec();
    } catch (e) {
      if (e.code === 11000) {
        throw new HttpException(
          'Une valeur existe déja pour ce rôle.',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Impossible de créer le rôle.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async removeRole(id: string): Promise<any> {
    return this.roleModel.deleteOne({ _id: id }).exec();
  }
}
