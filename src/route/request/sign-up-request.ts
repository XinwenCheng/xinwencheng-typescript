import { IBaseRequestData } from './base-request.type';

export interface ISignUpRequest extends IBaseRequestData {
  username: string;
  password: string;
}
