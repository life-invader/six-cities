import { Container } from "inversify";
import { Component } from "../../types/component.types";
import { OfferModel } from "./offer.entity";
import OfferService from "./offer.service";

const offerContainer = new Container();
offerContainer.bind(Component.UserModel).toConstantValue(OfferModel);
offerContainer.bind(Component.UserServiceInterface).to(OfferService)

export { offerContainer }
