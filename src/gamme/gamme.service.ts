import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gamme, GammeDocument } from '../Schemas/gamme.schema';
import { CreateGammeDto } from '../Dto/CreateGammeDto';
import { AddModuleDto } from '../Dto/AddModuleDto';

@Injectable()
export class GammeService {
  constructor(
    @InjectModel(Gamme.name) private gammeModel: Model<GammeDocument>,
  ) {}

  async getAllGamme(): Promise<Gamme[]> {
    return this.gammeModel.find().populate('modules');
    // return this.gammeModel.find().populate('modules');

  }

  async getGammeById(id): Promise<Gamme> {
    return this.gammeModel.findById(id).populate('modules');
  }

  async createGamme(createGammeDto: CreateGammeDto): Promise<Gamme> {
    try {
      const savedGamme = await new this.gammeModel(createGammeDto).save();
      return await savedGamme.populate('composants');
    } catch (e) {
      if (e.code === 11000) {
        throw new HttpException(
          'Une valeur existe déja pour cette Gamme.',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Impossible de créer la Gamme.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async addModules(
    gammeId: string,
    addModuleDto: AddModuleDto,
  ): Promise<Gamme> {
    const gammeDb = await this.gammeModel.findById(gammeId);
    addModuleDto.modules.forEach((moduleDto) => {
      gammeDb.modules.push(moduleDto);
    });

    // @ts-ignore
    return await gammeDb.save();
  }

  async deleteGamme(gammeId: String): Promise<any> {
    try {
      console.log(gammeId)
      return await this.gammeModel.deleteOne({ _id: gammeId });
    } catch (e) {
      throw new HttpException(
        "Impossible de supprimer la gamme",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
