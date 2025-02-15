import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

//1) Importamos: 
//El Decorador @InjectModel
import { InjectModel } from '@nestjs/mongoose';
//Importamos el Model de Mongoose
import { Model } from 'mongoose';
//Importamos el user y el userSchema:
import { User, userSchema, UsersDocument} from "./schema/users.schema"; 


@Injectable()
export class UsersService {
  //2) Creamos un constructor: hacemos la inyeccion del nombre del modelo del usuario. 

  constructor(@InjectModel(User.name) private userModel: Model<UsersDocument>) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<User | null> {
    return await this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: string): Promise<User | null> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
