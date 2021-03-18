import { ApiProperty } from '@nestjs/swagger';
import { Module } from '../Schemas/module.schema';

export class CreateGammeDto {
  @ApiProperty() readonly nomGamme: string | null;
  @ApiProperty() modules: Module[] | String[] | string;
  @ApiProperty() readonly description: string | null;
}
