import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface UserType {
  _id: string;
  username: string;
  email: string;
  password: string;
  posts: string[];
  comments_added: string[];
  friends: string[];
  avatar: AvatarType;
}

interface AvatarType {
  public_id: string;
  url: string;
}

export interface RegisterResponseType {
  success: boolean;
  msg?: string;
  user: UserType;
}

export interface RegisterRequestType {
  username: string;
  email: string;
  password: string;
}

export interface LoginResponseType {
  success: boolean;
  msg?: string;
  user: {
    _id: string;
    username: string;
    email: string;
    password: string;
    posts: string[];
    comments_added: string[];
    friends: string[];
    avatar: AvatarType;
  };
}

export interface LoginRequestType {
  email: string;
  password: string;
}

export interface UserResponseType {
  success: boolean;
  msg: string;
  user: UserType;
}

export interface GetAllPostsResponseType {
  success: boolean;
  nbHits: number;
  posts: PostType[];
}
export interface GetAllFriendsResponseType {
  success: boolean;
  nbHits: number;
  friends: UserType[];
}

export interface PostRequestType {
  postCaption: string;
  postDataUploads: FileReader[];
}

export interface PostResponseType {
  success: boolean;
  msg: string;
  post: PostType;
}

export interface PostType {
  _id: string;
  postCaption: string;
  contentType: string;
  postDataUploads: PostDataUploadObjType[];
  comments: string[];
  createdAt: string;
  updatedAt: string;
}
export interface PostDataUploadObjType {
  public_id: string;
  url: string;
}

export interface CommentType {
  _id: string;
  user_id: string;
  comment_text: string;
}

export interface GetPostCommentsResponseType {
  success: boolean;
  nbHits: number;
  comments: {
    comment: CommentType;
    user: UserType;
  }[];
}

export interface AddCommentRequestType {
  postId: string;
  comment_text: string;
}

export interface AddCommentResponseType {
  success: boolean;
  msg: string;
  comment: CommentType;
}
