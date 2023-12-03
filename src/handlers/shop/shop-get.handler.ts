import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';
import { IShopGetRequest } from '../../route/request/shop-request.type';
import ShopManager from '../../managers/shop.manager';
import TokenManager from '../../managers/token.manager';
import { IShopGetResponse } from '../../route/response/shop-response.type';

export default class ShopGetHandler extends BaseHandler {
  async handle(params: IHandlerParameterDataType): Promise<IShopGetResponse> {
    const { requestData, fromToken } = params;

    new TokenManager().validate(fromToken);

    return await new ShopManager().get(requestData as IShopGetRequest);
  }
}
