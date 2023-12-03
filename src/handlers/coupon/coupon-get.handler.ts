import CouponManager from '../../managers/coupon.manager';
import TokenManager from '../../managers/token.manager';
import { ICouponGetRequest } from '../../route/request/coupon-request.type';
import { ICouponGetResponse } from '../../route/response/coupon-response.type';
import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';

export default class CouponGetHandler extends BaseHandler {
  async handle(params: IHandlerParameterDataType): Promise<ICouponGetResponse> {
    const { requestData, fromToken } = params;

    new TokenManager().validate(fromToken);

    return await new CouponManager().get(requestData as ICouponGetRequest);
  }
}
