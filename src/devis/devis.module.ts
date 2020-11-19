import { Module } from '@nestjs/common';
import { DevisController } from './devis.controller';
import { DevisService } from './devis.service';
import { Devis, DevisSchema } from '../Schemas/devis.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Devis.name, schema: DevisSchema }]),
  ],
  controllers: [DevisController],
  providers: [DevisService],
})
export class DevisModule {}
