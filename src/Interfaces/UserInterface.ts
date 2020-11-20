import { Document } from 'mongoose';
export interface UserInterface extends Document {
  readonly prenom: string;
  readonly nom: string;
  readonly email: string;
  readonly telephone: number;
  readonly username: string;
  readonly password: string;
}
