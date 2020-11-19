import { Module } from '@nestjs/common';
import { ComposantService } from './composant.service';
import { ComposantController } from './composant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Composant, ComposantSchema } from '../Schemas/composant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Composant.name, schema: ComposantSchema },
    ]),
  ],
  providers: [ComposantService],
  controllers: [ComposantController],
})
export class ComposantModule {}
