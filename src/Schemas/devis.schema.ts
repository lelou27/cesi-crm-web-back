import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Client } from './client.schema';
import { Module } from './module.schema';

export type DevisDocument = Devis & Document;

@Schema({ timestamps: true })
export class Devis {
  @Prop({ required: true })
  nomProjet: string;

  @Prop({required: true, unique: true})
  referenceProjet: string;

  @Prop({ type: Types.ObjectId, ref: Client.name })
  client: Client;

  @Prop({ required: true })
  dateDevis: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Module.name }] })
  modules: Module[];
}

export const DevisSchema = SchemaFactory.createForClass(Devis);
