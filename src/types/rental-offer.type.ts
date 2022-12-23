import { AmenitiesType } from './amenities.type';
import { CoordsType } from './coords.type';
import { HousingType } from './housing.type';
import { UserType } from './user.type';

export type RentalOfferType = {
  title: string;
  description: string;
  date: Date;
  city: string;
  image: string;
  photos: string[];
  isPremium: boolean;
  rating: number;
  housingType: HousingType;
  numberOfRooms: number;
  numberOfGuests: number;
  price: number;
  amenities: AmenitiesType[];
  author: UserType;
  numberOfComments: number;
  coords: CoordsType;
}
