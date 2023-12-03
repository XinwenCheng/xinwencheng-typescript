// eslint-disable-next-line @typescript-eslint/no-var-requires
const dayJs = require('dayjs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { v4: uuidV4 } = require('uuid');

import BaseManager from './base.manager';
import { IUserData } from '../type/data/user.type';
import {
  IUserDeleteRequest,
  IUserGetRequest,
  IUserSaveRequest
} from '../route/request/user-request.type';
import { UserModel } from '../models/user.model';
import {
  IUserDeleteResponse,
  IUserGetResponse,
  IUserSaveResponse
} from '../route/response/user-response.type';
import { ResponseCodeEnum } from '../route/response/base-response.type';
import MongooseHelper from '../helpers/mongoose.helper';

export default class UserManager extends BaseManager {
  async get(params: IUserGetRequest): Promise<IUserGetResponse> {
    const { ids, username, phone, shopId, organizationId, includeDeleted } =
      params;
    const query: {
      [key: string]: string | { [key: string]: string | string[] | boolean };
    } = {
      organizationId
    };

    if (ids?.length) query.clientId = { $in: ids };
    if (username) query.username = username;
    if (phone) query.phone = phone;
    if (shopId) query.shopId = shopId;
    if (!includeDeleted) query.isDeleted = { $ne: true };

    await MongooseHelper.startConnection();

    const userDocuments = await UserModel.find(query);

    return {
      code: ResponseCodeEnum.Success,
      users: userDocuments
        .filter((item) => !item.isDeleted)
        .map((item) => this.parseDocumentToData(item)) as IUserData[]
    };
  }

  async save(params: IUserSaveRequest): Promise<IUserSaveResponse> {
    const { user } = params;
    const now = dayJs.utc().toDate();

    let document;

    await MongooseHelper.startConnection();

    if (user.id) {
      document = await UserModel.findOneAndUpdate(
        { clientId: user.id },
        {
          name: user.username,
          phone: user.phone,
          role: user.role,
          shopId: user.shopId,
          organizationId: user.organizationId,
          isDeactivated: user.isDeactivated,
          isDeleted: user.isDeleted,
          updatedAt: now
        },
        { new: true }
      );
    } else {
      document = await UserModel.create({
        clientId: uuidV4(),
        name: user.username,
        phone: user.phone,
        role: user.role,
        shopId: user.shopId,
        organizationId: user.organizationId,
        createdAt: now
      });
    }

    return {
      code: ResponseCodeEnum.Success,
      user: this.parseDocumentToData(document)
    };
  }

  async delete(params: IUserDeleteRequest): Promise<IUserDeleteResponse> {
    const { id } = params;
    const document = await UserModel.findOneAndUpdate(
      { clientId: id },
      { isDeleted: true, updatedAt: dayJs.utc().toDate() }
    );

    return {
      code: ResponseCodeEnum.Success,
      user: this.parseDocumentToData(document)
    };
  }

  parseDocumentToData(document): IUserData {
    const {
      clientId,
      name,
      phone,
      role,
      shopId,
      organizationId,
      isDeactivated,
      isDeleted,
      createdAt,
      updatedAt
    } = document;

    return {
      id: clientId,
      username: name,
      phone,
      /**
       * Do not return encryptedPassword.
       */
      encryptedPassword: '',
      /**
       * Do not return salt.
       */
      salt: '',
      role,
      shopId,
      organizationId,
      isDeactivated,
      isDeleted,
      createdAt,
      updatedAt
    };
  }
}
