import MongooseHelper from '../helpers/mongoose.helper';
import { CouponModel } from '../models/coupon.model';
import {
  ICouponGetRequest,
  ICouponSaveRequest,
  ICouponDeleteRequest,
  ICouponCreateRequest
} from '../route/request/coupon-request.type';
import { ResponseCodeEnum } from '../route/response/base-response.type';
import {
  ICouponGetResponse,
  ICouponSaveResponse,
  ICouponDeleteResponse,
  ICouponCreateResponse
} from '../route/response/coupon-response.type';
import { ICouponData } from '../type/data/coupon.type';
import { IMarketActivityData } from '../type/data/market-activity.type';
import { IOrderData } from '../type/data/order.type';
import { IPaymentData } from '../type/data/payment.type';
import BaseManager from './base.manager';
import MarketActivityManager from './market-activity.manager';
import OrderManager from './order.manager';
import PaymentManager from './payment.manager';
import ProductManager from './product.manager';

const dayJs = require('dayjs');
const { v4: uuidV4 } = require('uuid');

export default class CouponManager extends BaseManager {
  async get(params: ICouponGetRequest): Promise<ICouponGetResponse> {
    const {
      ids,
      organizationId,
      shopId,
      marketActivityId,
      userId,
      includeDeleted
    } = params;

    if (
      !ids.length &&
      !organizationId &&
      !shopId &&
      !marketActivityId &&
      !userId
    )
      throw new Error('ID is required');

    const query: {
      [key: string]:
        | string
        | boolean
        | { [key: string]: boolean | string | string[] };
    } = {};

    if (ids.length) query.id = { $in: ids };
    if (organizationId) query.organizationId = organizationId;
    if (shopId) query.shopIds = { $contains: shopId };
    if (marketActivityId) query.marketActivityId = marketActivityId;
    if (userId) query.userId = userId;

    query.isDeleted = includeDeleted ? true : { $ne: true };

    await MongooseHelper.startConnection();

    const documents = await CouponModel.find(query);

    return {
      code: ResponseCodeEnum.Success,
      coupons: documents.map((document) => this.parseDocumentToData(document))
    };
  }

  async save(params: ICouponSaveRequest): Promise<ICouponSaveResponse> {
    const { coupon } = params;
    const now = dayJs.utc().toDate();

    let document;

    await MongooseHelper.startConnection();

    if (coupon.id) {
      document = await CouponModel.findOneAndUpdate(
        { clientId: coupon.id },
        {
          name: coupon.name,
          description: coupon.description,
          organizationId: coupon.organizationId,
          shopIds: coupon.shopIds,
          marketActivityId: coupon.marketActivityId,
          userId: coupon.userId,
          startDate: coupon.startDate,
          expiryDate: coupon.expiryDate,
          usedAt: coupon.usedAt,
          isMandatoryExpired: coupon.isMandatoryExpired,
          isDeleted: coupon.isDeleted,
          updatedAt: now
        },
        { new: true }
      );
    } else {
      document = await new CouponModel({
        clientId: uuidV4(),
        name: coupon.name,
        description: coupon.description,
        organizationId: coupon.organizationId,
        shopIds: coupon.shopIds,
        marketActivityId: coupon.marketActivityId,
        userId: coupon.userId,
        startDate: coupon.startDate,
        expiryDate: coupon.expiryDate,
        createdAt: now
      }).save();
    }

    return {
      code: ResponseCodeEnum.Success,
      coupon: this.parseDocumentToData(document)
    };
  }

  async delete(params: ICouponDeleteRequest): Promise<ICouponDeleteResponse> {
    const { id } = params;

    if (!id) throw new Error('ID is required');

    await MongooseHelper.startConnection();

    const document = await CouponModel.findOneAndUpdate(
      { clientId: id },
      { isDeleted: true, updatedAt: dayJs.utc().toDate() },
      { new: true }
    );

    return {
      code: ResponseCodeEnum.Success,
      coupon: this.parseDocumentToData(document)
    };
  }

  async create(params: ICouponCreateRequest): Promise<ICouponCreateResponse> {
    const { organizationId, paymentId, marketActivityId, userId } = params;

    if (!organizationId || (!paymentId && !marketActivityId && !userId))
      throw new Error('ID is required');

    let order: IOrderData | undefined;
    let payment: IPaymentData | undefined;
    let shopId: string | undefined;

    if (paymentId) {
      const { payments } = await new PaymentManager().get({
        ids: [paymentId]
      });

      if (payments.length) {
        payment = payments[0];
        const { id: orderId, type } = payment.good;

        const { orders } = await new OrderManager().get({
          ids: [orderId]
        });

        if (orders.length) {
          order = orders[0];
          shopId = order.shopId;
        }
      }
    }

    // Find out all market activities which is able to create coupon.
    const { marketActivities } = await new MarketActivityManager().get({
      organizationId,
      ids: [marketActivityId],
      shopId
    });

    if (!marketActivities.length)
      return {
        code: ResponseCodeEnum.NotFound,
        message: 'No available market activity found.'
      };

    const coupons: ICouponData[] = [];

    // Create coupon for each market activity.
    for (let index = 0; index < marketActivities.length; index++) {
      const coupon = await this.createCoupon({
        marketActivity: marketActivities[index],
        userId,
        order,
        payment
      });

      if (coupon) coupons.push(coupon);
    }

    return {
      code: ResponseCodeEnum.Success,
      coupons
    };
  }

  async createCoupon(params: {
    marketActivity: IMarketActivityData;
    userId: string;
    order?: IOrderData;
    payment?: IPaymentData;
  }): Promise<ICouponData | undefined> {
    const { marketActivity, userId, order, payment } = params;

    // Order with coupon is not allowed to create new coupon.
    if (order.couponId) return;

    const {
      id,
      name,
      description,
      organizationId,
      shopIds,
      startDate,
      expiryDate,
      rule
    } = marketActivity;

    const couponData: ICouponData = {
      id: `${uuidV4()}`,
      name,
      description,
      organizationId,
      marketActivityId: id,
      shopIds,
      startDate,
      expiryDate,
      userId,
      rule,
      createdAt: dayJs.utc().toDate()
    };
    const { precondition } = rule;

    // Precondition requires payment for couppon creation.
    if (precondition && !payment) return;

    if (
      precondition &&
      !new MarketActivityManager().validatePrecondition(precondition, order)
    )
      return;

    const { coupon } = await this.save({ coupon: couponData });

    return coupon;
  }

  async use(id: string): Promise<ICouponData | undefined> {
    if (!id) throw new Error('ID is required');

    await MongooseHelper.startConnection();

    const now = dayJs.utc().toDate();

    const document = await CouponModel.findOneAndUpdate(
      { clientId: id, isDeleted: { $ne: true } },
      { usedAt: now, updatedAt: now },
      { new: true }
    );

    return this.parseDocumentToData(document);
  }

  parseDocumentToData(document): ICouponData {
    const {
      clientId,
      name,
      description,
      organizationId,
      shopIds,
      marketActivityId,
      userId,
      startDate,
      expiryDate,
      usedAt,
      isMandatoryExpired,
      rule,
      isDeleted,
      createdAt,
      updatedAt
    } = document;

    return {
      id: clientId,
      name,
      description,
      organizationId,
      shopIds,
      marketActivityId,
      userId,
      startDate,
      expiryDate,
      usedAt,
      isMandatoryExpired,
      rule,
      isDeleted,
      createdAt,
      updatedAt
    };
  }
}
