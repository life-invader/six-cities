import { IsNumber } from 'class-validator';
import type { CoordsType } from '../../../types/coords.type';

export class Coords implements CoordsType {
  @IsNumber({}, { message: 'Rating must be number' })
    lat!: number;

  @IsNumber({}, { message: 'Rating must be number' })
    long!: number;
}
