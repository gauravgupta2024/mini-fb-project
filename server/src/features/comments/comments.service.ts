import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StatusCodes } from 'http-status-codes';
import { Model } from 'mongoose';
import { CustomAPIError } from 'src/errors/customAPIError';
import { Comments } from 'src/schemas/comments.schema';
import { PostData } from 'src/schemas/post.schema';
import { User } from 'src/schemas/user.schema';
import { checkCommentIndexesObjType } from 'src/types/featuresTypes/post';
import {
  CommentDocumentType,
  PostDataDocumentType,
  UserDocumentType,
} from 'src/types/schemas';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(PostData.name)
    private readonly PostDataModel: Model<PostDataDocumentType>,
    @InjectModel(User.name) private readonly UserModel: Model<UserDocumentType>,

    @InjectModel(Comments.name)
    private readonly CommentModel: Model<CommentDocumentType>,
  ) {}

  async checkCommentIsCreatedByUser(
    user: UserDocumentType,
    post: PostDataDocumentType,
    comment_id: string,
  ): Promise<checkCommentIndexesObjType> {
    if (!post) {
      throw new CustomAPIError('Post not found !!', StatusCodes.BAD_REQUEST);
    }

    let userCommentIndex = user.comments_added.findIndex(
      (item) => item.toString() === comment_id,
    );

    if (userCommentIndex === -1) {
      throw new CustomAPIError(
        'This comment is not created by you !!',
        StatusCodes.BAD_REQUEST,
      );
    }

    let postCommentIndex = post.comments.findIndex(
      (item) => item.toString() === comment_id,
    );

    if (postCommentIndex === -1) {
      throw new CustomAPIError(
        'This comment does not exists on post !!',
        StatusCodes.BAD_REQUEST,
      );
    }

    return {
      postCommentIndex,
      userCommentIndex,
    };
  }
}
