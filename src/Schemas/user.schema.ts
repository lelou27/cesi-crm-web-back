import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from './role.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  prenom: string;

  @Prop({ required: true })
  nom: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  telephone: number;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Types.ObjectId, ref: Role.name })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
