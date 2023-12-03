import { IPaymentData } from '../../type/data/payment.type';
import { IBaseGetRequestData, IBaseRequestData } from './base-request.type';

export interface IPaymentGetRequest extends IBaseGetRequestData {
  ids?: string[];
  userId?: string;
  orderId?: string;
}

export interface IPaymentSaveRequest extends IBaseRequestData {
  payment: IPaymentData;
}

export interface IPaymentDeleteRequest extends IBaseRequestData {
  id: string;
}
