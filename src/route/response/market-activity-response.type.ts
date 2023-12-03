import { IMarketActivityData } from '../../type/data/market-activity.type';
import { IBaseResponseData } from './base-response.type';

export interface IMarketActivityGetResponse extends IBaseResponseData {
  marketActivities: IMarketActivityData[];
}

export interface IMarketActivitySaveResponse extends IBaseResponseData {
  marketActivity: IMarketActivityData;
}

export interface IMarketActivityDeleteResponse extends IBaseResponseData {
  marketActivity: IMarketActivityData;
}
