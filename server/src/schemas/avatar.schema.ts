import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Avatar extends Document {
  @Prop({ required: [true, 'Please provide avatar public id'] })
  public_id: string;

  @Prop({ required: [true, 'Please provide avatar url'] })
  url: string;
}

export const AvatarSchema = SchemaFactory.createForClass(Avatar);
