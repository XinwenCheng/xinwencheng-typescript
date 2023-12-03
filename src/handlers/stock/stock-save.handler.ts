import StockManager from '../../managers/stock.manager';
import TokenManager from '../../managers/token.manager';
import { IStockSaveRequest } from '../../route/request/stock-request.type';
import { IStockSaveResponse } from '../../route/response/stock-response.type';
import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';

export default class StockSaveHandler extends BaseHandler {
  async handle(params: IHandlerParameterDataType): Promise<IStockSaveResponse> {
    const { requestData, fromToken } = params;

    new TokenManager().validate(fromToken);

    return await new StockManager().save(requestData as IStockSaveRequest);
  }
}
