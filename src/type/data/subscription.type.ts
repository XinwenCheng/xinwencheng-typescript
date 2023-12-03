import { IDataType } from '../base.type';
import { DiscountCouponType } from './coupon.type';
import { ProductCategoryType } from './product.type';

export interface SubscriptionDataType extends IDataType {
  subscriberId: string;
  organizationId: string;
  duration: SubscriptionDurationType;
  startDate: Date;
  expiryDate: Date;
  capability: BaseSubscriptionUsageCapabilityDataType;
}

export interface BaseSubscriptionUsageCapabilityDataType {}

export interface MonthlySubscriptionCapabilityDataType
  extends BaseSubscriptionUsageCapabilityDataType {
  categories: {
    category: ProductCategoryType;
    limit: number;
  }[];
  discount: {
    productId: string;
    discount: DiscountCouponType;
  }[];
}

export interface AnnualSubscriptionCapabilityDataType
  extends BaseSubscriptionUsageCapabilityDataType {}

export type SubscriptionDurationType = 'monthly' | 'annual';
