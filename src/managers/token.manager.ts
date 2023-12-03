// eslint-disable-next-line @typescript-eslint/no-var-requires
const uuidV4 = require('uuid/v4');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dayJs = require('dayjs');

import MongooseHelper from '../helpers/mongoose.helper';
import { TokenModel } from '../models/token.model';
import {
  ITokenDeleteRequest,
  ITokenGetRequest,
  ITokenSaveRequest
} from '../route/request/token-request';
import { ResponseCodeEnum } from '../route/response/base-response.type';
import {
  ITokenDeleteResponse,
  ITokenGetResponse,
  ITokenSaveResponse
} from '../route/response/token-response.type';
import { ITokenData } from '../type/data/token.type';
import BaseManager from './base.manager';

export default class TokenManager extends BaseManager {
  async get(params: ITokenGetRequest): Promise<ITokenGetResponse> {
    const { token, username, password } = params;

    if (!token && (!username || !password))
      throw new Error('Token or username and password are required.');

    const query = {};

    if (token) query['token'] = token;
    else {
      query['username'] = username;
      query['password'] = password;
    }

    await MongooseHelper.startConnection();

    const document = await TokenModel.findOne(query);

    if (!document) throw new Error('Token is invalid.');

    return {
      code: ResponseCodeEnum.Success,
      token: this.parseDocumentToData(document)
    };
  }

  async save(params: ITokenSaveRequest): Promise<ITokenSaveResponse> {
    const { userId } = params;

    if (!userId) throw new Error('ID is required.');

    const now = dayJs.utc().toDate();

    await MongooseHelper.startConnection();

    const document = await TokenModel.findOneAndUpdate(
      { userId },
      {
        userId,
        token: uuidV4(),
        expiredAt: now.add(1, 'month').toDate(),
        createdAt: now
      },
      { new: true, upsert: true }
    );

    return {
      code: ResponseCodeEnum.Success,
      token: this.parseDocumentToData(document)
    };
  }

  async delete(params: ITokenDeleteRequest): Promise<ITokenDeleteResponse> {
    const { token } = params;

    if (!token) throw new Error('Token is required.');

    await MongooseHelper.startConnection();

    await TokenModel.findByIdAndDelete({
      token
    });

    return {
      code: ResponseCodeEnum.Success
    };
  }

  validate(token: string, required?: boolean): boolean {
    // TODO: Validate the token of request sender if it's required.

    if (required) {
      // throw new Error('Token is invalid.');
    }

    return true;
  }

  parseDocumentToData(document): ITokenData {
    const { userId, token, expiredAt } = document;

    return { userId, token, expiredAt } as ITokenData;
  }
}
