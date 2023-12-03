const dayJs = require('dayjs');
const { v4: uuidV4 } = require('uuid');

import MongooseHelper from '../helpers/mongoose.helper';
import { ProductModel } from '../models/product.model';
import {
  IProductGetRequest,
  IProductSaveRequest,
  IProductDeleteRequest
} from '../route/request/product-request.type';
import { ResponseCodeEnum } from '../route/response/base-response.type';
import {
  IProductDeleteResponse,
  IProductGetResponse,
  IProductSaveResponse
} from '../route/response/product-response.type';
import { IProductData } from '../type/data/product.type';
import BaseManager from './base.manager';

export default class ProductManager extends BaseManager {
  async get(params: IProductGetRequest): Promise<IProductGetResponse> {
    const { ids } = params;

    if (!ids.length) throw new Error('Product ID is required');

    const document = await ProductModel.find({ clientId: { $in: ids } });

    return {
      code: ResponseCodeEnum.Success,
      products: document.map((document) => this.parseDocumentToData(document))
    };
  }

  async save(params: IProductSaveRequest): Promise<IProductSaveResponse> {
    const { product } = params;
    const now = dayJs.utc().toDate();

    let document;

    await MongooseHelper.startConnection();

    if (product.id) {
      document = await ProductModel.findOneAndUpdate(
        { clientId: product.id },
        {
          name: product.name,
          description: product.description,
          category: product.category,
          isDeactivated: product.isDeactivated,
          isDeleted: product.isDeleted,
          updatedAt: now
        },
        { new: true }
      );
    } else {
      document = await new ProductModel({
        clientId: uuidV4(),
        name: product.name,
        description: product.description,
        organizationId: product.organizationId,
        category: product.category,
        createdAt: now
      }).save();
    }

    return {
      code: ResponseCodeEnum.Success,
      product: this.parseDocumentToData(document)
    };
  }

  async delete(params: IProductDeleteRequest): Promise<IProductDeleteResponse> {
    const { id } = params;

    if (!id) throw new Error('Product ID is required');

    await MongooseHelper.startConnection();

    const document = await ProductModel.findOneAndUpdate(
      { clientId: id },
      { isDeleted: true, updatedAt: dayJs.utc().toDate() },
      { new: true }
    );

    return {
      code: ResponseCodeEnum.Success,
      product: this.parseDocumentToData(document)
    };
  }

  parseDocumentToData(document): IProductData {
    return {
      id: document.clientId,
      name: document.name,
      description: document.description,
      organizationId: document.organizationId,
      category: document.category,
      isDeactivated: document.isDeactivated,
      isDeleted: document.isDeleted,
      createdAt: dayJs.utc(document.createdAt).format(),
      updatedAt: dayJs.utc(document.updatedAt).format()
    };
  }
}
