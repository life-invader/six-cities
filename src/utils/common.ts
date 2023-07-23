import crypto from 'crypto';
import * as jose from 'jose';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { ServiceError } from '../types/service.error.enum';
import { DEFAULT_STATIC_IMAGES } from '../app/application.constant.js';

import type { AmenitiesType } from '../types/amenities.type';
import type { CoordsType } from '../types/coords.type';
import type { HousingType } from '../types/housing.type';
import type { RentalOfferType } from '../types/rental-offer.type';
import type { UserType } from '../types/user.type';
import type { UserAccountType } from '../types/user-account.type';
import type { ValidationErrorType } from '../types/validation-error.type';
import type { UnknownObject } from '../types/unknown-object.type';

export const createOffer = (row: string): RentalOfferType => {
  const tokens = row.replaceAll('\n', '').split('\t');
  const [
    title,
    description,
    date,
    city,
    image,
    photos,
    isPremium,
    rating,
    housingType,
    numberOfRooms,
    numberOfGuests,
    price,
    amenities,
    name,
    email,
    avatar,
    type,
    numberOfComments,
    lat,
    long,
  ] = tokens;

  const author: UserType = {
    name,
    email,
    avatar,
    type: type as UserAccountType,
  };

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
    author,
    numberOfComments: Number(numberOfComments),
    coords: {
      lat: Number(lat),
      long: Number(long),
    } as CoordsType,
  };
};

export const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(dto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(dto, plainObject, { excludeExtraneousValues: true });

export const createErrorObject = (
  serviceError: ServiceError,
  message: string,
  details: ValidationErrorType[] = []
) => ({
  errorType: serviceError,
  message,
  details: [...details],
});

export const createJWT = async (
  algorithm: string,
  jwtSecret: string,
  payload: jose.JWTPayload
) =>
  await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: algorithm })
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));

export const transformErrors = (
  errors: ValidationError[]
): ValidationErrorType[] =>
  errors.map(({ property, value, constraints }) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : [],
  }));

export const getFullServerPath = (host: string, port: number) =>
  `http://${host}:${port}`;

const isObject = (value: unknown) =>
  typeof value === 'object' && value !== null;

export const transformProperty = (
  property: string,
  someObject: UnknownObject,
  transformFn: (object: UnknownObject) => void
) => {
  Object.keys(someObject).forEach((key) => {
    if (key === property) {
      transformFn(someObject);
    } else if (isObject(someObject[key])) {
      transformProperty(
        property,
        someObject[key] as UnknownObject,
        transformFn
      );
    }
  });
};

export const transformObject = (
  properties: string[],
  staticPath: string,
  uploadPath: string,
  data: UnknownObject
) => {
  properties.forEach((property) =>
    transformProperty(property, data, (target: UnknownObject) => {
      const rootPath = DEFAULT_STATIC_IMAGES.includes(
        target[property] as string
      )
        ? staticPath
        : uploadPath;
      target[property] = `${rootPath}/${target[property]}`;
    })
  );
};
