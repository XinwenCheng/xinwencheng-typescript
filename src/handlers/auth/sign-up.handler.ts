import AuthManager from '../../managers/auth.manager';
import { ISignUpRequest } from '../../route/request/sign-up-request';
import { ISignUpResponse } from '../../route/response/sign-up-response.type';
import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';

export default class SignUpHandler extends BaseHandler {
  async handle(params: IHandlerParameterDataType): Promise<ISignUpResponse> {
    const { requestData } = params;

    return await new AuthManager().signUp(requestData as ISignUpRequest);
  }
}
