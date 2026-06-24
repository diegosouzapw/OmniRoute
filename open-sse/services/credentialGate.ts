/**
 * Fast Credential Gate
 *
 * Pre-checks credential health before combo dispatch.
 * Uses in-memory cache (<1ms lookup) to skip targets with
 * known-bad credentials instead of waiting for a network timeout.
 *
 * Integration point: combo.ts handleComboChat(), before
 * handleSingleModelWrapped() at line ~2162.
 *
 * Health status is populated by the background scheduler started from
 * instrumentation-node.ts. The scheduler periodically calls
 * testSingleConnection() for provider connections.
 */

import {
  isCredentialHealthy,
  isCredentialStale,
  getCredentialHealthSummary,
} from "@/lib/credentialHealth/cache";

export interface CredentialGateResult {
  /** true = healthy, false = skip (bad), undefined = unknown */
  allowed: boolean | undefined;
  /** Human-readable reason if skipped */
  reason?: string;
}

/**
 * Fast pre-check before dispatching to a combo target.
 *
 * @param connectionId - The connection ID to check
 * @param provider - Provider identifier (for logging)
 * @param modelStr - Model string (for logging)
 * @returns CredentialGateResult
 *
 * Returns { allowed: undefined } if no cached data exists — the
 * caller can still allow the request but should log a warning.
 */
export function checkCredentialGate(
  connectionId: string,
  provider: string,
  modelStr: string
): CredentialGateResult {
  // 1. Check cache (sub-millisecond)
  const healthy = isCredentialHealthy(connectionId);

  if (healthy === false) {
    return {
      allowed: false,
      reason: `Credential gate: ${modelStr} — connection ${connectionId} has known-bad credentials (skipping)`,
    };
  }

  if (healthy === true) {
    return { allowed: true };
  }

  // 2. Unknown — check if stale
  const stale = isCredentialStale(connectionId);
  if (stale) {
    // Allow but log warning — credentials haven't been tested recently
    return {
      allowed: undefined,
      reason: `Credential gate: ${modelStr} — connection ${connectionId} has stale credentials (allowing, but untested for >10m)`,
    };
  }

  // Not in cache at all — allow (optimistic)
  return { allowed: undefined };
}

/**
 * Log a credential gate skip event.
 * This emits a structured warning for observability.
 */
export function logCredentialSkip(log: any, modelStr: string, reason: string): void {
  if (log?.info) {
    log.info("CREDENTIAL_GATE", reason);
  }
}

// Re-export cache functions for convenience
export { getCredentialHealthSummary } from "@/lib/credentialHealth/cache";
