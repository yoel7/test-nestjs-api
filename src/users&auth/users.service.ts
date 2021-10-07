import { BadRequestException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { UserDto } from './schemas/user.dto';
import { User, UserDocument } from "./schemas/user.schema";
import { Auth } from "./auth"

@Injectable()
export class UsersService {
   constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>,
     @InjectConnection() private connection: Connection
    ) { }
  async create(UserDto: UserDto) {
   const newUser = new this.UserModel(UserDto);
    let res: any = await newUser.save()
      .catch(e => new HttpException(e.message, e.code));
    return res._doc ? delete res._doc.password && res._doc : res
  }

  async login(UserDto: any) {
    let user: any = await this.findUserByUsername(UserDto.username, { _id: 1, password: 1 })
    if (!user) throw new BadRequestException()
    return Auth.login(user, UserDto.password)
  }

  async update(user, UserDto: UserDto) {
    return await this.UserModel.updateOne(user, UserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async findUserByUsername(username: string, options?: object) : Promise<User> {
    return await this.UserModel.findOne({username}, options || null)
  }

  async findUserById(_id: string, options?: object) : Promise<User> {
    return await this.UserModel.findById(_id, options || null)
  }

}
