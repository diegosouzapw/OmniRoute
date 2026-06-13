/**
 * db/usageLogs.ts — Read-only aggregation queries over `usage_logs`
 * extracted from the /api/analytics/auto-routing route handler.
 *
 * Hard Rule #5: routes must not embed raw SQL — these queries live here so the
 * /api/analytics/auto-routing route can delegate.
 *
 * Sliced out of #3500 (usage_logs cluster, slice 4).
 */

import { getDbInstance } from "./core";

// ---------------------------------------------------------------------------
// Auto-routing analytics
// ---------------------------------------------------------------------------

export interface AutoRoutingTotalResult {
  count: number;
}

/**
 * Returns the total number of requests routed through auto/ prefix models.
 * Matches model = 'auto' OR model LIKE 'auto/%'.
 */
export function getAutoRoutingTotalCount(): AutoRoutingTotalResult {
  const db = getDbInstance();
  const row = db
    .prepare(
      `
      SELECT COUNT(*) as count
      FROM usage_logs
      WHERE model = 'auto' OR model LIKE 'auto/%'
    `
    )
    .get() as AutoRoutingTotalResult | undefined;
  return row ?? { count: 0 };
}

export interface AutoRoutingVariantRow {
  variant: string;
  count: number;
}

/**
 * Returns per-variant request counts for auto/ prefix models.
 * Variant is derived from the model name:
 *   'auto'      → 'default'
 *   'auto/X'    → 'X'
 *   other       → 'other' (should not occur given the WHERE clause)
 */
export function getAutoRoutingVariantBreakdown(): AutoRoutingVariantRow[] {
  const db = getDbInstance();
  return db
    .prepare(
      `
      SELECT
        CASE
          WHEN model = 'auto' THEN 'default'
          WHEN model LIKE 'auto/%' THEN SUBSTR(model, 6)
          ELSE 'other'
        END as variant,
        COUNT(*) as count
      FROM usage_logs
      WHERE model = 'auto' OR model LIKE 'auto/%'
      GROUP BY variant
      ORDER BY count DESC
    `
    )
    .all() as AutoRoutingVariantRow[];
}

export interface AutoRoutingTopProviderRow {
  provider: string;
  count: number;
}

/**
 * Returns the top 10 providers used for auto/ prefix model requests.
 */
export function getAutoRoutingTopProviders(): AutoRoutingTopProviderRow[] {
  const db = getDbInstance();
  return db
    .prepare(
      `
      SELECT provider, COUNT(*) as count
      FROM usage_logs
      WHERE model = 'auto' OR model LIKE 'auto/%'
      GROUP BY provider
      ORDER BY count DESC
      LIMIT 10
      `
    )
    .all() as AutoRoutingTopProviderRow[];
}
