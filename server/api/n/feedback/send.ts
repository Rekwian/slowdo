import { checkBotId } from 'botid/server';

/**
 * Event handler for feedback submission endpoint.
 * Validates the request is not from a bot before proxying to the feedback API.
 *
 * @param event - The request event object
 * @returns Proxy response from the feedback API
 * @throws 403 error if request is identified as coming from a bot
 */
export default defineEventHandler(async (event) => {
  const { apiUrl } = useRuntimeConfig();

  const verification = await checkBotId();

  if (verification.isBot) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Access denied',
    });
  }

  // Proxy the request to the feedback API endpoint
  return proxyRequest(event, `${apiUrl}/api/s/feedback/send`);
});
