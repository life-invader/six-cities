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
    const middlewares = route.middlewares?.map((mw) =>
      asyncHandler(mw.execute.bind(mw))
    );
    const routeHandler = asyncHandler(route.handler.bind(this));
    const allHandlers = middlewares
      ? [...middlewares, routeHandler]
      : routeHandler;
    this._router[route.method](route.path, allHandlers);

    this.logger.info(
      `Route registered: ${route.method.toUpperCase()} ${route.path}`
    );
  }

  send<T>(res: Response, statusCode: number, data: T): void {
    res.status(statusCode).json(data);
  }

  created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  noContent(res: Response): void {
    res.status(StatusCodes.NO_CONTENT).end();
  }

  ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }
}
