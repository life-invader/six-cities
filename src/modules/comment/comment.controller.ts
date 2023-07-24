import { inject } from 'inversify';
import { Request, Response } from 'express';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { StatusCodes } from 'http-status-codes';
import CreateCommentDto from './dto/create-comment.dto.js';
import { fillDTO } from '../../utils/common.js';
import CommentResponse from './response/comment.response.js';
import HttpError from '../../common/errors/http-error.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';

import type { ConfigInterface } from '../../common/config/config.interface.js';
import type { LoggerInterface } from '../../common/logger/logger.interface.js';
import type { CommentServiceInterface } from './comment-service.interface.js';
import type { OfferServiceInterface } from '../offer/offer-service.interface.js';

export default class CommentController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) config: ConfigInterface,
    @inject(Component.CommentServiceInterface)
    private commentService: CommentServiceInterface,
    @inject(Component.OfferServiceInterface)
    private offerService: OfferServiceInterface
  ) {
    super(logger, config);

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create.bind(this),
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto),
      ],
    });
  }

  async create(
    req: Request<
      Record<string, string>,
      unknown,
      Omit<CreateCommentDto, 'userId'>
    >,
    res: Response
  ) {
    const isOfferExist = await this.offerService.exists(req.body.offerId);

    if (!isOfferExist) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with ${req.body.offerId} does not exist`
      );
    }

    const comment = await this.commentService.create({
      ...req.body,
      userId: req.user.id,
    });
    this.created(res, fillDTO(CommentResponse, comment));
  }
}
