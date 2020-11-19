import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  Caracteristique,
  CaracteristiqueDocument,
} from '../Schemas/caracteristique.schema';
import { CaracteristiqueDto } from '../Dto/CaracteristiqueDto';

@Injectable()
export class CaracteristiqueService {
  constructor(
    @InjectModel(Caracteristique.name)
    private caracteristiqueModel: Model<CaracteristiqueDocument>,
  ) {}

  async getAllCaracteristiques(): Promise<Caracteristique[]> {
    const createdCaracteristique = await this.caracteristiqueModel
      .find()
      .exec();
    return createdCaracteristique;
  }

  async getById(id: string): Promise<Caracteristique> {
    return this.caracteristiqueModel.findById(id);
  }

  async createCaracteristique(
    caracteristique: CaracteristiqueDto,
  ): Promise<Caracteristique | Error> {
    try {
      return await new this.caracteristiqueModel(caracteristique).save();
    } catch (e) {
      if (e.code === 11000) {
        throw new HttpException(
          'Une valeur existe déja pour cette caractéristique.',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Impossible de créer la caractéristique.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
