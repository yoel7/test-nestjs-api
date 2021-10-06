import { Body, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from "express";
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, FilterQuery, Promise } from 'mongoose';
import { Customer, CustomerDocument, CustomerSchema } from "./schemas/customer.schema";
import { CreateCustomerDto } from "./schemas/create-customer.dto";

@Injectable()
export class CustomersService {
    constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
    @InjectConnection() private connection: Connection
    ) { }

    // async create( createCustomerDto: any): Promise<Customer> {
      // async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
        // const newCustomer = new this.customerModel({...createCustomerDto});
        // return await newCustomer.save();
  async create(b: any): Promise<any> {
    b = Array.isArray(b) ? b : [b];
    // let b1: CreateCustomerDto[]= b
    let p: Promise<Customer>[] = [];
    b.forEach((e)=> {
      p.push(new this.customerModel(e).save());
    });
    // b.forEach(function(e) {
    //   p.push(new this.customerModel(e).save());
    // },this);
    // if (!await Promise.any(p)) return Promise.reject(new HttpException('mis', HttpStatus.BAD_REQUEST))
    return await Promise.allSettled(p);
    // return await Promise.all(p);
  }

  async find(q: string): Promise<Customer[]> {
    // let filter: any = q && {$or:[{firstname:q},{lastname:q}]}
    let filter: any = q ? {$or:[{firstname:q},{lastname:q}]} : null
    // return await this.customerModel.find().exec();
    return await this.customerModel.find(filter);
  }

  async findById(id: string): Promise<Customer> {
    return await this.customerModel.findById(id)
  }

}
