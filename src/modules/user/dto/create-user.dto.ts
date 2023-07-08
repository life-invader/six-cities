import { IsEmail, IsEnum, IsString, IsUrl, Length, MaxLength, MinLength } from 'class-validator';
import { UserAccountType } from '../../../types/user-account.type.js';

export default class CreateUserDto {
  @MinLength(1, { message: 'Minimum name length must be 1' })
  @MaxLength(15, { message: 'Maximum title length must be 15' })
  public name!: string;

  @IsEmail({}, {message: 'Invalid email'})
  public email!: string;

  @IsUrl({}, { message: 'Invalid avatar link' })
  public avatar?: string;

  @IsString({message: 'Password is required'})
  @Length(6, 12, {message: 'Min length for password is 6, max is 12'})
  public password!: string;

  @IsEnum(UserAccountType, {
    message:
      'User type must be Standard of Pro',
  })
  public type!: UserAccountType;
}
