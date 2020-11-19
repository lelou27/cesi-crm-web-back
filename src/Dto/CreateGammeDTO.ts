import { ApiProperty } from '@nestjs/swagger';
// import { Module } from '../Schemas/module.schema';

export class CreateGammeDto {
  @ApiProperty() readonly nomGamme: string;
  // @ApiProperty() readonly modules: module;
}
