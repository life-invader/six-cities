import { UserType } from './user.type';

export type CommentType = {
  text: string;
  date: Date;
  rating: number;
  author: UserType;
}
