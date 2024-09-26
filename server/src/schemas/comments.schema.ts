import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Comments extends Document {
  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'user',
  })
  user_id: mongoose.Types.ObjectId;

  @Prop({
    required: [true, 'Please provide comment text.'],
  })
  comment_text: string;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
