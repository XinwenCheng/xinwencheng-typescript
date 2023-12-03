import CouponManager from '../../managers/coupon.manager';
import TokenManager from '../../managers/token.manager';
import { ICouponDeleteRequest } from '../../route/request/coupon-request.type';
import { ICouponDeleteResponse } from '../../route/response/coupon-response.type';
import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';

export default class CouponDeleteHandler extends BaseHandler {
  async handle(
    params: IHandlerParameterDataType
  ): Promise<ICouponDeleteResponse> {
    const { requestData, fromToken } = params;

    new TokenManager().validate(fromToken);

    return await new CouponManager().delete(
      requestData as ICouponDeleteRequest
    );
  }
}
