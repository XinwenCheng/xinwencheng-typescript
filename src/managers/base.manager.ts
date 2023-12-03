import { IRequest } from '../route/request/base-request.type';
import { IResponse } from '../route/response/base-response.type';
import { IDataType } from '../type/base.type';

const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

export default abstract class BaseManager {
  constructor() {
    this.init();
  }

  init() {
    dayJs.extend(utc);
  }

  abstract get(params: IRequest): Promise<IResponse>;

  abstract save(params: IRequest): Promise<IResponse>;

  abstract delete(params: IRequest): Promise<IResponse>;

  abstract parseDocumentToData(document): IDataType;
}
