import MongooseHelper from '../helpers/mongoose.helper';
import { MarketActivityModel } from '../models/market-activity.model';
import {
  IMarketActivityDeleteRequest,
  IMarketActivityGetRequest,
  IMarketActivitySaveRequest
} from '../route/request/market-activity-request.type';
import { ResponseCodeEnum } from '../route/response/base-response.type';
import {
  IMarketActivityGetResponse,
  IMarketActivitySaveResponse,
  IMarketActivityDeleteResponse
} from '../route/response/market-activity-response.type';
import {
  MarketActivityDataType,
  MarketActivityRulePreconditionDataType
} from '../type/data/market-activity.type';
import { OrderDataType } from '../type/data/order.type';
import { PaymentDataType } from '../type/data/payment.type';
import BaseManager from './base.manager';

const dayJs = require('dayjs');
const { v4: uuidV4 } = require('uuid');

export default class MarketActivityManager extends BaseManager {
  async get(
    params: IMarketActivityGetRequest
  ): Promise<IMarketActivityGetResponse> {
    const { ids, organizationId, shopId, productId } = params;

    if (!ids.length && !organizationId && !shopId && !productId)
      throw new Error('ID is required');

    const query: {
      [key: string]:
        | {
            [key: string]: string | { [key: string]: string | string[] };
          }[];
    } = {};
    query['$or'] = [];

    if (organizationId) query.$or.push({ organizationId });
    if (ids.length) query.$or.push({ clientId: { $in: ids } });
    if (shopId) query.$or.push({ shopIds: { $contains: shopId } });
    if (productId) query.$or.push({ productId });

    await MongooseHelper.startConnection();

    const documents = await MarketActivityModel.find(query);

    return {
      code: ResponseCodeEnum.Success,
      marketActivities: documents.map((document) =>
        this.parseDocumentToData(document)
      )
    };
  }

  async save(
    params: IMarketActivitySaveRequest
  ): Promise<IMarketActivitySaveResponse> {
    const { marketActivity } = params;
    const now = dayJs.utc().toDate();

    let document;

    await MongooseHelper.startConnection();

    if (marketActivity.id) {
      document = await MarketActivityModel.findOneAndUpdate(
        { clientId: marketActivity.id },
        {
          organizationId: marketActivity.organizationId,
          shopIds: marketActivity.shopIds,
          startDate: marketActivity.startDate,
          expiryDate: marketActivity.expiryDate,
          name: marketActivity.name,
          description: marketActivity.description,
          rule: marketActivity.rule,
          isDeleted: marketActivity.isDeleted,
          updatedAt: now
        },
        { new: true }
      );
    } else {
      document = await MarketActivityModel.create({
        clientId: uuidV4(),
        organizationId: marketActivity.organizationId,
        shopIds: marketActivity.shopIds,
        startDate: marketActivity.startDate,
        expiryDate: marketActivity.expiryDate,
        name: marketActivity.name,
        description: marketActivity.description,
        rule: marketActivity.rule,
        createdAt: now
      });
    }

    return {
      code: ResponseCodeEnum.Success,
      marketActivity: this.parseDocumentToData(document)
    };
  }

  async delete(
    params: IMarketActivityDeleteRequest
  ): Promise<IMarketActivityDeleteResponse> {
    const { id } = params;

    if (!id) throw new Error('ID is required');

    await MongooseHelper.startConnection();

    const document = await MarketActivityModel.findOneAndUpdate(
      { clientId: id },
      { isDeleted: true, updatedAt: dayJs.utc().toDate() },
      { new: true }
    );

    return {
      code: ResponseCodeEnum.Success,
      marketActivity: this.parseDocumentToData(document)
    };
  }

  validatePrecondition(
    precondition: MarketActivityRulePreconditionDataType,
    order?: OrderDataType
  ): boolean {
    const { product, productCategory } = precondition;

    if (product) {
      const { id, minQuantity, minPrice } = product;

      const purchasedProduct = order?.products.find(
        (orderProduct) => orderProduct.productId === id
      );

      if (
        !purchasedProduct ||
        purchasedProduct.quantity < minQuantity ||
        purchasedProduct.finalPrice < minPrice
      )
        return;
    }

    if (productCategory) {
      const { category, minQuantity, minPrice } = productCategory;

      const orderProducts = order?.products.filter(
        (orderProduct) => orderProduct.productCategory === category
      );

      if (!orderProducts?.length) return;

      if (minQuantity) {
        const totalQuantity = orderProducts.reduce(
          (total, orderProduct) => total + orderProduct.quantity,
          0
        );

        if (totalQuantity < minQuantity) return;
      }

      if (minPrice) {
        const totalPrice = orderProducts.reduce(
          (total, orderProduct) => total + orderProduct.finalPrice,
          0
        );

        if (totalPrice < minPrice) return;
      }
    }
  }

  parseDocumentToData(document: any): MarketActivityDataType {
    const {
      clientId,
      organizationId,
      shopIds,
      startDate,
      expiryDate,
      name,
      description,
      rule,
      isDeleted,
      createdAt,
      updatedAt
    } = document;

    return {
      id: clientId,
      organizationId,
      shopIds,
      startDate,
      expiryDate,
      name,
      description,
      rule,
      isDeleted,
      createdAt,
      updatedAt
    };
  }
}
