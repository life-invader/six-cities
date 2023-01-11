import { config } from 'dotenv';
import { inject, injectable } from 'inversify';
import { configSchema, type ConfigSchemaType } from './config.schema.js';
import { Component } from '../../types/component.types.js';

import type { LoggerInterface } from '../logger/logger.interface';
import type { ConfigInterface } from './config.interface';

@injectable()
export default class ConfigService implements ConfigInterface {
  private logger: LoggerInterface;
  private config: ConfigSchemaType;

  constructor(@inject(Component.LoggerInterface) logger: LoggerInterface) {
    this.logger = logger;

    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    configSchema.load({});
    configSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configSchema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  public get<T extends keyof ConfigSchemaType>(key: T) {
    return this.config[key];
  }
}
