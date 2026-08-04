/**
 * accountBuckets.ts — Saturating per-connection, per-window buckets.
 *
 * Tracks whether a connection has hit 100 % of a quota window (5h / 7d /
 * per-model 7d). Each bucket is lazily reset: on read, if now >= resetsAtMs
 * the entry is cleared and the connection is eligible again. No cron needed —
 * the reset is probed on the read path.
 *
 * Fail-open: missing entry → not saturated. All time input is injectable
 * (the `nowMs` param) so unit tests drive the clock deterministically — the
 * tested path never calls Date.now() implicitly.
 *
 * Complementary to connectionRecovery.ts: that module recovers DB-backed
 * request-error cooldowns (testStatus 'unavailable' + rateLimitedUntil); this
 * module tracks in-process plan-window utilization. Orthogonal concerns.
 *
 * Part of: Quota Sharing Engine — Phase 3 (#3 multi-window buckets).
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** In-process state for one (connectionId, windowKey) pair. */
interface BucketEntry {
  saturated: boolean;
  resetsAtMs: number; // 0 when the reset instant is unknown
}

/**
 * Minimal shape of a parsed UsageQuota entry, as produced by getClaudeUsage in
 * open-sse/services/usage.ts. `used` = % consumed (0..100); `total` = 100 for
 * percent-based windows; `resetAt` = ISO 8601 string or null (already
 * normalized upstream by parseResetTime).
 */
export interface UsageQuotaSlim {
  used: number;
  total: number;
  resetAt: string | null;
}

/**
 * Partial shape of the getClaudeUsage() return value this module needs. Only
 * `quotas` is consumed; other fields (plan, extraUsage, bootstrap) are ignored.
 */
