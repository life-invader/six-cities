import { NextFunction, Request, Response } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationError } from '../errors/validation-error.js';
import { transformErrors } from '../../utils/common.js';
import type { MiddlewareInterface } from '../../types/middleware.interface';

export class ValidateDtoMiddleware implements MiddlewareInterface {
  constructor(private dto: ClassConstructor<object>) {}

  async execute({ body, path }: Request, _res: Response, next: NextFunction) {
    const dtoInstance = plainToInstance(this.dto, body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      throw new ValidationError(
        `Validation Error: ${path}`,
        transformErrors(errors)
      );
    }

    next();
  }
}
