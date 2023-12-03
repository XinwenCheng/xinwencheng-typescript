import { BaseRouteType } from './base.type';
import {
  IOrderDeleteRequest,
  IOrderGetRequest,
  IOrderSaveRequest
} from './request/order-request.type';

export type OrderRouteType = {
  get?: IOrderGetRequest;
  post?: IOrderSaveRequest;
  deletion?: IOrderDeleteRequest;
} & BaseRouteType;
