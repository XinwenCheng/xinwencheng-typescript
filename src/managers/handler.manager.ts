import SignInHandler from '../handlers/auth/sign-in.handler';
import SignUpHandler from '../handlers/auth/sign-up.handler';
import CouponDeleteHandler from '../handlers/coupon/coupon-delete.handler';
import CouponGetHandler from '../handlers/coupon/coupon-get.handler';
import CouponSaveHandler from '../handlers/coupon/coupon-save.handler';
import MarketActivityDeleteHandler from '../handlers/market-activity/market-activity-delete.handler';
import MarketActivityGetHandler from '../handlers/market-activity/market-activity-get.handler';
import MarketActivitySaveHandler from '../handlers/market-activity/market-activity-save.handler';
import OrderDeleteHandler from '../handlers/order/order-delete.handler';
import OrderGetHandler from '../handlers/order/order-get.handler';
import OrderSaveHandler from '../handlers/order/order-save.handler';
import OrganizationDeleteHandler from '../handlers/organization/organization-delete.handler';
import OrganizationGetHandler from '../handlers/organization/organization-get.handler';
import OrganizationSaveHandler from '../handlers/organization/organization-save.handler';
import ProductDeleteHandler from '../handlers/product/product-delete.handler';
import ProductGetHandler from '../handlers/product/product-get.handler';
import ProductSaveHandler from '../handlers/product/product-save.handler';
import ShopDeleteHandler from '../handlers/shop/shop-delete.handler';
import ShopGetHandler from '../handlers/shop/shop-get.handler';
import ShopSaveHandler from '../handlers/shop/shop-save.handler';
import SubscriptionDeleteHandler from '../handlers/subscription/subscription-delete.handler';
import SubscriptionGetHandler from '../handlers/subscription/subscription-get.handler';
import SubscriptionSaveHandler from '../handlers/subscription/subscription-save.handler';
import UserDeleteHandler from '../handlers/user/user-delete.handler';
import UserGetHandler from '../handlers/user/user-get.handler';
import UserSaveHandler from '../handlers/user/user-save.handler';
import { ApiRoute } from '../route/route.type';
import BaseHandler from '../type/base.type';
import { MethodEnum } from '../type/method.type';

export default class HandlerManager {
  readonly #handlerMap = {
    [ApiRoute.Organization.path]: this.#getOrganizationHandler,
    [ApiRoute.Shop.path]: this.#getShopHandler,
    [ApiRoute.User.path]: this.#getUserHandler,
    [ApiRoute.Product.path]: this.#getProductHandler,
    [ApiRoute.MarketActivity.path]: this.#getMarketActivityHandler,
    [ApiRoute.Order.path]: this.#getOrderHandler,
    [ApiRoute.Coupon.path]: this.#getCouponHandler,
    [ApiRoute.Subscription.path]: this.#getSubscriptionHandler,
    [ApiRoute.SignIn.path]: this.#getSignInHandler,
    [ApiRoute.SignUp.path]: this.#getSignUpHandler
  };

  getHandler(route: string, method: MethodEnum): BaseHandler | undefined {
    return this.#handlerMap[route]?.call(this, method);
  }

  #getOrganizationHandler(method: MethodEnum): BaseHandler | undefined {
    if (method === MethodEnum.Get) return new OrganizationGetHandler();
    else if (method === MethodEnum.Post) return new OrganizationSaveHandler();
    else if (method === MethodEnum.Delete)
      return new OrganizationDeleteHandler();
  }

  #getShopHandler(method: MethodEnum): BaseHandler | undefined {
    if (method === MethodEnum.Get) return new ShopGetHandler();
    else if (method === MethodEnum.Post) return new ShopSaveHandler();
    else if (method === MethodEnum.Delete) return new ShopDeleteHandler();
  }

  #getUserHandler(method: MethodEnum): BaseHandler | undefined {
    if (method === MethodEnum.Get) return new UserGetHandler();
    else if (method === MethodEnum.Post) return new UserSaveHandler();
    else if (method === MethodEnum.Delete) return new UserDeleteHandler();
  }

  #getProductHandler(method: MethodEnum): BaseHandler | undefined {
    if (method === MethodEnum.Get) return new ProductGetHandler();
    else if (method === MethodEnum.Post) return new ProductSaveHandler();
    else if (method === MethodEnum.Delete) return new ProductDeleteHandler();
  }

  #getMarketActivityHandler(method: MethodEnum): BaseHandler | undefined {
    if (method === MethodEnum.Get) return new MarketActivityGetHandler();
    else if (method === MethodEnum.Post) return new MarketActivitySaveHandler();
    else if (method === MethodEnum.Delete)
      return new MarketActivityDeleteHandler();
  }

  #getOrderHandler(method: MethodEnum): BaseHandler | undefined {
    if (method === MethodEnum.Get) return new OrderGetHandler();
    else if (method === MethodEnum.Post) return new OrderSaveHandler();
    else if (method === MethodEnum.Delete) return new OrderDeleteHandler();
  }

  #getCouponHandler(method: MethodEnum): BaseHandler | undefined {
    if (method === MethodEnum.Get) return new CouponGetHandler();
    else if (method === MethodEnum.Post) return new CouponSaveHandler();
    else if (method === MethodEnum.Delete) return new CouponDeleteHandler();
  }

  #getSubscriptionHandler(method: MethodEnum): BaseHandler | undefined {
    if (method === MethodEnum.Get) return new SubscriptionGetHandler();
    else if (method === MethodEnum.Post) return new SubscriptionSaveHandler();
    else if (method === MethodEnum.Delete)
      return new SubscriptionDeleteHandler();
  }

  #getSignInHandler(method: MethodEnum): BaseHandler | undefined {
    if (method === MethodEnum.Post) return new SignInHandler();
  }

  #getSignUpHandler(method: MethodEnum): BaseHandler | undefined {
    if (method === MethodEnum.Post) return new SignUpHandler();
  }
}
