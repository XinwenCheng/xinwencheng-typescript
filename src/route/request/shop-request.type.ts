import { IShopData } from '../../type/data/shop.type';
import { IBaseGetRequestData, IBaseRequestData } from './base-request.type';

export interface IShopGetRequest extends IBaseGetRequestData {
  ids: string[];
}

export interface IShopSaveRequest extends IBaseRequestData {
  shop: IShopData;
}

export interface IShopDeleteRequest extends IBaseRequestData {
  id: string;
}
