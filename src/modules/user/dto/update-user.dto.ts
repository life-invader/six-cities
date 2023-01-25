export default class UpdateUserDto {
  public name?: string;
  public email?: string;
  public avatar?: string;
  public type?: 'standard' | 'pro';
}
