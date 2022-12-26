import dayjs from 'dayjs';
import { getRandomItem, generateRandomValue } from '../../utils/random.js';

import type { MockDataType } from '../../types/mock-data.type';
import type { OfferGeneratorInterface } from './offer-generator.interface';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockDataType) { }

  public generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.description);
    const date = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem(this.mockData.city);
    const image = getRandomItem(this.mockData.image);
    const photos = getRandomItem(this.mockData.photos).join(';');
    const isPremium = getRandomItem([true, false]);
    const rating = generateRandomValue(0, 5, 1);
    const housingType = getRandomItem(this.mockData.housingType);
    const numberOfRooms = generateRandomValue(1, 8);
    const numberOfGuests = generateRandomValue(1, 10);
    const price = generateRandomValue(100, 100000);
    const amenities = getRandomItem(this.mockData.amenities);
    const numberOfComments = generateRandomValue(0, 150);
    const coords = `${generateRandomValue(100, 999, 3)}\t${generateRandomValue(100, 999, 3)}`;
    const userId = generateRandomValue(1, 100000);

    return [title, description, date, city, image, photos, isPremium, rating, housingType, numberOfRooms, numberOfGuests, price, amenities, userId, numberOfComments, coords].join('\t');
  }
}
