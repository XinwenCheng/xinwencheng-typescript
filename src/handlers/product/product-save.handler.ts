import ProductManager from '../../managers/product.manager';
import TokenManager from '../../managers/token.manager';
import { IProductSaveRequest } from '../../route/request/product-request.type';
import { IProductSaveResponse } from '../../route/response/product-response.type';
import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';

export default class ProductSaveHandler extends BaseHandler {
  async handle(
    params: IHandlerParameterDataType
  ): Promise<IProductSaveResponse> {
    const { requestData, fromToken } = params;

    new TokenManager().validate(fromToken);

    return await new ProductManager().save(requestData as IProductSaveRequest);
  }
}
