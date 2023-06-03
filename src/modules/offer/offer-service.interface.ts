import { DocumentType } from '@typegoose/typegoose';
import CreateOfferDto from './dto/create-offer.dto';
import UpdateOfferDto from './dto/update-offer.dto';
import { OfferEntity } from './offer.entity';

export interface OfferServiceInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(limit?: number): Promise<DocumentType<OfferEntity>[]>,
  deleteById(id: string): Promise<DocumentType<OfferEntity> | null>,
  updateById(id: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>,
  incCommentCount(id: string): Promise<DocumentType<OfferEntity> | null>,
  exists(id: string): Promise<boolean>,
}
