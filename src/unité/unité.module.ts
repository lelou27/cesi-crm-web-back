import { Module } from '@nestjs/common';
import { UnitéController } from './unité.controller';
import { UnitéService } from './unité.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Unité, UnitéSchema } from '../Schemas/unité.schema';

@Module({
  imports: [
  	MongooseModule.forFeature([{ name: Unité.name, schema: UnitéSchema }]),
  ],
  controllers: [UnitéController],
  providers: [UnitéService]
})
export class UnitéModule {}
