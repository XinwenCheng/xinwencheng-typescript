const dayJs = require('dayjs');
const { v4: uuidV4 } = require('uuid');

import MongooseHelper from '../helpers/mongoose.helper';
import { OrderModel } from '../models/order.model';
import {
  IOrderGetRequest,
  IOrderSaveRequest,
  IOrderDeleteRequest
} from '../route/request/order-request.type';
import { ResponseCodeEnum } from '../route/response/base-response.type';
import {
  IOrderGetResponse,
  IOrderSaveResponse,
  IOrderDeleteResponse
} from '../route/response/order-response.type';
import { CouponDataType } from '../type/data/coupon.type';
import {
  DiscountMarketActivityRuleDataType,
  FreeMarketActivityRuleDataType
} from '../type/data/market-activity.type';
import { OrderDataType, OrderProductDataType } from '../type/data/order.type';
import BaseManager from './base.manager';
import CouponManager from './coupon.manager';
import MarketActivityManager from './market-activity.manager';
import ProductManager from './product.manager';

export default class OrderManager extends BaseManager {
  async get(params: IOrderGetRequest): Promise<IOrderGetResponse> {
    const { ids, userId, includeDeleted } = params;

    if (!ids.length && !userId) throw new Error('ID is required');

    const query: {
      [key: string]: string | boolean | { [key: string]: string[] | boolean };
    } = {};

    if (userId) query.userId = userId;
    if (ids.length) query.id = { $in: ids };

    query.isDeleted = includeDeleted ? true : { $ne: true };

    await MongooseHelper.startConnection();

    const documents = await OrderModel.find(query);

    return {
      code: ResponseCodeEnum.Success,
      orders: documents.map((document) => this.parseDocumentToData(document))
    };
  }

  async save(params: IOrderSaveRequest): Promise<IOrderSaveResponse> {
    const { order } = params;

    let document;
    let usedCoupon: CouponDataType | undefined;

    await MongooseHelper.startConnection();

    if (order.id) {
      document = await OrderModel.findOneAndUpdate(
        { clientId: order.id },
        {
          organizationId: order.organizationId,
          shopId: order.shopId,
          userId: order.userId,
          products: order.products,
          couponId: order.couponId,
          isDeleted: order.isDeleted,
          updatedAt: dayJs.utc().toDate()
        },
        { new: true }
      );
    } else {
      if (order.couponId) {
        const { coupons } = await new CouponManager().get({
          ids: [order.couponId]
        });

        const coupon = coupons?.length ? coupons[0] : undefined;
        const now = dayJs.utc().toDate();

        if (coupon?.expiryDate < now) {
          const { precondition } = coupon.rule;

          if (
            !precondition ||
            new MarketActivityManager().validatePrecondition(
              precondition,
              order
            )
          )
            usedCoupon = coupon;
        }
      }

      const orderDocument = await this.newOrderDocument(order, usedCoupon);

      document = await OrderModel.create(orderDocument);

      if (usedCoupon) await new CouponManager().use(usedCoupon.id);
    }

    return {
      code: ResponseCodeEnum.Success,
      order: this.parseDocumentToData(document)
    };
  }

  async delete(params: IOrderDeleteRequest): Promise<IOrderDeleteResponse> {
    const { id } = params;

    if (!id) throw new Error('ID is required');

    await MongooseHelper.startConnection();

    const document = await OrderModel.findOneAndUpdate(
      { clientId: id },
      { isDeleted: true, updatedAt: dayJs.utc().toDate() },
      { new: true }
    );

    return {
      code: ResponseCodeEnum.Success,
      order: this.parseDocumentToData(document)
    };
  }

  async newOrderDocument(order: OrderDataType, coupon?: CouponDataType) {
    const orderDocument = {
      clientId: uuidV4(),
      organizationId: order.organizationId,
      shopId: order.shopId,
      userId: order.userId,
      products: order.products,
      price: order.price,
      couponId: order.couponId,
      createdAt: dayJs.utc().toDate()
    };

    if (coupon) {
      const { rule } = coupon;

      if (rule.type === 'discount') {
        const { discount } = rule as DiscountMarketActivityRuleDataType;

        if (discount.unit === 'price') {
          orderDocument.price.final = Math.max(
            orderDocument.price.final - discount.quantity,
            0
          );
        } else if (discount.unit === 'percent') {
          orderDocument.price.final = Math.max(
            orderDocument.price.final -
              orderDocument.price.final * (discount.quantity / 100),
            0
          );
        }
      } else if (rule.type === 'free') {
        const freeRule = rule as FreeMarketActivityRuleDataType;

        let orderProduct = orderDocument.products.find(
          (item) => item.productId === freeRule.productId
        );

        let presentedQuantity = freeRule.purchasedQuantity
          ? Math.floor(orderProduct.quantity / freeRule.purchasedQuantity) *
            freeRule.presentedQuantity
          : freeRule.presentedQuantity;

        if (freeRule)
          if (orderProduct) {
            orderProduct.quantity += presentedQuantity;
          } else {
            const { products } = await new ProductManager().get({
              ids: [freeRule.productId]
            });

            orderProduct = products?.length
              ? {
                  productId: products[0].id,
                  productCategory: products[0].category,
                  quantity: presentedQuantity,
                  finalPrice: 0
                }
              : undefined;

            orderDocument.products.push(orderProduct);
          }
      }
    }

    return orderDocument;
  }

  parseDocumentToData(document: any): OrderDataType {
    const {
      clientId,
      organizationId,
      shopId,
      userId,
      products,
      couponId,
      price,
      isDeleted,
      createdAt,
      updatedAt
    } = document;

    return {
      id: clientId,
      organizationId,
      shopId,
      userId,
      products,
      couponId,
      price,
      isDeleted,
      createdAt,
      updatedAt
    };
  }
}
