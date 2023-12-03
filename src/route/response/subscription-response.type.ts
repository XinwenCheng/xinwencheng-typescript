import { ISubscriptionData } from '../../type/data/subscription.type';
import { IResponse } from './base-response.type';

export interface ISubscriptionGetResponse extends IResponse {
  subscriptions: ISubscriptionData[];
}

export interface ISubscriptionSaveResponse extends IResponse {
  subscription: ISubscriptionData;
}

export interface ISubscriptionDeleteResponse extends IResponse {
  subscription: ISubscriptionData;
}
