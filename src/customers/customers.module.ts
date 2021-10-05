import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppModule } from 'src/app.module';
import { CustomersService } from './customers.service';
import { Customer, CustomerDocument, CustomerSchema } from "./schemas/customer.schema";
import { CustomersController } from './customers.controller';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }])],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
