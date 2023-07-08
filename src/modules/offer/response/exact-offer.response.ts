import { Expose, Type } from 'class-transformer';
import UserResponse from '../../user/response/user.response.js';

import type { HousingType } from '../../../types/housing.type.js';
import type { AmenitiesType } from '../../../types/amenities.type.js';
import type { CoordsType } from '../../../types/coords.type.js';

export default class ExactOfferResponse {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public date!: Date;

  @Expose()
  public city!: string;

  @Expose()
  public image!: string;

  @Expose()
  public photos!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public housingType!: HousingType;

  @Expose()
  public numberOfRooms!: number;

  @Expose()
  public numberOfGuests!: number;

  @Expose()
  public price!: number;

  @Expose()
  public amenities!: AmenitiesType[];

  @Expose()
  public numberOfComments!: number;

  @Expose()
  public coords!: CoordsType;

  @Expose()
  @Type(() => UserResponse)
  public author!: string;
}
