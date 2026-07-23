/**
 * Pure browser-language detector used to pick an initial locale on first
 * visit, before the user has made an explicit selection (no cookie set).
 *
 * Matching order:
 *  1. Exact match against `navigator.languages` entries (case-insensitive).
 *  2. `zh-HK` / `zh-MO` are treated as `zh-TW` (Traditional Chinese) since
 *     OmniRoute does not ship a dedicated Hong-Kong/Macau locale.
 *  3. Language-prefix match — e.g. `en-US` matches a supported `en` locale.
 *  4. No match → `null` (caller should keep the existing default).
 *
 * Kept dependency-free (no DOM/`navigator` access) so it is trivially unit
 * testable and reusable from both client components and future server code.
 */
export function detectBrowserLocale(
  languages: readonly string[],
  locales: readonly string[]
): string | null {
  if (!languages || languages.length === 0 || !locales || locales.length === 0) {
    return null;
  }

  const normalizedLocales = locales.map((locale) => locale.toLowerCase());

  for (const rawLanguage of languages) {
    if (!rawLanguage) continue;
    const language = rawLanguage.toLowerCase();

    // 1. Exact match.
    const exactIndex = normalizedLocales.indexOf(language);
    if (exactIndex !== -1) {
      return locales[exactIndex];
    }

    // 2. zh-HK / zh-MO fold to zh-TW when zh-TW is supported.
    if (language === "zh-hk" || language === "zh-mo") {
      const zhTwIndex = normalizedLocales.indexOf("zh-tw");
      if (zhTwIndex !== -1) {
        return locales[zhTwIndex];
      }
    }

    // 3. Language-prefix match (e.g. "en-US" -> "en").
    const prefix = language.split("-")[0];
    const prefixIndex = normalizedLocales.indexOf(prefix);
    if (prefixIndex !== -1) {
      return locales[prefixIndex];
    }
  }

  return null;
}
