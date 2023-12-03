import { IDataType } from '../base.type';
import { DiscountCouponType } from './coupon.type';
import { ProductCategoryType } from './product.type';

export interface MarketActivityDataType extends IDataType {
  organizationId: string;
  shopIds?: string[];
  startDate: Date;
  expiryDate?: Date;
  name: string;
  description: string;
  rule: BaseMarketActivityRuleDataType;
}

export type MarketActivityRuleType = 'discount' | 'free';

export interface BaseMarketActivityRuleDataType {
  type: MarketActivityRuleType;
  precondition?: MarketActivityRulePreconditionDataType;
}

export interface MarketActivityRulePreconditionDataType {
  product?: { id: string; minQuantity?: number; minPrice?: number };
  productCategory?: {
    category: ProductCategoryType;
    minQuantity?: number;
    minPrice?: number;
  };
}

export interface DiscountMarketActivityRuleDataType
  extends BaseMarketActivityRuleDataType {
  discount: DiscountCouponType;
}

export interface FreeMarketActivityRuleDataType
  extends BaseMarketActivityRuleDataType {
  productId: string;
  /**
   * 0 means no limit.
   */
  purchasedQuantity: number;
  presentedQuantity: number;
}
