import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
//Primero me importo esa entidad: 
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  users:Array<User>; 

  constructor() {
    this.users = []; 
  }

  create(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: this.crearIdUnico(),
      first_name: createUserDto.first_name,
      last_name: createUserDto.last_name, 
      email: createUserDto.email,
      password: createUserDto.password, 
      avatar: createUserDto.avatar
    };
    this.users.push(newUser);
    return newUser; 
  }

  findAll() {
    return  this.users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private crearIdUnico() : number {
    return Math.floor(Math.random() * 1000); 
  }
}
