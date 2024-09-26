import mongoose from 'mongoose';

export interface PostDataUploadObjType {
  public_id: string;
  url: string;
}
export interface PostDataObjType {
  postCaption: string;
  contentType: string;
  postDataUploads?: PostDataUploadObjType[];
}
export interface UpdatePostDataObjType {
  postCaption: string;
}

export interface CreateCommentBodyObjType {
  comment_text: string;
}

export interface checkCommentIndexesObjType {
  postCommentIndex: number;
  userCommentIndex: number;
}
