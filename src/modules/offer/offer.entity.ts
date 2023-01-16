import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { CoordsType } from "../../types/coords.type";
import { UserEntity } from "../user/user.entity";

export interface OfferEntity extends defaultClasses.Base { };

@modelOptions({ schemaOptions: { collection: 'offers' } })
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
    trim: true,
    minlength: [10, 'Слишком короткое наименование'],
    maxlength: [100, 'Наименование слишком длинное'],
  })
  public title!: string[];

  @prop({
    required: true,
    trim: true,
    minlength: [20, 'Слишком короткое описание'],
    maxlength: [1024, 'Описание слишком длинное'],
  })
  public description!: string[];

  @prop({
    required: true,
  })
  public postDate!: Date;

  @prop({
    required: true
  })
  public city!: string;

  @prop({
    required: true
  })
  public image!: string;

  @prop({
    required: true
  })
  public photos!: string[];

  @prop({
    required: true
  })
  public isPremium!: boolean;

  @prop({
    required: true
  })
  public rating!: number;

  @prop({
    required: true
  })
  public housingType!: string;

  @prop({
    required: true,
    minlength: 1,
    maxlength: 8,
  })
  public numberOfRooms!: number;

  @prop({
    required: true,
    minlength: 1,
    maxlength: 10,
  })
  public numberOfGuests!: number;

  @prop({
    required: true,
    minlength: 100,
    maxlength: 100000,
  })
  public price!: number;

  @prop({
    required: true,
  })
  public amenities!: string[];

  @prop({
    required: true,
    ref: UserEntity
  })
  public author!: Ref<UserEntity>;

  @prop({
    required: true,
  })
  public numberOfComments!: number;

  @prop({
    required: true,
  })
  public coords!: CoordsType;
}

export const OfferModel = getModelForClass(OfferEntity);
