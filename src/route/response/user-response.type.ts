import { IUserData } from '../../type/data/user.type';
import { IBaseResponseData } from './base-response.type';

export interface IUserGetResponse extends IBaseResponseData {
  users: IUserData[];
}

export interface IUserSaveResponse extends IBaseResponseData {
  user: IUserData;
}

export interface IUserDeleteResponse extends IBaseResponseData {
  user?: IUserData;
}
