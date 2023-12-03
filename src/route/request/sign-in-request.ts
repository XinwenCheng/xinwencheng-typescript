import { IBaseRequestData } from './base-request.type';

export interface ISignInRequest extends IBaseRequestData {
  nameOrPhone: string;
  password: string;
}
