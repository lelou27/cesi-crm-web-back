import { ApiProperty } from '@nestjs/swagger';
import { Composant } from '../Schemas/composant.schema';

export class AddComposantDto {
  @ApiProperty() composants: Composant[];
}
