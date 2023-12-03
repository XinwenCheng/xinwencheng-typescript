import { IRequest } from './base-request.type';

export interface ISignUpRequest extends IRequest {
  username: string;
  password: string;
}
