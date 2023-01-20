import { inject, injectable } from "inversify";
import { types } from "@typegoose/typegoose";
import CreateUserDto from "./dto/create-user.dto";
import { UserEntity } from "./user.entity.js";
import { Component } from "../../types/component.types.js";

import type { UserServiceInterface } from "./user-service.interface";
import type { LoggerInterface } from "../../common/logger/logger.interface";

@injectable()
export default class UserService implements UserServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.UserModel) private userModel: types.ModelType<UserEntity>
  ) { }

  public async create(dto: CreateUserDto, salt: string) {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user)
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  };

  async findOrCreate(dto: CreateUserDto, salt: string) {
    const existingUser = await this.findByEmail(dto.email);

    if (existingUser) {
      return existingUser;
    }

    return this.create(dto, salt);
  }
}
