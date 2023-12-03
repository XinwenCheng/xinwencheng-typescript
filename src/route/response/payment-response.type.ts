import { PaymentDataType } from '../../type/data/payment.type';
import { IResponse } from './base-response.type';

export interface IPaymentGetResponse extends IResponse {
  payments: PaymentDataType[];
}

export interface IPaymentSaveResponse extends IResponse {
  payment: PaymentDataType;
}

export interface IPaymentDeleteResponse extends IResponse {
  payment: PaymentDataType;
}
