import { IsEmail, IsString } from 'class-validator';

export default class LoginUserDto {
  @IsEmail({}, {message: 'Invalid email'})
  public email!: string;

  @IsString({message: 'Password is required'})
  public password!: string;
}
