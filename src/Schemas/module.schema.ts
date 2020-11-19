import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Composant } from './composant.schema';

export type ModuleDocument = Module & Document;

@Schema({ timestamps: true })
export class Module {
  @Prop({ required: true })
  nomModule: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Composant.name }] })
  composants: Composant[];
}

export const ModuleSchema = SchemaFactory.createForClass(Module);
