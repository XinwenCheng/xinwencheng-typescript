import MarketActivityManager from '../../managers/market-activity.manager';
import TokenManager from '../../managers/token.manager';
import { IMarketActivityGetRequest } from '../../route/request/market-activity-request.type';
import { IMarketActivityGetResponse } from '../../route/response/market-activity-response.type';
import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';

export default class MarketActivityGetHandler extends BaseHandler {
  async handle(
    params: IHandlerParameterDataType
  ): Promise<IMarketActivityGetResponse> {
    const { requestData, fromToken } = params;

    new TokenManager().validate(fromToken);

    return await new MarketActivityManager().get(
      requestData as IMarketActivityGetRequest
    );
  }
}
