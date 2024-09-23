import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import {
  LogInBodyObjType,
  RegisterBodyObjType,
} from '../../types/featuresTypes/auth';
import { CustomAPIError } from 'src/errors/customAPIError';
import { AuthService } from './auth.service';
import { UserDocumentType } from 'src/types/schemas';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocumentType>,
    private readonly authServices: AuthService,
  ) {}

  @Post('/register')
  async Register_controller(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const { email, username, password }: RegisterBodyObjType = req.body;

    if (!email) {
      throw new CustomAPIError('Please provide email', StatusCodes.BAD_REQUEST);
    }
    if (!username) {
      throw new CustomAPIError(
        'Please provide username',
        StatusCodes.BAD_REQUEST,
      );
    }
    if (!password) {
      throw new CustomAPIError(
        'Please provide password',
        StatusCodes.BAD_REQUEST,
      );
    }

    const user = await this.userModel.create({
      email,
      password,
      username,
      avatar: {
        public_id: 'new_user',
        url: 'sample url',
      },
    });

    await this.authServices.sendToken_service(res, user);
  }

  @Post('/login')
  async LogIn_controller(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const { email, password }: LogInBodyObjType = req.body;

    if (!email) {
      throw new CustomAPIError('Please provide email', StatusCodes.BAD_REQUEST);
    }
    if (!password) {
      throw new CustomAPIError(
        'Please provide password',
        StatusCodes.BAD_REQUEST,
      );
    }

    const user: UserDocumentType | null = await this.userModel
      .findOne({ email })
      .select('+password');

    if (!user) {
      throw new CustomAPIError(
        'Invalid email or password',
        StatusCodes.UNAUTHORIZED,
      );
    }

    const isMatched = await user.comparePass(password);

    if (!isMatched) {
      throw new CustomAPIError(
        'Please provide correct password!',
        StatusCodes.UNAUTHORIZED,
      );
    }

    await this.authServices.sendToken_service(res, user);
  }

  @Get('/logout')
  async LogOut_Controller(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    res
      .status(StatusCodes.OK)
      .cookie('accessToken', null, { maxAge: 0, httpOnly: true, secure: true })
      .json({
        success: true,
        msg: 'logged out successfully.',
      });
  }
}
