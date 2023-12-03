import { IDataType } from '../base.type';

export interface PaymentDataType extends IDataType {
  orderId: string;
  userId: string;
  couponId?: string;
  totalPrice: number;
  finalPrice: number;
  receiptId?: string;
  status: PaymentStatuType;
}

export type PaymentStatuType = 'pending' | 'paid' | 'cancelled';
