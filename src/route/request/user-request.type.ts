import { IUserData } from '../../type/data/user.type';
import { IGetRequest, IRequest } from './base-request.type';

export interface IUserGetRequest extends IGetRequest {
  ids?: string[];
  username?: string;
  phone?: string;
  shopId?: string;
  organizationId?: string;
}

export interface IUserSaveRequest extends IRequest {
  user: IUserData;
}

export interface IUserDeleteRequest extends IRequest {
  id: string;
}
