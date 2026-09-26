/**
 * Transport-failure outcome feedback for proxy selection (#14802). The proxy
 * dispatcher (proxyFetch) calls the two record hooks at its single success
 * return and its single final throw; the evidence itself is kept by the pure
 * store in proxyRefusalMemory.ts. Everything here is opt-in: with
 * PROXY_SKIP_RECENTLY_FAILED off nothing is recorded (no hot-path cost) and
 * nothing is ever set aside.
 */
import { isProxySkipRecentlyFailedEnabled } from "@/shared/utils/featureFlags";
import {
  hasTransportCrossEvidence,
  noteProxyRefusal,
  proxyEgressKey,
  recordTransportFailure,
  recordTransportSuccess,
  transportDestinationKey,
} from "./proxyRefusalMemory.ts";

/**
 * Decide a tagged final transport failure (errorCode "proxy_unreachable" on the
 * thrown sanitized error). Opt-in: only with PROXY_SKIP_RECENTLY_FAILED on,
 * and only with cross-evidence (repeated tagged failures through this egress
 * plus a real success to the same destination through a different egress),
 * does the member get set aside under the "transport" kind. A null key (direct
 * egress, edge relay), an explicit single-member pool, or missing evidence
 * writes nothing. The failure itself must already be recorded via
 * recordTransportFailure before calling; a retried-then-recovered attempt is
 * never recorded, so only final failures count.
 *
 * The dispatcher does not know the pool size, so on that path a lone member is
 * protected by the cross-evidence rule itself: without a success through a
 * different egress to the same destination nothing is ever written.
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

/** Record a final tagged transport failure as evidence, then decide. Best effort, never throws. */
export function recordFinalTransportOutcome(proxyUrl: string | null, targetUrl: string): void {
  try {
    if (!isProxySkipRecentlyFailedEnabled()) return;
    const key = proxyEgressKey(proxyUrl);
    const destination = transportDestinationKey(targetUrl);
    recordTransportFailure(key, destination);
    noteTransportOutcome({ key, destination });
  } catch {
    /* evidence is best-effort; never break the request path */
  }
}

/** Record a proxied success as cross-evidence. Best effort, never throws. */
export function recordProxiedSuccess(proxyUrl: string | null, targetUrl: string): void {
  try {
    if (!isProxySkipRecentlyFailedEnabled()) return;
    recordTransportSuccess(transportDestinationKey(targetUrl), proxyEgressKey(proxyUrl));
  } catch {
    /* evidence is best-effort; never break the request path */
  }
}
