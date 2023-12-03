import { ShopDataType } from '../../type/data/shop.type';
import { IResponse } from './base-response.type';

export interface IShopGetResponse extends IResponse {
  shops: ShopDataType[];
}

export interface IShopSaveResponse extends IResponse {
  shop: ShopDataType;
}

export interface IShopDeleteResponse extends IResponse {
  shop: ShopDataType;
}
