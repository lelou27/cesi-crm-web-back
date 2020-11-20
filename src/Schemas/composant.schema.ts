import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Unité } from './unité.schema';
import { Caracteristique } from './caracteristique.schema';

export type ComposantDocument = Composant & Document;

@Schema({ timestamps: true })
export class Composant {
  @Prop({ required: true, unique: true })
  nomComposant: string;

  @Prop({ type: Types.ObjectId, ref: Unité.name })
  unité: Unité;

  @Prop({ type: Types.ObjectId, ref: Caracteristique.name })
  nomCaracteristique: Caracteristique;
}

export const ComposantSchema = SchemaFactory.createForClass(Composant);
