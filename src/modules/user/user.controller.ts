import { inject } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { fillDTO } from '../../utils/common.js';
import CreateUserDto from './dto/create-user.dto.js';
import LoginUserDto from './dto/login-user.dto.js';
import UserResponse from './response/user.response.js';
import HttpError from '../../common/errors/http-error.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import { UploadFileMiddleware } from '../../common/middlewares/upload-file.middleware.js';

import type { LoggerInterface } from '../../common/logger/logger.interface.js';
import type { ConfigInterface } from '../../common/config/config.interface.js';
import type { UserServiceInterface } from './user-service.interface.js';

export default class UserController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.UserServiceInterface)
    private userService: UserServiceInterface
  ) {
    super(logger);

    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)],
    });
    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)],
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new DocumentExistsMiddleware('userId', this.userService, 'user'),
        new UploadFileMiddleware(this.config.get('UPLOAD_DIRECTORY'), 'avatar'),
      ],
    });

    this.logger.info('Registered routes for UserController');
  }

  public async login(
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      LoginUserDto
    >,
    res: Response
  ) {
    const user = await this.userService.findByEmail(req.body.email);

    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${req.body.email} not found.`,
        'UserController'
      );
    }

    this.send(res, StatusCodes.OK, { ok: 'OK' });
  }

  public async create(
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      CreateUserDto
    >,
    res: Response
  ) {
    const user = await this.userService.findByEmail(req.body.email);

    if (user) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${req.body.email}» exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(
      req.body,
      this.config.get('SALT')
    );
    this.send(res, StatusCodes.CREATED, fillDTO(UserResponse, result));
  }

  public async uploadAvatar(req: Request, res: Response) {
    this.send(res, StatusCodes.OK, req.file?.path);
  }
}
