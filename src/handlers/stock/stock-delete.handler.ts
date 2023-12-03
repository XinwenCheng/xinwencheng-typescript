import StockManager from '../../managers/stock.manager';
import TokenManager from '../../managers/token.manager';
import { IStockDeleteRequest } from '../../route/request/stock-request.type';
import { IStockDeleteResponse } from '../../route/response/stock-response.type';
import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';

export default class StockDeleteHandler extends BaseHandler {
  async handle(
    params: IHandlerParameterDataType
  ): Promise<IStockDeleteResponse> {
    const { requestData, fromToken } = params;

    new TokenManager().validate(fromToken);

    return await new StockManager().delete(requestData as IStockDeleteRequest);
  }
}
