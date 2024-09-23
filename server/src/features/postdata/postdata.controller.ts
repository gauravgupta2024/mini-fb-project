import {
  Controller,
  Param,
  Post,
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
import { PostDataObjType } from 'src/types/featuresTypes/post';
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
    const { textCaption } = req.body;

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
      textCaption,
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

    const { textCaption } = req.body;

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
      textCaption,
      postUploads,
    );
  }

  //---------------------only text upload---------------------
  @Post('/text')
  @UseGuards(AuthGuard)
  async createPostText(@Req() req: ReqUserObjType, @Res() res: Response) {
    const { textCaption } = req.body;

    const postData: PostDataObjType = {
      contentType: 'text',
      textCaption,
    };

    const post = await this.PostDataModel.create(postData);
    const user = await this.UserModel.findById(req.user.id);

    user.posts.unshift(post.id);
    await user.save();

    res.json({ success: true, msg: 'Post created successfully !', post });
  }

  //---------------------delete post---------------------
  @Post('/:postId')
  @UseGuards(AuthGuard)
  async deletePost(
    @Req() req: ReqUserObjType,
    @Res() res: Response,
    @Param('postId') postId: string,
  ) {
    const post = await this.PostDataModel.findById(postId);
    const user = await this.UserModel.findById(req.user.id);

    const postIndex = user.posts.findIndex(post.id);

    if (postIndex === -1) {
      throw new CustomAPIError(
        'Please provide valid post id',
        StatusCodes.UNAUTHORIZED,
      );
    }

    user.posts.splice(postIndex, 1);
    await user.save();

    post.isDeleted = true;
    await post.save();

    res.json({ success: true, msg: 'Post deleted successfully !', post });
  }
}
