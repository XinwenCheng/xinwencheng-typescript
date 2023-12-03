import { IBaseDataType } from '../base.type';

export interface IUserData extends IBaseDataType {
  username: string;
  phone?: string;
  encryptedPassword: string;
  salt: string;
  role: UserRoleType;
  shopId?: string;
  organizationId?: string;
  isDeactivated?: boolean;
}

export type UserRoleType =
  | 'admin'
  | 'organizationManager'
  | 'shopManager'
  | 'shopStaff'
  | 'user';
