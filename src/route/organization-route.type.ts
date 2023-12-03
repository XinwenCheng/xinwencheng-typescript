import { BaseRouteType } from './base.type';
import {
  IOrganizationGetRequest,
  IOrganizationSaveRequest,
  IOrganizationDeleteRequest
} from './request/organization-request.type';

export type OrganizationRouteType = {
  get?: IOrganizationGetRequest;
  post?: IOrganizationSaveRequest;
  deletion?: IOrganizationDeleteRequest;
} & BaseRouteType;
