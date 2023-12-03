import { IOrderData } from '../../type/data/order.type';
import { IResponse } from './base-response.type';

export interface IOrderGetResponse extends IResponse {
  orders: IOrderData[];
}

export interface IOrderSaveResponse extends IResponse {
  order: IOrderData;
}

export interface IOrderDeleteResponse extends IResponse {
  order: IOrderData;
}
