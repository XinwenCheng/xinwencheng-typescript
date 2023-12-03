import { IBaseDataType } from '../base.type';

export interface IStockData extends IBaseDataType {
  productId: string;
  organizationId: string;
  shopId?: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}
