import { Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { injectable } from 'inversify';
import { RouteInterface } from '../../types/route.interface';
import asyncHandler from 'express-async-handler';
import { getFullServerPath, transformObject } from '../../utils/common.js';
import { STATIC_RESOURCE_FIELDS } from '../../app/application.constant.js';

import type { LoggerInterface } from '../logger/logger.interface';
import type { ControllerInterface } from './controller.interface';
import type { ConfigInterface } from '../config/config.interface';
import type { UnknownObject } from '../../types/unknown-object.type';

@injectable()
export abstract class Controller implements ControllerInterface {
  private readonly _router: Router;
  protected logger: LoggerInterface;
  protected config: ConfigInterface;

  constructor(logger: LoggerInterface, config: ConfigInterface) {
    this._router = Router();
    this.logger = logger;
    this.config = config;
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
    this.addStaticPath(data as UnknownObject);
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

  addStaticPath(data: UnknownObject) {
    const fullServerPath = getFullServerPath(
      this.config.get('HOST'),
      this.config.get('PORT')
    );

    transformObject(
      STATIC_RESOURCE_FIELDS,
      `${fullServerPath}/${this.config.get('STATIC_DIRECTORY_PATH')}`,
      `${fullServerPath}/${this.config.get('UPLOAD_DIRECTORY')}`,
      data
    );
  }
}
