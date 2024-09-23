import {
  Controller,
  Get,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  avatarObjType,
  updateUserBodyObjType,
} from '../../types/featuresTypes/user';
import { CustomAPIError } from 'src/errors/customAPIError';
import { StatusCodes } from 'http-status-codes';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { AuthGuard } from 'src/gaurds/AuthGaurd';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserDocumentType } from 'src/types/schemas';
import { ReqUserObjType } from 'src/types/global';
import { UserService } from './user.service';

@Controller('/api/v1/me')
export class UserController {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocumentType>,
    private readonly userService: UserService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async loadUser_Controller(
    @Req() req: ReqUserObjType,
    @Res() res: Response,
  ): Promise<void> {
    const { id } = req.user;

    const user = await this.userModel.findById(id);

    res.status(StatusCodes.OK).json({ success: true, user });
  }

  @Put('/update')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('avatarFile'))
  async updateProfile_controller(
    @Req() req: ReqUserObjType,
    @Res() res: Response,
    @UploadedFile() avatarFile: Express.Multer.File,
  ): Promise<void> {
    const updateData: updateUserBodyObjType = req.body;

    console.log({ avatarFile });

    if (avatarFile) {
      const userData = await this.userModel.findById(req.user.id);

      await this.userService.findAndDeleteExistingAvatar(userData);

      const avatarData: avatarObjType = {
        public_id: avatarFile.filename,
        url: avatarFile.path,
      };

      updateData.avatar = avatarData;
    }

    const user = await this.userModel.findByIdAndUpdate(
      req.user.id,
      updateData,
      { runValidators: true, new: true },
    );

    res
      .status(StatusCodes.OK)
      .json({ success: true, msg: 'user updated successfully.', user });
  }
}
