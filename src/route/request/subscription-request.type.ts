import { IPaymentData } from '../../type/data/payment.type';
import { ISubscriptionData } from '../../type/data/subscription.type';
import { IBaseGetRequestData, IBaseRequestData } from './base-request.type';

export interface ISubscriptionGetRequest extends IBaseGetRequestData {
  ids?: string[];
  subscriberId?: string;
}

export interface ISubscriptionSaveRequest extends IBaseRequestData {
  subscription: ISubscriptionData;
  payment: IPaymentData;
}

export interface ISubscriptionDeleteRequest extends IBaseRequestData {
  id: string;
}
