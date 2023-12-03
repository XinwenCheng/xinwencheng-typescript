import { IBaseDataType } from '../base.type';
import { ProductCategoryType } from './product.type';

export interface IOrderData extends IBaseDataType {
  userId: string;
  shopId: string;
  organizationId: string;
  products: IOrderProductData[];
  price: IOrderPriceData;
  couponId?: string;
}

export interface IOrderProductData {
  productId: string;
  productCategory?: ProductCategoryType;
  finalPrice: number;
  quantity: number;
}

export interface IOrderPriceData {
  total: number;
  final: number;
}
