import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { OfferCity } from '../../types/city.type.js';
import { UserEntity } from '../user/user.entity.js';
import { HousingType } from '../../types/housing.type.js';
import { AmenitiesType } from '../../types/amenities.type.js';
import type { CoordsType } from '../../types/coords.type';

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({ schemaOptions: { collection: 'offers' } })
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
    trim: true,
    minlength: [10, 'Слишком короткое наименование'],
    maxlength: [100, 'Наименование слишком длинное'],
  })
  public title!: string;

  @prop({
    required: true,
    trim: true,
    minlength: [20, 'Слишком короткое описание'],
    maxlength: [1024, 'Описание слишком длинное'],
  })
  public description!: string;

  @prop({
    required: true,
  })
  public date!: Date;

  @prop({
    required: true,
    enum: OfferCity,
  })
  public city!: OfferCity;

  @prop({
    required: true,
  })
  public image!: string;

  @prop({
    required: true,
  })
  public photos!: string[];

  @prop({
    required: true,
    default: false,
  })
  public isPremium!: boolean;

  @prop({
    required: true,
  })
  public rating!: number;

  @prop({
    required: true,
    enum: HousingType,
  })
  public housingType!: HousingType;

  @prop({
    required: true,
    min: 1,
    max: 8,
  })
  public numberOfRooms!: number;

  @prop({
    required: true,
    min: 1,
    max: 10,
  })
  public numberOfGuests!: number;

  @prop({
    required: true,
    min: 100,
    max: 100000,
  })
  public price!: number;

  @prop({
    type: () => String,
    required: true,
    enum: AmenitiesType,
  })
  public amenities!: AmenitiesType[];

  @prop({
    required: true,
    ref: UserEntity,
  })
  public author!: Ref<UserEntity>;

  @prop({
    default: 0,
  })
  public numberOfComments!: number;

  @prop({
    required: true,
  })
  public coords!: CoordsType;
}

export const OfferModel = getModelForClass(OfferEntity);
