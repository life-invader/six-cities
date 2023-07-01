import { inject } from 'inversify';
import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import CreateOfferDto from './dto/create-offer.dto';
import UpdateOfferDto from './dto/update-offer.dto';
import ExactOfferResponse from './response/exact-offer.response.js';
import OfferResponse from './response/offer.response.js';
import { fillDTO } from '../../utils/common.js';

import type { LoggerInterface } from '../../common/logger/logger.interface.js';
import type { OfferServiceInterface } from './offer-service.interface.js';

type ParamsGetOffer = {
  offerId: string;
};

export default class OfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.OfferServiceInterface)
    private offerService: OfferServiceInterface
  ) {
    super(logger);

    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
    });
  }

  public async index(_req: Request, res: Response) {
    const offers = await this.offerService.find();
    this.ok(res, fillDTO(OfferResponse, offers));
  }

  public async create(
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      CreateOfferDto
    >,
    res: Response
  ) {
    const result = await this.offerService.create(req.body);
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
    const offer = await this.offerService.deleteById(params.offerId);
    this.noContent(res, offer);
  }

  public async show(
    { params }: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ) {
    const offer = await this.offerService.findById(params.offerId);
    this.created(res, fillDTO(ExactOfferResponse, offer));
  }
}
