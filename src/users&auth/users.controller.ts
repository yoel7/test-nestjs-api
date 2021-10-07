import { Controller, Get, Post, Body, Patch, Param, Delete, Request, BadRequestException } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { UsersService } from './users.service';
import { UserDto } from './schemas/user.dto';
import { myRequest } from './auth';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() UserDto: UserDto) {
    if (!UserDto.password || !UserDto.username) throw new BadRequestException()
    // UserDto.password = bcrypt.hashSync(UserDto.password, 10);
    const salt = await bcrypt.genSalt(10);
    UserDto.password = await bcrypt.hash(UserDto.password, salt);
    return this.usersService.create(UserDto);
  }
  @Post('login')
  login(@Body() UserDto: UserDto) {
    if (!UserDto.password || !UserDto.username) throw new BadRequestException()
    return this.usersService.login({...UserDto})
  }

  @Get('user')
  get(@Request() req: myRequest) {
    return JSON.stringify(req.user);
  }
  // @Get('user/:id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findUserById(id);
  // }
  @Patch('user')
  update(@Request() req: myRequest, @Body() UserDto: UserDto) {
    if (UserDto.password) UserDto.password = bcrypt.hashSync(UserDto.password, 10);
    return this.usersService.update(req.user, UserDto);
  }
}
