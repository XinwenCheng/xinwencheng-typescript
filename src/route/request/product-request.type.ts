import { IProductData } from '../../type/data/product.type';
import { IBaseGetRequestData, IBaseRequestData } from './base-request.type';

export interface IProductGetRequest extends IBaseGetRequestData {
  ids: string[];
}

export interface IProductSaveRequest extends IBaseRequestData {
  product: IProductData;
}

export interface IProductDeleteRequest extends IBaseRequestData {
  id: string;
}
