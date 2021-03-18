import { ApiProperty } from '@nestjs/swagger';
import { Client } from '../Schemas/client.schema';
import { Moment } from 'moment';
import { Module } from '../Schemas/module.schema';

export class CreateDevisDto {
  @ApiProperty() readonly nomProjet: string;
  @ApiProperty() readonly client: Client;
  @ApiProperty() readonly dateDevis: Moment;
  @ApiProperty() readonly referenceProjet: string;
  @ApiProperty() modules: Module[];
}
