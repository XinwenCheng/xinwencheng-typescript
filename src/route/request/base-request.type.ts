export interface IRequest {}

export interface IGetRequest extends IRequest {
  includeDeleted?: boolean;
}
