import { CouponDataType } from '../../type/data/coupon.type';
import { IResponse } from './base-response.type';

export interface ICouponGetResponse extends IResponse {
  coupons: CouponDataType[];
}

export interface ICouponSaveResponse extends IResponse {
  coupon: CouponDataType;
}

export interface ICouponDeleteResponse extends IResponse {
  coupon: CouponDataType;
}

export interface ICouponCreateResponse extends IResponse {
  coupons?: CouponDataType[];
}
