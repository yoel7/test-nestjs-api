import { Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { TranslationService } from './translation.service';

@Controller('translation')
export class TranslationController {
  constructor(private readonly service: TranslationService) {}

  @Get()
  getTranslation(@Query() query: any,  @Res() res: Response): any {
    // return this.service.get(key, locale)
    let key = query.key,
      locale = query.locale;
    if (!locale || !key) {
      return 'bed req!!!'
    }
   return this.service.get(key, locale)
  }

}
