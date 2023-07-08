import { Container } from 'inversify';
import { Component } from '../../types/component.types.js';
import { CommentModel } from './comment.entity.js';
import CommentService from './comment.service.js';
import CommentController from './comment.controller.js';

const commentContainer = new Container({ defaultScope: 'Singleton' });
commentContainer.bind(Component.CommentServiceInterface).to(CommentService);
commentContainer.bind(Component.CommentController).to(CommentController);
commentContainer.bind(Component.CommentModel).toConstantValue(CommentModel);

export { commentContainer };
