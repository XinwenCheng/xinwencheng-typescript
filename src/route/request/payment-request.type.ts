import { IPaymentData } from '../../type/data/payment.type';
import { IGetRequest, IRequest } from './base-request.type';

export interface IPaymentGetRequest extends IGetRequest {
  ids?: string[];
  userId?: string;
  orderId?: string;
}

export interface IPaymentSaveRequest extends IRequest {
  payment: IPaymentData;
}

export interface IPaymentDeleteRequest extends IRequest {
  id: string;
}
