import { IDataType } from '../base.type';

export interface UserDataType extends IDataType {
  name: string;
  phone: string;
  role: UserRoleType;
  shopId?: string;
  organizationId: string;
  isDeactivated?: boolean;
}

export type UserRoleType =
  | 'admin'
  | 'organizationManager'
  | 'shopManager'
  | 'shopStaff'
  | 'user';
