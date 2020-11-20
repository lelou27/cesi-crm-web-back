import { Module } from '@nestjs/common';
import { DevisController } from './devis.controller';
import { DevisService } from './devis.service';
import { Devis, DevisSchema } from '../Schemas/devis.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DevisModuleQte,
  DevisModuleQteSchema,
} from '../Schemas/DevisModuleQte.schema';
import { ModuleSchema } from '../Schemas/module.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Devis.name, schema: DevisSchema }]),
    MongooseModule.forFeature([{ name: Module.name, schema: ModuleSchema }]),
    MongooseModule.forFeature([
      { name: DevisModuleQte.name, schema: DevisModuleQteSchema },
    ]),
  ],
  controllers: [DevisController],
  providers: [DevisService],
})
export class DevisModule {}
