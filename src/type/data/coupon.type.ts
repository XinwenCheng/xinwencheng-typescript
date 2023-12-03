import { IBaseDataType } from '../base.type';
import { IBaseMarketActivityRuleData } from './market-activity.type';

export interface ICouponData extends IBaseDataType {
  id: string;
  name: string;
  description?: string;
  organizationId: string;
  shopIds?: string[];
  marketActivityId: string;
  userId: string;
  startDate?: Date;
  expiryDate?: Date;
  usedAt?: Date;
  isMandatoryExpired?: boolean;
  rule: IBaseMarketActivityRuleData;
}

export type DiscountCouponUnitType = 'price' | 'percent';

export type DiscountCouponType = {
  quantity: number;
  unit: DiscountCouponUnitType;
};
