import { IBaseRequestData } from '../route/request/base-request.type';
import { IBaseResponseData } from '../route/response/base-response.type';
import { IBaseDataType } from '../type/base.type';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dayJs = require('dayjs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const utc = require('dayjs/plugin/utc');

export default abstract class BaseManager {
  constructor() {
    this.init();
  }

  init() {
    dayJs.extend(utc);
  }

  abstract get(params: IBaseRequestData): Promise<IBaseResponseData>;

  abstract save(params: IBaseRequestData): Promise<IBaseResponseData>;

  abstract delete(params: IBaseRequestData): Promise<IBaseResponseData>;

  abstract parseDocumentToData(document): IBaseDataType;
}
