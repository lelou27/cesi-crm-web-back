import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ClientDocument = Client & Document;

@Schema({ timestamps: true })
export class Client {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  mail: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  postal_code: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
