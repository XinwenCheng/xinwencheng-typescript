import { IBaseDataType } from '../base.type';

export interface IOrganizationData extends IBaseDataType {
  name: string;
  unifiedSocialCreditCode: string;
  managerId: string;
  adminId: string;
  isDeactivated?: boolean;
}
