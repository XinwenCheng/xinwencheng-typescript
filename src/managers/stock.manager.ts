import MongooseHelper from '../helpers/mongoose.helper';
import { StockModel } from '../models/stock.model';
import {
  IStockGetRequest,
  IStockSaveRequest,
  IStockDeleteRequest
} from '../route/request/stock-request.type';
import { ResponseCodeEnum } from '../route/response/base-response.type';
import {
  IStockGetResponse,
  IStockSaveResponse,
  IStockDeleteResponse
} from '../route/response/stock-response.type';
import { IStockData } from '../type/data/stock.type';
import BaseManager from './base.manager';

const dayJs = require('dayjs');
const { v4: uuidV4 } = require('uuid');

export default class StockManager extends BaseManager {
  async get(params: IStockGetRequest): Promise<IStockGetResponse> {
    const {
      organizationId,
      shopId,
      productIds,
      productCategories,
      includeDeleted
    } = params;

    if (!organizationId) throw new Error('Organization ID is required.');

    const query = {
      organizationId
    };

    if (shopId) query['shopId'] = shopId;
    if (productIds) query['productId'] = { $in: productIds };
    if (productCategories)
      query['productCategory'] = { $in: productCategories };
    if (!includeDeleted) query['isDeleted'] = { $ne: true };

    await MongooseHelper.startConnection();

    const documents = await StockModel.find(query);

    return {
      code: ResponseCodeEnum.Success,
      stocks: documents.map((document) => this.parseDocumentToData(document))
    };
  }

  async save(params: IStockSaveRequest): Promise<IStockSaveResponse> {
    const { organizationId, shopId, productId, quantity, unit, unitPrice } =
      params.stock;

    if (!organizationId) throw new Error('Organization ID is required.');
    if (!productId) throw new Error('Product ID is required.');
    if (!quantity) throw new Error('Quantity is required.');
    if (!unit) throw new Error('Unit is required.');
    if (!unitPrice) throw new Error('Unit Price is required.');

    const now = dayJs.utc().toDate();

    await MongooseHelper.startConnection();

    const document = await StockModel.findOneAndUpdate(
      { organizationId, shopId, productId },
      {
        organizationId,
        shopId,
        productId,
        quantity,
        unit,
        unitPrice,
        createdAt: now,
        updatedAt: now
      },
      { upsert: true, new: true }
    );

    return {
      code: ResponseCodeEnum.Success,
      stock: this.parseDocumentToData(document)
    };
  }

  async delete(params: IStockDeleteRequest): Promise<IStockDeleteResponse> {
    const { organizationId, shopId, productId } = params.stock;
    const now = dayJs.utc().toDate();

    if (!organizationId) throw new Error('Organization ID is required.');
    if (!productId) throw new Error('Product ID is required.');

    await MongooseHelper.startConnection();

    const document = await StockModel.findOneAndUpdate(
      { organizationId, shopId, productId },
      { isDeleted: true, updatedAt: now },
      { new: true }
    );

    return {
      code: ResponseCodeEnum.Success,
      stock: this.parseDocumentToData(document)
    };
  }

  parseDocumentToData(document): IStockData {
    const { productId, organizationId, shopId, quantity, unit, unitPrice } =
      document;

    return {
      productId,
      organizationId,
      shopId,
      quantity,
      unit,
      unitPrice
    } as IStockData;
  }
}
