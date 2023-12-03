import { BaseRouteType } from './base.type';
import {
  ISubscriptionGetRequest,
  ISubscriptionDeleteRequest,
  ISubscriptionSaveRequest
} from './request/subscription-request.type';

export type SubScriptionRouteType = {
  get?: ISubscriptionGetRequest;
  post?: ISubscriptionSaveRequest;
  deletion?: ISubscriptionDeleteRequest;
} & BaseRouteType;
