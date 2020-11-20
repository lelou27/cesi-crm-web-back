import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Client } from './client.schema';
import { Module } from './module.schema';
import { Devis } from './devis.schema';

export type FactureDocument = Facture & Document;

@Schema({ timestamps: true })
export class Facture {
  @Prop({ type: Types.ObjectId, ref: Devis.name })
  devis: Devis;

  @Prop({ type: Types.ObjectId, ref: Client.name })
  client: Client;

  @Prop()
  filename: string;
}

export const FactureSchema = SchemaFactory.createForClass(Facture);
