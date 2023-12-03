import { OrganizationDataType } from '../../type/data/organization.type';
import { IResponse } from './base-response.type';

export interface IOrganizationGetResponse extends IResponse {
  organizations: OrganizationDataType[];
}

export interface IOrganizationSaveResponse extends IResponse {
  organization: OrganizationDataType;
}

export interface IOrganizationDeleteResponse extends IResponse {
  organization: OrganizationDataType;
}
