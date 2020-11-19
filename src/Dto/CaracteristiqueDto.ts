import { ApiProperty } from '@nestjs/swagger';

export class CaracteristiqueDto {
  @ApiProperty() readonly nomCaracteristique: string;
}
