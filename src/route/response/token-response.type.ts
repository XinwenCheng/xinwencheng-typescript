import { ITokenData } from '../../type/data/token.type';
import { IBaseResponseData } from './base-response.type';

export interface ITokenGetResponse extends IBaseResponseData {
  token: ITokenData;
}

export interface ITokenSaveResponse extends IBaseResponseData {
  token: ITokenData;
}

export interface ITokenDeleteResponse extends IBaseResponseData {}
