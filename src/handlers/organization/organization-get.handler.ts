import BaseHandler, { IHandlerParameterDataType } from '../../type/base.type';
import { IOrganizationGetResponse } from '../../route/response/organization-response.type';
import OrganizationManager from '../../managers/organization.manager';
import { IOrganizationGetRequest } from '../../route/request/organization-request.type';
import TokenManager from '../../managers/token.manager';

export default class OrganizationGetHandler extends BaseHandler {
  async handle(
    params: IHandlerParameterDataType
  ): Promise<IOrganizationGetResponse> {
    const { requestData, fromToken } = params;

    new TokenManager().validate(fromToken);

    return await new OrganizationManager().get(
      requestData as IOrganizationGetRequest
    );
  }
}
