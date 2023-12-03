import {
  IUserDeleteRequest,
  IUserGetRequest,
  IUserSaveRequest
} from './request/user-request.type';
import { BaseRouteType } from './base.type';

export type UserRouteType = {
  get?: IUserGetRequest;
  post?: IUserSaveRequest;
  deletion?: IUserDeleteRequest;
} & BaseRouteType;
