import { IShopData } from '../../type/data/shop.type';
import { IGetRequest, IRequest } from './base-request.type';

export interface IShopGetRequest extends IGetRequest {
  ids: string[];
}

export interface IShopSaveRequest extends IRequest {
  shop: IShopData;
}

export interface IShopDeleteRequest extends IRequest {
  id: string;
}
