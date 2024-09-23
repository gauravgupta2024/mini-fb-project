import mongoose, { Document } from 'mongoose';
import { avatarObjType } from './featuresTypes/user';
import { Avatar } from 'src/schemas/avatar.schema';
import { Content, Post, UploadDataObj } from 'src/schemas/post.schema';
import { PostDataUploadObjType } from './featuresTypes/post';

export interface UserDocumentType extends Document {
  email: string;
  password: string;
  username: string;
  avatar: avatarObjType;
  posts: mongoose.Types.ObjectId[];
  comments_added: mongoose.Types.ObjectId[];
  friends: mongoose.Types.ObjectId[];

  getJWTtoken(): string; // Custom method to generate JWT token
  comparePass(enteredPass: string): Promise<boolean>; // Custom method to compare passwords
}

export interface PostDataDocumentType extends Document {
  postCaption: string;
  contentType: string;
  postDataUploads: PostDataUploadObjType[];
  comments: mongoose.Types.ObjectId[];
}

export interface CommentDocumentType extends Document {
  user_id: mongoose.Types.ObjectId;
  comment_text: string;
}
