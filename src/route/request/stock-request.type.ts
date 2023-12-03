import { IStockData } from '../../type/data/stock.type';
import { IBaseGetRequestData, IBaseRequestData } from './base-request.type';

export interface IStockGetRequest extends IBaseGetRequestData {
  organizationId: string;
  shopId?: string;
  productIds?: string[];
  productCategories?: string[];
}

export interface IStockSaveRequest extends IBaseRequestData {
  stock: IStockData;
}

export interface IStockDeleteRequest extends IBaseRequestData {
  stock: IStockData;
}
