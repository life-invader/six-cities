import DatabaseService from '../common/database-client/database.service.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import ConsoleLoggerService from '../common/logger/console-logger.service.js';
import { createOffer } from '../utils/common.js';
import { getURI } from '../utils/db.js';
import { RentalOfferType } from '../types/rental-offer.type.js';
import { OfferModel } from '../modules/offer/offer.entity.js';
import { UserModel } from '../modules/user/user.entity.js';
import OfferService from '../modules/offer/offer.service.js';
import UserService from '../modules/user/user.service.js';

import type { LoggerInterface } from '../common/logger/logger.interface.js';
import type { OfferServiceInterface } from '../modules/offer/offer-service.interface.js';
import type { DatabaseInterface } from '../common/database-client/database.interface.js';
import type { CliCommandInterface } from './cli-command.interface';
import type { UserServiceInterface } from '../modules/user/user-service.interface.js';

const DEFAULT_DB_PORT = 27017;
const DEFAULT_USER_PASSWORD = 'qwerty';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private salt!: string;
  private logger: LoggerInterface;
  private databaseService: DatabaseInterface;
  private offerService: OfferServiceInterface;
  private userService: UserServiceInterface;

  constructor() {
    this.logger = new ConsoleLoggerService();
    this.databaseService = new DatabaseService(this.logger);
    this.offerService = new OfferService(this.logger, OfferModel);
    this.userService = new UserService(this.logger, UserModel);

    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);
  }

  private async onLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    this.logger.info('Offer created', offer);
    await this.saveOffer(offer);
    resolve();
  }

  private onComplete(count: number) {
    this.logger.info(`${count} rows completed.`);
    this.databaseService.disconnect();
  }

  public async execute(
    filename: string,
    login: string,
    password: string,
    host: string,
    dbname: string,
    salt: string
  ) {
    this.salt = salt;

    const uri = getURI(login, password, host, DEFAULT_DB_PORT, dbname);
    await this.databaseService.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      fileReader.read();
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      this.logger.error(
        `Не удалось импортировать данные из файла по причине: «${err.message}»`
      );
    }
  }

  async saveOffer(offer: RentalOfferType) {
    const user = await this.userService.findOrCreate(
      {
        ...offer.author,
        password: DEFAULT_USER_PASSWORD,
      },
      this.salt
    );

    await this.offerService.create({ ...offer, author: user.id });
  }
}
