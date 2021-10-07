import { AppService } from './app.service';
import { Controller, Get, Post, Query, Res, Request } from '@nestjs/common';
import { myRequest } from './users&auth/auth';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

 @Get('translation')
  getTranslation(@Query() query: any, @Request() req: myRequest): any {
    let key = query.key,
      locale = query.locale || req.user.lang;
    if (!key) return `bed req!!!`
    if (!locale ) {
      return `bed req!!!
      Please provide a translation language as a parameter,
      Or update your default language as a user`
    }
    return this.appService.get(key, locale)
  }
}