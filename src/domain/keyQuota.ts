/**
 * Domain Key Quota Enforcement (RIC-741 / M3 D5) — counter + threshold.
 *
 * A KISS circuit-breaker-style gate over the per-key tpm/rpm/monthly-amount
 * quota counters. Two entry points mirror the existing quota conventions:
 *
 *   - `checkKeyQuota(apiKeyId, deps)` — PRE-request gate. Returns an
 *     `{ allowed, reason }` verdict. Fail-open (B16): any infra error (DB not
 *     ready, migration missing) returns allowed so a quota hiccup never blocks
 *     legitimate traffic.
 *
 *   - `recordKeyQuotaUsage(apiKeyId, billableTokens, deps)` — POST-response
 *     increment of tpm (by tokens) + rpm (by 1 request). Fail-open (B29).
 *
 * The monthly amount dimension is read from the cost ledger (the ledger IS the
 * counter), so money is never double-tracked in two stores.
 *
 * @module domain/keyQuota
 */

import {
  getKeyQuotaStatus,
  incrementKeyQuotaCounter,
  type KeyQuotaStatus,
} from "@/lib/db/keyQuota";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface KeyQuotaVerdict {
  allowed: boolean;
  reason: string | null;
  dimension: "tpm" | "rpm" | "monthly" | null;
  status?: KeyQuotaStatus;
}

export interface CheckKeyQuotaDeps {
  now?: () => number;
  monthTotalUsd?: number;
}

export interface RecordKeyQuotaDeps {
  now?: () => number;
}

// ---------------------------------------------------------------------------
// Pre-request gate
// ---------------------------------------------------------------------------

function verdict(
  allowed: boolean,
  dimension: KeyQuotaVerdict["dimension"],
  status: KeyQuotaStatus,
  reason?: string
): KeyQuotaVerdict {
  if (allowed) return { allowed: true, reason: null, dimension: null, status };
  const message =
    reason ||
    (dimension === "tpm"
      ? `Token-per-minute quota exceeded for this API key`
      : dimension === "rpm"
        ? `Request-per-minute quota exceeded for this API key`
        : `Monthly USD quota exceeded for this API key`);
  return { allowed: false, reason: message, dimension, status };
}

/**
 * PRE-request quota gate. Always fail-open (B16).
 */
export function checkKeyQuota(
  apiKeyId: string | null | undefined,
  deps: CheckKeyQuotaDeps = {}
): KeyQuotaVerdict {
  if (!apiKeyId) return { allowed: true, reason: null, dimension: null };
  try {
    const status = getKeyQuotaStatus(apiKeyId, deps);
    if (!status.enabled) return { allowed: true, reason: null, dimension: null, status };
    if (status.tpmExceeded) return verdict(false, "tpm", status);
    if (status.rpmExceeded) return verdict(false, "rpm", status);
    if (status.monthlyExceeded) return verdict(false, "monthly", status);
    return verdict(true, null, status);
  } catch {
    // B16 — fail-open: quota infra error must not block traffic.
    return { allowed: true, reason: null, dimension: null };
  }
}

/**
 * POST-response consumption recorder. Fire-and-forget (B29): increments tpm by
 * billable tokens and rpm by 1. Never throws to the caller.
 */
export function recordKeyQuotaUsage(
  apiKeyId: string | null | undefined,
  billableTokens: number,
  deps: RecordKeyQuotaDeps = {}
): void {
  if (!apiKeyId) return;
  const nowMs = (deps.now ?? Date.now)();
  try {
    if (billableTokens > 0) incrementKeyQuotaCounter(apiKeyId, "tpm", billableTokens, nowMs);
    incrementKeyQuotaCounter(apiKeyId, "rpm", 1, nowMs);
  } catch {
    // B29 — drift acceptable; never propagate.
  }
}

export type { KeyQuotaStatus };