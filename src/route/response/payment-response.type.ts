import { IPaymentData } from '../../type/data/payment.type';
import { IBaseResponseData } from './base-response.type';

export interface IPaymentGetResponse extends IBaseResponseData {
  payments: IPaymentData[];
}

export interface IPaymentSaveResponse extends IBaseResponseData {
  payment: IPaymentData;
}

export interface IPaymentDeleteResponse extends IBaseResponseData {
  payment: IPaymentData;
}
