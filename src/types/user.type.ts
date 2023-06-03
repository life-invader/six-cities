export type UserType = {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  type: 'standard' | 'pro';
}
