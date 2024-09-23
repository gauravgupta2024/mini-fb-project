import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import {
  PostDataUploadObj,
  PostDataUploadObjSchema,
} from './post-upload.schema';

@Schema({ timestamps: true })
export class PostData extends Document {
  @Prop({
    required: [true, 'Please provide post caption'],
  })
  postCaption: string;

  @Prop({
    required: [true, 'Please provide post content type'],
    enum: ['images', 'videos', 'text'],
    default: 'text',
  })
  contentType: string;

  @Prop({ type: [PostDataUploadObjSchema] })
  postDataUploads: PostDataUploadObj[];

  @Prop({ type: [mongoose.Types.ObjectId], ref: 'comments' })
  comments: mongoose.Types.ObjectId[];
}

export const PostDataSchema = SchemaFactory.createForClass(PostData);
