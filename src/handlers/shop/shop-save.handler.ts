import ShopManager from '../../managers/shop.manager';
import TokenManager from '../../managers/token.manager';
import { IShopSaveRequest } from '../../route/request/shop-request.type';
import { IShopSaveResponse } from '../../route/response/shop-response.type';
import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';

export default class ShopSaveHandler extends BaseHandler {
  async handle(params: IHandlerParameterDataType): Promise<IShopSaveResponse> {
    const { requestData, fromToken } = params;

    new TokenManager().validate(fromToken);

    return await new ShopManager().save(requestData as IShopSaveRequest);
  }
}
