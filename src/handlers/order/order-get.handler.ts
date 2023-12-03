import OrderManager from '../../managers/order.manager';
import TokenManager from '../../managers/token.manager';
import { IOrderGetRequest } from '../../route/request/order-request.type';
import { IOrderGetResponse } from '../../route/response/order-response.type';
import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';

export default class OrderGetHandler extends BaseHandler {
  async handle(params: IHandlerParameterDataType): Promise<IOrderGetResponse> {
    const { requestData, fromToken } = params;

    new TokenManager().validate(fromToken);

    return await new OrderManager().get(requestData as IOrderGetRequest);
  }
}
