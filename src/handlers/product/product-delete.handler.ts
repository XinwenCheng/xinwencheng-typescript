import ProductManager from '../../managers/product.manager';
import TokenManager from '../../managers/token.manager';
import { IProductDeleteRequest } from '../../route/request/product-request.type';
import { IProductDeleteResponse } from '../../route/response/product-response.type';
import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';

export default class ProductDeleteHandler extends BaseHandler {
  async handle(
    params: IHandlerParameterDataType
  ): Promise<IProductDeleteResponse> {
    const { requestData, fromToken } = params;

    new TokenManager().validate(fromToken);

    return await new ProductManager().delete(
      requestData as IProductDeleteRequest
    );
  }
}
