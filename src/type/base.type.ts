import { IBaseRequestData } from '../route/request/base-request.type';
import { IBaseResponseData } from '../route/response/base-response.type';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dayJs = require('dayjs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const utc = require('dayjs/plugin/utc');

export default abstract class BaseHandler {
  constructor() {
    this.init();
  }

  init() {
    dayJs.extend(utc);
  }

  abstract handle(
    params: IHandlerParameterDataType
  ): Promise<IBaseResponseData>;
}

export interface IHandlerParameterDataType {
  requestData: IBaseRequestData;
  fromToken?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request?: any;
}

export interface IBaseDataType {
  id?: string;
  isDeleted?: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export type BaseRouteType = {
  path: string;
};
