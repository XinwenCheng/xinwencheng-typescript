import OrderManager from '../../managers/order.manager';
import TokenManager from '../../managers/token.manager';
import { IOrderSaveRequest } from '../../route/request/order-request.type';
import { IOrderSaveResponse } from '../../route/response/order-response.type';
import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';

export default class OrderSaveHandler extends BaseHandler {
  async handle(params: IHandlerParameterDataType): Promise<IOrderSaveResponse> {
    const { requestData, fromToken } = params;

    new TokenManager().validate(fromToken);

    return await new OrderManager().save(requestData as IOrderSaveRequest);
  }
}
