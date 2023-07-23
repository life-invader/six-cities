import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import { Component } from '../types/component.types.js';
import { getURI } from '../utils/db.js';
import ConfigService from '../common/config/config.service.js';
import DatabaseService from '../common/database-client/database.service.js';
import { AuthenticateMiddleware } from '../common/middlewares/authenticate.middleware.js';
import { getFullServerPath } from '../utils/common.js';

import type { LoggerInterface } from '../common/logger/logger.interface';
import type { ControllerInterface } from '../common/controller/controller.interface.js';
import type { ExceptionFilterInterface } from '../common/errors/exception-filter.interface.js';

@injectable()
export default class Application {
  private expressApp: Express;

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigService,
    @inject(Component.DatabaseInterface)
    private databaseClient: DatabaseService,
    @inject(Component.UserController)
    private userController: ControllerInterface,
    @inject(Component.OfferController)
    private offerController: ControllerInterface,
    @inject(Component.CommentController)
    private commentController: ControllerInterface,
    @inject(Component.ExceptionFilterInterface)
    private exceptionFilter: ExceptionFilterInterface
  ) {
    this.expressApp = express();
  }

  public initExceptionFilters() {
    this.expressApp.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public initMiddleware() {
    this.expressApp.use(express.json());
    this.expressApp.use(
      '/upload',
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );
    this.expressApp.use(
      '/static',
      express.static(this.config.get('STATIC_DIRECTORY_PATH'))
    );

    const authMiddleware = new AuthenticateMiddleware(
      this.config.get('JWT_SECRET')
    );

    this.expressApp.use(authMiddleware.execute.bind(authMiddleware));
  }

  public registerRoutes() {
    this.expressApp.use('/users', this.userController.router);
    this.expressApp.use('/offers', this.offerController.router);
    this.expressApp.use('/comments', this.commentController.router);
  }

  public async init() {
    this.logger.info('Application initialization...');

    const uri = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );
    await this.databaseClient.connect(uri);

    this.initMiddleware();
    this.registerRoutes();
    this.initExceptionFilters();
    this.expressApp.listen(this.config.get('PORT'));
    this.logger.info(
      `Server started on ${getFullServerPath(
        this.config.get('HOST'),
        this.config.get('PORT')
      )}`
    );
  }
}
