import { CouponDataType } from '../../type/data/coupon.type';
import { IGetRequest, IRequest } from './base-request.type';

export interface ICouponGetRequest extends IGetRequest {
  ids?: string[];
  userId?: string;
  organizationId?: string;
  shopId?: string;
  marketActivityId?: string;
}

export interface ICouponCreateRequest extends IRequest {
  organizationId: string;
  paymentId?: string;
  marketActivityId?: string;
  userId: string;
}

export interface ICouponSaveRequest extends IRequest {
  coupon: CouponDataType;
}

export interface ICouponDeleteRequest extends IRequest {
  id: string;
}
