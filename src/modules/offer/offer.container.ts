import { Container } from 'inversify';
import { Component } from '../../types/component.types.js';
import { OfferModel } from './offer.entity.js';
import OfferService from './offer.service.js';

const offerContainer = new Container({ defaultScope: 'Singleton' });
offerContainer.bind(Component.UserModel).toConstantValue(OfferModel);
offerContainer.bind(Component.UserServiceInterface).to(OfferService);

export { offerContainer };
