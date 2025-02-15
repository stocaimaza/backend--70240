import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//Nos conectamos a MongoDB
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

//MiMiddleware: 
//1) Importamos: NestModule, MiddlewareConsumer y MiMiddleware. 
import MiMiddleware from './middleware/miMiddleware';

//Variables de Entorno: 
//instalamos: npm install @nestjs/config
//Importamos ConfigModule, ConfigService
import { ConfigModule, ConfigService } from '@nestjs/config';

//Modificamos los imports:

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async(config:ConfigService) => ({
      uri: config.get<string>("MONGO_URL")
    })
  }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiMiddleware).forRoutes({path: "*", method: RequestMethod.ALL}); 
  }
}

