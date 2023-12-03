import { OrganizationDataType } from '../../type/data/organization.type';
import { IGetRequest, IRequest } from './base-request.type';

export interface IOrganizationGetRequest extends IGetRequest {
  ids: string[];
}

export interface IOrganizationSaveRequest extends IRequest {
  organization: OrganizationDataType;
}

export interface IOrganizationDeleteRequest extends IRequest {
  id: string;
}
