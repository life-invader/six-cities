import { StatusCodes } from 'http-status-codes';
import type { ValidationErrorType } from '../../types/validation-error.type';

export class ValidationError extends Error {
  httpStatusCode: number = StatusCodes.BAD_REQUEST;
  details: ValidationErrorType[] = [];

  constructor(message: string, errors: ValidationErrorType[]) {
    super(message);

    this.message = message;
    this.details = errors;
  }
}
