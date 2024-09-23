import { Injectable, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserDocumentType } from 'src/types/schemas';

@Injectable()
export class AuthService {
  async sendToken_service(
    @Res() res: Response,
    user: UserDocumentType,
  ): Promise<void> {
    const accesstoken = user.getJWTtoken();

    res
      .status(StatusCodes.OK)
      .cookie('accessToken', accesstoken, {
        httpOnly: true,
        secure: true,
        maxAge: parseInt(process.env.COOKIE_LIFETIME) * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        msg: `welcome ${user.username || 'undefined'}`,
        user,
        accesstoken,
      });
  }
}
