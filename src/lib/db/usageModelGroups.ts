/**
 * Read-only aggregates over `usage_history` for the unpriced-usage admin report
 * (#12341). Pricing decisions stay in `src/lib/usage/unpricedUsage.ts`; this
 * module only owns the SQL.
 *
 * A key counts as "limited" only when enforcement can actually block it: the
 * per-key USD limit is enabled AND at least one positive daily/weekly limit is
 * configured (mirrors `normalizeLimitUsd` in `apiKeyUsageLimits.ts`).
 */
import { getDbInstance } from "./core";

const LIMITED_KEY_SQL = `k.usage_limit_enabled = 1
  AND (COALESCE(k.daily_usage_limit_usd, 0) > 0 OR COALESCE(k.weekly_usage_limit_usd, 0) > 0)`;

export interface UsageModelGroupRow {
  provider: string;
  model: string;
  requests: number;
  apiKeys: number;
  limitedApiKeys: number;
  lastSeenAt: string | null;
}

/** Successful usage since `sinceIso`, grouped by lower-cased provider/model (same keys enforcement groups by). */
export function getSuccessfulUsageModelGroupsSince(sinceIso: string): UsageModelGroupRow[] {
  const rows = getDbInstance()
    .prepare(
      `
      SELECT
        LOWER(u.provider) as provider,
        LOWER(u.model) as model,
        COUNT(*) as requests,
        COUNT(DISTINCT u.api_key_id) as apiKeys,
        COUNT(DISTINCT CASE WHEN ${LIMITED_KEY_SQL} THEN u.api_key_id END) as limitedApiKeys,
        MAX(u.timestamp) as lastSeenAt
      FROM usage_history u
      LEFT JOIN api_keys k ON k.id = u.api_key_id
      WHERE u.timestamp >= @sinceIso
        AND u.success = 1
      GROUP BY LOWER(u.provider), LOWER(u.model)
    `
    )
    .all({ sinceIso }) as Array<Record<string, unknown>>;

  return rows.flatMap((row) => {
    const provider = typeof row.provider === "string" ? row.provider : "";
    const model = typeof row.model === "string" ? row.model : "";
    if (!provider || !model) return [];
    return [
      {
        provider,
        model,
        requests: Number(row.requests) || 0,
        apiKeys: Number(row.apiKeys) || 0,
        limitedApiKeys: Number(row.limitedApiKeys) || 0,
        lastSeenAt: typeof row.lastSeenAt === "string" ? row.lastSeenAt : null,
      },
    ];
  });
}

/** Distinct limited API keys with successful usage of any of `labels` (`provider/model`, lower-case) since `sinceIso`. */
export function countLimitedApiKeysUsingModelsSince(sinceIso: string, labels: string[]): number {
  if (labels.length === 0) return 0;
  const row = getDbInstance()
    .prepare(
      `
      SELECT COUNT(DISTINCT u.api_key_id) as affected
      FROM usage_history u
      JOIN api_keys k ON k.id = u.api_key_id
      WHERE u.timestamp >= @sinceIso
        AND u.success = 1
        AND ${LIMITED_KEY_SQL}
        AND (LOWER(u.provider) || '/' || LOWER(u.model)) IN (SELECT value FROM json_each(@labels))
    `
    )
    .get({ sinceIso, labels: JSON.stringify(labels) }) as { affected?: number } | undefined;
  return Number(row?.affected) || 0;
}
