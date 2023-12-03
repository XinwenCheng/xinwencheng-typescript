import { UserDataType } from '../../type/data/user.type';
import { IGetRequest, IRequest } from './base-request.type';

export interface IUserGetRequest extends IGetRequest {
  ids?: string[];
  names?: string[];
  shopId?: string;
  organizationId: string;
}

export interface IUserSaveRequest extends IRequest {
  user: UserDataType;
}

export interface IUserDeleteRequest extends IRequest {
  id: string;
}
