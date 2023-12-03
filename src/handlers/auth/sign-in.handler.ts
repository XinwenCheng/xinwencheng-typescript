import AuthManager from '../../managers/auth.manager';
import { ISignInRequest } from '../../route/request/sign-in-request';
import { ISignInResponse } from '../../route/response/sign-in-response.type';
import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';

export default class SignInHandler extends BaseHandler {
  async handle(params: IHandlerParameterDataType): Promise<ISignInResponse> {
    const { requestData } = params;

    return await new AuthManager().signIn(requestData as ISignInRequest);
  }
}
