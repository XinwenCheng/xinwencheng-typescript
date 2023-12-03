import { IStockData } from '../../type/data/stock.type';
import { IResponse } from './base-response.type';

export interface IStockGetResponse extends IResponse {
  stocks: IStockData[];
}

export interface IStockSaveResponse extends IResponse {
  stock: IStockData;
}

export interface IStockDeleteResponse extends IResponse {
  stock: IStockData;
}
