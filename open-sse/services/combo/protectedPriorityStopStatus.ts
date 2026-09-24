/**
 * #13439 — HTTP status for a protected-priority stop: a `priority` target marked
 * `fallbackOnlyOnQuotaExhaustion` stops the combo instead of falling through, and
 * every such stop answers 503, which reads like quota exhaustion.
 *
 * Only causes that are provably NOT quota, rate limit or cooldown may answer 502:
 * - `circuit_open`: the whole-provider breaker opens on 408/5xx only
 *   (PROVIDER_BREAKER_FAILURE_STATUSES; 429 and request-scoped failures never trip it);
 * - `predictive_ttft`: skipped on recorded latency alone.
 * Everything else (model lockout, provider/connection cooldown, request exhaustion,
 * unavailable credentials, credential gate, concurrency cap, quota cutoff) keeps 503:
 * those cannot be proven non-quota.
 *
 * Opt-in via PROTECTED_PRIORITY_INFRA_502_ENABLED (default off) because it changes a
 * client-visible status; a flag-read failure keeps 503.
 *
 * @internal — not part of the public combo.ts barrel.
 */
import { isFeatureFlagEnabled } from "../../../src/shared/utils/featureFlags.ts";

export type ProtectedPriorityStopCause = "circuit_open" | "predictive_ttft";

export function protectedPriorityStopStatus(cause?: ProtectedPriorityStopCause): 502 | 503 {
  if (cause !== "circuit_open" && cause !== "predictive_ttft") return 503;
  try {
    return isFeatureFlagEnabled("PROTECTED_PRIORITY_INFRA_502_ENABLED") ? 502 : 503;
  } catch {
    // no-effect: an unreadable flag store keeps the legacy 503
    return 503;
  }
}
