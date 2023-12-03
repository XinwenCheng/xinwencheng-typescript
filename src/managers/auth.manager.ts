// eslint-disable-next-line @typescript-eslint/no-var-requires
const uuidV4 = require('uuid/v4');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dayJs = require('dayjs');

import { ISignInRequest } from '../route/request/sign-in-request';
import { ISignUpRequest } from '../route/request/sign-up-request';
import { ResponseCodeEnum } from '../route/response/base-response.type';
import { ISignInResponse } from '../route/response/sign-in-response.type';
import { ISignUpResponse } from '../route/response/sign-up-response.type';
import EncryptUtil from '../util/encrypt';
import TokenManager from './token.manager';
import UserManager from './user.manager';

export default class AuthManager {
  async signUp(requestData: ISignUpRequest): Promise<ISignUpResponse> {
    const { username, password } = requestData;

    if (!username || !password)
      throw new Error('User name and password are required.');

    const existingUser = await new UserManager().get({ username });

    if (existingUser) throw new Error('User already exists.');

    const salt = uuidV4();
    const encryptedPassword = EncryptUtil.encryptPassword(password, salt);

    const { user } = await new UserManager().save({
      user: {
        username,
        encryptedPassword,
        salt,
        role: 'user',
        createdAt: dayJs.utc().toDate()
      }
    });

    const { token } = await new TokenManager().save({ userId: user.id });

    return {
      code: ResponseCodeEnum.Success,
      token,
      user
    };
  }

  async signIn(requestData: ISignInRequest): Promise<ISignInResponse> {
    const { nameOrPhone, password } = requestData;

    if (!nameOrPhone || !password)
      throw new Error('User name and password are required.');

    const isPhone =
      /^(13[0-9]|14[5-9]|15[0-3,5-9]|16[6]|17[0-8]|18[0-9]|19[8,9])\d{8}$/.test(
        nameOrPhone
      );

    const params = {};

    if (isPhone) params['phone'] = nameOrPhone;
    else params['username'] = nameOrPhone;

    const { users } = await new UserManager().get(params);
    const user = users.length ? users[0] : undefined;

    if (!user) throw new Error('User does not exist.');

    const { token } = await new TokenManager().save({ userId: user.id });

    return {
      code: ResponseCodeEnum.Success,
      token,
      user
    };
  }
}
