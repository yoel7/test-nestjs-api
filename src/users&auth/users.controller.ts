import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './schemas/user.dto';
import { myRequest } from './auth';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() UserDto: UserDto) {
  // register() {
    return this.usersService.create(UserDto);
  }
  @Post('login')
  login(@Body() UserDto: UserDto) {
    return this.usersService.login()
  }

  @Get('user')
  get(@Request() req: myRequest) {
    return this.usersService.getUser(req.user);
  }

  @Patch('user')
  update(@Param('id') id: string, @Body() UserDto: UserDto) {
    // return this.usersService.update(UserDto);
  }
}
