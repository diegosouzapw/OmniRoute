/**
 * Resolves a locale requested via cookie (`NEXT_LOCALE`) or the `x-locale`
 * header to a configured locale. Accepts declared aliases so a cookie written
 * before a locale was retired (`in` → `id`) or a bare tag (`uk` → `uk-UA`)
 * keeps working. Dependency-free: shared by `request.ts` and unit tests.
 */
export function resolveRequestedLocale(
  requested: string,
  locales: readonly string[],
  aliases: Readonly<Record<string, readonly string[]>>,
  fallback: string
): string {
  if (!requested) return fallback;
  if (locales.includes(requested)) return requested;
  const lower = requested.toLowerCase();
  const exact = locales.find((locale) => locale.toLowerCase() === lower);
  if (exact) return exact;
  for (const [code, tags] of Object.entries(aliases)) {
    if (!locales.includes(code)) continue;
    if (tags.some((tag) => tag.toLowerCase() === lower)) return code;
  }
  return fallback;
}
