import { isEgressBucketedLockScope } from "@omniroute/open-sse/config/providerErrorRules.ts";
import {
  hasProxyRefusals,
  hasTransportCrossEvidence,
  noteProxyRecovered,
  noteProxyRefusal,
  noteProxyServed,
  proxyEgressKey,
} from "@omniroute/open-sse/utils/proxyRefusalMemory.ts";
import { isProxySkipRecentlyFailedEnabled } from "@/shared/utils/featureFlags";

/**
 * Feed the outcome the provider actually returned through a proxy (captured around the
 * patched fetch and carried on proxyInfo.upstreamStatus) back to proxy selection. Opt-in:
 * only with PROXY_SKIP_RECENTLY_FAILED on does a refusal received through a member set it
 * aside for the existing cooldown; a success through such a member clears it. A success
 * from another provider proves the proxy is reachable but says nothing about that refusal
 * (a global pool is shared across providers), so it only ends an unreachable period. No
 * outcome (local refusal, network error), an edge relay (the outcome is the relay's, and
 * its key is null) or a direct request writes nothing. Never reads result.status: several
 * failures are generated locally.
 *
 * Synchronous on purpose: the caller runs it as soon as the upstream status is known, so
 * a request picking from the pool right after already sees the member set aside. The flag
 * is read only for a refusal (a write); a success only clears what an earlier opt-in wrote.
 */
export function noteProxyOutcome(
  provider: string | null,
  proxyInfo: { proxy?: unknown; upstreamStatus?: number | null } | null | undefined
): void {
  const status = proxyInfo?.upstreamStatus;
  if (typeof status !== "number") return;
  const inRefusalScope = isEgressBucketedLockScope(provider);
  if (status === 429 && inRefusalScope) {
    const key = proxyEgressKey(proxyInfo?.proxy);
    if (key !== null && isProxySkipRecentlyFailedEnabled()) noteProxyRefusal(key, "ip_quota_429");
    return;
  }
  if (status < 200 || status >= 300 || !hasProxyRefusals()) return;
  const key = proxyEgressKey(proxyInfo?.proxy);
  if (inRefusalScope) noteProxyServed(key);
  else noteProxyRecovered(key, "proxy_unreachable");
}

/**
 * Decide a tagged final transport failure (errorCode "proxy_unreachable" on the
 * thrown sanitized error). Opt-in: only with PROXY_SKIP_RECENTLY_FAILED on,
 * and only with cross-evidence (repeated tagged failures through this egress
 * plus a real success to the same destination through a different egress),
 * does the member get set aside under the "transport" kind. A null key (direct
 * egress, edge relay), a single-member pool, or missing evidence writes
 * nothing. The failure itself must already be recorded via
 * recordTransportFailure before calling; a retried-then-recovered attempt is
 * never recorded, so only final failures count.
 */
export function noteTransportOutcome(args: {
  key: string | null;
  destination: string | null;
  poolSize?: number;
  nowMs?: number;
}): void {
  const { key, destination, poolSize, nowMs = Date.now() } = args;
  if (key === null) return;
  if (typeof poolSize === "number" && poolSize <= 1) return;
  if (!isProxySkipRecentlyFailedEnabled()) return;
  if (hasTransportCrossEvidence(key, destination, nowMs)) noteProxyRefusal(key, "transport", nowMs);
}
