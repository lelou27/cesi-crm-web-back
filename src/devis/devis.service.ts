import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Devis, DevisDocument } from '../Schemas/devis.schema';
import { CreateDevisDto } from '../Dto/CreateDevisDto';
import {
  DevisModuleQte,
  DevisModuleQteDocument,
} from '../Schemas/DevisModuleQte.schema';
import { Module, ModuleDocument } from '../Schemas/module.schema';

@Injectable()
export class DevisService {
  constructor(
    @InjectModel(Devis.name) private devisModel: Model<DevisDocument>,
    @InjectModel(Module.name) private moduleModele: Model<ModuleDocument>,
    @InjectModel(DevisModuleQte.name)
    private devisModuleQteModel: Model<DevisModuleQteDocument>,
  ) {}

  async getAllDevis(): Promise<Devis[]> {
    return this.devisModel.find().populate('client').populate('modules');
  }

  async getDevisById(id): Promise<Devis> {
    return this.devisModel.findById(id).populate('client').populate('modules');
  }

  async createDevisModuleQte(createDevisDto, devis) {
    const objectsCreated = [];
    for (const mod of createDevisDto.modules) {
      objectsCreated.push(
        await new this.devisModuleQteModel({
          devis: devis._id,
          moduleId: mod._id,
          qte: mod.quantite,
        }).save(),
      );
    }

    return objectsCreated;
  }

  async createDevis(createDevisDto: CreateDevisDto): Promise<Devis> {
    try {
      const devis = await new this.devisModel(createDevisDto).save();
      await this.createDevisModuleQte(createDevisDto, devis);

      return devis;
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
