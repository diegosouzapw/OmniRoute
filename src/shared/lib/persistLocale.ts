import { LOCALE_COOKIE, RTL_LOCALES } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

/**
 * Persist the locale preference in the cookie `src/i18n/request.ts` reads on
 * the server, plus localStorage as a client-side convenience mirror.
 *
 * Shared by every client-side locale writer (manual selection in
 * `LanguageSelector`, first-visit auto-detection in `LocaleAutoDetect`) so
 * there is a single source of truth for the cookie name/format.
 *
 * Also flips `<html dir/lang>` immediately: `router.refresh()` in the App
 * Router does NOT re-render the root layout, so without this the page text
 * switches to Arabic while `dir` stays `ltr` — leaving the mobile sidebar
 * anchored to the wrong edge (visible on the left, half off-screen).
 */
export function persistLocale(code: Locale): void {
  document.cookie = `${LOCALE_COOKIE}=${code};path=/;max-age=${365 * 24 * 60 * 60};samesite=lax`;
  try {
    localStorage.setItem(LOCALE_COOKIE, code);
  } catch {
    // Ignore (e.g. storage disabled/full)
  }
  try {
    const isRtl = RTL_LOCALES.includes(code);
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = code;
  } catch {
    // Ignore (non-DOM environment)
  }
}
