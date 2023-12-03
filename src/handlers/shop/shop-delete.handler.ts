import ShopManager from '../../managers/shop.manager';
import TokenManager from '../../managers/token.manager';
import { IShopDeleteRequest } from '../../route/request/shop-request.type';
import { IShopDeleteResponse } from '../../route/response/shop-response.type';
import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';

export default class ShopDeleteHandler extends BaseHandler {
  async handle(
    params: IHandlerParameterDataType
  ): Promise<IShopDeleteResponse> {
    const { requestData, fromToken } = params;

    new TokenManager().validate(fromToken);

    return await new ShopManager().delete(requestData as IShopDeleteRequest);
  }
}
