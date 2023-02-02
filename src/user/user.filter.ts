import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserNotFoundException } from './user.not.found.exception';

@Catch()
export class UserExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const body = {
      statusCode:
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      message: exception.message,
      path: request.url,
    };

    switch (exception.name) {
      case UserNotFoundException.name:
        body.statusCode = 404;
        break;
      default:
        body.statusCode = 500;
    }

    response.status(body.statusCode).json(body);
  }
}
