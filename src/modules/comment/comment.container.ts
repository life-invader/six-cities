import { Container } from 'inversify';
import { Component } from '../../types/component.types.js';
import { CommentModel } from './comment.entity.js';
import CommentService from './comment.service.js';

const commentContainer = new Container({ defaultScope: 'Singleton' });
commentContainer.bind(Component.CommentServiceInterface).to(CommentService);
commentContainer.bind(Component.CommentModel).toConstantValue(CommentModel);

export { commentContainer };
