import { Injectable } from '@nestjs/common';
import { CreateAppointementDto } from './dto/create-appointement.dto';
import { UpdateAppointementDto } from './dto/update-appointement.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../Schemas/user.schema';
import { Model } from 'mongoose';
import { Appointement,AppointementDocument } from '../Schemas/appointement.schema';

@Injectable()
export class AppointementService {
  constructor(@InjectModel(Appointement.name) private AppointementModel: Model<AppointementDocument>) {}


  async create(createAppointementDto: CreateAppointementDto) {
    return await new this.AppointementModel(createAppointementDto).save();
  }

  async findAll() {
    return await this.AppointementModel.find().exec();
  }

  async findOne(id: string) {
    const day = new Date(id)
    const tomorrow = new Date(day)
    tomorrow.setDate(tomorrow.getDate() + 1)

    return await this.AppointementModel.find({date: {
        $gte: day,
        $lt: tomorrow
      }
    }).exec();
  }

  update(id: number, updateAppointementDto: UpdateAppointementDto) {
    return `This action updates a #${id} appointement`;
  }

  async remove(id: string) {
    return await this.AppointementModel.deleteOne({ _id: id });
  }
}
