import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { AmenitiesType } from '../../../types/amenities.type.js';
import { HousingType } from '../../../types/housing.type.js';
import { OfferCity } from '../../../types/city.type.js';
import { Coords } from './coordinates.dto.js';

export default class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: 'Minimum title length must be 10' })
  @MaxLength(100, { message: 'Maximum title length must be 100' })
  public title!: string;

  @IsOptional()
  @MinLength(10, { message: 'Minimum description length must be 10' })
  @MaxLength(1024, { message: 'Maximum description length must be 1024' })
  public description!: string;

  @IsOptional()
  @IsEnum(OfferCity, {
    message:
      'City must be one of this list: Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf',
  })
  public city!: OfferCity;

  @IsOptional()
  @IsUrl({}, { message: 'Invalid image link' })
  public image!: string;

  @IsOptional()
  @IsArray({ message: 'Photos must be an array' })
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  @IsUrl({}, { message: 'Invalid image link', each: true })
  public photos!: string[];

  @IsOptional()
  @IsBoolean({ message: 'Value must be Boolean: true or false' })
  public isPremium!: boolean;

  @IsOptional()
  @IsNumber({}, { message: 'Rating must be number' })
  @Min(1, { message: 'Rating cant be below 1' })
  @Max(5, { message: 'Rating cant be above 5' })
  public rating!: number;

  @IsOptional()
  @IsEnum(HousingType, {
    message:
      'Housing type must be one of this list: Apartment, house, room of hotel',
  })
  public housingType!: HousingType;

  @IsOptional()
  @IsNumber({}, { message: 'Number of rooms must be a number' })
  @Min(1, { message: 'Number of rooms cant be below 1' })
  @Max(8, { message: 'Number of rooms cant be above 8' })
  public numberOfRooms!: number;

  @IsOptional()
  @IsNumber({}, { message: 'Number of guests must be a number' })
  @Min(1, { message: 'Number of guests cant be below 1' })
  @Max(10, { message: 'Number of guests cant be above 10' })
  public numberOfGuests!: number;

  @IsOptional()
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(100, { message: 'Minimum price is 100' })
  @Max(200000, { message: 'Maximum price is 100000' })
  public price!: number;

  @IsOptional()
  @IsArray({ message: 'Amenities must be an array' })
  @IsEnum(AmenitiesType, {
    each: true,
    message:
      'Amenities type must be one of this list: Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels, Fridge',
  })
  @ArrayMinSize(1)
  @ArrayMaxSize(7)
  public amenities!: AmenitiesType[];

  @IsOptional()
  @ValidateNested({ message: 'invalid coordinates' })
  public coords!: Coords;
}
