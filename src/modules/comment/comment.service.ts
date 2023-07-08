import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { CommentEntity } from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import { Component } from '../../types/component.types.js';

import type { CommentServiceInterface } from './comment-service.interface';
import { SortType } from '../../types/sort-type.enum.js';

@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Component.CommentModel)
    private commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(
    dto: CreateCommentDto
  ): Promise<DocumentType<CommentEntity>> {
    const comment = (await this.commentModel.create(dto)).populate('userId');
    return comment;
  }

  public async findByOfferId(
    offerId: string,
    limit?: number
  ): Promise<DocumentType<CommentEntity>[]> {
    const commentLimit = limit && limit <= 50 ? limit : 50;
    return this.commentModel
      .find({ offerId })
      .sort({createdAt: SortType.Up})
      .limit(commentLimit)
      .populate('userId');
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel.deleteMany({ offerId }).exec();

    return result.deletedCount;
  }
}
