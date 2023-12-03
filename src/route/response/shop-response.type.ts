import { IShopData } from '../../type/data/shop.type';
import { IBaseResponseData } from './base-response.type';

export interface IShopGetResponse extends IBaseResponseData {
  shops: IShopData[];
}

export interface IShopSaveResponse extends IBaseResponseData {
  shop: IShopData;
}

export interface IShopDeleteResponse extends IBaseResponseData {
  shop: IShopData;
}
