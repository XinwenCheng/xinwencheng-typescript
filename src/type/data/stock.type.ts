import { IDataType } from '../base.type';

export interface StockDataType extends IDataType {
  productId: string;
  organizationId: string;
  shopId?: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}
