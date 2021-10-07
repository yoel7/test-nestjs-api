import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { myRequest } from './users&auth/auth';
import { Auth } from './users&auth/auth';

export function LoggerMiddleware (req: Request, res: Response, next: NextFunction) {
   console.log(`${req.method} ${req.path}:\nQuery: ${JSON.stringify(req.query)}\nParams: ${JSON.stringify(req.params)}\nBody : ${JSON.stringify(req.body)}\n`);
    next();
}
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private Auth: Auth) { }
   async use(req: myRequest, res: Response, next: NextFunction) {
    let user = await this.Auth.getUserByToken(req.headers.authorization)
    if (!user) throw new UnauthorizedException();
    req.user = user
    console.log('AuthMiddleware...');
    next();
  }
}
