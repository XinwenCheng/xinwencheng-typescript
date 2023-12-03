import { ISubscriptionData } from '../../type/data/subscription.type';
import { IBaseResponseData } from './base-response.type';

export interface ISubscriptionGetResponse extends IBaseResponseData {
  subscriptions: ISubscriptionData[];
}

export interface ISubscriptionSaveResponse extends IBaseResponseData {
  subscription: ISubscriptionData;
}

export interface ISubscriptionDeleteResponse extends IBaseResponseData {
  subscription: ISubscriptionData;
}
