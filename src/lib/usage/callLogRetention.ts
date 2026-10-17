import { getPersistedCallLogRetentionDays } from "../db/databaseSettings";
import { getCallLogRetentionDays, getCallLogRetentionDaysOverride } from "../logEnv";

/**
 * Resolves the request log retention in days: explicit variable override wins,
 * then the dashboard-persisted retention, then the variable-or-7-day fallback.
 * Same precedence as the startup cleanup (src/lib/compliance/index.ts:494-506);
 * unlike the startup path, the dashboard level only honors persisted keys (a
 * merged default never applies). Settings errors fall back to the variable
 * (e.g. very early startup with no settings table yet).
 */
export function resolveCallLogRetentionDays(): number {
  const override = getCallLogRetentionDaysOverride();
  if (override !== null) return override;
  try {
    return getPersistedCallLogRetentionDays() ?? getCallLogRetentionDays();
  } catch {
    return getCallLogRetentionDays();
  }
}
