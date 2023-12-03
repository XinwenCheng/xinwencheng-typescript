import ProductManager from '../../managers/product.manager';
import TokenManager from '../../managers/token.manager';
import { IProductGetRequest } from '../../route/request/product-request.type';
import { IProductGetResponse } from '../../route/response/product-response.type';
import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';

export default class ProductGetHandler extends BaseHandler {
  async handle(
    params: IHandlerParameterDataType
  ): Promise<IProductGetResponse> {
    const { requestData, fromToken } = params;

    new TokenManager().validate(fromToken);

    return await new ProductManager().get(requestData as IProductGetRequest);
  }
}
