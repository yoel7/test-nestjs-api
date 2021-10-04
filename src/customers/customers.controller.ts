import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from "./schemas/create-customer.dto";
import { Customer } from "./schemas/customer.schema";

@Controller('customers')
export class CustomersController {
  constructor(private readonly service: CustomersService) {}

  @Get()
  getHello(): Promise<string> {
    return this.service.getHello()
  }

  @Post()
  create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.service.create(createCustomerDto);
  }
}
