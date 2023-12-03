import { OrderDataType } from '../../type/data/order.type';
import { IGetRequest, IRequest } from './base-request.type';

export interface IOrderGetRequest extends IGetRequest {
  ids?: string[];
  userId?: string;
}

export interface IOrderSaveRequest extends IRequest {
  order: OrderDataType;
}

export interface IOrderDeleteRequest extends IRequest {
  id: string;
}
