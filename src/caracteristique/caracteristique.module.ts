import { Module } from '@nestjs/common';
import { CaracteristiqueController } from './caracteristique.controller';
import { CaracteristiqueService } from './caracteristique.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Caracteristique, CaracteristiqueSchema } from '../Schemas/caracteristique.schema';

@Module({
  imports: [
  	MongooseModule.forFeature([{ name: Caracteristique.name, schema: CaracteristiqueSchema }]),
  ],
  controllers: [CaracteristiqueController],
  providers: [CaracteristiqueService]
})
export class CaracteristiqueModule {}
