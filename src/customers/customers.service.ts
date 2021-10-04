import { Body, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Customer, CustomerDocument, CustomerSchema } from "./schemas/customer.schema";
import { CreateCustomerDto } from "./schemas/create-customer.dto";

@Injectable()
export class CustomersService {
    constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
    @InjectConnection() private connection: Connection
    ) { }

    // async create( createCustomerDto: any): Promise<Customer> {
    async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const newCustomer = new this.customerModel({...createCustomerDto});
    return newCustomer.save();
  }

  async findAll(): Promise<Customer[]> {
    return this.customerModel.find().exec();
  }

    async getHello(): Promise<string> {
    return 'Hello CustomersController!';
  }
}
