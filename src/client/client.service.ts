import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client, ClientDocument } from '../Schemas/client.schema';
import { Model } from 'mongoose';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private ClientModel: Model<ClientDocument>,
  ) {}

  async createClient(client: Client): Promise<Client | Error> {
    try {
      return await new this.ClientModel(client).save();
    } catch (e) {
      if (e.code === 11000) {
        throw new HttpException(
          'Une valeur existe déja pour ce client.',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Impossible de créer le client.' + client.address,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getClient(id: string): Promise<Client> {
    return this.ClientModel.findById(id);
  }

  async getAllClient(): Promise<Client[]> {
    return await this.ClientModel.find().populate('client').exec();
  }
}
