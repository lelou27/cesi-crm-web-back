import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { ClientImage, ClientImageDocument } from '../Schemas/clientImage.schema';

@Injectable()
export class ClientImageService {
  constructor(
    @InjectModel(ClientImage.name) private ClientImageModel: Model<ClientImageDocument>,
  ) {}

  async getFileByIdClient(idClient) {
    return this.ClientImageModel.findOne({ client: idClient.idClient });
  }

  async saveImage(idClient, filename) {
    let clientImage = await this.ClientImageModel.findOne({client: idClient});

    if (!clientImage) {
      clientImage = new this.ClientImageModel({client: idClient, clientImagePath: filename});
    } else {
      clientImage.clientImagePath = filename;
    }

    return await clientImage.save();
  }
}
