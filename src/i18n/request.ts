import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { LOCALES, DEFAULT_LOCALE, LOCALE_COOKIE } from "./config";
import type { Locale } from "./config";

function stripMissingPrefix(value: unknown): unknown {
  if (typeof value === "string") {
    return value.startsWith("__MISSING__:") ? value.replace(/^__MISSING__:/, "") : value;
  }
  if (Array.isArray(value)) {
    return value.map((item) => stripMissingPrefix(item));
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).map(([key, item]) => [
      key,
      stripMissingPrefix(item),
    ]);
    return Object.fromEntries(entries);
  }
  return value;
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

  const rawMessages = (await import(`./messages/${locale}.json`)).default;
  const messages = stripMissingPrefix(rawMessages);

  return {
    locale,
    messages,
  };
});
