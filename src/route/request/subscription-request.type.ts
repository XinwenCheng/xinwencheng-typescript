import { ISubscriptionData } from '../../type/data/subscription.type';
import { IGetRequest, IRequest } from './base-request.type';

export interface ISubscriptionGetRequest extends IGetRequest {
  ids?: string[];
  subscriberId?: string;
}

export interface ISubscriptionSaveRequest extends IRequest {
  subscription: ISubscriptionData;
}

export interface ISubscriptionDeleteRequest extends IRequest {
  id: string;
}
