import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { LOCALES, DEFAULT_LOCALE, LOCALE_COOKIE } from "./config";
import type { Locale } from "./config";

export default getRequestConfig(async () => {
  // 1. Try cookie
  const cookieStore = await cookies();
  let locale: string = cookieStore.get(LOCALE_COOKIE)?.value || "";

  // 2. Try custom header (set by middleware)
  if (!locale) {
    const headerStore = await headers();
    locale = headerStore.get("x-locale") || "";
  }

  // 3. Validate & fallback
  if (!LOCALES.includes(locale as Locale)) {
    locale = DEFAULT_LOCALE;
  }

  const messages = (await import(`./messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
