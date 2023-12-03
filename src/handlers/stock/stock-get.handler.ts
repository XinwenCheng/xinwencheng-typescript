import StockManager from '../../managers/stock.manager';
import TokenManager from '../../managers/token.manager';
import { IStockGetRequest } from '../../route/request/stock-request.type';
import { IStockGetResponse } from '../../route/response/stock-response.type';
import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';

export default class StockGetHandler extends BaseHandler {
  async handle(params: IHandlerParameterDataType): Promise<IStockGetResponse> {
    const { requestData, fromToken } = params;

    new TokenManager().validate(fromToken);

    return await new StockManager().get(requestData as IStockGetRequest);
  }
}
