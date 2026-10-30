import * as z from 'zod';

const locales = {
  fr: () => import('zod/v4/locales/fr.js'),
  en: () => import('zod/v4/locales/en.js'),
};

export default defineNuxtPlugin(async (nuxtApp) => {
  const { locale } = nuxtApp.$i18n;

  let loadLocale = locales[locale.value];

  if (!loadLocale) {
    loadLocale = locales.en
    return;
  }

  const { default: defaultLocale } = await loadLocale();

  z.config(defaultLocale());
});
