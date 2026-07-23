// Codex quota-snapshot parsing + reset/cooldown scheduling (pure). Verbatim from codex.ts.

/**
 * T03: Parsed quota snapshot from Codex response headers.
 * Codex includes per-account usage windows that allow precise reset scheduling.
 * Ref: sub2api PR #357 (feat(oauth): persist usage snapshots and window cooldown)
 */
export interface CodexQuotaSnapshot {
  usage5h: number; // tokens used in 5h window
  limit5h: number; // token limit for 5h window
  resetAt5h: string | null; // ISO timestamp when 5h window resets
  usage7d: number; // tokens used in 7d window
  limit7d: number; // token limit for 7d window
  resetAt7d: string | null; // ISO timestamp when 7d window resets
}

/**
 * T03: Parse Codex-specific quota headers from a provider response.
 * Returns null if none of the relevant headers are present.
 *
 * Extracts:
 *   x-codex-5h-usage / x-codex-5h-limit / x-codex-5h-reset-at
 *   x-codex-7d-usage / x-codex-7d-limit / x-codex-7d-reset-at
 */
export function parseCodexQuotaHeaders(headers: Record<string, string>): CodexQuotaSnapshot | null {
  const usage5h = headers["x-codex-5h-usage"] ?? null;
  const limit5h = headers["x-codex-5h-limit"] ?? null;
  const resetAt5h = headers["x-codex-5h-reset-at"] ?? null;
  const usage7d = headers["x-codex-7d-usage"] ?? null;
  const limit7d = headers["x-codex-7d-limit"] ?? null;
  const resetAt7d = headers["x-codex-7d-reset-at"] ?? null;

  // Return null if none of the quota headers are present (not a quota-aware response)
  if (!usage5h && !limit5h && !resetAt5h && !usage7d && !limit7d && !resetAt7d) {
    return null;
  }

  return {
    usage5h: usage5h ? parseFloat(usage5h) : 0,
    limit5h: limit5h ? parseFloat(limit5h) : Infinity,
    resetAt5h: resetAt5h ?? null,
    usage7d: usage7d ? parseFloat(usage7d) : 0,
    limit7d: limit7d ? parseFloat(limit7d) : Infinity,
    resetAt7d: resetAt7d ?? null,
  };
}

/**
 * T03: Get the soonest quota reset time from a CodexQuotaSnapshot.
 * 7d window takes priority (wider window, harder limit) but we use whichever
 * is further in the future to avoid releasing the block too early.
 *
 * @returns Unix timestamp (ms) of the soonest effective reset, or null
 */
export function getCodexResetTime(quota: CodexQuotaSnapshot): number | null {
  const times: number[] = [];
  if (quota.resetAt7d) {
    const t = new Date(quota.resetAt7d).getTime();
    if (!isNaN(t) && t > Date.now()) times.push(t);
  }
  if (quota.resetAt5h) {
    const t = new Date(quota.resetAt5h).getTime();
    if (!isNaN(t) && t > Date.now()) times.push(t);
  }
  if (times.length === 0) return null;
  return Math.max(...times); // Use furthest-out reset to avoid premature unblock
}

/**
 * T03 (Item 3): Compute the minimum-necessary cooldown based on which window
 * is actually exhausted. Prevents over-blocking the account:
 *
 * - If 7d window >= threshold: cooldown until 7d reset (weekly window exhausted)
 * - If 5h window >= threshold: cooldown until 5h reset only (short-term limit)
 * - Otherwise: 0 (account is healthy, no cooldown needed)
 *
 * Called after parsing quota headers from a successful/429 response to
 * mark the account accordingly without overly long cooldowns.
 *
 * @param quota - Parsed quota snapshot from response headers
 * @param threshold - Fraction (0-1) that triggers cooldown (default: 0.95)
 * @returns Cooldown duration in milliseconds (0 = no cooldown needed)
 */
export function getCodexDualWindowCooldownMs(
  quota: CodexQuotaSnapshot,
  threshold = 0.95
): { cooldownMs: number; window: "7d" | "5h" | "none" } {
  const now = Date.now();

  // Compute per-window usage ratios (0..1)
  const ratio7d =
    quota.limit7d > 0 && Number.isFinite(quota.limit7d) ? quota.usage7d / quota.limit7d : 0;
  const ratio5h =
    quota.limit5h > 0 && Number.isFinite(quota.limit5h) ? quota.usage5h / quota.limit5h : 0;

  // 7d window takes priority — if the weekly budget is near-exhausted,
  // we must wait until the weekly reset (not just 5h).
  if (ratio7d >= threshold && quota.resetAt7d) {
    const resetTime = new Date(quota.resetAt7d).getTime();
    if (resetTime > now) {
      return { cooldownMs: resetTime - now, window: "7d" };
    }
  }

  // 5h window (primary short-term rate limit)
  if (ratio5h >= threshold && quota.resetAt5h) {
    const resetTime = new Date(quota.resetAt5h).getTime();
    if (resetTime > now) {
      return { cooldownMs: resetTime - now, window: "5h" };
    }
  }

  return { cooldownMs: 0, window: "none" };
}
