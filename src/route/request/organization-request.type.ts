import { IOrganizationData } from '../../type/data/organization.type';
import { IGetRequest, IRequest } from './base-request.type';

export interface IOrganizationGetRequest extends IGetRequest {
  ids: string[];
}

export interface IOrganizationSaveRequest extends IRequest {
  organization: IOrganizationData;
}

export interface IOrganizationDeleteRequest extends IRequest {
  id: string;
}
