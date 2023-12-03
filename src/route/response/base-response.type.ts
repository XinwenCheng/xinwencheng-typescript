export interface IResponse {
  code: number;
  message?: string;
}

export enum ResponseCodeEnum {
  Success = 200,
  NotFound = 404,
  Error = 500
}
