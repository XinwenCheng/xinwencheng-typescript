import { IStockData } from '../../type/data/stock.type';
import { IGetRequest, IRequest } from './base-request.type';

export interface IStockGetRequest extends IGetRequest {
  organizationId: string;
  shopId?: string;
  productIds?: string[];
  productCategories?: string[];
}

export interface IStockSaveRequest extends IRequest {
  stock: IStockData;
}

export interface IStockDeleteRequest extends IRequest {
  stock: IStockData;
}
