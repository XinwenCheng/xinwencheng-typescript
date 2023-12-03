import { IGetRequest, IRequest } from './base-request.type';

export interface IStockGetRequest extends IGetRequest {
  organizationId: string;
  shopId?: string;
}

export interface IStockSaveRequest extends IRequest {}

export interface IStockDeleteRequest extends IRequest {}
