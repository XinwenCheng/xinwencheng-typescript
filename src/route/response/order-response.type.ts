import { IOrderData } from '../../type/data/order.type';
import { IBaseResponseData } from './base-response.type';

export interface IOrderGetResponse extends IBaseResponseData {
  orders: IOrderData[];
}

export interface IOrderSaveResponse extends IBaseResponseData {
  order: IOrderData;
}

export interface IOrderDeleteResponse extends IBaseResponseData {
  order: IOrderData;
}
