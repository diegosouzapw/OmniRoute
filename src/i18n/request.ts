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
    // Guard against prototype pollution from a crafted locale message tree.
    if (key === "__proto__" || key === "constructor" || key === "prototype") continue;
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

function setNestedValue(target: Record<string, unknown>, dottedKey: string, value: unknown): void {
  const segments = dottedKey.split(".");
  let cursor: Record<string, unknown> = target;

  for (let index = 0; index < segments.length; index += 1) {
    const segment = segments[index];
    if (!segment || segment === "__proto__" || segment === "constructor" || segment === "prototype") {
      return;
    }

    if (index === segments.length - 1) {
      cursor[segment] = value;
      return;
    }

    const next = cursor[segment];
    if (next && typeof next === "object" && !Array.isArray(next)) {
      cursor = next as Record<string, unknown>;
      continue;
    }

    const created: Record<string, unknown> = {};
    cursor[segment] = created;
    cursor = created;
  }
}

export function normalizeComplianceEventTypes(
  messages: Record<string, unknown>
): Record<string, unknown> {
  const compliance =
    messages.compliance && typeof messages.compliance === "object" && !Array.isArray(messages.compliance)
      ? (messages.compliance as Record<string, unknown>)
      : null;
  const eventTypes =
    compliance?.eventTypes &&
    typeof compliance.eventTypes === "object" &&
    !Array.isArray(compliance.eventTypes)
      ? (compliance.eventTypes as Record<string, unknown>)
      : null;

  if (!compliance || !eventTypes) return messages;

  const normalizedEventTypes: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(eventTypes)) {
    if (key.includes(".")) {
      setNestedValue(normalizedEventTypes, key, value);
    } else {
      normalizedEventTypes[key] = value;
    }
  }

  return {
    ...messages,
    compliance: {
      ...compliance,
      eventTypes: normalizedEventTypes,
    },
  };
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

  const localeMessages = normalizeComplianceEventTypes(
    (await import(`./messages/${locale}.json`)).default as Record<string, unknown>
  );

  // G1: fall back to EN for any missing key. EN is loaded only once per request
  // and only when the active locale is not EN itself (no-op).
  let messages = localeMessages as Record<string, unknown>;
  if (locale !== FALLBACK_LOCALE) {
    const fallbackMessages = normalizeComplianceEventTypes(
      (await import(`./messages/${FALLBACK_LOCALE}.json`)).default as Record<string, unknown>
    );
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
    const enMessages = normalizeComplianceEventTypes(
      (await import(`./messages/${DEFAULT_LOCALE}.json`)).default as Record<string, unknown>
    );
    mergedMessages = { ...enMessages, ...mergedMessages };
  }

  return {
    locale,
    messages: mergedMessages,
  };
});
