export interface IBaseRequestData {}

export interface IBaseGetRequestData extends IBaseRequestData {
  includeDeleted?: boolean;
}
