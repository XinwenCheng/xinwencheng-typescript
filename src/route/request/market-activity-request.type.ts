import { MarketActivityDataType } from '../../type/data/market-activity.type';
import { IGetRequest, IRequest } from './base-request.type';

export interface IMarketActivityGetRequest extends IGetRequest {
  ids?: string[];
  organizationId?: string;
  shopId?: string;
  productId?: string;
}

export interface IMarketActivitySaveRequest extends IRequest {
  marketActivity: MarketActivityDataType;
}

export interface IMarketActivityDeleteRequest extends IRequest {
  id: string;
}