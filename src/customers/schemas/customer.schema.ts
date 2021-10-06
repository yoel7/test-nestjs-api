import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
  @Prop({ required: true })
  firstname: string;
  
  @Prop({ required: true })
  lastname: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);