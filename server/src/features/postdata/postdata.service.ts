import { Injectable, Req, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response } from 'express';
import { unlinkSync } from 'fs';
import { Model } from 'mongoose';
import { join } from 'path';
import { PostData } from 'src/schemas/post.schema';
import { User } from 'src/schemas/user.schema';
import { PostDataObjType } from 'src/types/featuresTypes/post';
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
    textCaption: string,
    postUploads: Array<Express.Multer.File>,
  ) {
    const postData: PostDataObjType = {
      contentType,
      textCaption,
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
      console.log({ msg: 'file not found !!', error });
    }
  }
}
