import { ApiProperty } from '@nestjs/swagger';

export class UnitéDto {
  @ApiProperty() readonly uniteMesure: string;
}