export interface ClaudeUsageResult {
  quotas?: Record<string, UsageQuotaSlim | undefined>;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * Utilization threshold (0..100) at/above which a window is considered
 * saturated. 100 = exhausted. Named so it can be tuned globally if Anthropic
 * ever soft-throttles below the hard cap.
 */
export const SATURATION_THRESHOLD_PCT = 100;

// ---------------------------------------------------------------------------
// In-process store
// ---------------------------------------------------------------------------

/** Key: `${connectionId}::${windowKey}`. */
const _buckets = new Map<string, BucketEntry>();

function storeKey(connectionId: string, windowKey: string): string {
  return `${connectionId}::${windowKey}`;
}

/**
 * Parse an ISO 8601 `resetAt` string to epoch ms. Returns 0 on any failure
 * (unknown reset time → the lazy reset cannot fire for that bucket).
 */
function parseResetAtMs(resetAt: string | null | undefined): number {
  if (!resetAt) return 0;
  const ms = Date.parse(resetAt);
  return Number.isFinite(ms) && ms > 0 ? ms : 0;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Check whether the bucket for (connectionId, windowKey) is currently
 * saturated.
 *
 * Lazy reset: if `nowMs >= entry.resetsAtMs` (and resetsAtMs > 0) the entry is
 * cleared and `false` is returned — the connection is eligible again without
 * any background sweep.
 *
 * Fail-open: a missing entry returns false (not saturated).
 *
 * @param connectionId  Opaque string identifier for the connection.
 * @param windowKey     One of: "5h", "7d", "7d:<modelName>" (e.g. "7d:designer").
 * @param nowMs         Current epoch ms; defaults to Date.now() (off-path only).
 */
export function isBucketSaturated(
  connectionId: string,
  windowKey: string,
  nowMs: number = Date.now()
): boolean {
  if (!connectionId || !windowKey) return false; // fail-open
  const key = storeKey(connectionId, windowKey);
  const entry = _buckets.get(key);
  if (!entry) return false; // fail-open

  // Lazy reset: the window rolled over → the saturation is stale.
  if (entry.resetsAtMs > 0 && nowMs >= entry.resetsAtMs) {
    _buckets.delete(key);
    return false;
  }

  return entry.saturated;
}

/**
 * Record a usage observation for one (connectionId, windowKey) pair.
 *
 * Marks the bucket saturated when `usedPct >= SATURATION_THRESHOLD_PCT` and the
 * window has NOT already rolled over. When the observation is below the
 * threshold (or already past its reset), any existing entry is cleared so the
 * connection's eligibility is restored promptly. When `resetAt` is a valid ISO
 * string, the reset epoch is stored so lazy reset can fire later.
 *
 * @param connectionId  Opaque connection identifier.
 * @param windowKey     "5h", "7d", or "7d:<modelName>".
 * @param usedPct       Utilization percentage (0..100).
 * @param resetAt       ISO 8601 string (or null) for when this window resets.
 * @param nowMs         Current epoch ms; defaults to Date.now() (off-path only).
 */
export function recordUsage(
  connectionId: string,
  windowKey: string,
  usedPct: number,
  resetAt: string | null,
  nowMs: number = Date.now()
): void {
  if (!connectionId || !windowKey) return;
  const key = storeKey(connectionId, windowKey);

  const resetsAtMs = parseResetAtMs(resetAt);

  // Stale signal: the window already reset — discard any state and bail.
  if (resetsAtMs > 0 && nowMs >= resetsAtMs) {
    _buckets.delete(key);
    return;
  }

  const saturated = Number.isFinite(usedPct) && usedPct >= SATURATION_THRESHOLD_PCT;
  if (!saturated) {
    // Below threshold → clear any stale saturation so the bucket is eligible.
    _buckets.delete(key);
    return;
  }

  _buckets.set(key, { saturated: true, resetsAtMs });
}

/**
 * Parse the `quotas` map from a getClaudeUsage() result and record each known
 * window into its bucket.
 *
 * Window key mapping:
 *   "session (5h)"         → "5h"
 *   "weekly (7d)"          → "7d"
 *   "weekly <model> (7d)"  → "7d:<model>" (e.g. "weekly designer (7d)" → "7d:designer")
 *
 * Fail-open: a null/undefined result, a missing `quotas` map, or any malformed
 * quota entry is silently skipped.
 *
 * @param connectionId  Connection identifier.
 * @param usageResult   getClaudeUsage() return value (only `quotas` is read).
 * @param nowMs         Current epoch ms; defaults to Date.now() (off-path only).
 */
export function updateAccountBuckets(
  connectionId: string,
  usageResult: ClaudeUsageResult | null | undefined,
  nowMs: number = Date.now()
): void {
  if (!connectionId || !usageResult?.quotas) return;
  const { quotas } = usageResult;

  // Fixed windows.
  processQuotaEntry(connectionId, "5h", quotas["session (5h)"], nowMs);
  processQuotaEntry(connectionId, "7d", quotas["weekly (7d)"], nowMs);

  // Per-model weekly windows: "weekly <model> (7d)" → "7d:<model>".
  for (const [key, entry] of Object.entries(quotas)) {
    const match = /^weekly (.+) \(7d\)$/.exec(key);
    if (match?.[1]) {
      processQuotaEntry(connectionId, `7d:${match[1]}`, entry, nowMs);
    }
  }
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function processQuotaEntry(
  connectionId: string,
  windowKey: string,
  entry: UsageQuotaSlim | undefined | null,
  nowMs: number
): void {
  if (!entry || typeof entry.used !== "number") return;
  recordUsage(connectionId, windowKey, entry.used, entry.resetAt ?? null, nowMs);
}

// ---------------------------------------------------------------------------
// Test helpers (never call in production code)
// ---------------------------------------------------------------------------

/** Clear all bucket entries. Tests only — keeps state isolation between cases. */
export function _clearBucketsForTest(): void {
  _buckets.clear();
}

/** Return the current bucket count. Tests only — black-box size assertion. */
export function _bucketCountForTest(): number {
  return _buckets.size;
}
