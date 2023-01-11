import type { AmenitiesType } from '../types/amenities.type';
import type { CoordsType } from '../types/coords.type';
import type { HousingType } from '../types/housing.type';
import type { RentalOfferType } from '../types/rental-offer.type';

export const createOffer = (row: string): RentalOfferType => {
  const tokens = row.replaceAll('\n', '').split('\t');
  const [title, description, date, city, image, photos, isPremium, rating, housingType, numberOfRooms, numberOfGuests, price, amenities, userId, numberOfComments, lat, long] = tokens;

  return {
    title,
    description,
    date: new Date(date),
    city,
    image,
    photos: photos.split(';'),
    isPremium: Boolean(isPremium),
    rating: Number(rating),
    housingType: housingType as HousingType,
    numberOfRooms: Number(numberOfRooms),
    numberOfGuests: Number(numberOfGuests),
    price: Number(price),
    amenities: amenities.split(';') as AmenitiesType[],
    author: Number(userId),
    numberOfComments: Number(numberOfComments),
    coords: {
      lat: Number(lat),
      long: Number(long),
    } as CoordsType,
  };
};

export const getErrorMessage = (error: unknown) => error instanceof Error ? error.message : '';
