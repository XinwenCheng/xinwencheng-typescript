import { IBaseRequestData } from '../route/request/base-request.type';
import { IBaseResponseData } from '../route/response/base-response.type';

const dayJs = require('dayjs');
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
