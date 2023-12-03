import SubscriptionManager from '../../managers/subscription.manager';
import TokenManager from '../../managers/token.manager';
import { ISubscriptionSaveRequest } from '../../route/request/subscription-request.type';
import { ISubscriptionSaveResponse } from '../../route/response/subscription-response.type';
import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';

export default class SubscriptionSaveHandler extends BaseHandler {
  async handle(
    params: IHandlerParameterDataType
  ): Promise<ISubscriptionSaveResponse> {
    const { requestData, fromToken } = params;

    new TokenManager().validate(fromToken);

    return await new SubscriptionManager().save(
      requestData as ISubscriptionSaveRequest
    );
  }
}
