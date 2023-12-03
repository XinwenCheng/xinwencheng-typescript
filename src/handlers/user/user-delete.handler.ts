import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';
import { IUserDeleteResponse } from '../../route/response/user-response.type';
import UserManager from '../../managers/user.manager';
import { IUserDeleteRequest } from '../../route/request/user-request.type';
import TokenManager from '../../managers/token.manager';

export default class UserDeleteHandler extends BaseHandler {
  async handle(
    params: IHandlerParameterDataType
  ): Promise<IUserDeleteResponse> {
    const { requestData, fromToken } = params;

    new TokenManager().validate(fromToken);

    return await new UserManager().delete(requestData as IUserDeleteRequest);
  }
}
