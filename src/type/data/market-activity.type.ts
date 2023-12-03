import { IBaseDataType } from '../base.type';
import { DiscountCouponType } from './coupon.type';
import { ProductCategoryType } from './product.type';

export interface IMarketActivityData extends IBaseDataType {
  organizationId: string;
  shopIds?: string[];
  startDate: Date;
  expiryDate?: Date;
  name: string;
  description: string;
  rule: IBaseMarketActivityRuleData;
}

export type MarketActivityRuleType = 'discount' | 'free';

export interface IBaseMarketActivityRuleData {
  type: MarketActivityRuleType;
  precondition?: IMarketActivityRulePreconditionData;
}

export interface IMarketActivityRulePreconditionData {
  product?: { id: string; minQuantity?: number; minPrice?: number };
  productCategory?: {
    category: ProductCategoryType;
    minQuantity?: number;
    minPrice?: number;
  };
}

export interface IDiscountMarketActivityRuleData
  extends IBaseMarketActivityRuleData {
  discount: DiscountCouponType;
}

export interface IFreeMarketActivityRuleData
  extends IBaseMarketActivityRuleData {
  productId: string;
  /**
   * 0 means no limit.
   */
  purchasedQuantity: number;
  presentedQuantity: number;
}
