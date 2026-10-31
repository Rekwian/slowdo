import { checkBotId } from 'botid/server';

export const defineWrappedResponseHandler = <T extends EventHandlerRequest, D> (): EventHandler<T, D> =>
  defineEventHandler<T>(async (event) => {
    const { apiUrl } = useRuntimeConfig();

    const verification = await checkBotId();

    if (verification.isBot) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Access denied',
      });
    }

    // Proxy the request to the feedback API endpoint
    return proxyRequest(event, apiUrl + event.path);
  })
