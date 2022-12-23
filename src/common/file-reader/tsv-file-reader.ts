import { readFileSync } from 'fs';
import { AmenitiesType } from '../../types/amenities.type';
import { CoordsType } from '../../types/coords.type';
import { HousingType } from '../../types/housing.type';
import { RentalOfferType } from '../../types/rental-offer.type';
import { UserType } from '../../types/user.type';
import { FileReaderInterface } from './file-reader.interface';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): RentalOfferType[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([title, description, date, city, image, photos, isPremium, rating, housingType, numberOfRooms, numberOfGuests, price, amenities, name, email, avatar, password, type, numberOfComments, lat, long]) => ({
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
        author: {
          name,
          email,
          avatar,
          password,
          type
        } as UserType,
        numberOfComments: Number(numberOfComments),
        coords: {
          lat: Number(lat),
          long: Number(long),
        } as CoordsType,
      }));
  }
}
