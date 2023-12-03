import { IDataType } from '../base.type';
import { BaseMarketActivityRuleDataType } from './market-activity.type';

export interface CouponDataType extends IDataType {
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
  rule: BaseMarketActivityRuleDataType;
}
