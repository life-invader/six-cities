import mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../logger/logger.interface';
import { DatabaseInterface } from './database.interface';
import { Component } from '../../types/component.types.js';
// import { UserModel } from '../../modules/user/user.entity';

@injectable()
export default class DatabaseService implements DatabaseInterface {
  constructor(@inject(Component.LoggerInterface) private logger: LoggerInterface) { }

  async connect(uri: string) {
    this.logger.info('Connecting to MongoDB...');
    await mongoose.connect(uri);
    this.logger.info('MongoDB connected');

    // const newUser = new UserModel({ email: 'email@ya.ru', password: 'sdfsdf', name: ' Alex', type: 'pro' });
    // await newUser.save();

    // const users = await UserModel.find();
    // console.log(users);
  }

  async disconnect() {
    await mongoose.disconnect();
    this.logger.info('MongoDB disconnected');
  }
}
