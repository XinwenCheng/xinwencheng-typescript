import { ICouponData } from '../../type/data/coupon.type';
import { IBaseResponseData } from './base-response.type';

export interface ICouponGetResponse extends IBaseResponseData {
  coupons: ICouponData[];
}

export interface ICouponSaveResponse extends IBaseResponseData {
  coupon: ICouponData;
}

export interface ICouponDeleteResponse extends IBaseResponseData {
  coupon: ICouponData;
}

export interface ICouponCreateResponse extends IBaseResponseData {
  coupons?: ICouponData[];
}
