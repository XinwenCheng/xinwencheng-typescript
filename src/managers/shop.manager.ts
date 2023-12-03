const dayJs = require('dayjs');
const { v4: uuidV4 } = require('uuid');

import BaseManager from './base.manager';
import {
  IShopGetRequest,
  IShopSaveRequest,
  IShopDeleteRequest
} from '../route/request/shop-request.type';
import {
  IShopGetResponse,
  IShopSaveResponse,
  IShopDeleteResponse
} from '../route/response/shop-response.type';
import MongooseHelper from '../helpers/mongoose.helper';
import { ShopModel } from '../models/shop.model';
import { ResponseCodeEnum } from '../route/response/base-response.type';
import { ShopDataType } from '../type/data/shop.type';

export default class ShopManager extends BaseManager {
  async get(params: IShopGetRequest): Promise<IShopGetResponse> {
    const { ids } = params;

    if (!ids.length) throw new Error('Shop ID is required');

    await MongooseHelper.startConnection();

    const documents = await ShopModel.find({ clientId: { $in: ids } });

    return {
      code: ResponseCodeEnum.Success,
      shops: documents.map((document) => this.parseDocumentToData(document))
    };
  }

  async save(params: IShopSaveRequest): Promise<IShopSaveResponse> {
    const { shop } = params;
    const now = dayJs.utc().toDate();

    let document;

    await MongooseHelper.startConnection();

    if (shop.id) {
      document = await ShopModel.findOneAndUpdate(
        { clientId: shop.id },
        {
          name: shop.name,
          description: shop.description,
          location: shop.location,
          url: shop.url,
          workingHours: shop.workingHours,
          isOnline: shop.isOnline,
          isDeactivated: shop.isDeactivated,
          isDeleted: shop.isDeleted,
          updatedAt: now
        },
        { new: true }
      );
    } else {
      document = await new ShopModel({
        clientId: uuidV4(),
        managerId: shop.managerId,
        name: shop.name,
        description: shop.description,
        location: shop.location,
        url: shop.url,
        workingHours: shop.workingHours,
        isOnline: shop.isOnline,
        createdAt: now
      }).save();
    }

    return {
      code: ResponseCodeEnum.Success,
      shop: this.parseDocumentToData(document)
    };
  }

  async delete(params: IShopDeleteRequest): Promise<IShopDeleteResponse> {
    const { id } = params;

    await MongooseHelper.startConnection();

    const document = await ShopModel.findOneAndUpdate(
      { clientId: id },
      {
        isDeleted: true,
        updatedAt: dayJs.utc().toDate()
      },
      { new: true }
    );

    return {
      code: ResponseCodeEnum.Success,
      shop: this.parseDocumentToData(document)
    };
  }

  parseDocumentToData(document: any): ShopDataType {
    return {
      id: document.clientId,
      managerId: document.managerId,
      name: document.name,
      description: document.description,
      location: document.location,
      url: document.url,
      workingHours: document.workingHours,
      isOnline: document.isOnline,
      isDeactivated: document.deactivated,
      isDeleted: document.isDeleted,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt
    };
  }
}
