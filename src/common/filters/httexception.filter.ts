import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class AllException implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    let { message } = exception;

    if (status === HttpStatus.BAD_REQUEST && message.message.constraints) {
      message = message.message.map(el => {
        return {
          property: el.property,
          value: el.value ? el.value : 'null',
          message: el.constraints,
        };
      });
    }

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
