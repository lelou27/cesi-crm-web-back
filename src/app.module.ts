import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// @ts-ignore
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './role/role.module';
import { ClientModule } from './client/client.module';
import { ComposantModule } from './composant/composant.module';
import { UnitéModule } from './unité/unité.module';
import { CaracteristiqueModule } from './caracteristique/caracteristique.module';
import { DevisModule } from './devis/devis.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.DB_CONNECTION_STRING,
    ),
    RoleModule,
    ClientModule,
    ComposantModule,
    CaracteristiqueModule,
    UnitéModule,
    CaracteristiqueModule,
    DevisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
