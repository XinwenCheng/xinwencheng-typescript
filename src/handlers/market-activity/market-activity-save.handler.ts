import MarketActivityManager from '../../managers/market-activity.manager';
import TokenManager from '../../managers/token.manager';
import { IMarketActivitySaveRequest } from '../../route/request/market-activity-request.type';
import { IMarketActivitySaveResponse } from '../../route/response/market-activity-response.type';
import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';

export default class MarketActivitySaveHandler extends BaseHandler {
  async handle(
    params: IHandlerParameterDataType
  ): Promise<IMarketActivitySaveResponse> {
    const { requestData, fromToken } = params;

    new TokenManager().validate(fromToken);

    return await new MarketActivityManager().save(
      requestData as IMarketActivitySaveRequest
    );
  }
}
