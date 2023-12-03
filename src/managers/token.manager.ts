import { IRequest } from '../route/request/base-request.type';
import { IResponse } from '../route/response/base-response.type';
import { IDataType } from '../type/base.type';
import BaseManager from './base.manager';

export default class TokenManager extends BaseManager {
  get(params: IRequest): Promise<IResponse> {
    throw new Error('Method not implemented.');
  }
  save(params: IRequest): Promise<IResponse> {
    throw new Error('Method not implemented.');
  }
  delete(params: IRequest): Promise<IResponse> {
    throw new Error('Method not implemented.');
  }

  validate(token: string, required?: boolean): boolean {
    // TODO: Validate the token of request sender if it's required.

    if (required) {
      // throw new Error('Token is invalid.');
    }

    return true;
  }

  parseDocumentToData(document: any): IDataType {
    throw new Error('Method not implemented.');
  }
}
