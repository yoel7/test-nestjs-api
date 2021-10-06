import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger';
import { CustomersModule } from './customers/customers.module';
import { TranslationController } from './translation.controller';
import { HttpModule } from "@nestjs/axios";
import { TranslationService } from './translation.service';
import { UsersModule } from './users&auth/users.module';
import { Middleware } from './users&auth/auth';
import { MONGO_URL } from './env';



@Module({
  imports: [HttpModule,CustomersModule, MongooseModule.forRoot(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: false }), UsersModule,],
  controllers: [AppController, TranslationController],
  providers: [AppService, TranslationService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
     consumer
     .apply(LoggerMiddleware)
     .forRoutes('/')
    //  .forRoutes('*')
     .apply(Middleware)
     .exclude('login', 'register')
     .forRoutes('/')
  }
}
