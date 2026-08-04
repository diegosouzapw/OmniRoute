/**
 * Proxy Health Check Scheduler
 *
 * Periodically tests all proxy registry entries and automatically
 * removes proxies that have been failing consecutively.
 *
 * Config via environment:
 *   PROXY_HEALTH_INTERVAL_MS  — sweep interval (default: 600000 = 10min)
 *   PROXY_HEALTH_ENABLED      — set "false" to disable
 *   PROXY_AUTO_REMOVE         — set "true" to auto-remove dead proxies
 *   PROXY_AUTO_REMOVE_AFTER   — consecutive failures before removal (default: 3)
 */

import { deleteProxyById, listProxies, updateProxy } from "@/lib/localDb";
import { createProxyDispatcher, clearDispatcherCache } from "@omniroute/open-sse/utils/proxyDispatcher";
import { fetch as undiciFetch } from "undici";
import {
  decideProxyHealthAction,
  type ProxyProbeOutcome,
} from "./decision.ts";

// #6246: a HEAD to the public probe target through a legit (often loaded) proxy
// can exceed a few seconds; the old 5s ceiling produced false negatives that
// flipped healthy proxies to inactive. Raise it and treat our own timeout as
// inconclusive (see testOneProxy) rather than a proxy failure.
const TEST_TIMEOUT_MS = 15000;
// Reachability probe target for proxy health checks. Configurable so operators
// can point it at an internal/self-hosted endpoint instead of the public default.
const TEST_URL = process.env.PROXY_HEALTH_TEST_URL || "https://httpbin.org/ip";
const CONCURRENCY = 10;
const INITIAL_DELAY_MS = 60_000;
const DEFAULT_INTERVAL_MS = 600_000;
const DEFAULT_REMOVE_AFTER = 3;
const LOG_PREFIX = "[ProxyHealth]";

declare global {
  var __proxyHealthInterval: ReturnType<typeof setInterval> | undefined;
  var __proxyHealthConsecutiveFailures: Map<string, number> | undefined;
}

function getFailureMap(): Map<string, number> {
  if (!globalThis.__proxyHealthConsecutiveFailures) {
    globalThis.__proxyHealthConsecutiveFailures = new Map();
  }
  return globalThis.__proxyHealthConsecutiveFailures;
}

function isEnabled(): boolean {
  return process.env.PROXY_HEALTH_ENABLED !== "false";
}

function getIntervalMs(): number {
  const raw = parseInt(process.env.PROXY_HEALTH_INTERVAL_MS ?? "", 10);
  return Number.isFinite(raw) && raw >= 60_000 ? raw : DEFAULT_INTERVAL_MS;
}

function isAutoRemoveEnabled(): boolean {
  return process.env.PROXY_AUTO_REMOVE === "true";
}

function getRemoveAfter(): number {
  const raw = parseInt(process.env.PROXY_AUTO_REMOVE_AFTER ?? "", 10);
  return Number.isFinite(raw) && raw > 0 ? raw : DEFAULT_REMOVE_AFTER;
}

function isBuildProcess(): boolean {
  return typeof process !== "undefined" && process.env.NEXT_PHASE === "phase-production-build";
}

function isBackgroundServicesDisabled(): boolean {
  const raw = process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES;
  if (!raw) return false;
  return ["1", "true", "yes", "on"].includes(raw.trim().toLowerCase());
}

/**
 * Reachability probe for one proxy, classified into a tri-state so the pure
 * decision layer can apply the #6246 policy:
 *   - "ok"           — the proxy relayed and the target answered (<500).
 *   - "inconclusive" — NOT the proxy's fault: our own timeout/abort, or the probe
 *                      TARGET returned a 5xx (the proxy connected fine). Never
 *                      penalizes the proxy.
 *   - "fail"         — a proxy-level connection error (refused/unreachable/TLS).
 */
