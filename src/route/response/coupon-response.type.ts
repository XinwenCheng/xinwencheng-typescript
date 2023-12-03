import { ICouponData } from '../../type/data/coupon.type';
import { IResponse } from './base-response.type';

export interface ICouponGetResponse extends IResponse {
  coupons: ICouponData[];
}

export interface ICouponSaveResponse extends IResponse {
  coupon: ICouponData;
}

export interface ICouponDeleteResponse extends IResponse {
  coupon: ICouponData;
}

export interface ICouponCreateResponse extends IResponse {
  coupons?: ICouponData[];
}
