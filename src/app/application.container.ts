import { Container } from 'inversify';
import { Component } from '../types/component.types.js';
import Application from './application.js';
import ConfigService from '../common/config/config.service.js';
import LoggerService from '../common/logger/logger.service.js';
import DatabaseService from '../common/database-client/database.service.js';
import ExceptionFilter from '../common/errors/exception-filter.js';

const appContainer = new Container({ defaultScope: 'Singleton' });

appContainer.bind(Component.Application).to(Application);
appContainer.bind(Component.ConfigInterface).to(ConfigService);
appContainer.bind(Component.LoggerInterface).to(LoggerService);
appContainer.bind(Component.DatabaseInterface).to(DatabaseService);
appContainer.bind(Component.ExceptionFilterInterface).to(ExceptionFilter);

export { appContainer };
