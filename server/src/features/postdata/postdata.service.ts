import { Injectable, Req, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response } from 'express';
import { unlinkSync } from 'fs';
import { StatusCodes } from 'http-status-codes';
import { Model } from 'mongoose';
import { join } from 'path';
import { CustomAPIError } from 'src/errors/customAPIError';
import { PostData } from 'src/schemas/post.schema';
import { User } from 'src/schemas/user.schema';
import {
  PostDataObjType,
  PostDataUploadObjType,
} from 'src/types/featuresTypes/post';
import { ReqUserObjType } from 'src/types/global';
import { PostDataDocumentType, UserDocumentType } from 'src/types/schemas';

@Injectable()
export class PostdataService {
  constructor(
    @InjectModel(PostData.name)
    private readonly PostDataModel: Model<PostDataDocumentType>,
    @InjectModel(User.name) private readonly UserModel: Model<UserDocumentType>,
  ) {}

  async createPost(
    @Req() req: ReqUserObjType,
    @Res() res: Response,
    contentType: string,
    postCaption: string,
    postUploads: Array<Express.Multer.File>,
  ) {
    const postData: PostDataObjType = {
      contentType,
      postCaption,
      postDataUploads: postUploads.map((item) => {
        return {
          public_id: item.filename,
          url: item.path,
        };
      }),
    };

    const post = await this.PostDataModel.create(postData);
    const user = await this.UserModel.findById(req.user.id);

    user.posts.unshift(post.id);
    await user.save();

    res.json({ success: true, msg: 'Post created successfully !', post });
  }

  async DeleteUploads(uploads: Array<Express.Multer.File>): Promise<void> {
    try {
      uploads.forEach((item) => {
        const fullPath = join(process.cwd(), item.path);
        //   console.log({ fullPath });
        unlinkSync(fullPath);
      });
    } catch (error) {
      console.log({ msg: 'Not Able to Delete files.', error });
    }
  }

  async DeleteDBUploads(uploads: Array<PostDataUploadObjType>): Promise<void> {
    // console.log({ uploads });

    if (!uploads || !Array.isArray(uploads)) {
      throw new CustomAPIError(
        'Please provide valid uploads data to delete !!',
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }

    if (Array.isArray(uploads) && uploads?.length === 0) {
      return;
    }

    try {
      uploads.forEach((item) => {
        const fullPath = join(process.cwd(), item.url);
        //   console.log({ fullPath });
        unlinkSync(fullPath);
      });
    } catch (error) {
      console.log({ msg: 'Not able to delete files.', error });
    }
  }
}
