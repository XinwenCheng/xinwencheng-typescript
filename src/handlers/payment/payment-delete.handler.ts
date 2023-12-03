import PaymentManager from '../../managers/payment.manager';
import TokenManager from '../../managers/token.manager';
import { IPaymentDeleteRequest } from '../../route/request/payment-request.type';
import { IPaymentDeleteResponse } from '../../route/response/payment-response.type';
import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';

export default class PaymentDeleteHandler extends BaseHandler {
  async handle(
    params: IHandlerParameterDataType
  ): Promise<IPaymentDeleteResponse> {
    const { requestData, fromToken } = params;

    new TokenManager().validate(fromToken);

    return await new PaymentManager().delete(
      requestData as IPaymentDeleteRequest
    );
  }
}
