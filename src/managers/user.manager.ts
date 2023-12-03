const dayJs = require('dayjs');
const { v4: uuidV4 } = require('uuid');

import BaseManager from './base.manager';
import { UserDataType } from '../type/data/user.type';
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
    console.log('UserManager.getUsers() params:', JSON.stringify(params)); // TODO: Remove Before Flight!

    const { ids, names, shopId, organizationId } = params;
    const query: {
      [key: string]: string | { [key: string]: string | string[] };
    } = {
      organizationId
    };

    if (ids?.length) {
      query.clientId = { $in: ids };
    }

    if (names?.length) {
      query.name = { $in: names };
    }

    if (shopId) {
      query.shopId = shopId;
    }

    const userDocuments = await UserModel.find(query);

    console.log(
      'UserManager.getTags() userDocuments:',
      JSON.stringify(userDocuments)
    ); // TODO: Remove Before Flight!

    return {
      code: ResponseCodeEnum.Success,
      users: userDocuments
        .filter((item) => !item.isDeleted)
        .map((item) => this.parseDocumentToData(item)) as UserDataType[]
    };
  }

  async save(params: IUserSaveRequest): Promise<IUserSaveResponse> {
    console.log('UserManager.saveUser() params:', JSON.stringify(params)); // TODO: Remove Before Flight!

    const { user } = params;
    const now = dayJs.utc().toDate();

    let document;

    await MongooseHelper.startConnection();

    if (user.id) {
      document = await UserModel.findOneAndUpdate(
        { clientId: user.id },
        {
          name: user.name,
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
        name: user.name,
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
    console.log('UserManager.deleteUser() params:', JSON.stringify(params)); // TODO: Remove Before Flight!

    const { id } = params;
    const document = await UserModel.findOneAndUpdate(
      { clientId: id },
      { isDeleted: true, updatedAt: dayJs.utc().toDate() }
    );

    console.log('UserManager.deleteUser() document:', JSON.stringify(document)); // TODO: Remove Before Flight!

    return {
      code: ResponseCodeEnum.Success,
      user: this.parseDocumentToData(document)
    };
  }

  parseDocumentToData(document): UserDataType {
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
      name,
      phone,
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
