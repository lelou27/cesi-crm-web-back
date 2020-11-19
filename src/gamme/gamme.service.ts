import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gamme, GammeDocument } from '../Schemas/gamme.schema';
import { CreateGammeDto } from '../Dto/CreateGammeDto';

@Injectable()
export class GammeService {
  constructor(
    @InjectModel(Gamme.name) private gammeModel: Model<GammeDocument>,
  ) {}

  async getAllGamme(): Promise<Gamme[]> {
    return this.gammeModel.find();
  }

  async getGammeById(id): Promise<Gamme> {
    return this.gammeModel.findById(id);
  }

  async createGamme(createGammeDto: CreateGammeDto): Promise<Gamme> {
    try {
      return await new this.gammeModel(createGammeDto).save();
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
}
