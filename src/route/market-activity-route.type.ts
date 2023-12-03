import { BaseRouteType } from './base.type';
import {
  IMarketActivityDeleteRequest,
  IMarketActivityGetRequest,
  IMarketActivitySaveRequest
} from './request/market-activity-request.type';

export type MarketActivityRouteType = {
  get?: IMarketActivityGetRequest;
  post?: IMarketActivitySaveRequest;
  deletion?: IMarketActivityDeleteRequest;
} & BaseRouteType;
