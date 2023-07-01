import type { UserAccountType } from './user-account.type';

export type UserType = {
  name: string;
  email: string;
  avatar?: string;
  type: UserAccountType;
};
