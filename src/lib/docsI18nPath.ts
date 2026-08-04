import path from "node:path";

// A locale or slug segment may only contain ASCII letters, digits and dashes.
// This blocks `..`, `/`, `\0`, and absolute paths before any filesystem access.
const SEGMENT_RE = /^[a-z0-9-]+$/i;

/**
 * Resolve the i18n section directory for a docs slug under `<docsRoot>/i18n`, or
 * return `null` when the locale/slug contain anything but `[a-z0-9-]` or the
 * resolved path escapes `<docsRoot>/i18n`.
 *
 * Pure path math — no filesystem access — so it is directly unit-testable and
 * is the single chokepoint guarding the i18n docs fallback against path
 * traversal (the `locale` comes from a user-controllable cookie). The prefix
 * check uses `i18nRoot + path.sep` (not a bare `startsWith`) so a sibling like
 * `…/i18n-evil` cannot satisfy it.
 */
export function resolveSafeI18nSectionDir(
  docsRoot: string,
  locale: string,
  slug: string[]
): string | null {
  if (!locale || !SEGMENT_RE.test(locale)) return null;
  if (!slug.length || !slug.every((s) => SEGMENT_RE.test(s))) return null;

  const i18nRoot = path.join(docsRoot, "i18n");
  const sectionDir = path.resolve(i18nRoot, locale, "docs", ...slug.slice(0, -1));

  if (sectionDir !== i18nRoot && !sectionDir.startsWith(i18nRoot + path.sep)) {
    return null;
  }
  return sectionDir;
}
