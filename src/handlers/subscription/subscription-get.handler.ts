import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';
import SubscriptionManager from '../../managers/subscription.manager';
import { ISubscriptionGetRequest } from '../../route/request/subscription-request.type';
import { ISubscriptionGetResponse } from '../../route/response/subscription-response.type';
import TokenManager from '../../managers/token.manager';

export default class SubscriptionGetHandler extends BaseHandler {
  async handle(
    params: IHandlerParameterDataType
  ): Promise<ISubscriptionGetResponse> {
    const { requestData, fromToken } = params;

    new TokenManager().validate(fromToken);

    return await new SubscriptionManager().get(
      requestData as ISubscriptionGetRequest
    );
  }
}
