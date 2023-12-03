import { IGetRequest, IRequest } from './base-request.type';

export interface ITokenGetRequest extends IGetRequest {
  token?: string;
  username?: string;
  password?: string;
}

export interface ITokenSaveRequest extends IRequest {
  userId: string;
}

export interface ITokenDeleteRequest extends IRequest {
  token: string;
}
