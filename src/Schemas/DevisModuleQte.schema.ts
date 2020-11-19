import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Module } from './module.schema';
import { Devis } from './devis.schema';

export type DevisModuleQteDocument = DevisModuleQte & Document;

@Schema({ timestamps: true })
export class DevisModuleQte {
  @Prop({ type: Types.ObjectId, ref: Devis.name, required: true })
  devis: Devis;

  @Prop({ type: Types.ObjectId, ref: Module.name, required: true })
  moduleId: Module;

  @Prop({ required: true })
  qte: number;
}

export const DevisModuleQteSchema = SchemaFactory.createForClass(
  DevisModuleQte,
);
