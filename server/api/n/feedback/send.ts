import { checkBotId } from 'botid/server';

export default defineEventHandler(async (event) => {
  const { apiUrl } = useRuntimeConfig();

  const verification = await checkBotId();
  console.log({ isBot: verification.isBot })

  if (verification.isBot) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Access denied',
    });
  }

  return proxyRequest(event, `${apiUrl}/api/s/feedback/send`);
});
