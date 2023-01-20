import { Container } from 'inversify';
import { Component } from '../types/component.types';
import Application from './application.ts';
import ConfigService from '../common/config/config.service';
import LoggerService from '../common/logger/logger.service';
import DatabaseService from '../common/database-client/database.service';

const appContainer = new Container({ defaultScope: 'Singleton' });

appContainer.bind(Component.Application).to(Application);
appContainer.bind(Component.ConfigInterface).to(ConfigService);
appContainer.bind(Component.LoggerInterface).to(LoggerService);
appContainer.bind(Component.DatabaseInterface).to(DatabaseService);

export { appContainer };
