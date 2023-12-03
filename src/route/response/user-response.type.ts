import { UserDataType } from '../../type/data/user.type';
import { IResponse } from './base-response.type';

export interface IUserGetResponse extends IResponse {
  users: UserDataType[];
}

export interface IUserSaveResponse extends IResponse {
  user: UserDataType;
}

export interface IUserDeleteResponse extends IResponse {
  user?: UserDataType;
}
