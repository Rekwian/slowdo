export default async (contentName: string): Promise<string> => {
  const { locale } = useI18n();

  try {
    const { default: md } = await import(`@/assets/markdown/${locale.value}/${contentName}.md?raw`);

    if (!md.length) {
      throw createError({ status: 404, statusText: 'Page Not Found' })
    }

    return md;
  } catch (err) {
    throw createError({ status: 404, statusText: 'Page Not Found' })
  }
}
