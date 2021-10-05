import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthMiddleware } from "./authMiddleware";

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthMiddleware],
  exports: [AuthMiddleware]
})
export class UsersModule {}
