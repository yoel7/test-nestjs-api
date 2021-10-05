import { Body, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, FilterQuery } from 'mongoose';
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
    return await newCustomer.save();
  }

  async find(q: string): Promise<Customer[]> {
    // let filter: any = q && {$or:[{firstname:q},{lastname:q}]}
    let filter: any = q ? {$or:[{firstname:q},{lastname:q}]} : null
    // return await this.customerModel.find().exec();
    return await this.customerModel.find(filter);
  }

    async getHello(): Promise<string> {
    return 'Hello CustomersController!';
  }
}
