import CouponManager from '../../managers/coupon.manager';
import TokenManager from '../../managers/token.manager';
import { ICouponSaveRequest } from '../../route/request/coupon-request.type';
import { ICouponSaveResponse } from '../../route/response/coupon-response.type';
import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';

export default class CouponSaveHandler extends BaseHandler {
  async handle(
    params: IHandlerParameterDataType
  ): Promise<ICouponSaveResponse> {
    const { requestData, fromToken } = params;

    new TokenManager().validate(fromToken);

    return await new CouponManager().save(requestData as ICouponSaveRequest);
  }
}
