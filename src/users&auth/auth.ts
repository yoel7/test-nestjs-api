import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { UnauthorizedException,BadRequestException,NotFoundException,HttpException } from "@nestjs/common/exceptions";
import * as bcrypt from "bcrypt";
import * as cryptojs from "crypto-js";
import { SECRET, split, ttl } from "../env";

import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Promise } from 'mongoose';
import { UserDto } from './schemas/user.dto';
import {  User, UserDocument } from "./schemas/user.schema";
export interface myRequest extends Request{
 user:User
}

@Injectable()
export class Auth{
  constructor(private readonly usersService: UsersService) { }
  async getUserByToken(token: string) {
    let splitToken = this.splitToken(token)
    if (!splitToken) return
    let {_doc} : any = await this.usersService.findUserById(splitToken._id, {password:0})
      .catch(() =>  new NotFoundException())
  return _doc
  }
  splitToken(token: any) {
    if (!token || token.split(' ').length == 1) return
    token = getDecrypt(token.split(' ')[1])
    token = token.split(split)
    if (token.length < 2 || +token[1] < Date.now()) return
    return {_id:token[0]}
  }

  static login({_doc}: any, password: any) {
    if (!bcrypt.compareSync(password, _doc.password)) throw new NotFoundException()
    return sendToken(_doc)
  }

}
function sendToken(user) {
  return getEncrypt(user._id+ split + (Date.now() + ttl))
}
function getEncrypt(input) {
    const enc = cryptojs.AES.encrypt(input, SECRET);
    return enc.toString();
}
function getDecrypt(input) {
    const dec = cryptojs.AES.decrypt(input, SECRET);
    return dec.toString(cryptojs.enc.Utf8);

}