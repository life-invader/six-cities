import { Expose } from 'class-transformer';
import type { HousingType } from '../../../types/housing.type.js';

export default class OfferResponse {
  @Expose()
  public title!: string;

  @Expose()
  public date!: Date;

  @Expose()
  public city!: string;

  @Expose()
  public image!: string;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public housingType!: HousingType;

  @Expose()
  public price!: number;

  @Expose()
  public numberOfComments!: number;
}
