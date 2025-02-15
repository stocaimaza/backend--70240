import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

//Para poder conectar el Schema me traigo algunas cositas: 
import { User, userSchema } from './schema/users.schema';
import { MongooseModule } from '@nestjs/mongoose';

//Variables de entorno:  me traigo el ConfigModule
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [MongooseModule.forFeature([{
    name: User.name, 
    schema: userSchema
  }]), ConfigModule], 
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
