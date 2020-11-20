import { Module } from '@nestjs/common';
import { FactureController } from './facture.controller';
import { FactureService } from './facture.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Facture, FactureSchema } from '../Schemas/facture.schema';
import { Devis, DevisSchema } from '../Schemas/devis.schema';
import {
  DevisModuleQte,
  DevisModuleQteSchema,
} from '../Schemas/DevisModuleQte.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Facture.name, schema: FactureSchema },
      { name: Devis.name, schema: DevisSchema },
      { name: DevisModuleQte.name, schema: DevisModuleQteSchema },
    ]),
  ],
  controllers: [FactureController],
  providers: [FactureService],
})
export class FactureModule {}
