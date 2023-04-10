import { Injectable } from '@nestjs/common';
import { UserCreateDto } from 'tools/dtos/user.dto';
import { UserModel } from 'tools/models/user.model';

const result: UserModel[] = [];

@Injectable()
export class UserService {
  getAll(): UserModel[] {
    if (result.length === 0) {
      this.createMockUser({
        birthDay: new Date(),
        email: 'john.doe@gmail.com',
        name: 'John',
        surname: 'Doe',
        password: '123123',
      });
    }
    return result;
  }
  create(body: UserCreateDto) {
    const isExist = result.find((user) => user.email === body.email);
    console.log(isExist);
    if (isExist) {
      return isExist;
    } else {
      return this.createMockUser(body);
    }
  }

  getUserById(id: string) {
    const user = result.find((user) => user.id === id);
    if (user) {
      return user;
    } else return "User doesn't exist";
  }

  private createMockUser(data: any): UserModel {
    const user: UserModel = new UserModel();
    user.birthDay = data.birthDay;
    user.email = data.email;
    user.name = data.name;
    user.password = data.password;
    user.surname = data.surname;
    user.id = Math.floor(Math.random() * 100 + 1).toString();
    result.push(user);
    return user;
  }
}
