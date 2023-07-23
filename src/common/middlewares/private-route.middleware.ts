import { NextFunction, Request, Response } from 'express';
import HttpError from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import type { MiddlewareInterface } from '../../types/middleware.interface';

export class PrivateRouteMiddleware implements MiddlewareInterface {
  async execute(req: Request, _res: Response, next: NextFunction) {
    if (!req.user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'PrivateRouteMiddleware'
      );
    }

    return next();
  }
}
