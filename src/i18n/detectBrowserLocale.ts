/**
 * Pure browser-language detector used to pick an initial locale on first
 * visit, before the user has made an explicit selection (no cookie set).
 *
 * Matching order, per `navigator.languages` entry (all comparisons are
 * case-insensitive; the first entry that matches wins):
 *  1. RFC 4647 lookup truncation — the tag is tried from its full form down to
 *     its base language, dropping one trailing subtag at a time
 *     (`zh-Hant-TW` → `zh-hant` → `zh`, `en-US` → `en`). Each candidate is
 *     checked for (a) an exact supported locale, then (b) a declared alias.
 *     `aliases` has the shape of `LOCALE_ALIASES` from `@/i18n/config` (locale
 *     code → lower-case BCP-47 tags): `fil`, `fil-PH`, `tl` → `phi`,
 *     `uk` → `uk-UA`, `zh-Hant`, `zh-Hant-TW`, `zh-Hant-HK` → `zh-TW`. Aliases
 *     of locales not in `locales` are ignored. The base-language candidate is
 *     the classic language-prefix match (`en-US` → `en`, `sr-Latn-RS` → `sr`),
 *     so no separate prefix step is needed after this one.
 *  2. `zh-HK` / `zh-MO` fold to `zh-TW` (Traditional Chinese) when nothing
 *     above matched — kept for callers that pass no aliases.
 *  3. Base language → first supported regional locale of that language, in
 *     `locales` (config) order — e.g. `uk` → `uk-UA`, `zh` and `zh-Hans-CN`
 *     → `zh-CN`.
 *  4. No match → `null` (caller should keep the existing default).
 *
 * The three steps live in `matchExactOrAlias` / `matchTraditionalChineseFold` /
 * `matchRegionalFallback` below; each returns the supported locale in its
 * original casing, or `null` when that step does not decide.
 *
 * Kept dependency-free (no DOM/`navigator` access) so it is trivially unit
 * testable and reusable from both client components and future server code.
 */
export function detectBrowserLocale(
  languages: readonly string[],
  locales: readonly string[],
  aliases: Readonly<Record<string, readonly string[]>> = {}
): string | null {
  if (!languages || languages.length === 0 || !locales || locales.length === 0) {
    return null;
  }

  const normalizedLocales = locales.map((locale) => locale.toLowerCase());
  const aliasIndex = buildAliasIndex(locales, normalizedLocales, aliases);

  for (const rawLanguage of languages) {
    if (!rawLanguage) continue;
    const language = rawLanguage.toLowerCase();
    const match =
      matchExactOrAlias(lookupCandidates(language), normalizedLocales, locales, aliasIndex) ??
      matchTraditionalChineseFold(language, normalizedLocales, locales) ??
      matchRegionalFallback(language.split("-")[0], normalizedLocales, locales);
    // `!== null`, not truthiness: a configured (if pathological) empty-string
    // locale must still win here, exactly as it did before the split.
    if (match !== null) return match;
  }

  return null;
}

/**
 * alias tag (lower-case) → supported locale, only for locales actually offered:
 * an alias whose target is not in `locales` is dropped, so it can never win a
 * match. Values keep the original casing of `locales`.
 */
function buildAliasIndex(
  locales: readonly string[],
  normalizedLocales: readonly string[],
  aliases: Readonly<Record<string, readonly string[]>>
): Map<string, string> {
  const aliasIndex = new Map<string, string>();
  for (const [code, tags] of Object.entries(aliases)) {
    const index = normalizedLocales.indexOf(code.toLowerCase());
    if (index === -1) continue;
    for (const tag of tags) aliasIndex.set(tag.toLowerCase(), locales[index]);
  }
  return aliasIndex;
}

/**
 * Step 1 — RFC 4647 lookup: full tag → … → base language. At every level an
 * exact supported locale wins, then a declared alias.
 */
function matchExactOrAlias(
  candidates: readonly string[],
  normalizedLocales: readonly string[],
  locales: readonly string[],
  aliasIndex: ReadonlyMap<string, string>
): string | null {
  for (const candidate of candidates) {
    const exactIndex = normalizedLocales.indexOf(candidate);
    if (exactIndex !== -1) return locales[exactIndex];
    const aliased = aliasIndex.get(candidate);
    if (aliased) return aliased;
  }
  return null;
}

/**
 * Step 2 — zh-HK / zh-MO fold to zh-TW when zh-TW is supported (kept for
 * callers that do not pass aliases).
 */
function matchTraditionalChineseFold(
  language: string,
  normalizedLocales: readonly string[],
  locales: readonly string[]
): string | null {
  if (language !== "zh-hk" && language !== "zh-mo") return null;
  const zhTwIndex = normalizedLocales.indexOf("zh-tw");
  return zhTwIndex === -1 ? null : locales[zhTwIndex];
}

/**
 * Step 3 — base language → first supported regional locale of that language
 * ("uk" -> "uk-UA", "zh" -> "zh-CN"). Config order decides the tie.
 */
function matchRegionalFallback(
  prefix: string,
  normalizedLocales: readonly string[],
  locales: readonly string[]
): string | null {
  const regionalIndex = normalizedLocales.findIndex(
    (locale) => locale.includes("-") && locale.split("-")[0] === prefix
  );
  return regionalIndex === -1 ? null : locales[regionalIndex];
}

/**
 * RFC 4647 §3.4 lookup candidates for a lower-cased tag: the full tag, then
 * each shorter form obtained by dropping the last subtag, down to the base
 * language — `zh-hant-tw` → `["zh-hant-tw", "zh-hant", "zh"]`.
 */
function lookupCandidates(tag: string): string[] {
  const subtags = tag.split("-");
  const candidates: string[] = [];
  for (let length = subtags.length; length >= 1; length -= 1) {
    candidates.push(subtags.slice(0, length).join("-"));
  }
  return candidates;
}
