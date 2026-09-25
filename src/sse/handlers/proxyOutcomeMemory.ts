import { isEgressBucketedLockScope } from "@omniroute/open-sse/config/providerErrorRules.ts";
import {
  hasProxyRefusals,
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

// The transport cross-evidence decision lives next to its store in open-sse (the
// proxy dispatcher calls it without reaching into src/sse); re-exported here so
// the outcome feedback for proxies stays discoverable from one place.
export { noteTransportOutcome } from "@omniroute/open-sse/utils/proxyTransportOutcome.ts";
