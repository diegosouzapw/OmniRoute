/**
 * Proxy Health Check Scheduler
 *
 * Periodically tests all proxy registry entries and automatically
 * removes (or soft-disables) proxies that have been failing consecutively.
 *
 * Config via environment:
 *   PROXY_HEALTH_INTERVAL_MS  — sweep interval (default: 600000 = 10min)
 *   PROXY_HEALTH_ENABLED      — set "false" to disable
 *   PROXY_AUTO_REMOVE         — set "true" to auto-remove dead proxies (destructive)
 *   PROXY_AUTO_DISABLE        — set "true" to auto-disable dead proxies instead of
 *                               deleting them (status → "dead", already excluded from
 *                               pool/rotation resolution by PROXY_ALIVE_PREDICATE). The
 *                               row is never deleted, and the same recovery check that
 *                               re-activates proxies for PROXY_AUTO_REMOVE flips it back
 *                               to "active" once it starts answering probes again — no
 *                               manual re-add needed. If both flags are set, auto-remove
 *                               wins (see decision.ts).
 *   PROXY_AUTO_REMOVE_AFTER   — consecutive failures before the action above fires
 *                               (default: 3). Shared by both PROXY_AUTO_REMOVE and
 *                               PROXY_AUTO_DISABLE — they are alternative actions at the
 *                               same threshold, not independently tunable.
 */

import { deleteProxyById, listProxies, updateProxy } from "@/lib/db/proxies";
import { isProxyLogIncludeIps } from "@/lib/proxyLogger";
import {
  getRecentEgressSharingSummary,
  type EgressSharingSummary,
  type EgressSharingWarning,
} from "@/lib/proxyEgress";
import {
  createProxyDispatcher,
  clearDispatcherCache,
  proxyConfigToUrl,
} from "@omniroute/open-sse/utils/proxyDispatcher";
import { fetch as undiciFetch } from "undici";
import {
  classifyProbeStatus,
  decideProxyHealthAction,
  type ProxyProbeOutcome,
} from "./decision.ts";
import {
  resolveProbeConcurrency,
  resolveProbeStaggerMs,
  resolveProbeTarget,
  waitForProbeSlot,
} from "./probeTarget.ts";
import { resolveProviderProbeTarget } from "./providerProbeTarget.ts";
import { isProxyHealthBlockedResetsStreakEnabled } from "@/shared/utils/featureFlags";

// #6246: a HEAD to the public probe target through a legit (often loaded) proxy
// can exceed a few seconds; the old 5s ceiling produced false negatives that
// flipped healthy proxies to inactive. Raise it and treat our own timeout as
// inconclusive (see testOneProxy) rather than a proxy failure.
const TEST_TIMEOUT_MS = 15000;
// Probe target, batch size and intra-batch spacing come from probeTarget.ts, which the
// auto-test endpoint reads too — one surface to tune instead of two that can drift apart.
// Resolved at module load, as these constants always were.
const TEST_URL = resolveProbeTarget();
const CONCURRENCY = resolveProbeConcurrency();
const STAGGER_MS = resolveProbeStaggerMs();
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

/**
 * PURE: one-line anonymous egress-sharing summary for the sweep log (#10677).
 * Counts only by default; raw shared IPs only when PROXY_LOG_INCLUDE_IPS=true
 * (the redaction decision from #10348 — never leak IPs or account labels).
 */
