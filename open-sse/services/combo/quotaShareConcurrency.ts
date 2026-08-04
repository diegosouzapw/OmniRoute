/**
 * quotaShareConcurrency.ts — Per-connection concurrency limit for quota-share combos (FASE 2.1).
 *
 * The quota-share gating in selectQuotaShareTarget (combo/quotaShareStrategy.ts)
 * is FAIL-OPEN: an at-cap connection is only deprioritized, never hard-blocked,
 * so with a single-connection pool (the common case for a subscription account)
 * concurrent requests to that account are all dispatched at once and flood it
 * (→ 429 + cooldown). The quota-share dispatch path also never calls
 * `semaphore.acquire` — that lived only in handleRoundRobinCombo.
 *
 * This helper closes that gap WITHOUT touching the fail-open selection logic:
 * when the selected connection declares a positive `max_concurrent` ceiling, the
 * dispatch acquires a per-CONNECTION semaphore slot keyed by connectionId (the
 * cap belongs to the account, not the combo), so concurrent requests to one
 * account WAIT in the queue instead of flooding it. It stays fail-open at the
 * edges: no connection / no positive cap → no limit; a saturated queue / timeout
 * → proceed without a slot rather than ever worsening availability.
 *
 * The key is connectionId-scoped (not combo-scoped like the round-robin key) so
 * every quota-share request that lands on the same account shares one gate.
 */

import * as semaphore from "../rateLimitSemaphore.ts";
import type { ResolvedComboTarget } from "./types.ts";

/** Stable, connection-scoped semaphore key for the quota-share concurrency gate. */
export function quotaShareConcurrencyKey(connectionId: string): string {
  return `qsconn:${connectionId}`;
}

export interface QuotaShareSlotOptions {
  /** Max time a request waits in the queue before failing open (ms). */
  queueTimeoutMs: number;
  /** Max queued waiters before the gate fails open instead of queueing more. */
  maxQueueSize: number;
}

interface SlotLogger {
  warn: (tag: string, message: string) => void;
}

/**
 * Acquire a per-connection concurrency slot for the selected quota-share target.
 *
 * Returns a release callback to invoke once the request finishes, or `null` when
 * no limit applies (missing connection, `cap === null`, `cap <= 0`) or the gate
 * is saturated. Fail-open is deliberate: this layer must never make a quota-share
 * request fail that would otherwise have been dispatched — it only paces the ones
 * it can, so a full queue / timeout proceeds WITHOUT a slot.
 */
export async function acquireQuotaShareConcurrencySlot(
  target: ResolvedComboTarget | undefined,
  cap: number | null,
  opts: QuotaShareSlotOptions,
  log: SlotLogger
): Promise<(() => void) | null> {
  const connectionId = target?.connectionId ?? "";
  if (!connectionId || cap === null || cap <= 0) return null;
  try {
    return await semaphore.acquire(quotaShareConcurrencyKey(connectionId), {
      maxConcurrency: cap,
      timeoutMs: opts.queueTimeoutMs,
      maxQueueSize: opts.maxQueueSize,
    });
  } catch {
    // Fail-open: a saturated queue / timeout must never worsen availability —
    // proceed without a slot rather than reject a dispatchable request.
    log.warn(
      "COMBO",
      `Quota-share concurrency: connection ${connectionId} gate saturated (cap=${cap}) — proceeding without a slot`
    );
    return null;
  }
}
