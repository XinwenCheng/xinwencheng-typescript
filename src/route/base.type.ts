export type BaseRouteType = {
  path: string;
};

export interface BaseRequestType {}

export interface BaseResponseType {
  code: number;
  message?: string;
}
