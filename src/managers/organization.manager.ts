import MongooseHelper from '../helpers/mongoose.helper';
import { OrganizationModel } from '../models/organization.model';
import {
  IOrganizationDeleteRequest,
  IOrganizationGetRequest,
  IOrganizationSaveRequest
} from '../route/request/organization-request.type';
import { ResponseCodeEnum } from '../route/response/base-response.type';
import {
  IOrganizationDeleteResponse,
  IOrganizationGetResponse,
  IOrganizationSaveResponse
} from '../route/response/organization-response.type';
import { OrganizationDataType } from '../type/data/organization.type';
import BaseManager from './base.manager';

const dayJs = require('dayjs');
const { v4: uuidV4 } = require('uuid');

export default class OrganizationManager extends BaseManager {
  async get(
    params: IOrganizationGetRequest
  ): Promise<IOrganizationGetResponse> {
    const { ids } = params;

    if (!ids.length) throw new Error('Organization ID is required');

    const query = { clientId: { $in: ids } };

    await MongooseHelper.startConnection();

    const documents = await OrganizationModel.find(query);

    return {
      code: ResponseCodeEnum.Success,
      organizations: documents.map((document) =>
        this.parseDocumentToData(document)
      )
    };
  }

  async save(
    params: IOrganizationSaveRequest
  ): Promise<IOrganizationSaveResponse> {
    const { organization } = params;
    const now = dayJs.utc().toDate();

    let document;

    await MongooseHelper.startConnection();

    if (organization.id) {
      document = await OrganizationModel.findOneAndUpdate(
        { clientId: organization.id },
        {
          name: organization.name,
          unifiedSocialCreditCode: organization.unifiedSocialCreditCode,
          isDeactivated: organization.isDeactivated,
          isDeleted: organization.isDeleted,
          updatedAt: now
        },
        { new: true }
      );
    } else {
      document = await OrganizationModel.create({
        clientId: uuidV4(),
        name: organization.name,
        unifiedSocialCreditCode: organization.unifiedSocialCreditCode,
        createdAt: now
      });
    }

    return {
      code: ResponseCodeEnum.Success,
      organization: this.parseDocumentToData(document)
    };
  }

  async delete(
    params: IOrganizationDeleteRequest
  ): Promise<IOrganizationDeleteResponse> {
    const { id } = params;

    if (!id) throw new Error('Organization ID is required');

    await MongooseHelper.startConnection();

    const document = await OrganizationModel.findOneAndUpdate(
      { clientId: id },
      { isDeleted: true, updatedAt: dayJs.utc().toDate() },
      { new: true }
    );

    return {
      code: ResponseCodeEnum.Success,
      organization: this.parseDocumentToData(document)
    };
  }

  parseDocumentToData(document: any): OrganizationDataType {
    const {
      clientId,
      name,
      unifiedSocialCreditCode,
      managerId,
      adminId,
      isDeactivated,
      isDeleted,
      createdAt,
      updatedAt
    } = document;

    return {
      id: clientId,
      name,
      unifiedSocialCreditCode,
      managerId,
      adminId,
      isDeactivated,
      isDeleted,
      createdAt,
      updatedAt
    };
  }
}
