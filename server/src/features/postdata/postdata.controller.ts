import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Model } from 'mongoose';
import { AuthGuard } from 'src/gaurds/AuthGaurd';
import { PostData } from 'src/schemas/post.schema';
import { PostDataDocumentType, UserDocumentType } from 'src/types/schemas';
import { PostdataService } from './postdata.service';
import {
  PostDataObjType,
  UpdatePostDataObjType,
} from 'src/types/featuresTypes/post';
import { ReqUserObjType } from 'src/types/global';
import { User } from 'src/schemas/user.schema';
import { CustomAPIError } from 'src/errors/customAPIError';
import { StatusCodes } from 'http-status-codes';

@Controller('/api/v1/posts')
export class PostdataController {
  constructor(
    @InjectModel(PostData.name)
    private readonly PostDataModel: Model<PostDataDocumentType>,
    @InjectModel(User.name) private readonly UserModel: Model<UserDocumentType>,
    private readonly postDataServices: PostdataService,
  ) {}

  //---------------------images upload---------------------
  @Post('/images')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FilesInterceptor('postUploads', 10, {
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return cb(
            new Error(
              'Invalid file type. Only images (jpg, jpeg, png) are allowed.',
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async createPostImages(
    @Req() req: ReqUserObjType,
    @Res() res: Response,
    @UploadedFiles() postUploads: Array<Express.Multer.File>,
  ) {
    const { postCaption } = req.body;

    if (postUploads === undefined || postUploads?.length == 0) {
      await this.postDataServices.DeleteUploads(postUploads);

      throw new CustomAPIError(
        'Please provide images to upload.',
        StatusCodes.BAD_REQUEST,
      );
    }

    await this.postDataServices.createPost(
      req,
      res,
      'images',
      postCaption,
      postUploads,
    );
  }

  //---------------------videos upload---------------------
  @Post('/videos')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FilesInterceptor('postUploads', 10, {
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(mp3|mp4)$/)) {
          return cb(
            new Error('Invalid file type. Only video (mp3, mp4) are allowed.'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async createPostVideos(
    @Req() req: ReqUserObjType,
    @Res() res: Response,
    @UploadedFiles() postUploads: Array<Express.Multer.File>,
  ) {
    console.log({ postUploads });

    const { postCaption } = req.body;

    if (postUploads === undefined || postUploads?.length == 0) {
      await this.postDataServices.DeleteUploads(postUploads);

      throw new CustomAPIError(
        'Please provide videos to upload.',
        StatusCodes.BAD_REQUEST,
      );
    }

    await this.postDataServices.createPost(
      req,
      res,
      'videos',
      postCaption,
      postUploads,
    );
  }

  //---------------------only text upload---------------------
  @Post('/text')
  @UseGuards(AuthGuard)
  async createPostText(@Req() req: ReqUserObjType, @Res() res: Response) {
    const { postCaption } = req.body;

    const postData: PostDataObjType = {
      contentType: 'text',
      postCaption,
    };

    const post = await this.PostDataModel.create(postData);
    const user = await this.UserModel.findById(req.user.id);

    user.posts.unshift(post.id);
    await user.save();

    res.json({ success: true, msg: 'Post created successfully !', post });
  }

  //---------------------delete post---------------------
  @Delete('/:postId')
  @UseGuards(AuthGuard)
  async deletePost(
    @Req() req: ReqUserObjType,
    @Res() res: Response,
    @Param('postId') postId: string,
  ) {
    const post = await this.PostDataModel.findById(postId);
    const user = await this.UserModel.findById(req.user.id);

    const postIndex = user.posts.findIndex(
      (singlePostId) => singlePostId === post.id,
    );

    if (postIndex === -1) {
      throw new CustomAPIError(
        'Please provide valid post id',
        StatusCodes.UNAUTHORIZED,
      );
    }

    user.posts.splice(postIndex, 1);
    await user.save();

    // post.isDeleted = true;
    // await post.save();
    // console.log({ post });

    await this.postDataServices.DeleteDBUploads(post.postDataUploads);

    res.json({ success: true, msg: 'Post deleted successfully !', post });
  }

  //---------------------update post---------------------
  @Put('/:postId')
  @UseGuards(AuthGuard)
  async updatePost(
    @Req() req: ReqUserObjType,
    @Res() res: Response,
    @Param('postId') postId: string,
  ) {
    const user = await this.UserModel.findById(req.user.id);
    let post = await this.PostDataModel.findById(postId);
    if (!post) {
      throw new CustomAPIError('Post Not Found !!', StatusCodes.BAD_REQUEST);
    }

    const postIndex = user.posts.findIndex(
      (singlePostId) => singlePostId === post.id,
    );

    if (postIndex === -1) {
      throw new CustomAPIError(
        'This post does not exists in user account !!',
        StatusCodes.UNAUTHORIZED,
      );
    }

    const { postCaption }: UpdatePostDataObjType = req.body;

    post = await this.PostDataModel.findByIdAndUpdate(
      postId,
      { postCaption },
      { runValidators: true, new: true },
    );

    res.json({ success: true, msg: 'Post updated successfully !', post });
  }

  //---------------------Get All User posts---------------------
  @Get('/me')
  @UseGuards(AuthGuard)
  async GetAllUserPosts(@Req() req: ReqUserObjType, @Res() res: Response) {
    const user = await this.UserModel.findById(req.user.id);

    const postsArray = user.posts; // all posts id created by user

    // fetch all posts data
    const userPosts = await this.PostDataModel.find({
      _id: { $in: postsArray },
    }).exec();

    res.json({ success: true, nbHits: userPosts.length, posts: userPosts });
  }

  //---------------------Get All User posts---------------------
  @Get('/:postId')
  @UseGuards(AuthGuard)
  async GetSinglePost(
    @Req() req: ReqUserObjType,
    @Res() res: Response,
    @Param('postId') postId: string,
  ) {
    const post = await this.PostDataModel.findById(postId);

    if (!post) {
      throw new CustomAPIError('Post not found !!', StatusCodes.BAD_REQUEST);
    }

    res.json({ success: true, post });
  }
}
