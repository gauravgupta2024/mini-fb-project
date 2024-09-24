import mongoose from 'mongoose';

export interface friendsPostsArrayType {
  _id: mongoose.Types.ObjectId;
  posts: mongoose.Types.ObjectId[];
}
