/**
 * usage/quota.ts — shared usage-quota shape + builders for the usage fetchers.
 *
 * Extracted from services/usage.ts (god-file decomposition): the `UsageQuota` value
 * type every per-provider fetcher returns, plus the two pure builders that normalize
 * upstream reset timestamps and assemble a quota from used/total counts. Depends only on
 * the sibling scalar leaf — no network, no DB, no module state — so usage.ts and the
 * per-provider fetcher leaves (MiniMax, GLM, …) import it without a cycle.
 */

import { toNumber, clampPercentage } from "./scalars.ts";

export type UsageQuota = {
  used: number;
  total: number;
  remaining?: number;
  remainingPercentage?: number;
  resetAt: string | null;
  unlimited: boolean;
  /**
   * True when the upstream provider reported the remaining fraction. False
   * means the API didn't include the field and the 0 value here is a sentinel,
   * NOT a confirmed-exhausted state. Antigravity-specific.
   */
  fractionReported?: boolean;
  quotaSource?: "retrieveUserQuota" | "fetchAvailableModels" | "localUsageHistory";
  displayName?: string;
  details?: Array<{
    name: string;
    used: number;
  }>;
  currency?: string;
  grantedBalance?: number;
  toppedUpBalance?: number;
};

export function parseResetTime(resetValue: unknown): string | null {
  if (!resetValue) return null;

  try {
    let date: Date;
    if (resetValue instanceof Date) {
      date = resetValue;
    } else if (typeof resetValue === "number") {
      date = new Date(resetValue < 1e12 ? resetValue * 1000 : resetValue);
    } else if (typeof resetValue === "string") {
      // Numeric strings are Unix timestamps too (seconds or milliseconds).
      // `new Date("1700000000")` otherwise returns Invalid Date.
      if (/^\d+$/.test(resetValue)) {
        const ts = Number(resetValue);
        date = new Date(ts < 1e12 ? ts * 1000 : ts);
      } else {
        date = new Date(resetValue);
      }
    } else {
      return null;
    }

    // Epoch-zero (1970-01-01) means no scheduled reset — treat as null
    if (date.getTime() <= 0) return null;

    return date.toISOString();
  } catch {
    return null;
  }
}

export function createQuotaFromUsage(
  usedValue: unknown,
  totalValue: unknown,
  resetValue: unknown
): UsageQuota {
  const total = Math.max(0, toNumber(totalValue, 0));
  const used = total > 0 ? Math.min(Math.max(0, toNumber(usedValue, 0)), total) : 0;
  const remaining = total > 0 ? Math.max(total - used, 0) : 0;

  return {
    used,
    total,
    remaining,
    remainingPercentage: total > 0 ? clampPercentage((remaining / total) * 100) : 0,
    resetAt: parseResetTime(resetValue),
    unlimited: false,
  };
}
