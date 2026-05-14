// SOURCE OF TRUTH: `config/i18n.json` (also consumed by the docs translation
// pipeline in `scripts/i18n/run-translation.mjs`). Keep this file as a thin
// typed adapter — do NOT add hand-maintained locale lists here.

import i18nConfig from "../../config/i18n.json" with { type: "json" };

type RawLocaleEntry = {
  code: string;
  label: string;
  name: string;
  native?: string;
  english?: string;
  flag: string;
};

type RawI18nConfig = {
  default: string;
  rtl: readonly string[];
  uiOnly?: readonly string[];
  docsExcluded?: readonly string[];
  locales: readonly RawLocaleEntry[];
};

const config = i18nConfig as RawI18nConfig;

export const LOCALES = config.locales.map((l) => l.code) as readonly string[];
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = config.default as Locale;

/**
 * Display metadata for every locale, kept in the same shape the codebase has
 * historically consumed (`code`, `label`, `name`, `flag`). We additionally
 * expose `native` and `english` as aliases for new call sites that want a
 * stable field name regardless of the underlying display string.
 */
export const LANGUAGES: readonly {
  code: Locale;
  label: string;
  name: string;
  native: string;
  english: string;
  flag: string;
}[] = config.locales.map((entry) => ({
  code: entry.code as Locale,
  label: entry.label,
  name: entry.name,
  native: entry.native ?? entry.name,
  english: entry.english ?? entry.name,
  flag: entry.flag,
}));

export const RTL_LOCALES: readonly Locale[] = config.rtl as readonly Locale[];

export const LOCALE_COOKIE = "NEXT_LOCALE";

// Convenience helpers --------------------------------------------------------

/** Locales that the docs translation pipeline writes to (excludes the source). */
export const DOCS_TARGET_LOCALES: readonly Locale[] = LANGUAGES.map((l) => l.code).filter(
  (code) => !(config.docsExcluded ?? []).includes(code)
) as readonly Locale[];

/** Lookup by code; falls back to the default locale entry if not found. */
export function getLanguage(code: string) {
  return (
    LANGUAGES.find((l) => l.code === code) ?? LANGUAGES.find((l) => l.code === DEFAULT_LOCALE)!
  );
}
