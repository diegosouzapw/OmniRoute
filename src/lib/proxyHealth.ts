/**
 * T14: Proxy Fast-Fail — TCP health check with in-memory cache.
 *
 * When a configured HTTP/SOCKS5 proxy is unreachable, every request
 * through OmniRoute used to wait for the full PROXY_TIMEOUT_MS (30s)
 * before failing. This module detects dead proxies in <2s via a quick
 * TCP connection check, caching the result to avoid overhead per request.
 *
 * Ref: sub2api PR #1167 (fix: proxy-fast-fail)
 */

import { createConnection } from "node:net";
import { stripIpv6Brackets } from "@omniroute/open-sse/utils/proxyFamily";

// Configurable via env vars
const FAST_FAIL_TIMEOUT_MS = parseInt(process.env.PROXY_FAST_FAIL_TIMEOUT_MS ?? "2000", 10);
const HEALTH_CACHE_TTL_MS = parseInt(process.env.PROXY_HEALTH_CACHE_TTL_MS ?? "30000", 10);
const UNHEALTHY_CACHE_TTL_MS = parseInt(
  process.env.PROXY_HEALTH_UNHEALTHY_CACHE_TTL_MS ?? "2000",
  10
);

interface ProxyHealthEntry {
  healthy: boolean;
  checkedAt: number;
  ttlMs: number;
}

// In-memory cache: proxyUrl → health entry
const proxyHealthCache = new Map<string, ProxyHealthEntry>();
const proxyHealthInflight = new Map<string, Promise<boolean>>();

type TcpCheck = (host: string, port: number, timeoutMs: number) => Promise<boolean>;
let tcpCheckImpl: TcpCheck = tcpCheck;

/**
 * T14: Perform a fast TCP check to see if a proxy host:port is reachable.
 * Results are cached for `cacheTtlMs` (default 30s) to avoid checking every request.
 *
 * @param proxyUrl - Full proxy URL, e.g. http://user:pass@1.2.3.4:8080
 * @param timeoutMs - TCP connection timeout (default 2000ms)
 * @param cacheTtlMs - How long to cache the health result (default 30000ms)
 * @returns true if proxy TCP port is open, false otherwise
 */
export async function isProxyReachable(
  proxyUrl: string,
  timeoutMs = FAST_FAIL_TIMEOUT_MS,
  cacheTtlMs = HEALTH_CACHE_TTL_MS
): Promise<boolean> {
  const cached = proxyHealthCache.get(proxyUrl);
  if (cached && Date.now() - cached.checkedAt < cached.ttlMs) {
    return cached.healthy;
  }

  let url: URL;
  try {
    url = new URL(proxyUrl);
  } catch {
    // Malformed URL — treat as unreachable
    proxyHealthCache.set(proxyUrl, {
      healthy: false,
      checkedAt: Date.now(),
      ttlMs: cacheTtlMs,
    });
    return false;
  }

  const host = stripIpv6Brackets(url.hostname);
  const port = parseInt(url.port || defaultPortForScheme(url.protocol), 10);

  if (!host || isNaN(port)) {
    proxyHealthCache.set(proxyUrl, {
      healthy: false,
      checkedAt: Date.now(),
      ttlMs: cacheTtlMs,
    });
    return false;
  }

  const existingProbe = proxyHealthInflight.get(proxyUrl);
  if (existingProbe) {
    return existingProbe;
  }

  const probe = tcpCheckImpl(host, port, timeoutMs).then((healthy) => {
    proxyHealthCache.set(proxyUrl, {
      healthy,
      checkedAt: Date.now(),
      ttlMs: healthy ? cacheTtlMs : Math.min(cacheTtlMs, UNHEALTHY_CACHE_TTL_MS),
    });
    return healthy;
  });

  proxyHealthInflight.set(proxyUrl, probe);
  try {
    return await probe;
  } finally {
    if (proxyHealthInflight.get(proxyUrl) === probe) {
      proxyHealthInflight.delete(proxyUrl);
    }
  }
}

/**
 * Get the cached health status of a proxy without re-checking.
 * Returns null if there is no cached entry.
 */
export function getCachedProxyHealth(proxyUrl: string): boolean | null {
  const cached = proxyHealthCache.get(proxyUrl);
  if (!cached) return null;
  if (Date.now() - cached.checkedAt >= cached.ttlMs) return null; // stale
  return cached.healthy;
}

/**
 * Invalidate the cached health for a proxy URL (force re-check on next call).
 */
export function invalidateProxyHealth(proxyUrl: string): void {
  proxyHealthCache.delete(proxyUrl);
  proxyHealthInflight.delete(proxyUrl);
}

/**
 * Get all currently cached proxy health entries (for dashboard display).
 */
export function getAllProxyHealthStatuses(): Array<{
  proxyUrl: string;
  healthy: boolean;
  checkedAt: number;
  stale: boolean;
}> {
  const now = Date.now();
  return [...proxyHealthCache.entries()].map(([proxyUrl, entry]) => ({
    proxyUrl,
    healthy: entry.healthy,
    checkedAt: entry.checkedAt,
    stale: now - entry.checkedAt >= entry.ttlMs,
  }));
}

// ─── Internals ────────────────────────────────────────────────────────────────

function defaultPortForScheme(protocol: string): string {
  switch (protocol.replace(":", "").toLowerCase()) {
    case "https":
      return "443";
    case "socks5":
    case "socks5h":
      return "1080";
    case "http":
    default:
      return "8080";
  }
}

function tcpCheck(host: string, port: number, timeoutMs: number): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const socket = createConnection({ host, port }, () => {
      socket.destroy();
      resolve(true);
    });
    socket.setTimeout(timeoutMs);
    socket.on("error", () => resolve(false));
    socket.on("timeout", () => {
      socket.destroy();
      resolve(false);
    });
  });
}

export function __setProxyHealthTcpCheckForTesting(check: TcpCheck | null): void {
  tcpCheckImpl = check ?? tcpCheck;
}
