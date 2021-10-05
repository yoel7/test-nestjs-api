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
import { AuthMiddleware } from './users&auth/authMiddleware';


const url = `mongodb+srv://yoel1613195:zxcvb12345@cluster0.6ybzi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
@Module({
  imports: [HttpModule,CustomersModule, MongooseModule.forRoot(url, { useNewUrlParser: true, useUnifiedTopology: false }), UsersModule,],
  controllers: [AppController, TranslationController],
  providers: [AppService, TranslationService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
     consumer
     .apply(LoggerMiddleware)
     .forRoutes('/')
    //  .forRoutes('*')
     .apply(AuthMiddleware)
     .exclude('user', 'login', 'register')
     .forRoutes('/')
  }
}
