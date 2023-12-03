import { ITokenData } from '../../type/data/token.type';
import { IUserData } from '../../type/data/user.type';
import { IBaseResponseData } from './base-response.type';

export interface ISignUpResponse extends IBaseResponseData {
  token: ITokenData;
  user: IUserData;
}
