import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { LOCALES, DEFAULT_LOCALE, LOCALE_COOKIE } from "./config";
import type { Locale } from "./config";
import { IntlErrorCode } from "use-intl/core";

type MessageRecord = Record<string, unknown>;

function mergeMessagesWithFallback(
  fallbackMessages: MessageRecord,
  localeMessages: MessageRecord
): MessageRecord {
  const result: MessageRecord = { ...fallbackMessages };

  for (const [key, value] of Object.entries(localeMessages)) {
    const fallbackValue = result[key];

    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      fallbackValue &&
      typeof fallbackValue === "object" &&
      !Array.isArray(fallbackValue)
    ) {
      result[key] = mergeMessagesWithFallback(
        fallbackValue as MessageRecord,
        value as MessageRecord
      );
      continue;
    }

    result[key] = value;
  }

  return result;
}

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

  const fallbackMessages = (await import("./messages/en.json")).default as MessageRecord;
  const localeMessages =
    locale === "en"
      ? fallbackMessages
      : ((await import(`./messages/${locale}.json`)).default as MessageRecord);
  const messages = mergeMessagesWithFallback(fallbackMessages, localeMessages);

  return {
    locale,
    messages,
    onError(error) {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        return;
      }

      console.error(error);
    },
    getMessageFallback({ namespace, key }) {
      return namespace ? `${namespace}.${key}` : key;
    },
  };
});
