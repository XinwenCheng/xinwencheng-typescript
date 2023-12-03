import { IStockData } from '../../type/data/stock.type';
import { IBaseResponseData } from './base-response.type';

export interface IStockGetResponse extends IBaseResponseData {
  stocks: IStockData[];
}

export interface IStockSaveResponse extends IBaseResponseData {
  stock: IStockData;
}

export interface IStockDeleteResponse extends IBaseResponseData {
  stock: IStockData;
}
