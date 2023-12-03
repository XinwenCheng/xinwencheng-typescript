import { OrderDataType } from '../../type/data/order.type';
import { IResponse } from './base-response.type';

export interface IOrderGetResponse extends IResponse {
  orders: OrderDataType[];
}

export interface IOrderSaveResponse extends IResponse {
  order: OrderDataType;
}

export interface IOrderDeleteResponse extends IResponse {
  order: OrderDataType;
}
