import 'reflect-metadata';
import { Container } from 'inversify';
import { Component } from './types/component.types.js';
import { appContainer } from './app/application.container.js';
import { userContainer } from './modules/user/user.container.js';
import { offerContainer } from './modules/offer/offer.container.js';
import Application from './app/application.js';


const mainContainer = Container.merge(appContainer, userContainer, offerContainer);

const application = mainContainer.get<Application>(Component.Application);
await application.init();
