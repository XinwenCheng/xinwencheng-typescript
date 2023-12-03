import { IBaseDataType } from '../base.type';
import { DiscountCouponType } from './coupon.type';
import { ProductCategoryType } from './product.type';

export interface ISubscriptionData extends IBaseDataType {
  subscriberId: string;
  organizationId: string;
  duration: SubscriptionDurationType;
  startDate: Date;
  expiryDate: Date;
  capability: IBaseSubscriptionUsageCapabilityData;
}

export interface IBaseSubscriptionUsageCapabilityData {}

export interface IMonthlySubscriptionCapabilityData
  extends IBaseSubscriptionUsageCapabilityData {
  categories: {
    category: ProductCategoryType;
    unlimited?: boolean;
    limit: number;
  }[];
  discount: {
    productId: string;
    discount: DiscountCouponType;
  }[];
}

export interface IAnnualSubscriptionCapabilityData
  extends IMonthlySubscriptionCapabilityData {}

export type SubscriptionDurationType = 'monthly' | 'annual';
