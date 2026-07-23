import { LOCALE_COOKIE } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

/**
 * Persist the locale preference in the cookie `src/i18n/request.ts` reads on
 * the server, plus localStorage as a client-side convenience mirror.
 *
 * Shared by every client-side locale writer (manual selection in
 * `LanguageSelector`, first-visit auto-detection in `LocaleAutoDetect`) so
 * there is a single source of truth for the cookie name/format.
 */
export function persistLocale(code: Locale): void {
  document.cookie = `${LOCALE_COOKIE}=${code};path=/;max-age=${365 * 24 * 60 * 60};samesite=lax`;
  try {
    localStorage.setItem(LOCALE_COOKIE, code);
  } catch {
    // Ignore (e.g. storage disabled/full)
  }
}
