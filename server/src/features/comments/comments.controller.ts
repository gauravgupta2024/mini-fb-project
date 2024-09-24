import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Model } from 'mongoose';
import { CustomAPIError } from 'src/errors/customAPIError';
import { AuthGuard } from 'src/gaurds/AuthGaurd';
import { Comments } from 'src/schemas/comments.schema';
import { PostData } from 'src/schemas/post.schema';
import { User } from 'src/schemas/user.schema';
import { CreateCommentBodyObjType } from 'src/types/featuresTypes/post';
import { ReqUserObjType } from 'src/types/global';
import {
  CommentDocumentType,
  PostDataDocumentType,
  UserDocumentType,
} from 'src/types/schemas';
import { CommentsService } from './comments.service';

@Controller('/api/v1/comments')
export class CommentsController {
  constructor(
    @InjectModel(PostData.name)
    private readonly PostDataModel: Model<PostDataDocumentType>,
    @InjectModel(User.name) private readonly UserModel: Model<UserDocumentType>,
    @InjectModel(Comments.name)
    private readonly CommentModel: Model<CommentDocumentType>,
    private readonly commentService: CommentsService,
  ) {}

  @Post('/:postId')
  @UseGuards(AuthGuard)
  async createComment(
    @Req() req: ReqUserObjType,
    @Res() res: Response,
    @Param('postId') postId: string,
  ) {
    const { comment_text }: CreateCommentBodyObjType = req.body;
    const user = await this.UserModel.findById(req.user.id);
    const post = await this.PostDataModel.findById(postId);

    if (!post) {
      throw new CustomAPIError('Post not found !!', StatusCodes.BAD_REQUEST);
    }

    const comment = await this.CommentModel.create({
      user_id: user.id,
      comment_text,
    }); // comment created

    // console.log('comment created', comment);

    user.comments_added.push(comment.id);
    post.comments.unshift(comment.id);

    await user.save();
    await post.save();

    res.status(StatusCodes.OK).json({
      success: true,
      msg: 'comment added successfully !',
      comment,
      post,
      user,
    });
  }

  @Delete('/:postId')
  @UseGuards(AuthGuard)
  async deleteComment(
    @Req() req: ReqUserObjType,
    @Res() res: Response,
    @Param('postId') postId: string,
  ) {
    const { comment_id } = req.body;

    const user = await this.UserModel.findById(req.user.id);
    const post = await this.PostDataModel.findById(postId);

    const Indexes = await this.commentService.checkCommentIsCreatedByUser(
      user,
      post,
      comment_id,
    );

    const comment = await this.CommentModel.findByIdAndDelete(comment_id);

    if (!comment) {
      throw new CustomAPIError(
        'Something went wrong !!',
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }

    post.comments.splice(Indexes.postCommentIndex, 1);
    user.comments_added.splice(Indexes.userCommentIndex, 1);

    await user.save();
    await post.save();

    res.status(StatusCodes.OK).json({
      success: true,
      msg: 'comment deleted successfully !',
      comment,
      user,
      post,
    });
  }

  @Put('/:postId')
  @UseGuards(AuthGuard)
  async updateComment(
    @Req() req: ReqUserObjType,
    @Res() res: Response,
    @Param('postId') postId: string,
  ) {
    const { comment_id, comment_text } = req.body;

    const user = await this.UserModel.findById(req.user.id);
    const post = await this.PostDataModel.findById(postId);

    await this.commentService.checkCommentIsCreatedByUser(
      user,
      post,
      comment_id,
    );

    const comment = await this.CommentModel.findByIdAndUpdate(
      comment_id,
      { comment_text },
      { runValidators: true, new: true },
    );

    if (!comment) {
      throw new CustomAPIError(
        'Something went wrong !!',
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }

    res.status(StatusCodes.OK).json({
      success: true,
      msg: 'comment updated successfully !',
      comment,
      user,
      post,
    });
  }

  @Get('/:postId')
  @UseGuards(AuthGuard)
  async getPostComments(
    @Req() req: ReqUserObjType,
    @Res() res: Response,
    @Param('postId') postId: string,
  ) {
    const post = await this.PostDataModel.findById(postId);
    if (!post) {
      throw new CustomAPIError('Post not found !!', StatusCodes.BAD_REQUEST);
    }

    const comments = await this.CommentModel.find({
      _id: { $in: post.comments },
    });

    res.status(StatusCodes.OK).json({
      success: true,
      nbHits: comments.length,
      comments,
    });
  }
}
