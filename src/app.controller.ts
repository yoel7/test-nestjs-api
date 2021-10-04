import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { TranslationService } from './translation.service';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService, private readonly service: TranslationService) {}
  constructor( private readonly service: TranslationService) {}

  @Get()
  g(): string {
    var ddd = 5 * 5555;
    this.service.translateText()
    // return this.appService.getHello();
    return this.service.a()
  }

}
