import { IsMongoId, IsNumber, IsString, Length } from 'class-validator';

export default class CreateCommentDto {
  @IsString({ message: 'Comment text must be string' })
  @Length(5, 1024, {
    message: 'Comment length must be in between 5 and 1024 symbols',
  })
  public text!: string;

  @IsNumber({}, { message: 'Rating must be number' })
  public rating!: number;

  @IsMongoId({message: 'Invalid offer id'})
  public offerId!: string;

  @IsMongoId({message: 'Invalid user id'})
  public userId!: string;
}
