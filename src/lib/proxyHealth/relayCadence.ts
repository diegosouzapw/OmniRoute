/**
 * Relay probe cadence (#14984).
 *
 * Edge-relay proxy rows (deno / vercel / cloudflare) are serverless endpoints:
 * a health probe wakes the isolate, which the provider bills (e.g. Deno
 * "Memory Time"). They therefore get their own, much longer cadence than the
 * plain TCP/HTTP/SOCKS proxies, which stay on PROXY_HEALTH_INTERVAL_MS.
 *
 * A relay is never probed on first sight: the first sweep only starts its
 * clock, so a restart or a freshly registered relay does not wake it at once.
 */

import { isRelayType } from "@omniroute/open-sse/utils/proxyDispatcher";

export const DEFAULT_RELAY_INTERVAL_MS = 6 * 60 * 60 * 1000;
const MIN_RELAY_INTERVAL_MS = 60_000;

declare global {
  var __proxyHealthRelayProbedAt: Map<string, number> | undefined;
}

function getRelayProbedAtMap(): Map<string, number> {
  if (!globalThis.__proxyHealthRelayProbedAt) {
    globalThis.__proxyHealthRelayProbedAt = new Map();
  }
  return globalThis.__proxyHealthRelayProbedAt;
}

export function resolveRelayIntervalMs(env: NodeJS.ProcessEnv = process.env): number {
  const raw = parseInt(env.PROXY_HEALTH_RELAY_INTERVAL_MS ?? "", 10);
  return Number.isFinite(raw) && raw >= MIN_RELAY_INTERVAL_MS ? raw : DEFAULT_RELAY_INTERVAL_MS;
}

/**
 * Ids of relay-type proxies that must NOT be probed in this sweep. Relays that
 * are due are stamped as probed now (the caller probes them right after).
 */
export function selectRelayIdsToSkip(
  proxies: Array<{ id: string; type?: string | null }>,
  now: number = Date.now(),
  intervalMs: number = resolveRelayIntervalMs()
): Set<string> {
  const probedAt = getRelayProbedAtMap();
  const skip = new Set<string>();
  const live = new Set<string>();
  for (const proxy of proxies) {
    if (!isRelayType(proxy.type)) continue;
    live.add(proxy.id);
    const last = probedAt.get(proxy.id);
    if (last === undefined) {
      probedAt.set(proxy.id, now);
      skip.add(proxy.id);
    } else if (now - last < intervalMs) {
      skip.add(proxy.id);
    } else {
      probedAt.set(proxy.id, now);
    }
  }
  for (const id of probedAt.keys()) if (!live.has(id)) probedAt.delete(id);
  return skip;
}

/** Test-only: forget all relay clocks. */
export function __resetRelayCadenceForTesting(): void {
  globalThis.__proxyHealthRelayProbedAt = undefined;
}
