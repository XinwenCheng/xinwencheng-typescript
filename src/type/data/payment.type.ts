import { IBaseDataType } from '../base.type';

export interface IPaymentData extends IBaseDataType {
  good: GoodType;
  userId: string;
  couponId?: string;
  totalPrice: number;
  finalPrice: number;
  receiptId?: string;
  status: PaymentStatuType;
}

export type PaymentStatuType = 'pending' | 'paid' | 'cancelled';

export type GoodType = {
  id: string;
  type: 'order' | 'subscription';
};
