import { ApiProperty } from '@nestjs/swagger';
import { Client } from '../../Schemas/client.schema';

export class CreateAppointementDto {
  @ApiProperty() readonly name: string;
  @ApiProperty() readonly client: Client;
  @ApiProperty() readonly date: Date;
}
