// Kimi (Moonshot AI) official-partnership sponsor banner — version gate.
//
// Pure logic split out of KimiSponsorBanner.tsx so the gate can be unit-tested
// with node:test (no DOM/next-intl needed), mirroring homeAppearance.ts.

// Import the pure helpers from versionCompare (NOT versionCheck): this module is
// pulled into the "use client" KimiSponsorBanner bundle, and versionCheck.ts's
// top-level child_process import would break the Turbopack client build (#7872 VPS build).
import { isNewer, normalizeVersion } from "@/lib/system/versionCompare";

/**
 * Last app version that still shows the Kimi sponsor banner (inclusive).
 *
 * Kimi partnership: banner runs v3.8.49 through v3.8.60 (10 official releases
 * counted from v3.8.50), capped at 3 months from 2026-07-21.
 */
export const KIMI_SPONSOR_BANNER_THROUGH_VERSION = "3.8.60";

/**
 * Whether the Kimi sponsor banner should render for the given running app
 * version. True while `currentVersion <= KIMI_SPONSOR_BANNER_THROUGH_VERSION`
 * (semver comparison, reusing the same `isNewer`/`normalizeVersion` helpers as
 * the "Update Available" banner). Fails safe (hides the banner) when the
 * version string cannot be parsed at all, rather than defaulting to "always
 * show" for a value like the `"unknown"` sentinel `getCurrentVersion()` can
 * return if `package.json` cannot be read.
 */
export function shouldShowKimiSponsorBanner(currentVersion: string | null | undefined): boolean {
  if (typeof currentVersion !== "string") return false;
  if (!normalizeVersion(currentVersion)) return false;
  // isNewer(a, b) is true iff a > b — so isNewer(current, THROUGH) is true
  // exactly when current is past the sunset version. Negate for "<=".
  return !isNewer(currentVersion, KIMI_SPONSOR_BANNER_THROUGH_VERSION);
}
