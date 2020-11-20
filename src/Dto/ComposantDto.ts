import { ApiProperty } from '@nestjs/swagger';
import { Unité } from '../Schemas/unité.schema';
import { Caracteristique } from '../Schemas/caracteristique.schema';

export class ComposantDto {
  @ApiProperty() readonly nomComposant: string;
  @ApiProperty() unité: Unité;
  @ApiProperty() nomCaracteristique: Caracteristique;
}
