import { StockDataType } from '../../type/data/stock.type';
import { IResponse } from './base-response.type';

export interface IStockGetResponse extends IResponse {
  stocks: StockDataType[];
}

export interface IStockSaveResponse extends IResponse {
  stock: StockDataType;
}

export interface IStockDeleteResponse extends IResponse {
  stock: StockDataType;
}
