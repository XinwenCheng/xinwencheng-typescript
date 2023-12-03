import { BaseRouteType } from './base.type';
import {
  IOrderDeleteRequest,
  IOrderGetRequest,
  IOrderSaveRequest
} from './request/order-request.type';

export type CouponRouteType = {
  get?: IOrderGetRequest;
  post?: IOrderSaveRequest;
  deletion?: IOrderDeleteRequest;
} & BaseRouteType;
