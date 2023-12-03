import { IRequest } from './base-request.type';

export interface ISignInRequest extends IRequest {
  nameOrPhone: string;
  password: string;
}
