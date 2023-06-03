import { Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { injectable } from 'inversify';
import { RouteInterface } from '../../types/route.interface';
import asyncHandler from 'express-async-handler';

import type { LoggerInterface } from '../logger/logger.interface';
import type { ControllerInterface } from './controller.interface';

@injectable()
export abstract class Controller implements ControllerInterface {
  private readonly _router: Router;
  protected logger: LoggerInterface;

  constructor(logger: LoggerInterface) {
    this._router = Router();
    this.logger = logger;
  }

  get router() {
    return this._router;
  }

  addRoute(route: RouteInterface): void {
    this._router[route.method](route.path, asyncHandler(route.handler.bind(this)));
    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  send<T>(res: Response<any, Record<string, any>>, statusCode: number, data: T): void {
    res
      .type('application/json')
      .status(statusCode)
      .json(data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }
}
