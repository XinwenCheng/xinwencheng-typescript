import UserManager from '../../managers/user.manager';
import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';
import { IUserGetRequest } from '../../route/request/user-request.type';
import { IUserGetResponse } from '../../route/response/user-response.type';
import TokenManager from '../../managers/token.manager';

export default class UserGetHandler extends BaseHandler {
  async handle(params: IHandlerParameterDataType): Promise<IUserGetResponse> {
    const { requestData, fromToken } = params;

    new TokenManager().validate(fromToken);

    return await new UserManager().get(requestData as IUserGetRequest);
  }
}
