import 'reflect-metadata';
import { Container } from 'inversify';
import { Component } from './types/component.types.js';
import Application from './app/application.js';
import ConfigService from './common/config/config.service.js';
import LoggerService from './common/logger/logger.service.js';

const appContainer = new Container({ defaultScope: 'Singleton' });
appContainer.bind(Component.Application).to(Application);
appContainer.bind(Component.ConfigInterface).to(ConfigService);
appContainer.bind(Component.LoggerInterface).to(LoggerService);

const application = appContainer.get<Application>(Component.Application);
application.init();
