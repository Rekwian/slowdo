export default defineI18nConfig(() => ({
  datetimeFormats: {
    fr: {
      long: {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      },
      short: {
        day: 'numeric',
        month: 'short',
        year: '2-digit',
      },
      shortTime: {
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        month: 'short',
        year: 'numeric',
      },
      time: {
        hour: 'numeric',
        minute: 'numeric',
      },
    },
    en: {
      long: {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      },
      short: {
        day: 'numeric',
        month: 'short',
        year: '2-digit',
      },
      shortTime: {
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        month: 'short',
        year: 'numeric',
      },
      time: {
        hour: 'numeric',
        minute: 'numeric',
      },
    }
  }
}));
