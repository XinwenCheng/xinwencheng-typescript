import { IOrganizationData } from '../../type/data/organization.type';
import { IResponse } from './base-response.type';

export interface IOrganizationGetResponse extends IResponse {
  organizations: IOrganizationData[];
}

export interface IOrganizationSaveResponse extends IResponse {
  organization: IOrganizationData;
}

export interface IOrganizationDeleteResponse extends IResponse {
  organization: IOrganizationData;
}
