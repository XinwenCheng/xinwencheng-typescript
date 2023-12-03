import { ICouponData } from '../../type/data/coupon.type';
import { IBaseGetRequestData, IBaseRequestData } from './base-request.type';

export interface ICouponGetRequest extends IBaseGetRequestData {
  ids?: string[];
  userId?: string;
  organizationId?: string;
  shopId?: string;
  marketActivityId?: string;
}

export interface ICouponCreateRequest extends IBaseRequestData {
  organizationId: string;
  paymentId?: string;
  marketActivityId?: string;
  userId: string;
}

export interface ICouponSaveRequest extends IBaseRequestData {
  coupon: ICouponData;
}

export interface ICouponDeleteRequest extends IBaseRequestData {
  id: string;
}
