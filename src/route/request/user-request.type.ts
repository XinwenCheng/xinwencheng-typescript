import { IUserData } from '../../type/data/user.type';
import { IBaseGetRequestData, IBaseRequestData } from './base-request.type';

export interface IUserGetRequest extends IBaseGetRequestData {
  ids?: string[];
  username?: string;
  phone?: string;
  shopId?: string;
  organizationId?: string;
}

export interface IUserSaveRequest extends IBaseRequestData {
  user: IUserData;
}

export interface IUserDeleteRequest extends IBaseRequestData {
  id: string;
}
