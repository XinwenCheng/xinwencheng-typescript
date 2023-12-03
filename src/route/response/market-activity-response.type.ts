import { MarketActivityDataType } from '../../type/data/market-activity.type';
import { IResponse } from './base-response.type';

export interface IMarketActivityGetResponse extends IResponse {
  marketActivities: MarketActivityDataType[];
}

export interface IMarketActivitySaveResponse extends IResponse {
  marketActivity: MarketActivityDataType;
}

export interface IMarketActivityDeleteResponse extends IResponse {
  marketActivity: MarketActivityDataType;
}
