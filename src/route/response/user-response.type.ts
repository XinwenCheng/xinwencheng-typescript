import { IUserData } from '../../type/data/user.type';
import { IResponse } from './base-response.type';

export interface IUserGetResponse extends IResponse {
  users: IUserData[];
}

export interface IUserSaveResponse extends IResponse {
  user: IUserData;
}

export interface IUserDeleteResponse extends IResponse {
  user?: IUserData;
}
