import {
  Controller,
  Get,
  Param,
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

  @Put('/friend/add/:friendId')
  @UseGuards(AuthGuard)
  async addFriend(
    @Req() req: ReqUserObjType,
    @Res() res: Response,
    @Param('friendId') friendId: string,
  ) {
    const friend = await this.userModel.findById(friendId);

    if (!friend) {
      throw new CustomAPIError(
        'Please provide valid id of friend.',
        StatusCodes.BAD_REQUEST,
      );
    }

    const user = await this.userModel.findById(req.user.id);

    let index = user.friends.findIndex((item) => item === friend.id);

    if (index !== -1) {
      throw new CustomAPIError(
        'Friend is already added.',
        StatusCodes.BAD_REQUEST,
      );
    }

    user.friends.push(friend.id);
    friend.friends.push(user.id);
    await user.save();
    await friend.save();

    res.status(StatusCodes.OK).json({
      success: true,
      msg: `${friend.username} is added to your friends list.`,
      user,
    });
  }

  @Put('/friend/remove/:friendId')
  @UseGuards(AuthGuard)
  async removeFriend(
    @Req() req: ReqUserObjType,
    @Res() res: Response,
    @Param('friendId') friendId: string,
  ) {
    const friend = await this.userModel.findById(friendId);

    if (!friend) {
      throw new CustomAPIError(
        'Please provide valid id of friend.',
        StatusCodes.BAD_REQUEST,
      );
    }

    const user = await this.userModel.findById(req.user.id);

    let index = user.friends.findIndex((item) => item === friend.id);

    if (index === -1) {
      throw new CustomAPIError(
        'No friend with this id exists in your friends list.',
        StatusCodes.BAD_REQUEST,
      );
    }

    user.friends.splice(index, 1);

    index = friend.friends.findIndex((item) => item === user.id);
    friend.friends.splice(index, 1);

    await user.save();
    await friend.save();

    res.status(StatusCodes.OK).json({
      success: true,
      msg: `${friend.username} is removed to your friends list.`,
      user,
    });
  }
}
