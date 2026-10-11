/**
 * rateLimitManager/autoProtection — auto-enable safety-net predicates (pure).
 *
 * Extracted from rateLimitManager.ts so the providers API can report the same
 * "auto-protected" verdict the limiter uses (dashboard badge, PR #15790)
 * without pulling Bottleneck/limiter state into the route.
 *
 * @module services/rateLimitManager/autoProtection
 */

import { getProviderCategory } from "../../config/providerRegistry.ts";
import type { RequestQueueSettings } from "../../../src/lib/resilience/settings";

/**
 * Env-var override for the auto-enable safety net. Highest priority — wins
 * over the persisted dashboard setting. Use to disable in an incident without
 * needing dashboard access.
 *   RATE_LIMIT_AUTO_ENABLE=false  → never auto-enable
 *   RATE_LIMIT_AUTO_ENABLE=true   → force on regardless of dashboard
 *   (unset)                        → use dashboard setting
 */
export function isAutoEnableActive(settings: RequestQueueSettings): boolean {
  const env = process.env.RATE_LIMIT_AUTO_ENABLE?.trim().toLowerCase();
  if (env === "false" || env === "0" || env === "off") return false;
  if (env === "true" || env === "1" || env === "on") return true;
  return settings.autoEnableApiKeyProviders;
}

/**
 * True when a connection is covered by the auto-enable safety net (and has no
 * explicit `rateLimitProtection` of its own). Shared with the providers API so the
 * dashboard badge matches what the limiter actually does.
 */
export function isConnectionAutoProtected(
  conn: { provider: string; isActive?: boolean | null; rateLimitProtection?: boolean | null },
  requestQueueSettings: RequestQueueSettings
): boolean {
  if (conn.rateLimitProtection === true) return false;
  return (
    isAutoEnableActive(requestQueueSettings) &&
    getProviderCategory(conn.provider) === "apikey" &&
    conn.isActive === true
  );
}
