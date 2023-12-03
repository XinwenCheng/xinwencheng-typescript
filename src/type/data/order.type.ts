import { IDataType } from '../base.type';
import { ProductCategoryType } from './product.type';

export interface OrderDataType extends IDataType {
  userId: string;
  shopId: string;
  organizationId: string;
  products: OrderProductDataType[];
  price: OrderPriceDataType;
  couponId?: string;
}

export interface OrderProductDataType {
  productId: string;
  productCategory?: ProductCategoryType;
  finalPrice: number;
  quantity: number;
}

export interface OrderPriceDataType {
  total: number;
  final: number;
}
