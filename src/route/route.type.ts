import { CouponRouteType } from './coupon-route.type';
import { MarketActivityRouteType } from './market-activity-route.type';
import { OrganizationRouteType } from './organization-route.type';
import { ProductRouteType } from './product-route.type';
import { ShopRouteType } from './shop-route.type';
import { SubScriptionRouteType } from './subscription-route.type';
import { UserRouteType } from './user-route.type';

export class ApiRoute {
  static Organization: OrganizationRouteType = {
    path: '/organizations'
  };

  static Shop: ShopRouteType = {
    path: '/shops'
  };

  static User: UserRouteType = {
    path: '/users'
  };

  static Product: ProductRouteType = {
    path: '/products'
  };

  static MarketActivity: MarketActivityRouteType = {
    path: '/market-activities'
  };

  static Order: CouponRouteType = {
    path: '/orders'
  };

  static Coupon: CouponRouteType = {
    path: '/coupons'
  };

  static Subscription: SubScriptionRouteType = {
    path: '/subscriptions'
  };
}
