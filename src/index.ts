import { HttpFunction } from '@google-cloud/functions-framework';
import { MethodEnum } from './type/method.type';
import HandlerManager from './managers/handler.manager';
import { ResponseCodeEnum } from './route/response/base-response.type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const entrance: HttpFunction = async (request: any, response: any) => {
  // Handle CORS for preflight request: https://cloud.google.com/functions/docs/samples/functions-http-cors#functions_http_cors-nodejs.
  console.log(
    'INDEX request.path:',
    request.path,
    ', request.method:',
    request.method,
    ', request.query:',
    JSON.stringify(request.query),
    ', request.body:',
    JSON.stringify(request.body)
  );

  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Headers', '*');
  response.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  response.set('Access-Control-Max-Age', '3600');

  if (request.method === MethodEnum.Options) {
    response.status(204).send('');

    return;
  }

  const route = request.path;
  let result;

  const { authorization: fromToken } = request.headers;
  const { method } = request;

  let requestData;

  try {
    const handler = new HandlerManager().getHandler(route, method);

    if (!handler) throw new Error('No handler found');

    if (method === MethodEnum.Get) {
      requestData = request.query;
      result = await handler.handle({
        requestData,
        fromToken
      });
    } else {
      requestData = request.body;
      result = await handler.handle({
        requestData,
        fromToken,
        request
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('INDEX error:', error);

    result = { code: -1, message: error.message ?? error };
  }

  console.log(
    'INDEX route:',
    route,
    ', fromToken:',
    fromToken,
    ', requestData:',
    JSON.stringify(requestData),
    ', result:',
    JSON.stringify(result)
  );

  response.send(result ?? { code: ResponseCodeEnum.Success });
};
