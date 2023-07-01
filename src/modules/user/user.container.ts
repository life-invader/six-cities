import { Container } from 'inversify';
import { Component } from '../../types/component.types.js';
import { UserModel } from './user.entity.js';
import UserController from './user.controller.js';
import UserService from './user.service.js';

const userContainer = new Container({ defaultScope: 'Singleton' });
userContainer.bind(Component.UserServiceInterface).to(UserService);
userContainer.bind(Component.UserController).to(UserController);
userContainer.bind(Component.UserModel).toConstantValue(UserModel);

export { userContainer };
