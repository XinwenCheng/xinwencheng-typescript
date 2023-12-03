import { IDataType } from '../base.type';

export interface SubscriptionDataType extends IDataType {
  subscriberId: string;
  type: SubscriptionType;
  startDate: Date;
  expiryDate: Date;
  paymentId?: string;
}

export type SubscriptionType = 'monthly' | 'annually';
