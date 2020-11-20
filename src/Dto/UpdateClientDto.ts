import { ApiProperty } from '@nestjs/swagger';

export class UpdateClientDto {
  @ApiProperty() readonly first_name: string;
  @ApiProperty() readonly mail: string;
  @ApiProperty() readonly phone: string;
  @ApiProperty() readonly address: string;
  @ApiProperty() readonly postal_code: string;
  @ApiProperty() readonly city: string;
  @ApiProperty() readonly country: string;
}
