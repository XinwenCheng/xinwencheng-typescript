import UserManager from '../../managers/user.manager';
import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';
import { IUserSaveRequest } from '../../route/request/user-request.type';
import { IUserSaveResponse } from '../../route/response/user-response.type';
import TokenManager from '../../managers/token.manager';

export default class UserSaveHandler extends BaseHandler {
  async handle(params: IHandlerParameterDataType): Promise<IUserSaveResponse> {
    const { requestData, fromToken } = params;

    new TokenManager().validate(fromToken);

    return await new UserManager().save(requestData as IUserSaveRequest);
  }
}
