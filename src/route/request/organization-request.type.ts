import { IOrganizationData } from '../../type/data/organization.type';
import { IBaseGetRequestData, IBaseRequestData } from './base-request.type';

export interface IOrganizationGetRequest extends IBaseGetRequestData {
  ids: string[];
}

export interface IOrganizationSaveRequest extends IBaseRequestData {
  organization: IOrganizationData;
}

export interface IOrganizationDeleteRequest extends IBaseRequestData {
  id: string;
}
