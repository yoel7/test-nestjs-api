import { AppService } from './app.service';
import { Controller, Get, Post, Query, Res, Request, HttpException } from '@nestjs/common';
import { myRequest } from './users&auth/auth';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

 @Get('translation')
  getTranslation(@Query() query: any, @Request() req: myRequest): any {
   let key = query.key,
     locale = 'fgfg'||query.locale || req.user.lang;
    if (!key) return new HttpException("Bad Request. key is required", 400)
    if (!locale) return new HttpException("Bad Request. Please provide a translation language as a parameter, Or update your default language as a user", 400)
    return this.appService.get(key, locale)
  }
}