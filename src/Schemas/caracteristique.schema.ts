import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CaracteristiqueDocument = Caracteristique & Document;

@Schema({ timestamps: true })
export class Caracteristique {
  @Prop({ required: true, unique: true })
  nomCaracteristique: string;
}

export const CaracteristiqueSchema = SchemaFactory.createForClass(
  Caracteristique,
);
