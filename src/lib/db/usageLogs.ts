/**
 * Read-only auto-routing aggregations over `call_logs`.
 * `requested_model` keeps the client auto/* id after routing resolves a target.
 */

import { getDbInstance } from "./core";

// ---------------------------------------------------------------------------
// Auto-routing analytics
// ---------------------------------------------------------------------------

export interface AutoRoutingTotalResult {
  count: number;
}

/**
 * Returns the number of call-log rows requested through auto/ prefix models.
 */
export function getAutoRoutingTotalCount(): AutoRoutingTotalResult {
  const db = getDbInstance();
  const row = db
    .prepare(
      `
      SELECT COUNT(*) as count
      FROM call_logs
      WHERE requested_model = 'auto' OR requested_model LIKE 'auto/%'
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
 * Returns per-variant request counts from the client-requested model id.
 */
export function getAutoRoutingVariantBreakdown(): AutoRoutingVariantRow[] {
  const db = getDbInstance();
  return db
    .prepare(
      `
      SELECT
        CASE
          WHEN requested_model = 'auto' THEN 'default'
          WHEN requested_model LIKE 'auto/%' THEN SUBSTR(requested_model, 6)
          ELSE 'other'
        END as variant,
        COUNT(*) as count
      FROM call_logs
      WHERE requested_model = 'auto' OR requested_model LIKE 'auto/%'
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
 * Returns the top 10 providers used for auto/ prefix requests.
 */
export function getAutoRoutingTopProviders(): AutoRoutingTopProviderRow[] {
  const db = getDbInstance();
  return db
    .prepare(
      `
      SELECT provider, COUNT(*) as count
      FROM call_logs
      WHERE (requested_model = 'auto' OR requested_model LIKE 'auto/%')
        AND provider IS NOT NULL
        AND TRIM(provider) != ''
      GROUP BY provider
      ORDER BY count DESC
      LIMIT 10
      `
    )
    .all() as AutoRoutingTopProviderRow[];
}
