import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ComposantDto } from '../Dto/ComposantDto';
import { Composant, ComposantDocument } from '../Schemas/composant.schema';

@Injectable()
export class ComposantService {
  constructor(
    @InjectModel(Composant.name)
    private composantModel: Model<ComposantDocument>,
  ) {}

  async deleteComposant(composantId: String): Promise<any> {
    try {
      return await this.composantModel.deleteOne({ _id: composantId });
    } catch (e) {
      throw new HttpException(
        "Impossible de supprimer l'utilisateur",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(composantDto: ComposantDto): Promise<Composant> {
    try {
      return await new this.composantModel(composantDto).save();
    } catch (e) {
      if (e.code === 11000) {
        throw new HttpException(
          'Une valeur existe déja pour ce composant.',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Impossible de créer le composant.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getAllComposants(): Promise<Composant[]> {
    const createdComposant = await this.composantModel.find().exec();
    return createdComposant;
  }
}
