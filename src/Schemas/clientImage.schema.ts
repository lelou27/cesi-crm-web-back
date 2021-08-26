import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Client } from './client.schema';

export type ClientImageDocument = ClientImage & Document;

@Schema({ timestamps: true })
export class ClientImage {
  @Prop({ type: Types.ObjectId, ref: Client.name })
  client: Client;

  @Prop({ required: true })
  clientImagePath: string;
}

export const ClientImageSchema = SchemaFactory.createForClass(ClientImage);
