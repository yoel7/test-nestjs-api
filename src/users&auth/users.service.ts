import { Injectable } from '@nestjs/common';
import { UserDto } from './schemas/user.dto';

@Injectable()
export class UsersService {
  create(UserDto: UserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findByToken(id: number) {
    return `This action returns a # user`;
  }

  update(UserDto: UserDto) {
    return `This action updates a # user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
