import {
  IStockGetRequest,
  IStockSaveRequest,
  IStockDeleteRequest
} from '../route/request/stock-request.type';
import {
  IStockGetResponse,
  IStockSaveResponse,
  IStockDeleteResponse
} from '../route/response/stock-response.type';
import { IDataType } from '../type/base.type';
import BaseManager from './base.manager';

const dayJs = require('dayjs');
const { v4: uuidV4 } = require('uuid');

export default class StockManager extends BaseManager {
  get(params: IStockGetRequest): Promise<IStockGetResponse> {
    throw new Error('Method not implemented.');
  }

  save(params: IStockSaveRequest): Promise<IStockSaveResponse> {
    throw new Error('Method not implemented.');
  }

  delete(params: IStockDeleteRequest): Promise<IStockDeleteResponse> {
    throw new Error('Method not implemented.');
  }

  parseDocumentToData(document: any): IDataType {
    throw new Error('Method not implemented.');
  }
}
