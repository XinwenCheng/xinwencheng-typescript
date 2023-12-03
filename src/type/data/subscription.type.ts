import { IDataType } from '../base.type';

export interface SubscriptionDataType extends IDataType {
  subscriberId: string;
  organizationId: string;
  type: SubscriptionType;
  startDate: Date;
  expiryDate: Date;
}

export type SubscriptionType = 'monthly' | 'annually';
