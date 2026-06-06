import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {LOCALES, DEFAULT_LOCALE} from './config';

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;

  if (!locale || !hasLocale(LOCALES, locale)) {
    locale = DEFAULT_LOCALE;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
