import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';
import OrganizationManager from '../../managers/organization.manager';
import TokenManager from '../../managers/token.manager';
import { IOrganizationDeleteRequest } from '../../route/request/organization-request.type';
import { IOrganizationDeleteResponse } from '../../route/response/organization-response.type';

export default class OrganizationDeleteHandler extends BaseHandler {
  async handle(
    params: IHandlerParameterDataType
  ): Promise<IOrganizationDeleteResponse> {
    const { requestData, fromToken } = params;

    new TokenManager().validate(fromToken);

    return await new OrganizationManager().delete(
      requestData as IOrganizationDeleteRequest
    );
  }
}
