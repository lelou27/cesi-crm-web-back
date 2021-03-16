import { Module } from '@nestjs/common';
import { AppointementService } from './appointement.service';
import { AppointementController } from './appointement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../Schemas/user.schema';
import { UsersController } from '../users/users.controller';
import { UsersService } from '../users/users.service';
import { Appointement, AppointementSchema } from '../Schemas/appointement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Appointement.name, schema: AppointementSchema }]),
  ],
  exports: [AppointementService],
  controllers: [AppointementController],
  providers: [AppointementService]
})
export class AppointementModule {}
