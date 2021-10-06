import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { UserDto } from './schemas/user.dto';
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UsersService {
   constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection
    ) { }
  async create(UserDto: UserDto) {
    // req.body.password = crypto.cryptPassword(req.body.password);
    const newUser = new this.UserModel({...UserDto});
        return await newUser.save();
  }

  getUser(user) {
    return JSON.stringify(user);
  }

  async findById(_id: string) {
    return await this.UserModel.find({_id})
  }
  async findUserByUsername(username: string) : Promise<User> {
    return await this.UserModel.findById({username})
  }

  update(UserDto: UserDto) {
    return `This action updates a # user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  login() {
     return 'jnjnj'
  }
}
