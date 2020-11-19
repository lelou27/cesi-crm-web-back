import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Module, ModuleDocument } from '../Schemas/module.schema';
import { CreateModuleDto } from '../Dto/createModuleDto';

@Injectable()
export class ModuleService {
  constructor(
    @InjectModel(Module.name) private moduleModel: Model<ModuleDocument>,
  ) {}

  async getAllModules(): Promise<Module[]> {
    return this.moduleModel.find().populate('composants');
  }

  async getModuleById(moduleId: string): Promise<Module> {
    return this.moduleModel.findById(moduleId).populate('composants');
  }

  async createModule(createModuleDto: CreateModuleDto): Promise<Module> {
    try {
      return await new this.moduleModel(createModuleDto).save();
    } catch (e) {
      console.log(e);
      if (e.code === 11000) {
        throw new HttpException(
          'Une valeur existe déja pour ce module.',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Impossible de créer le module.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async addComposant(moduleId, addComposantDto): Promise<Module> {
    const moduleDb = await this.moduleModel.findById(moduleId);
    addComposantDto.composants.forEach((composant) => {
      moduleDb.composants.push(composant);
    });
    return await moduleDb.save();
  }

  async removeComposants(moduleId) {
    return this.moduleModel.deleteOne({ _id: moduleId }).exec();
  }
}
