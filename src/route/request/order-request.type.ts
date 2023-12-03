import { IOrderData } from '../../type/data/order.type';
import { IBaseGetRequestData, IBaseRequestData } from './base-request.type';

export interface IOrderGetRequest extends IBaseGetRequestData {
  ids?: string[];
  userId?: string;
}

export interface IOrderSaveRequest extends IBaseRequestData {
  order: IOrderData;
}

export interface IOrderDeleteRequest extends IBaseRequestData {
  id: string;
}
