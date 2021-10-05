import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './schemas/user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  // register(@Body() UserDto: UserDto) {
  register() {
    return 'jnjnj'
  }
  @Post('login')
  login(@Body() UserDto: UserDto) {
    return this.usersService.create(UserDto);
  }

  @Get('user')
  findAll() {
    return this.usersService.findAll();
  }

  @Patch('user')
  update(@Param('id') id: string, @Body() UserDto: UserDto) {
    // return this.usersService.update(UserDto);
  }
}
