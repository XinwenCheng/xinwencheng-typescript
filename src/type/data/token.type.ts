import { IDataType } from '../base.type';

export interface ITokenData extends IDataType {
  userId: string;
  token: string;
  expiredAt: Date;
}
