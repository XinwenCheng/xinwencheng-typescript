import { IMarketActivityData } from '../../type/data/market-activity.type';
import { IBaseGetRequestData, IBaseRequestData } from './base-request.type';

export interface IMarketActivityGetRequest extends IBaseGetRequestData {
  ids?: string[];
  organizationId?: string;
  shopId?: string;
  productId?: string;
}

export interface IMarketActivitySaveRequest extends IBaseRequestData {
  marketActivity: IMarketActivityData;
}

export interface IMarketActivityDeleteRequest extends IBaseRequestData {
  id: string;
}
