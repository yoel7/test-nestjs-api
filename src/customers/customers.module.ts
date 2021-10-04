import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppModule } from 'src/app.module';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { Customer, CustomerDocument, CustomerSchema } from "./schemas/customer.schema";


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }])],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
