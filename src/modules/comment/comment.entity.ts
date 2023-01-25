import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/offer.entity.js';
import { UserEntity } from '../user/user.entity.js';

export interface CommentEntity extends defaultClasses.Base { }

@modelOptions({ schemaOptions: { collection: 'comments' } })
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({
    trim: true,
    minlength: [5, 'Комментарий короче 5 символов'],
    maxlength: [1024, 'Макс. длина комментария 1024 символа'],
  })
  public text!: string;

  @prop()
  public rating!: number;

  @prop({ ref: UserEntity })
  public userId!: Ref<UserEntity>;

  @prop({ ref: OfferEntity })
  public offerId!: Ref<OfferEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
