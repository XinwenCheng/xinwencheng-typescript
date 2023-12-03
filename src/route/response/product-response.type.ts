import { IProductData } from '../../type/data/product.type';
import { IResponse } from './base-response.type';

export interface IProductGetResponse extends IResponse {
  products: IProductData[];
}

export interface IProductSaveResponse extends IResponse {
  product: IProductData;
}

export interface IProductDeleteResponse extends IResponse {
  product: IProductData;
}
