import { IOrganizationData } from '../../type/data/organization.type';
import { IBaseResponseData } from './base-response.type';

export interface IOrganizationGetResponse extends IBaseResponseData {
  organizations: IOrganizationData[];
}

export interface IOrganizationSaveResponse extends IBaseResponseData {
  organization: IOrganizationData;
}

export interface IOrganizationDeleteResponse extends IBaseResponseData {
  organization: IOrganizationData;
}
