import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    // Default error response
    let customError = {
      msg: 'Internal server error',
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };

    if (exception instanceof HttpException) {
      // Handle HttpException
      const status = exception.getStatus();
      const responseBody = exception.getResponse() as any;
      customError = {
        msg:
          typeof responseBody.message === 'string'
            ? responseBody.message
            : responseBody.message.join(', ') || 'Something went wrong!',
        statusCode: status || StatusCodes.INTERNAL_SERVER_ERROR,
      };
    } else if (exception instanceof Error) {
      // Handle Mongoose and other errors
      if (exception.name === 'ValidationError') {
        customError.msg = Object.values((exception as any).errors || {})
          .map((item: any) => item.message)
          .join(', ');
        customError.statusCode = StatusCodes.BAD_REQUEST;
      } else if ((exception as any).code && (exception as any).code === 11000) {
        if (Object.keys((exception as any).keyValue === 'email')) {
          customError.msg = `Account with this email already exists.`;
        } else {
          customError.msg = `Duplicate value entered for ${Object.keys((exception as any).keyValue || {})} field, please choose another value.`;
        }
        customError.statusCode = StatusCodes.BAD_REQUEST;
      } else if (exception.name === 'CastError') {
        customError.msg = `No item found with ID: ${(exception as any).value}`;
        customError.statusCode = StatusCodes.NOT_FOUND;
      } else if (exception.name === 'TokenExpiredError') {
        customError.msg = 'JSON Web Token is invalid or expired. Try again!';
        customError.statusCode = StatusCodes.UNAUTHORIZED;
      } else {
        customError.msg =
          exception.message || 'Something went wrong! Please try again later.';
      }
    }

    response.status(customError.statusCode).json({ msg: customError.msg });
  }
}
