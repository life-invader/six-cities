import { inject, injectable } from 'inversify';
import { types } from '@typegoose/typegoose';
import CreateOfferDto from './dto/create-offer.dto';
import UpdateOfferDto from './dto/update-offer.dto';
import { OfferEntity } from './offer.entity.js';
import { Component } from '../../types/component.types.js';
import { DEFAULT_OFFER_COUNT } from './offer.constant.js';
import { SortType } from '../../types/sort-type.enum.js';

import type { LoggerInterface } from '../../common/logger/logger.interface';
import type { OfferServiceInterface } from './offer-service.interface';

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.OfferModel)
    private offerModel: types.ModelType<OfferEntity>
  ) {}

  async create(dto: CreateOfferDto) {
    const result = (await this.offerModel.create(dto)).populate('author');
    this.logger.info('Offer created!');

    return result;
  }

  async findById(offerId: string) {
    return this.offerModel.findById(offerId).populate('author').exec();
  }

  async find(count?: number) {
    const limit = count || DEFAULT_OFFER_COUNT;
    return this.offerModel
      .find()
      .sort({ createdAt: SortType.Down })
      .limit(limit)
      .exec();
  }

  async deleteById(id: string) {
    return this.offerModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: UpdateOfferDto) {
    return this.offerModel
      .findByIdAndUpdate(id, dto, { new: true })
      .populate('author')
      .exec();
  }

  async incCommentCount(id: string) {
    return this.offerModel
      .findByIdAndUpdate(id, {
        $inc: {
          numberOfComments: 1,
        },
      })
      .exec();
  }

  public async exists(id: string) {
    return (await this.offerModel.exists({ _id: id })) !== null;
  }

  public async isMine(userId: string, offerId: string) {
    const offer = await this.offerModel.findById(offerId);
    return offer?.author._id.toString() === userId;
  }
}
