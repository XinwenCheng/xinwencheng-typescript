import { ITokenData } from '../../type/data/token.type';
import { IResponse } from './base-response.type';

export interface ITokenGetResponse extends IResponse {
  token: ITokenData;
}

export interface ITokenSaveResponse extends IResponse {
  token: ITokenData;
}

export interface ITokenDeleteResponse extends IResponse {}
