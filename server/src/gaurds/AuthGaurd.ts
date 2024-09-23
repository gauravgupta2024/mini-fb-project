import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as JWT from 'jsonwebtoken';
import { UserDocumentType } from 'src/types/schemas';
import { User } from 'src/schemas/user.schema';
import { CustomAPIError } from 'src/errors/customAPIError';
import { StatusCodes } from 'http-status-codes';
import { DecodedObjType, ReqUserObjType } from 'src/types/global';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocumentType>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ReqUserObjType>();
    const { accessToken } = request.cookies;
    // console.log({ accessToken });

    if (!accessToken) {
      throw new CustomAPIError(
        'Please login to access this route...',
        StatusCodes.UNAUTHORIZED,
      );
    }

    try {
      const decoded = JWT.verify(
        accessToken,
        process.env.JWT_SECRET,
      ) as DecodedObjType;
      const user = await this.userModel.findById(decoded.id);

      if (!user) {
        throw new CustomAPIError('User not found.', StatusCodes.NOT_FOUND);
      }

      request.user = user;
      return true;
    } catch (error) {
      throw new CustomAPIError(
        'Invalid token.',
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
