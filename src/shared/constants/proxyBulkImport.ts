/**
 * Bounds for the proxy-registry bulk import (#13917).
 *
 * The limit is operator-configurable via the `proxyBulkImportLimit` setting.
 * Both enforcement points — the server schema and the dashboard's pre-flight
 * check — resolve it through `resolveProxyBulkImportLimit` so a configured
 * value can never apply on one side only, which is the failure the hardcoded
 * pair had: a dashboard that accepted more than the API would.
 */

/** Default when the setting is unset. Matches the previous hardcoded limit. */
export const PROXY_BULK_IMPORT_LIMIT_DEFAULT = 100;

/**
 * Safety ceiling. A bulk import holds every row in memory and writes them in
 * one request, so an unbounded value is a denial-of-service knob rather than a
 * convenience. 10,000 is "effectively unlimited" for the use case in #13917
 * without being unbounded.
 */
export const PROXY_BULK_IMPORT_LIMIT_MAX = 10_000;

/** Smallest useful limit; zero or negative would disable import entirely. */
export const PROXY_BULK_IMPORT_LIMIT_MIN = 1;

/**
 * Resolve a stored setting to a usable limit.
 *
 * Deliberately total: a missing, non-numeric, fractional, or out-of-range value
 * falls back to the default rather than throwing, because this runs on the
 * request path and a corrupt settings row must not take bulk import offline.
 * Values above the cap clamp DOWN to the cap rather than falling back to 100 —
 * an operator who asked for more than the ceiling wants the ceiling, not the
 * default.
 */
export function resolveProxyBulkImportLimit(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return PROXY_BULK_IMPORT_LIMIT_DEFAULT;
  }
  const whole = Math.trunc(value);
  if (whole < PROXY_BULK_IMPORT_LIMIT_MIN) return PROXY_BULK_IMPORT_LIMIT_DEFAULT;
  return Math.min(whole, PROXY_BULK_IMPORT_LIMIT_MAX);
}
