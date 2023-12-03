import { IProductData } from '../../type/data/product.type';
import { IBaseResponseData } from './base-response.type';

export interface IProductGetResponse extends IBaseResponseData {
  products: IProductData[];
}

export interface IProductSaveResponse extends IBaseResponseData {
  product: IProductData;
}

export interface IProductDeleteResponse extends IBaseResponseData {
  product: IProductData;
}
