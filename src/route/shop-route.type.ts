import { BaseRouteType } from './base.type';
import {
  IShopGetRequest,
  IShopSaveRequest,
  IShopDeleteRequest
} from './request/shop-request.type';

export type ShopRouteType = {
  get?: IShopGetRequest;
  post?: IShopSaveRequest;
  deletion?: IShopDeleteRequest;
} & BaseRouteType;
