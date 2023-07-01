import {
  prop,
  defaultClasses,
  modelOptions,
  getModelForClass,
} from '@typegoose/typegoose';
import { createSHA256 } from '../../utils/common.js';
import type { UserType } from '../../types/user.type';
import type { UserAccountType } from '../../types/user-account.type.js';

const { TimeStamps } = defaultClasses;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({ schemaOptions: { collection: 'users' } })
export class UserEntity extends TimeStamps implements UserType {
  constructor(data: UserType) {
    super();

    this.email = data.email;
    this.avatar = data.avatar;
    this.name = data.name;
    this.type = data.type;
  }

  @prop({
    required: true,
    minlength: [1, 'Слишком короткое имя'],
    maxlength: [15, 'Имя больше 15 символов'],
    trim: true,
  })
  public name!: string;

  @prop({
    required: true,
    unique: true,
    trim: true,
  })
  public email!: string;

  @prop({
    default: 'default-avatar.jpg',
    trim: true,
  })
  public avatar?: string;

  @prop({
    required: true,
  })
  public password!: string;

  @prop({
    default: 'standard',
    enum: ['standard', 'pro'],
  })
  public type!: UserAccountType;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
