import { inject } from 'inversify';
import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import ExactOfferResponse from './response/exact-offer.response.js';
import OfferResponse from './response/offer.response.js';
import { fillDTO } from '../../utils/common.js';
import HttpError from '../../common/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import CommentResponse from '../comment/response/comment.response.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectId.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';
import { UploadFileMiddleware } from '../../common/middlewares/upload-file.middleware.js';

import type { LoggerInterface } from '../../common/logger/logger.interface.js';
import type { OfferServiceInterface } from './offer-service.interface.js';
import type { CommentServiceInterface } from '../comment/comment-service.interface.js';
import type { ConfigInterface } from '../../common/config/config.interface.js';

type ParamsGetOffer = {
  offerId: string;
};

type QueryParams = {
  limit?: string;
};

type GetCommentsParams = {
  offerId: string;
};

export default class OfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) config: ConfigInterface,
    @inject(Component.OfferServiceInterface)
    private offerService: OfferServiceInterface,
    @inject(Component.CommentServiceInterface)
    private commentService: CommentServiceInterface
  ) {
    super(logger, config);

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new UploadFileMiddleware(this.config.get('UPLOAD_DIRECTORY'), 'image'),
        new ValidateDtoMiddleware(CreateOfferDto),
      ],
    });
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware('offerId', this.offerService, 'Offer'),
        new ValidateDtoMiddleware(UpdateOfferDto),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware('offerId', this.offerService, 'Offer'),
      ],
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments.bind(this),
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware('offerId', this.offerService, 'Offer'),
      ],
    });
  }

  public async index(
    req: Request<core.ParamsDictionary, unknown, unknown, QueryParams>,
    res: Response
  ) {
    const offers = await this.offerService.find(Number(req.query.limit));
    this.ok(res, fillDTO(OfferResponse, offers));
  }

  public async create(
    {
      body,
      user,
    }: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      CreateOfferDto
    >,
    res: Response
  ) {
    const result = await this.offerService.create({ ...body, author: user.id });
    this.created(res, fillDTO(ExactOfferResponse, result));
  }

  public async update(
    {
      body,
      params,
    }: Request<
      core.ParamsDictionary | ParamsGetOffer,
      Record<string, unknown>,
      UpdateOfferDto
    >,
    res: Response
  ) {
    const updatedOffer = await this.offerService.updateById(
      params.offerId,
      body
    );
    this.ok(res, fillDTO(ExactOfferResponse, updatedOffer));
  }

  public async delete(
    { params }: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ) {
    await this.offerService.deleteById(params.offerId);
    this.noContent(res);
  }

  public async show(
    { params }: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ) {
    const offer = await this.offerService.findById(params.offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found`
      );
    }

    this.ok(res, fillDTO(ExactOfferResponse, offer));
  }

  public async getComments(
    { params }: Request<Record<string, string> | GetCommentsParams>,
    res: Response
  ) {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.send(res, StatusCodes.OK, fillDTO(CommentResponse, comments));
  }
}
