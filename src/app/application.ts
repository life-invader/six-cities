import { inject, injectable } from 'inversify';
import { Component } from '../types/component.types.js';
import ConfigService from '../common/config/config.service.js';
import DatabaseService from '../common/database-client/database.service.js';

import type { LoggerInterface } from '../common/logger/logger.interface';
import { getURI } from '../utils/db.js';

@injectable()
export default class Application {

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigService,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseService
  ) { }

  public async init() {
    this.logger.info('Application initialization...');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    this.logger.info(`Get value from env $PORT: ${this.config.get('SALT')}`);
    this.logger.info(`Get value from env $PORT: ${this.config.get('DB_HOST')}`);

    const uri = getURI(this.config.get('DB_USER'), this.config.get('DB_PASSWORD'), this.config.get('DB_HOST'), this.config.get('DB_PORT'), this.config.get('DB_NAME'));
    await this.databaseClient.connect(uri);
  }
}
