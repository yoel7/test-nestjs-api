import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware';
import { CustomersModule } from './customers/customers.module';
import { TranslationController } from './translation.controller';
import { TranslationService } from './translation.service';
import { HttpModule } from "@nestjs/axios";
import { Translation2Service } from './translation2.service';

const url = `mongodb+srv://yoel1613195:zxcvb12345@cluster0.6ybzi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
@Module({
  imports: [HttpModule,CustomersModule, MongooseModule.forRoot(url, { useNewUrlParser: true, useUnifiedTopology: false }),],
  controllers: [AppController, TranslationController],
  providers: [AppService, TranslationService, Translation2Service],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
     consumer
      .apply(LoggerMiddleware)
      .forRoutes('/');
  }
}