export function formatEgressSharingSummaryLine(
  summary: EgressSharingSummary,
  warnings: EgressSharingWarning[],
  includeDetails: boolean
): string {
  const base =
    `${LOG_PREFIX} egress: ${summary.sharingByRotationGroup.length} rotation group(s) share an ` +
    `egress IP (max ${summary.maxAccountsSharingOneIp} accounts)`;
  if (!includeDetails) return base;
  const detail = warnings
    .map((w) => `${w.rotationGroup}: ${w.egressIp} (${w.connections.length} accounts)`)
    .join(", ");
  return detail ? `${base} — ${detail}` : base;
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

function isAutoDisableEnabled(): boolean {
  return process.env.PROXY_AUTO_DISABLE === "true";
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
 * Reachability probe for one proxy, classified so the pure
 * decision layer can apply the #6246 policy:
 *   - "ok"           — the proxy relayed and the target served the request.
 *   - "blocked"      — the proxy relayed, but the TARGET refused this egress IP
 *                      (401/403/429). Neutral like "inconclusive" by default: the
 *                      proxy is not at fault, yet it is not serving that
 *                      destination. With PROXY_HEALTH_BLOCKED_RESETS_STREAK on it
 *                      also resets the consecutive-failure streak (never a status).
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
  username?: string;
  password?: string;
  family?: string;
}): Promise<ProxyProbeOutcome> {
  let proxyUrl: string | null;
  try {
    proxyUrl = proxyConfigToUrl(proxy);
  } catch {
    proxyUrl = null;
  }
  if (!proxyUrl) return "fail";
  // A provider's models endpoint is a real GET-only API surface, unlike httpbin.org/ip: many
  // reject HEAD outright. HEAD stays the default for the generic target — this changes nothing
  // for a proxy with no eligible provider assignment.
  const providerTarget = await resolveProviderProbeTarget(proxy.id);
  const target = providerTarget ?? TEST_URL;
  const method = providerTarget ? "GET" : "HEAD";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TEST_TIMEOUT_MS);
  try {
    const dispatcher = createProxyDispatcher(proxyUrl);
    const resp = await undiciFetch(target, {
      method,
      signal: controller.signal,
      dispatcher,
      headers: { "User-Agent": "OmniRoute/1.0" },
    });
    return classifyProbeStatus(resp.status);
  } catch {
    // Our own deadline elapsed → inconclusive (slow, not necessarily dead).
    if (controller.signal.aborted) return "inconclusive";
    // A provider-resolved target's connection health is not proven the way the
    // operator-configured generic target is: a registry baseUrl can be a placeholder that
    // never resolves for anyone (e.g. databricks's default azuredatabricks.net host is
    // literally 16 zeros). A connection failure there says nothing about this proxy —
    // same principle as the 5xx case above, extended to connection-level errors.
    return providerTarget ? "inconclusive" : "fail";
  } finally {
    clearTimeout(timeout);
  }
}

async function sweep(): Promise<void> {
  // #10677: anonymous egress-sharing signal from persisted proxy_logs (no live
  // probes). Logged only when sharing exists — the sweep line is a warning
  // signal, not a heartbeat. Runs before the empty-registry early return so
  // sharing from direct connections is still reported when no proxies are
  // configured. Never let a DB hiccup suppress the completion line or fail the
  // sweep itself.
  try {
    const { summary, warnings } = await getRecentEgressSharingSummary();
    if (summary.sharingByRotationGroup.length > 0) {
      console.log(formatEgressSharingSummaryLine(summary, warnings, isProxyLogIncludeIps()));
    }
  } catch (error) {
    console.error(`${LOG_PREFIX} Egress summary skipped:`, error);
  }

  const { items: proxies } = await listProxies({ includeSecrets: true });
  if (proxies.length === 0) return;

  const failureMap = getFailureMap();
  const removeAfter = getRemoveAfter();
  const autoRemove = isAutoRemoveEnabled();
  const autoDisable = isAutoDisableEnabled();
  const blockedResetsStreak = isProxyHealthBlockedResetsStreakEnabled();

  let tested = 0;
  let alive = 0;
  let inconclusive = 0;
  let blocked = 0;
  let removed = 0;
  let disabled = 0;

  for (let i = 0; i < proxies.length; i += CONCURRENCY) {
    const batch = proxies.slice(i, i + CONCURRENCY);
    const results = await Promise.allSettled(
      batch.map(async (proxy, indexInBatch) => {
        // Spread the departures: without this the whole batch leaves at the same tick and a
        // shared egress IP hits the target with CONCURRENCY simultaneous requests.
        await waitForProbeSlot(indexInBatch, STAGGER_MS);
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
      else if (outcome === "blocked") blocked++;

      const decision = decideProxyHealthAction({
        outcome,
        priorFailures: failureMap.get(id) ?? 0,
        autoRemove,
        autoDisable,
        removeAfter,
        blockedResetsStreak,
      });

      if (decision.clearFailures) failureMap.delete(id);
      else failureMap.set(id, decision.failures);

      // #6246 (policy C) / auto-disable (policy D): only mutate the operator-owned
      // status when the decision explicitly asks for it. With both flags off,
      // setStatus is null, so a transient probe failure never flips a healthy
      // proxy's status.
      if (decision.setStatus) {
        await updateProxy(id, { status: decision.setStatus }).catch(() => {});
        if (decision.setStatus === "dead") disabled++;
      }

      if (decision.remove) {
        if (await deleteProxyById(id, { force: true }).catch(() => false)) {
          failureMap.delete(id);
          removed++;
          try {
            clearDispatcherCache();
          } catch {
            /* non-critical */
          }
        }
      }
    }
  }

  console.log(
    `${LOG_PREFIX} Sweep complete: ${tested} tested, ${alive} alive, ${blocked} refused by target, ` +
      `${inconclusive} inconclusive, ${removed} auto-removed, ${disabled} auto-disabled`
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
