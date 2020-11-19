import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UnitéDocument = Unité & Document;

@Schema({ timestamps: true })
export class Unité {
  @Prop({ required: true, unique: true })
  uniteMesure: string;
}

export const UnitéSchema = SchemaFactory.createForClass(Unité);
