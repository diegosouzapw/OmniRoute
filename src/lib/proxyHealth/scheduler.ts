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

const TEST_TIMEOUT_MS = 5000;
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

async function testOneProxy(proxy: { id: string; type: string; host: string; port: number }): Promise<boolean> {
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
    return resp.status < 500;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

async function sweep(): Promise<void> {
  const proxies = await listProxies({ includeSecrets: false });
  if (proxies.length === 0) return;

  const failureMap = getFailureMap();
  const removeAfter = getRemoveAfter();
  const autoRemove = isAutoRemoveEnabled();

  let tested = 0;
  let alive = 0;
  let removed = 0;

  for (let i = 0; i < proxies.length; i += CONCURRENCY) {
    const batch = proxies.slice(i, i + CONCURRENCY);
    const results = await Promise.allSettled(
      batch.map(async (proxy) => {
        const ok = await testOneProxy(proxy);
        return { id: proxy.id, ok };
      })
    );

    for (const result of results) {
      if (result.status !== "fulfilled") continue;
      const { id, ok } = result.value;
      tested++;

      if (ok) {
        alive++;
        failureMap.delete(id);
        await updateProxy(id, { status: "active" }).catch(() => {});
      } else {
        const failures = (failureMap.get(id) ?? 0) + 1;
        failureMap.set(id, failures);
        await updateProxy(id, { status: "inactive" }).catch(() => {});

        if (autoRemove && failures >= removeAfter) {
          if (await deleteProxyById(id, { force: true }).catch(() => false)) {
            failureMap.delete(id);
            removed++;
            try { clearDispatcherCache(); } catch { /* non-critical */ }
          }
        }
      }
    }
  }

  console.log(
    `${LOG_PREFIX} Sweep complete: ${tested} tested, ${alive} alive, ${removed} auto-removed`
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
