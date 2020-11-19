import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Client } from './client.schema';

export type DevisDocument = Devis & Document;

@Schema({ timestamps: true })
export class Devis {
  @Prop({ required: true, unique: true })
  nomProjet: string;

  @Prop({ type: Types.ObjectId, ref: Client.name })
  client: Client;

  @Prop({ required: true })
  dateDevis: string;

  // TODO :: Ajouter les modules
}

export const DevisSchema = SchemaFactory.createForClass(Devis);
