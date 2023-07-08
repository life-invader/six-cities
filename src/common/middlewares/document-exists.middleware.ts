import { NextFunction, Request, Response } from 'express';
import type { MiddlewareInterface } from '../../types/middleware.interface';
import type { IDocumentExists } from '../../types/document-exists.interface';
import HttpError from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

export class DocumentExistsMiddleware implements MiddlewareInterface {
  paramName: string;
  service: IDocumentExists;
  entityName: string;

  constructor(paramName: string, service: IDocumentExists, entityName: string) {
    this.paramName = paramName;
    this.service = service;
    this.entityName = entityName;
  }

  async execute({ params }: Request, _res: Response, next: NextFunction) {
    const documentId = params[this.paramName];
    const isExist = await this.service.exists(documentId);

    if(!isExist) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `${this.entityName} with ${documentId} not found.`,
      );
    }

    next();
  }
}
