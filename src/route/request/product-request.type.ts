import { ProductDataType } from '../../type/data/product.type';
import { IGetRequest, IRequest } from './base-request.type';

export interface IProductGetRequest extends IGetRequest {
  ids: string[];
}

export interface IProductSaveRequest extends IRequest {
  product: ProductDataType;
}

export interface IProductDeleteRequest extends IRequest {
  id: string;
}
