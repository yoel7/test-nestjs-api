import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware, LoggerMiddleware } from './middleware';
import { CustomersModule } from './customers/customers.module';
import { HttpModule } from "@nestjs/axios";
import { UsersModule } from './users&auth/users.module';
import { MONGO_URL } from './env';



@Module({
  imports: [HttpModule,CustomersModule, MongooseModule.forRoot(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: false }), UsersModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
     consumer
     .apply(LoggerMiddleware)
     .forRoutes('/')
    //  .forRoutes('*')
     .apply(AuthMiddleware)
     .exclude('login', 'register')
     .forRoutes('/')
  }
}
