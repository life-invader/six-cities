import 'reflect-metadata';
import { Container } from 'inversify';
import { Component } from './types/component.types.js';
import Application from './app/application.js';
import ConfigService from './common/config/config.service.js';
import LoggerService from './common/logger/logger.service.js';

const appContainer = new Container();
appContainer.bind(Component.Application).to(Application).inSingletonScope();
appContainer.bind(Component.ConfigInterface).to(ConfigService).inSingletonScope();
appContainer.bind(Component.LoggerInterface).to(LoggerService).inSingletonScope();

const application = appContainer.get<Application>(Component.Application);
application.init();
