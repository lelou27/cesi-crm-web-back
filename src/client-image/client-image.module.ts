import { Module } from '@nestjs/common';
import { ClientImageController } from './client-image.controller';
import { ClientImageService } from './client-image.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientImage, ClientImageSchema } from '../Schemas/clientImage.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ClientImage.name, schema: ClientImageSchema }]),
    MulterModule.register({
      dest: './public/clientImages',
    })
  ],
  controllers: [ClientImageController],
  providers: [ClientImageService]
})
export class ClientImageModule {}
