import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Module } from './module.schema';

export type GammeDocument = Gamme & Document;

@Schema({ timestamps: true })
export class Gamme {
  @Prop({ required: true })
  nomGamme: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Module.name }] })
  modules: Module[];
}

export const GammeSchema = SchemaFactory.createForClass(Gamme);
