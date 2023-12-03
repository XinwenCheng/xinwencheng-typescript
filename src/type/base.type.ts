import { IRequest } from '../route/request/base-request.type';
import { IResponse } from '../route/response/base-response.type';

const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

export default abstract class BaseHandler {
  constructor() {
    this.init();
  }

  init() {
    dayJs.extend(utc);
  }

  abstract handle(params: IHandlerParameterDataType): Promise<IResponse>;
}

export interface IHandlerParameterDataType {
  requestData: IRequest;
  fromToken?: string;
  request?: any;
}

export interface IDataType {
  id: string;
  isDeleted?: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export type BaseRouteType = {
  path: string;
};
