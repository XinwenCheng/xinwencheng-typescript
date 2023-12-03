import { IDataType } from '../base.type';

export interface OrganizationDataType extends IDataType {
  name: string;
  unifiedSocialCreditCode: string;
  managerId: string;
  adminId: string;
  isDeactivated?: boolean;
}