async function testOneProxy(proxy: {
  id: string;
  type: string;
  host: string;
  port: number;
}): Promise<ProxyProbeOutcome> {
  const proxyUrl = `${proxy.type}://${proxy.host}:${proxy.port}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TEST_TIMEOUT_MS);
  try {
    const dispatcher = createProxyDispatcher(proxyUrl);
    const resp = await undiciFetch(TEST_URL, {
      method: "HEAD",
      signal: controller.signal,
      dispatcher,
      headers: { "User-Agent": "OmniRoute/1.0" },
    });
    // A 5xx from the probe target means the proxy DID relay — the target is at
    // fault, not the proxy. Do not penalize the proxy for that.
    return resp.status < 500 ? "ok" : "inconclusive";
  } catch {
    // Our own deadline elapsed → inconclusive (slow, not necessarily dead).
    // Any other error is a genuine proxy-level connection failure.
    return controller.signal.aborted ? "inconclusive" : "fail";
  } finally {
    clearTimeout(timeout);
  }
}

async function sweep(): Promise<void> {
  const { items: proxies } = await listProxies({ includeSecrets: false });
  if (proxies.length === 0) return;

  const failureMap = getFailureMap();
  const removeAfter = getRemoveAfter();
  const autoRemove = isAutoRemoveEnabled();

  let tested = 0;
  let alive = 0;
  let inconclusive = 0;
  let removed = 0;

  for (let i = 0; i < proxies.length; i += CONCURRENCY) {
    const batch = proxies.slice(i, i + CONCURRENCY);
    const results = await Promise.allSettled(
      batch.map(async (proxy) => {
        const outcome = await testOneProxy(proxy);
        return { id: proxy.id, outcome };
      })
    );

    for (const result of results) {
      if (result.status !== "fulfilled") continue;
      const { id, outcome } = result.value;
      tested++;
      if (outcome === "ok") alive++;
      else if (outcome === "inconclusive") inconclusive++;

      const decision = decideProxyHealthAction({
        outcome,
        priorFailures: failureMap.get(id) ?? 0,
        autoRemove,
        removeAfter,
      });

      if (decision.clearFailures) failureMap.delete(id);
      else failureMap.set(id, decision.failures);

      // #6246 (policy C): only mutate the operator-owned status when the decision
      // explicitly asks for it. By default (auto-remove off) setStatus is null, so
      // a transient probe failure never flips a healthy proxy to inactive.
      if (decision.setStatus) {
        await updateProxy(id, { status: decision.setStatus }).catch(() => {});
      }

      if (decision.remove) {
        if (await deleteProxyById(id, { force: true }).catch(() => false)) {
          failureMap.delete(id);
          removed++;
          try { clearDispatcherCache(); } catch { /* non-critical */ }
        }
      }
    }
  }

  console.log(
    `${LOG_PREFIX} Sweep complete: ${tested} tested, ${alive} alive, ${inconclusive} inconclusive, ${removed} auto-removed`
  );
}

function scheduleSweep(): void {
  const interval = getIntervalMs();
  globalThis.__proxyHealthInterval = setInterval(() => {
    void sweep().catch((err) => {
      console.error(`${LOG_PREFIX} Sweep error:`, err);
    });
  }, interval);
}

export function initProxyHealthCheck(): void {
  if (!isEnabled() || isBuildProcess() || isBackgroundServicesDisabled()) return;
  if (globalThis.__proxyHealthInterval) return;

  setTimeout(() => {
    console.log(`${LOG_PREFIX} Starting proxy health scheduler (interval: ${getIntervalMs()}ms)`);
    void sweep().catch(() => {});
    scheduleSweep();
  }, INITIAL_DELAY_MS);
}

export function stopProxyHealthCheck(): void {
  if (globalThis.__proxyHealthInterval) {
    clearInterval(globalThis.__proxyHealthInterval);
    globalThis.__proxyHealthInterval = undefined;
  }
}

export async function forceProxyHealthSweep(): Promise<void> {
  await sweep();
}

// Auto-initialize on first import
initProxyHealthCheck();
