import type { AmenitiesType } from '../../../types/amenities.type';
import type { CoordsType } from '../../../types/coords.type';
import type { HousingType } from '../../../types/housing.type';

export default class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public date?: Date;
  public city?: string;
  public image?: string;
  public photos?: string[];
  public isPremium?: boolean;
  public housingType?: HousingType;
  public numberOfRooms?: number;
  public numberOfGuests?: number;
  public price?: number;
  public amenities?: AmenitiesType[];
  public coords?: CoordsType;
}
