import { Container } from 'inversify';
import { Component } from '../../types/component.types.js';
import { OfferModel } from './offer.entity.js';
import OfferController from './offer.controller.js';
import OfferService from './offer.service.js';

const offerContainer = new Container({ defaultScope: 'Singleton' });
offerContainer.bind(Component.OfferServiceInterface).to(OfferService);
offerContainer.bind(Component.OfferController).to(OfferController);
offerContainer.bind(Component.OfferModel).toConstantValue(OfferModel);

export { offerContainer };
