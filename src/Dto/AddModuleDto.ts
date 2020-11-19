import { ApiProperty } from '@nestjs/swagger';
import { Module } from '../Schemas/module.schema';

export class AddModuleDto {
  @ApiProperty() readonly modules: Module[];
}
