import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CustomersService } from "./customers.service";
import { CreateCustomerDto } from "./schemas/create-customer.dto";

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}

  @Post()
//   create(@Body() createCustomerDto: CreateCustomerDto) {
    // return this.customersService.create(createCustomerDto);
  create(@Body() Body: object) {
    return this.customersService.create(Body);
  }

  @Get()
  find(@Query() query: any) {
    // return this.customersService.find(query.q || null);
    return this.customersService.find(query.q);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findById(id);
  }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
//     return this.customersService.update(+id, updateUserDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.customersService.remove(+id);
//   }
}
