const { v4: uuidV4 } = require('uuid');
const dayJs = require('dayjs');

import BaseManager from './base.manager';
import { SubscriptionDataType } from '../type/data/subscription.type';
import {
  ISubscriptionDeleteRequest,
  ISubscriptionGetRequest,
  ISubscriptionSaveRequest
} from '../route/request/subscription-request.type';
import { SubscriptionModel } from '../models/subscription.model';
import {
  ISubscriptionDeleteResponse,
  ISubscriptionGetResponse,
  ISubscriptionSaveResponse
} from '../route/response/subscription-response.type';
import { ResponseCodeEnum } from '../route/response/base-response.type';
import MongooseHelper from '../helpers/mongoose.helper';

export default class SubscriptionManager extends BaseManager {
  async get(
    params: ISubscriptionGetRequest
  ): Promise<ISubscriptionGetResponse> {
    const { ids, subscriberId, includeDeleted } = params;

    if (!ids.length && subscriberId) throw new Error('ID is required');

    const query = {};

    if (ids.length) query['clientId'] = { $in: ids };
    if (subscriberId) query['subscriberId'] = subscriberId;
    if (!includeDeleted) query['isDeleted'] = { $ne: true };

    const documents = await SubscriptionModel.find(query);

    return {
      code: ResponseCodeEnum.Success,
      subscriptions: documents.map((item) =>
        this.parseDocumentToData(item)
      ) as SubscriptionDataType[]
    };
  }

  async save(
    params: ISubscriptionSaveRequest
  ): Promise<ISubscriptionSaveResponse> {
    const {
      id,
      subscriberId,
      organizationId,
      duration,
      startDate,
      expiryDate
    } = params.subscription;
    const now = dayJs.utc().toDate();

    let document;

    await MongooseHelper.startConnection();

    if (id) {
      document = await SubscriptionModel.findOneAndUpdate(
        {
          clientId: id
        },
        {
          organizationId,
          subscriberId,
          duration,
          startDate,
          expiryDate,
          updatedAt: now
        },
        { new: true }
      );
    } else {
      document = await new SubscriptionModel({
        clientId: uuidV4(),
        organizationId,
        subscriberId,
        duration,
        startDate,
        expiryDate,
        createdAt: now
      }).save();
    }

    return {
      code: ResponseCodeEnum.Success,
      subscription: this.parseDocumentToData(document)
    };
  }

  async delete(
    params: ISubscriptionDeleteRequest
  ): Promise<ISubscriptionDeleteResponse> {
    const { id } = params;

    if (!id) throw new Error('ID is required');

    await MongooseHelper.startConnection();

    const document = await SubscriptionModel.findOneAndUpdate(
      { clientId: id },
      { isDeleted: true, updatedAt: dayJs.utc().toDate() },
      { new: true }
    );

    return {
      code: ResponseCodeEnum.Success,
      subscription: this.parseDocumentToData(document)
    };
  }

  parseDocumentToData(document): SubscriptionDataType {
    const {
      clientId,
      organizationId,
      subscriberId,
      duration,
      startDate,
      expiryDate,
      capability,
      createdAt,
      updatedAt
    } = document;

    return {
      id: clientId,
      organizationId,
      subscriberId,
      duration,
      startDate,
      expiryDate,
      capability,
      createdAt,
      updatedAt
    };
  }
}
