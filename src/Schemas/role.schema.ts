import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type RoleDocument = Role & Document;

@Schema({ timestamps: true })
export class Role {
  @Prop({ required: true, unique: true })
  role: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
