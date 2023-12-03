import { SubscriptionDataType } from '../../type/data/subscription.type';
import { IResponse } from './base-response.type';

export interface ISubscriptionGetResponse extends IResponse {
  subscriptions: SubscriptionDataType[];
}

export interface ISubscriptionSaveResponse extends IResponse {
  subscription: SubscriptionDataType;
}

export interface ISubscriptionDeleteResponse extends IResponse {
  subscription: SubscriptionDataType;
}
