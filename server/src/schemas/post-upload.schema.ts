import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PostDataUploadObj extends Document {
  @Prop({ required: [true, 'Please provide upload public id'] })
  public_id: string;

  @Prop({ required: [true, 'Please provide upload url'] })
  url: string;
}

export const PostDataUploadObjSchema =
  SchemaFactory.createForClass(PostDataUploadObj);
