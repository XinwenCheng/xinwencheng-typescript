import { ProductDataType } from '../../type/data/product.type';
import { IResponse } from './base-response.type';

export interface IProductGetResponse extends IResponse {
  products: ProductDataType[];
}

export interface IProductSaveResponse extends IResponse {
  product: ProductDataType;
}

export interface IProductDeleteResponse extends IResponse {
  product: ProductDataType;
}
