/**
 * Shared env/flag boolean parsing for security guards.
 *
 * Truthy: true / 1 / yes / on (case-insensitive, trimmed)
 * Falsy:  false / 0 / no / off
 * Unset/empty/unknown → fallback
 *
 * @module shared/utils/envBoolean
 */

export function parseEnvBoolean(
  value: string | undefined | null,
  fallback: boolean
): boolean {
  if (value === undefined || value === null) return fallback;
  const normalized = String(value).trim().toLowerCase();
  if (normalized === "") return fallback;
  if (["1", "true", "yes", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "off"].includes(normalized)) return false;
  return fallback;
}
