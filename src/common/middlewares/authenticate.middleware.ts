import { NextFunction, Request, Response } from 'express';
import * as jose from 'jose';
import crypto from 'crypto';
import HttpError from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import type { MiddlewareInterface } from '../../types/middleware.interface';

export class AuthenticateMiddleware implements MiddlewareInterface {
  jwtSecret: string;

  constructor(jwtSecret: string) {
    this.jwtSecret = jwtSecret;
  }

  async execute(req: Request, _res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization?.split(' ');

    if (!authHeader) {
      return next();
    }

    const [, token] = authHeader;

    try {
      const { payload } = await jose.jwtVerify(
        token,
        crypto.createSecretKey(this.jwtSecret, 'utf-8')
      );

      req.user = { email: payload.email as string, id: payload.id as string };
      return next();
    } catch (error) {
      return next(
        new HttpError(
          StatusCodes.UNAUTHORIZED,
          'Invalid token',
          'AuthenticateMiddleware'
        )
      );
    }
  }
}
