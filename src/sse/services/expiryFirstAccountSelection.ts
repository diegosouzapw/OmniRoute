/**
 * `expiry-first` per-provider ACCOUNT fallback strategy (#14533), extracted from
 * auth.ts as a leaf so the frozen god-file `auth.ts` only carries the wiring.
 *
 * Spends the quota that is closest to being lost: each account is ranked by how
 * much it must burn PER HOUR to avoid wasting its leftover at the next reset, so
 * a full account whose window closes soon outranks an equally full one that
 * holds for days. fill-first drains the top-priority account and lets the rest
 * roll over unspent; that lost quota is the whole reason this strategy exists.
 *
 * This module never imports auth.ts (no cycle); it reads the same per-connection
 * quota cache auth.ts reads and reuses the combo quota scorer.
 */

import { getQuotaCache } from "@/domain/quotaCache";
import { toNumber } from "@/shared/utils/numeric";
import {
  resolveExpiryFirstConfig,
  scoreExpiryFirstQuota,
} from "@omniroute/open-sse/services/combo/quotaScoring.ts";

interface QuotaCacheView {
  quotas?: Record<string, { remainingPercentage?: number; resetAt?: string | null }>;
}

interface ExpiryFirstCandidate {
  id: string;
  priority?: number | null;
  backoffLevel?: number | null;
  lastUsedAt?: string | null;
}

function toStringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

/**
 * Adapts the per-connection quota cache to the shape the combo quota scorers read.
 * The cache stores `{ quotas: { <window>: { remainingPercentage, resetAt } } }`
 * (percent REMAINING, 0-100); the scorers read `{ windows: { <window>:
 * { percentUsed, resetAt } } }` (fraction USED, 0-1). Converting rather than
 * re-fetching keeps account selection free of any upstream quota call.
 *
 * Returns null when no window carries a usable percentage, so the caller can
 * tell "no telemetry" apart from "telemetry says empty".
 */
export function buildConnectionQuotaWindowsView(
  connectionId: string
): Record<string, unknown> | null {
  const quotas = (getQuotaCache(connectionId) as QuotaCacheView | null)?.quotas;
  if (!quotas) return null;

  const windows: Record<string, { percentUsed: number; resetAt: string | null }> = {};
  for (const [windowName, quota] of Object.entries(quotas)) {
    const remainingPercent = toNumber(quota?.remainingPercentage, Number.NaN);
    if (!Number.isFinite(remainingPercent)) continue;
    windows[windowName.toLowerCase()] = {
      percentUsed: Math.min(1, Math.max(0, 1 - remainingPercent / 100)),
      resetAt: toStringOrNull(quota?.resetAt),
    };
  }

  return Object.keys(windows).length > 0 ? { windows } : null;
}

/**
 * Orders accounts for `expiry-first` and returns the winner.
 *
 * Pure and quota-source agnostic (`resolveQuotaView` is injected) so the ranking
 * is testable without a database or an upstream call.
 *
 * Accounts within `expiryFirstTieBandPercent` of the leader — compared
 * RELATIVELY, since the score is a rate and not a 0-1 value — are equivalent and
 * rotate least-recently-used. Without the band a rounding difference would pin
 * every request to one account and the strategy would degenerate into fill-first
 * for a pool of equivalent accounts.
 */
export function selectExpiryFirstConnection<T extends ExpiryFirstCandidate>(
  connections: readonly T[],
  settings: Record<string, unknown> | null,
  resolveQuotaView: (connectionId: string) => Record<string, unknown> | null,
  nowMs: number = Date.now()
): T | null {
  if (connections.length === 0) return null;

  const config = resolveExpiryFirstConfig(settings);
  const scored = connections.map((candidate) => ({
    candidate,
    score: scoreExpiryFirstQuota(resolveQuotaView(candidate.id), config, nowMs).score,
  }));
  scored.sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score; // most urgent first
    return (a.candidate.priority || 999) - (b.candidate.priority || 999);
  });

  const bestScore = scored[0].score;
  // Every account scored zero (no telemetry, or all exhausted): fall through to
  // the priority order the pool arrived in rather than picking arbitrarily.
  if (bestScore <= 0) return connections[0];

  const tied = scored.filter((entry) => (bestScore - entry.score) / bestScore <= config.tieBand);
  if (tied.length <= 1) return scored[0].candidate;

  tied.sort((a, b) => {
    const aBackoff = a.candidate.backoffLevel || 0;
    const bBackoff = b.candidate.backoffLevel || 0;
    if (aBackoff !== bBackoff) return aBackoff - bBackoff;
    if (!a.candidate.lastUsedAt && !b.candidate.lastUsedAt)
      return (a.candidate.priority || 999) - (b.candidate.priority || 999);
    if (!a.candidate.lastUsedAt) return -1;
    if (!b.candidate.lastUsedAt) return 1;
    return new Date(a.candidate.lastUsedAt).getTime() - new Date(b.candidate.lastUsedAt).getTime();
  });
  return tied[0].candidate;
}

/**
 * The `getProviderCredentials` entry point: ranks the ordered pool against the
 * live quota cache and falls back to the first connection when the pool yields
 * no winner. The caller commits `lastUsedAt` afterwards (same as least-used,
 * #10945) because the tie band reads that field.
 */
export function pickExpiryFirstConnection<T extends ExpiryFirstCandidate>(
  orderedConnections: readonly T[],
  settings: unknown
): T {
  return (
    selectExpiryFirstConnection(
      orderedConnections,
      settings as Record<string, unknown> | null,
      buildConnectionQuotaWindowsView
    ) ?? orderedConnections[0]
  );
}
