import { BaseRouteType } from './base.type';
import {
  IProductDeleteRequest,
  IProductGetRequest,
  IProductSaveRequest
} from './request/product-request.type';

export type ProductRouteType = {
  get?: IProductGetRequest;
  post?: IProductSaveRequest;
  deletion?: IProductDeleteRequest;
} & BaseRouteType;
