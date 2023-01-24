import 'reflect-metadata';
import { Container } from 'inversify';
import { Component } from './types/component.types.js';
import { appContainer } from './app/application.container.js';
import { userContainer } from './modules/user/user.container.js';
import { offerContainer } from './modules/offer/offer.container.js';
import { commentContainer } from './modules/comment/comment.container.js';
import Application from './app/application.js';


const mainContainer = Container.merge(appContainer, userContainer, offerContainer, commentContainer);

const application = mainContainer.get<Application>(Component.Application);
await application.init();
