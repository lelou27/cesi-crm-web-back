import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Unité, UnitéDocument } from '../Schemas/unité.schema';

@Injectable()
export class UnitéService {
  constructor(
    @InjectModel(Unité.name) private unitéModel: Model<UnitéDocument>,
  ) {}

  async getAllUnités(): Promise<Unité[]> {
    const createdUnité = await this.unitéModel.find().exec();
    return createdUnité;
  }

  async getById(id: string): Promise<Unité> {
    return this.unitéModel.findById(id);
  }

  async createUnité(unité: Unité): Promise<Unité | Error> {
    try {
      return await new this.unitéModel(unité).save();
    } catch (e) {
      if (e.code === 11000) {
        throw new HttpException(
          'Une valeur existe déja pour cette unité.',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          "Impossible de créer l'unité.",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async deleteUnite(uniteId: String): Promise<any> {
    try {
      return await this.unitéModel.deleteOne({ _id: uniteId });
    } catch (e) {
      throw new HttpException(
        "Impossible de supprimer l\'unité",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
