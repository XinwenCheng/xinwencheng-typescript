import { ITokenData } from '../../type/data/token.type';
import { IUserData } from '../../type/data/user.type';
import { IResponse } from './base-response.type';

export interface ISignUpResponse extends IResponse {
  token: ITokenData;
  user: IUserData;
}
