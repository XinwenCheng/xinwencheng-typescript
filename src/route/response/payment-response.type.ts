import { IPaymentData } from '../../type/data/payment.type';
import { IResponse } from './base-response.type';

export interface IPaymentGetResponse extends IResponse {
  payments: IPaymentData[];
}

export interface IPaymentSaveResponse extends IResponse {
  payment: IPaymentData;
}

export interface IPaymentDeleteResponse extends IResponse {
  payment: IPaymentData;
}
