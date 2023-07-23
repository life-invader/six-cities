import { inject, injectable } from 'inversify';
import { types } from '@typegoose/typegoose';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import LoginUserDto from './dto/login-user.dto';
import { UserEntity } from './user.entity.js';
import { Component } from '../../types/component.types.js';
import { DEFAULT_AVATAR_FILE_NAME } from './user.constant.js';

import type { UserServiceInterface } from './user-service.interface';
import type { LoggerInterface } from '../../common/logger/logger.interface';

@injectable()
export default class UserService implements UserServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.UserModel) private userModel: types.ModelType<UserEntity>
  ) {}

  public async create(dto: CreateUserDto, salt: string) {
    const user = new UserEntity({ ...dto, avatar: DEFAULT_AVATAR_FILE_NAME });
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findOrCreate(dto: CreateUserDto, salt: string) {
    const existingUser = await this.findByEmail(dto.email);

    if (existingUser) {
      return existingUser;
    }

    return this.create(dto, salt);
  }

  public async updateById(userId: string, dto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(userId, dto, { new: true }).exec();
  }

  public async exists(userId: string) {
    return (await this.userModel.exists({ _id: userId })) !== null;
  }

  public async verifyUser(userDTO: LoginUserDto, salt: string) {
    const user = await this.userModel.findOne({ email: userDTO.email });

    if (!user) {
      return null;
    }

    const isVerified = user.verifyPassword(userDTO.password, salt);

    if (isVerified) {
      return user;
    }

    return null;
  }
}
