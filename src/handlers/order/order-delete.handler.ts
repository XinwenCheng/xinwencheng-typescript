import OrderManager from '../../managers/order.manager';
import TokenManager from '../../managers/token.manager';
import { IOrderDeleteRequest } from '../../route/request/order-request.type';
import { IOrderDeleteResponse } from '../../route/response/order-response.type';
import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';

export default class OrderDeleteHandler extends BaseHandler {
  async handle(
    params: IHandlerParameterDataType
  ): Promise<IOrderDeleteResponse> {
    const { requestData, fromToken } = params;

    new TokenManager().validate(fromToken);

    return await new OrderManager().delete(requestData as IOrderDeleteRequest);
  }
}
