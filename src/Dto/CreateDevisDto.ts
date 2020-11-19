import { ApiProperty } from '@nestjs/swagger';
import { Client } from '../Schemas/client.schema';

export class CreateDevisDto {
  @ApiProperty() readonly nomProjet: string;
  @ApiProperty() readonly client: Client;
  @ApiProperty() readonly dateDevis: Date;
}
