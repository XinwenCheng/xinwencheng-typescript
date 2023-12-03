import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';
import { IMarketActivityDeleteRequest } from '../../route/request/market-activity-request.type';
import MarketActivityManager from '../../managers/market-activity.manager';
import TokenManager from '../../managers/token.manager';
import { IMarketActivityDeleteResponse } from '../../route/response/market-activity-response.type';

export default class MarketActivityDeleteHandler extends BaseHandler {
  async handle(
    params: IHandlerParameterDataType
  ): Promise<IMarketActivityDeleteResponse> {
    const { requestData, fromToken } = params;

    new TokenManager().validate(fromToken);

    return await new MarketActivityManager().delete(
      requestData as IMarketActivityDeleteRequest
    );
  }
}
