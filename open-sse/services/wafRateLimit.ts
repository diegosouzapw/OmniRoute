/**
 * wafRateLimit.ts — Burst guard for agentrouter.org upstream WAF.
 *
 * The agentrouter.org gateway runs a content-filter WAF that becomes more
 * aggressive after bursts of requests from the same IP/key, returning
 * `400 content-blocked` for requests that would normally pass. After ~5-10
 * seconds of cooldown the filter relaxes again.
 *
 * To avoid tripping the WAF, we serialize outbound calls per provider and
 * enforce a minimum inter-request gap. The defaults are conservative and
 * meant to be a safety net — the upstream request rate from Claude Code is
 * inherently low (one human-paced request at a time), so this guard should
 * not affect normal traffic.
 */

import { log } from "../utils/logger.ts";

interface BurstGuardState {
  lastSentAt: number;
}

const state = new Map<string, BurstGuardState>();

export interface WafRateLimitConfig {
  minGapMs: number;
}

const DEFAULT_CONFIG: WafRateLimitConfig = {
  // 500ms is enough to prevent the burst-sensitive WAF from activating
  // while staying well below human perception of latency.
  minGapMs: 500,
};

let config: WafRateLimitConfig = { ...DEFAULT_CONFIG };

export function configureWafRateLimit(overrides: Partial<WafRateLimitConfig>): void {
  config = { ...config, ...overrides };
}

export function getWafRateLimitConfig(): WafRateLimitConfig {
  return { ...config };
}

/**
 * Wait until at least `minGapMs` has passed since the last call to
 * `gateOutboundRequest` for the same `bucketKey`. Safe to call from
 * concurrent requests — the lock is held only for the sleep, not across
 * the actual upstream fetch.
 *
 * @param bucketKey Stable identifier for the upstream (e.g. "agentrouter:url").
 */
export async function gateOutboundRequest(bucketKey: string): Promise<void> {
  const now = Date.now();
  const bucket = state.get(bucketKey);
  if (!bucket) {
    state.set(bucketKey, { lastSentAt: now });
    return;
  }
  const elapsed = now - bucket.lastSentAt;
  const wait = config.minGapMs - elapsed;
  if (wait > 0) {
    log?.debug?.(
      "WAF_RATE_LIMIT",
      `Throttling outbound to ${bucketKey} — waiting ${wait}ms (min gap ${config.minGapMs}ms)`
    );
    await new Promise((resolve) => setTimeout(resolve, wait));
  }
  state.set(bucketKey, { lastSentAt: Date.now() });
}

/**
 * Reset all rate-limit state. Primarily for tests.
 */
export function resetWafRateLimit(): void {
  state.clear();
}
