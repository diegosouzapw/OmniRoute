/**
 * quotaResetTimers.ts — Automated quota window reset timers and capacity recovery.
 *
 * Tracks window reset timestamps and automatically clears exhausted provider quota
 * states when their reset windows elapse.
 *
 * Part of: Quota-aware provider scheduling (Phase 2).
 */

import { getDbInstance } from "@/lib/db/core";
import { createLogger } from "@/shared/utils/logger";

const log = createLogger("quota:reset-timers");

export interface QuotaResetItem {
  connectionId: string;
  model: string;
  tokensUsed: number;
  tokenLimit: number;
  windowReset: number;
  timeRemainingMs: number;
}

/**
 * Get all active quota states and their remaining window reset times.
 */
export function getActiveQuotaResetItems(): QuotaResetItem[] {
  try {
    const db = getDbInstance();
    const rows = db.prepare("SELECT * FROM provider_quota_state WHERE window_reset > 0").all() as Array<{
      connection_id: string;
      model: string;
      tokens_used: number;
      token_limit: number;
      window_reset: number;
    }>;

    const now = Date.now();
    return rows.map((r) => ({
      connectionId: String(r.connection_id),
      model: String(r.model),
      tokensUsed: Number(r.tokens_used),
      tokenLimit: Number(r.token_limit),
      windowReset: Number(r.window_reset),
      timeRemainingMs: Math.max(0, Number(r.window_reset) - now),
    }));
  } catch (error) {
    log.error("Failed to query active quota reset items", error);
    return [];
  }
}

/**
 * Purge or reset all expired quota windows in SQLite.
 * Returns the count of reset connections.
 */
export function resetExpiredQuotaWindows(): number {
  try {
    const db = getDbInstance();
    const now = Date.now();
    const result = db
      .prepare("DELETE FROM provider_quota_state WHERE window_reset > 0 AND window_reset <= ?")
      .run(now);
    return result.changes ?? 0;
  } catch (error) {
    log.error("Failed to reset expired quota windows", error);
    return 0;
  }
}
