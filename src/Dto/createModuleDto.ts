import { ApiProperty } from '@nestjs/swagger';
import { Composant } from '../Schemas/composant.schema';

export class CreateModuleDto {
  @ApiProperty() readonly nomModule: string;
  @ApiProperty() readonly nomGamme: string;
  @ApiProperty() readonly composants: Composant[];
}
