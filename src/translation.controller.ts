import { Controller, Get, Post, Query, Res, Request } from '@nestjs/common';
import { Response } from 'express';
import { TranslationService } from './translation.service';
import { myRequest } from './users&auth/auth';

@Controller('translation')
export class TranslationController {
  constructor(private readonly service: TranslationService) {}

  @Get()
  getTranslation(@Query() query: any, @Request() req: myRequest): any {
    let key = query.key,
      locale = query.locale || req.user.lang;
    if (!locale || !key) {
      return 'bed req!!!'
    }
    return this.service.get(key, locale)
  }
}
