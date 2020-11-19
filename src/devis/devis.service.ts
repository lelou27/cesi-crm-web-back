import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Devis, DevisDocument } from '../Schemas/devis.schema';
import { CreateDevisDto } from '../Dto/CreateDevisDto';

@Injectable()
export class DevisService {
  constructor(
    @InjectModel(Devis.name) private devisModel: Model<DevisDocument>,
  ) {}

  async getAllDevis(): Promise<Devis[]> {
    return this.devisModel.find().populate('client');
  }

  async getDevisById(id): Promise<Devis> {
    return this.devisModel.findById(id).populate('client');
  }

  async createDevis(createDevisDto: CreateDevisDto): Promise<Devis> {
    try {
      return await new this.devisModel(createDevisDto).save();
    } catch (e) {
      if (e.code === 11000) {
        throw new HttpException(
          'Une valeur existe déja pour ce devis.',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Impossible de créer le devis.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
