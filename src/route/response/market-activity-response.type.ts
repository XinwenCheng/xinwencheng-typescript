import { IMarketActivityData } from '../../type/data/market-activity.type';
import { IResponse } from './base-response.type';

export interface IMarketActivityGetResponse extends IResponse {
  marketActivities: IMarketActivityData[];
}

export interface IMarketActivitySaveResponse extends IResponse {
  marketActivity: IMarketActivityData;
}

export interface IMarketActivityDeleteResponse extends IResponse {
  marketActivity: IMarketActivityData;
}
