import { prop, defaultClasses, modelOptions, getModelForClass } from '@typegoose/typegoose';
import { createSHA256 } from '../../utils/common';
import type { UserType } from '../../types/user.type';

const { TimeStamps } = defaultClasses;

export interface UserEntity extends defaultClasses.Base { }

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
    min: [1, 'Слишком короткое имя'],
    max: [15, 'Имя больше 15 символов'],
    trim: true,
  })
  public name!: string;

  @prop({
    required: true,
    unique: true,
  })
  public email!: string;

  @prop({
    type: String,
    default: 'default-avatar.jpg'
  })
  public avatar!: string;

  @prop({
    required: true,
    min: [6, 'Длина пароля менее 6 символов'],
    max: [12, 'Длина пароля более 12 символов'],
  })
  public password!: string;

  @prop({
    default: 'standard',
    enum: ['standard', 'pro'],
  })
  public type!: 'standard' | 'pro';

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
