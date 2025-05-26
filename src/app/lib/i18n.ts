import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const fallbackLocale = 'en';
  const currentLocale = locale ?? fallbackLocale;

  console.log(locale);

  console.log('[i18n] Loading messages for locale:', currentLocale);

  const messages = (await import(`../../messages/${currentLocale}.json`)).default;

  return {
    locale: currentLocale,
    messages: messages as Record<string, string>,
  };
});
