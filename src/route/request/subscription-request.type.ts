import { SubscriptionDataType } from '../../type/data/subscription.type';
import { IGetRequest, IRequest } from './base-request.type';

export interface ISubscriptionGetRequest extends IGetRequest {
  ids: string[];
}

export interface ISubscriptionSaveRequest extends IRequest {
  subscription: SubscriptionDataType;
}

export interface ISubscriptionDeleteRequest extends IRequest {
  id: string;
}
