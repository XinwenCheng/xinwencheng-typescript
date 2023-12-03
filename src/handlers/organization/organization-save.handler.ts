import OrganizationManager from '../../managers/organization.manager';
import TokenManager from '../../managers/token.manager';
import { IOrganizationSaveRequest } from '../../route/request/organization-request.type';
import { IOrganizationSaveResponse } from '../../route/response/organization-response.type';
import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';

export default class OrganizationSaveHandler extends BaseHandler {
  async handle(
    params: IHandlerParameterDataType
  ): Promise<IOrganizationSaveResponse> {
    const { requestData, fromToken } = params;

    new TokenManager().validate(fromToken);

    return await new OrganizationManager().save(
      requestData as IOrganizationSaveRequest
    );
  }
}
