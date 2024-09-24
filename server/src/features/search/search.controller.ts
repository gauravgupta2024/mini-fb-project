import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Model } from 'mongoose';
import { CustomAPIError } from 'src/errors/customAPIError';
import { AuthGuard } from 'src/gaurds/AuthGaurd';
import { PostData } from 'src/schemas/post.schema';
import { User } from 'src/schemas/user.schema';
import { friendsPostsArrayType } from 'src/types/featuresTypes/search';
import { ReqUserObjType } from 'src/types/global';
import { PostDataDocumentType, UserDocumentType } from 'src/types/schemas';

@Controller('/api/v1/search')
export class SearchController {
  constructor(
    @InjectModel(PostData.name)
    private readonly PostDataModel: Model<PostDataDocumentType>,
    @InjectModel(User.name) private readonly UserModel: Model<UserDocumentType>,
  ) {}

  //---------------------search All posts---------------------
  @Get('/posts')
  async SearchAllPosts(
    @Req() req: ReqUserObjType,
    @Res() res: Response,
    @Query('postCaption') postCaption: string,
  ) {
    if (!postCaption) {
      throw new CustomAPIError(
        'Please provide post caption to search for.',
        StatusCodes.BAD_REQUEST,
      );
    }

    const posts = await this.PostDataModel.find({
      postCaption: { $regex: postCaption, $options: 'i' },
    });

    res
      .status(StatusCodes.OK)
      .json({ success: true, nbHits: posts.length, posts });
  }

  //---------------------search All users---------------------
  @Get('/users')
  async SearchAllUsers(
    @Req() req: ReqUserObjType,
    @Res() res: Response,
    @Query('username') username: string,
  ) {
    if (!username) {
      throw new CustomAPIError(
        'Please provide username to search for.',
        StatusCodes.BAD_REQUEST,
      );
    }

    const users = await this.UserModel.find({
      username: { $regex: username, $options: 'i' },
    });

    res
      .status(StatusCodes.OK)
      .json({ success: true, nbHits: users.length, users });
  }

  //---------------------get universal feed---------------------
  @Get('/feed')
  async GetUniversalFeed(@Req() req: Request, @Res() res: Response) {
    const feed = this.PostDataModel.find().sort({ createdAt: -1 }).limit(10);

    res.status(StatusCodes.OK).json({ success: true, feed });
  }

  //---------------------get personal feed---------------------
  // @Get('/feed/me')
  // @UseGuards(AuthGuard)
  // async GetPersonalFeed(@Req() req: ReqUserObjType, @Res() res: Response) {
  //   const user = await this.UserModel.findById(req.user.id);
  //   let friends = user.friends;

  //   console.log(friends);

  //   res.status(StatusCodes.OK).json({ success: true });
  // }
}
