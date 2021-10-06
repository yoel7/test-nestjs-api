import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  password: string;
  @Prop({ required: true, unique : true })
  username: string;
  @Prop()
  phone: string;
  @Prop()
  email: string;
  @Prop()
  country: string;
  @Prop()
  lang: string;
}

export const UserSchema = SchemaFactory.createForClass(User);