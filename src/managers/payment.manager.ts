import MongooseHelper from '../helpers/mongoose.helper';
import { PaymentModel } from '../models/payment.model';
import {
  IPaymentGetRequest,
  IPaymentSaveRequest,
  IPaymentDeleteRequest
} from '../route/request/payment-request.type';
import { ResponseCodeEnum } from '../route/response/base-response.type';
import {
  IPaymentGetResponse,
  IPaymentSaveResponse,
  IPaymentDeleteResponse
} from '../route/response/payment-response.type';
import { PaymentDataType } from '../type/data/payment.type';
import BaseManager from './base.manager';

const dayJs = require('dayjs');
const { v4: uuidV4 } = require('uuid');

export default class PaymentManager extends BaseManager {
  async get(params: IPaymentGetRequest): Promise<IPaymentGetResponse> {
    const { ids, userId, orderId } = params;

    if (!ids.length && !userId && !orderId) throw new Error('ID is required');

    const query: { [key: string]: string | { [key: string]: string[] } } = {};

    if (ids.length) query.clientId = { $in: ids };
    if (userId) query.userId = userId;
    if (orderId) query.orderId = orderId;

    await MongooseHelper.startConnection();

    const documents = await PaymentModel.find(query);

    return {
      code: ResponseCodeEnum.Success,
      payments: documents.map((document) => this.parseDocumentToData(document))
    };
  }

  async save(params: IPaymentSaveRequest): Promise<IPaymentSaveResponse> {
    const { payment } = params;
    const now = dayJs.utc().toDate();

    let document;

    await MongooseHelper.startConnection();

    if (payment.id) {
      document = await PaymentModel.findOneAndUpdate(
        { clientId: payment.id },
        {
          orderId: payment.orderId,
          userId: payment.userId,
          couponId: payment.couponId,
          totalPrice: payment.totalPrice,
          finalPrice: payment.finalPrice,
          receiptId: payment.receiptId,
          status: payment.status,
          isDeleted: payment.isDeleted,
          updatedAt: now
        },
        { new: true }
      );
    } else {
      document = await PaymentModel.create({
        clientId: uuidV4(),
        orderId: payment.orderId,
        userId: payment.userId,
        couponId: payment.couponId,
        totalPrice: payment.totalPrice,
        finalPrice: payment.finalPrice,
        receiptId: payment.receiptId,
        status: payment.status,
        createdAt: now
      });
    }

    return {
      code: ResponseCodeEnum.Success,
      payment: this.parseDocumentToData(document)
    };
  }

  async delete(params: IPaymentDeleteRequest): Promise<IPaymentDeleteResponse> {
    const { id } = params;

    if (!id) throw new Error('ID is required');

    await MongooseHelper.startConnection();

    const document = await PaymentModel.findOneAndUpdate(
      { clientId: id },
      { isDeleted: true, updatedAt: dayJs.utc().toDate() },
      { new: true }
    );

    return {
      code: ResponseCodeEnum.Success,
      payment: this.parseDocumentToData(document)
    };
  }

  parseDocumentToData(document: any): PaymentDataType {
    const {
      clientId,
      orderId,
      userId,
      couponId,
      totalPrice,
      finalPrice,
      receiptId,
      status,
      isDeleted,
      createdAt,
      updatedAt
    } = document;

    return {
      id: clientId,
      orderId,
      userId,
      couponId,
      totalPrice,
      finalPrice,
      receiptId,
      status,
      isDeleted,
      createdAt,
      updatedAt
    };
  }
}
