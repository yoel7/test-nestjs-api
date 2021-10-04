import { Controller, Get, Post, Query } from '@nestjs/common';
import { TranslationService } from './translation.service';

@Controller('T')
export class TranslationController {
  constructor(private readonly service: TranslationService) {}

  @Get()
  getTranslation(@Query() key?: string): string {
      this.service.translateText()
      return 'bdfbd'
    //   this.appService.getHello();
  }

}
