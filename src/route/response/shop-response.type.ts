import { IShopData } from '../../type/data/shop.type';
import { IResponse } from './base-response.type';

export interface IShopGetResponse extends IResponse {
  shops: IShopData[];
}

export interface IShopSaveResponse extends IResponse {
  shop: IShopData;
}

export interface IShopDeleteResponse extends IResponse {
  shop: IShopData;
}
