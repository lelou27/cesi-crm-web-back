import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Client } from './client.schema';

export type AppointementDocument = Appointement & Document;

@Schema({ timestamps: true })
export class Appointement {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true})
  client: Client;

}

export const AppointementSchema = SchemaFactory.createForClass(Appointement);
