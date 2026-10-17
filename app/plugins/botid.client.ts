import { initBotId } from 'botid/client/core';

export default defineNuxtPlugin({
  enforce: 'pre',
  setup() {
    initBotId({
      protect: [{ path: '/api/n/feedback/send', method: 'POST' }],
    });
  },
});
