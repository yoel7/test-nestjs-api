import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from './users.service';

import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { UserDto } from './schemas/user.dto';
import {  User, UserDocument } from "./schemas/user.schema";
export interface myRequest extends Request{
 user:any
}
@Injectable()
export class Middleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService){}
  use(req: myRequest, res: Response, next: NextFunction) {
    let username = Auth.findUserByToken(req.headers['x-access-token'])
    let user = this.usersService.findUserByUsername(username)
    // req.user = user
    req.user = user
    console.log('AuthMiddleware...');
    next();
  }
}
@Injectable()
export class Auth{
  static findUserByToken(token?: any) {
    // if (!token) throw new Error("net fvgferw");
    return 'yoel'
  }
  // static findUserByUsername(username: string) {

  // }

}
