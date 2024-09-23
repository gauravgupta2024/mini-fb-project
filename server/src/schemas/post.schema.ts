import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import {
  PostDataUploadObj,
  PostDataUploadObjSchema,
} from './post-upload.schema';

@Schema({ timestamps: true })
export class PostData extends Document {
  @Prop({
    required: [true, 'Please provide post caption'],
  })
  textCaption: string;

  @Prop({
    required: [true, 'Please provide post content type'],
    enum: ['images', 'videos', 'text'],
    default: 'text',
  })
  contentType: string;

  @Prop({ type: [PostDataUploadObjSchema] })
  postDataUploads: PostDataUploadObj[];

  @Prop({ required: true, default: false })
  isDeleted: boolean;
}

export const PostDataSchema = SchemaFactory.createForClass(PostData);
