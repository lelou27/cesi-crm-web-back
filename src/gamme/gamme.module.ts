import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GammeService } from './gamme.service';
import { GammeController } from './gamme.controller';
import { Gamme, GammeSchema } from '../Schemas/gamme.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gamme.name, schema: GammeSchema }]),
  ],
  controllers: [GammeController],
  providers: [GammeService],
})
export class GammeModule {}
