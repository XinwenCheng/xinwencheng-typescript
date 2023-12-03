import { IBaseGetRequestData, IBaseRequestData } from './base-request.type';

export interface ITokenGetRequest extends IBaseGetRequestData {
  token?: string;
  username?: string;
  password?: string;
}

export interface ITokenSaveRequest extends IBaseRequestData {
  userId: string;
}

export interface ITokenDeleteRequest extends IBaseRequestData {
  token: string;
}
