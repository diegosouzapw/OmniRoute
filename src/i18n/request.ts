import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { LOCALES, DEFAULT_LOCALE, LOCALE_COOKIE } from "./config";
import type { Locale } from "./config";

const FALLBACK_LOCALE = "en";

/**
 * Deep merge that mutates `target` with values from `source`.
 * If both have an object at the same key, recurse.
 * Otherwise prefer the existing value in `target` (locale-specific wins).
 */
export function deepMergeFallback(
  target: Record<string, unknown>,
  source: Record<string, unknown>
): Record<string, unknown> {
  for (const [key, sourceValue] of Object.entries(source)) {
    const targetValue = target[key];
    if (
      sourceValue !== null &&
      typeof sourceValue === "object" &&
      !Array.isArray(sourceValue) &&
      targetValue !== null &&
      typeof targetValue === "object" &&
      !Array.isArray(targetValue)
    ) {
      deepMergeFallback(targetValue as Record<string, unknown>, sourceValue as Record<string, unknown>);
    } else if (targetValue === undefined) {
      target[key] = sourceValue;
    }
  }
  return target;
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  let locale: string = cookieStore.get(LOCALE_COOKIE)?.value || "";

  if (!locale) {
    const headerStore = await headers();
    locale = headerStore.get("x-locale") || "";
  }

  if (!LOCALES.includes(locale as Locale)) {
    locale = DEFAULT_LOCALE;
  }

  const localeMessages = (await import(`./messages/${locale}.json`)).default;

  // G1: fall back to EN for any missing key. EN is loaded only once per request
  // and only when the active locale is not EN itself (no-op).
  let messages = localeMessages as Record<string, unknown>;
  if (locale !== FALLBACK_LOCALE) {
    const fallbackMessages = (await import(`./messages/${FALLBACK_LOCALE}.json`)).default as Record<string, unknown>;
    messages = deepMergeFallback({ ...localeMessages }, fallbackMessages);
  }

  // 4. Merge EN as namespace-level fallback for locales that are missing new namespaces.
  //    Only applied when the active locale is not EN (avoids a redundant import).
  //    Merging is shallow at the top-level namespace key — if a namespace is already
  //    present in the locale file it is kept as-is; missing namespaces fall back to EN.
  //    This ensures new namespaces (e.g. cliCode, cliAgents, acpAgents, cliCommon added
  //    in plan 14 F9) are displayed in English for the 39 non-EN/non-pt-BR locales until
  //    translations are shipped.
  let mergedMessages: Record<string, unknown> = messages as Record<string, unknown>;
  if (locale !== DEFAULT_LOCALE) {
    const enMessages = (
      await import(`./messages/${DEFAULT_LOCALE}.json`)
    ).default as Record<string, unknown>;
    mergedMessages = { ...enMessages, ...mergedMessages };
  }

  return {
    locale,
    messages: mergedMessages,
  };
});
