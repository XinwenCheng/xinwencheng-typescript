import SubscriptionManager from '../../managers/subscription.manager';
import TokenManager from '../../managers/token.manager';
import { ISubscriptionDeleteRequest } from '../../route/request/subscription-request.type';
import { ISubscriptionDeleteResponse } from '../../route/response/subscription-response.type';
import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';

export default class SubscriptionDeleteHandler extends BaseHandler {
  async handle(
    params: IHandlerParameterDataType
  ): Promise<ISubscriptionDeleteResponse> {
    const { requestData, fromToken } = params;

    new TokenManager().validate(fromToken);

    return await new SubscriptionManager().delete(
      requestData as ISubscriptionDeleteRequest
    );
  }
}
