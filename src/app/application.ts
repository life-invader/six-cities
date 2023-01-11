import { inject, injectable } from 'inversify';
import { Component } from '../types/component.types.js';
import ConfigService from '../common/config/config.service.js';

import type { LoggerInterface } from '../common/logger/logger.interface';

@injectable()
export default class Application {
  private logger!: LoggerInterface;
  private config!: ConfigService;

  constructor(@inject(Component.LoggerInterface) logger: LoggerInterface, @inject(Component.ConfigInterface) config: ConfigService) {
    this.logger = logger;
    this.config = config;
  }

  public async init() {
    this.logger.info('Application initialization...');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    this.logger.info(`Get value from env $PORT: ${this.config.get('SALT')}`);
    this.logger.info(`Get value from env $PORT: ${this.config.get('DB_HOST')}`);
  }
}
