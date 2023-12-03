import { IBaseDataType } from '../base.type';

export interface ITokenData extends IBaseDataType {
  userId: string;
  token: string;
  expiredAt: Date;
}
