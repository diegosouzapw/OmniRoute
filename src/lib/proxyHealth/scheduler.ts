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
  classifyProbeError,
  classifyProbeStatus,
  decideProxyHealthAction,
  type ProxyProbeOutcome,
} from "./decision.ts";
import {
  MAX_PROBE_CONCURRENCY,
  resolveProbeConcurrency,
  resolveProbeStaggerMs,
  resolveProbeTarget,
  waitForProbeSlot,
} from "./probeTarget.ts";
import { resolveProviderProbeTarget } from "./providerProbeTarget.ts";
import {
  noteProxyRecovered,
  noteProxyRefusal,
  proxyEgressKey,
  type ProxyRefusalKind,
} from "@omniroute/open-sse/utils/proxyRefusalMemory";
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
// Opt-in, off by default. When on, a bounded recovery pass re-tests
// proxies the sweep saw refused (429) before their set-aside expires.
const RECOVERY_MAX_CANDIDATES = 10;
const RECOVERY_DURATION_MS = 60_000;
const LOG_PREFIX = "[ProxyHealth]";

/** One entry eligible for a targeted recovery probe. */
export interface RecoveryCandidate {
  /** Egress key of the set-aside proxy; null (opaque entry) is never planned. */
  key: string | null;
  /** Refusal motive recorded for the key — only `ip_quota_429` is ever planned. */
  kind: ProxyRefusalKind;
  /** When the key was set aside (ms epoch); oldest first. */
  setAsideAt: number;
}

/**
 * A targeted recovery probe: given a set-aside egress key, re-test it.
 * Keyed by string (not by registry id): the ledger only holds egress keys.
 */
export type RecoveryProbe = (key: string) => Promise<ProxyProbeOutcome>;

export interface RecoveryProbeLimits {
  maxCandidates: number;
  durationMs: number;
  concurrency: number;
}

/**
 * PURE: pick the bounded set of targeted recovery probes. Motive-filtered,
 * not status-filtered: only `ip_quota_429` entries are planned, so a
 * `proxy_unreachable` entry is excluded even when a 429 was observed for the
 * same key. Null keys are never tested.
 */
export function planRecoveryProbes(
  candidates: RecoveryCandidate[],
  limits: RecoveryProbeLimits
): RecoveryCandidate[] {
  const max = Number.isFinite(limits.maxCandidates) && limits.maxCandidates > 0
    ? Math.floor(limits.maxCandidates)
    : 0;
  if (max === 0) return [];
  return candidates
    .filter((c) => c.key !== null && c.kind === "ip_quota_429")
    .sort((a, b) => a.setAsideAt - b.setAsideAt)
    .slice(0, max);
}

/**
 * Owned ledger of sweep-observed refusals. Written ONLY on a 429 the
 * sweep itself observed, with a non-null key — never on fail/hang, never for
 * `proxy_unreachable`. The hot path writes its own motives to the shared
 * memory; this ledger only ever holds `ip_quota_429` by construction, while
 * `planRecoveryProbes` keeps the kind filter as a defensive contract.
 */
const recoveryLedger = new Map<string, { setAsideAt: number }>();

function noteSweepRefusal(key: string | null, status: number): void {
  if (key === null || status !== 429) return;
  if (!recoveryLedger.has(key)) recoveryLedger.set(key, { setAsideAt: Date.now() });
}

function isRecoveryEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return env.PROXY_HEALTH_RECOVERY_ENABLED === "true";
}

function resolveRecoveryLimits(env: NodeJS.ProcessEnv = process.env): RecoveryProbeLimits {
  return {
    maxCandidates: RECOVERY_MAX_CANDIDATES,
    durationMs: RECOVERY_DURATION_MS,
    concurrency: Math.min(resolveProbeConcurrency(env), MAX_PROBE_CONCURRENCY),
  };
}

declare global {
  var __proxyHealthInterval: ReturnType<typeof setInterval> | undefined;
  var __proxyHealthConsecutiveFailures: Map<string, number> | undefined;
  // Recovery timer handle for the opt-in pass (own timer, off by default).
  var __proxyHealthRecoveryInterval: ReturnType<typeof setInterval> | undefined;
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
 *   - "hang"         — the host resolved but the handshake never completed before
 *                      our own deadline. Counted exactly like "fail" in the
 *                      decision layer, but observed separately in the sweep log.
 */
export interface ProxyProbeResult {
  outcome: ProxyProbeOutcome;
  /** HTTP status when the target answered; null on connection-level errors. */
  status: number | null;
}

// Error codes that prove DNS never resolved the proxy host: not a hang (we
// never reached the host), a frank failure of name resolution.
const UNRESOLVED_DNS_CODES = new Set(["ENOTFOUND", "EAI_AGAIN"]);

function probeErrorCode(error: unknown): string | null {
  if (error && typeof error === "object" && "code" in error) {
    const code = (error as { code?: unknown }).code;
    return typeof code === "string" ? code : null;
  }
  return null;
}

async function testOneProxy(proxy: {
  id: string;
  type: string;
  host: string;
  port: number;
  username?: string;
  password?: string;
  family?: string;
}): Promise<ProxyProbeResult> {
  let proxyUrl: string | null;
  try {
    proxyUrl = proxyConfigToUrl(proxy);
  } catch {
    proxyUrl = null;
  }
  if (!proxyUrl) return { outcome: "fail", status: null };
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
    return { outcome: classifyProbeStatus(resp.status), status: resp.status };
  } catch (error) {
    // Our own deadline elapsed → hang when we had resolved the host but the
    // handshake never completed; otherwise inconclusive (slow, not dead).
    if (controller.signal.aborted) {
      const code = probeErrorCode(error);
      const verdict = classifyProbeError({
        aborted: true,
        resolved: code === null || !UNRESOLVED_DNS_CODES.has(code),
        tlsNegotiated: false,
      });
      // A provider-resolved target's connection health is not proven the way the
      // operator-configured generic target is — keep today's inconclusive there.
      if (providerTarget) return { outcome: "inconclusive", status: null };
      return { outcome: verdict, status: null };
    }
    // A provider-resolved target's connection health is not proven the way the
    // operator-configured generic target is: a registry baseUrl can be a placeholder that
    // never resolves for anyone (e.g. databricks's default azuredatabricks.net host is
    // literally 16 zeros). A connection failure there says nothing about this proxy —
    // same principle as the 5xx case above, extended to connection-level errors.
    return providerTarget ? { outcome: "inconclusive", status: null } : { outcome: "fail", status: null };
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
  let hangs = 0;
  let removed = 0;
  let disabled = 0;

  for (let i = 0; i < proxies.length; i += CONCURRENCY) {
    const batch = proxies.slice(i, i + CONCURRENCY);
    const results = await Promise.allSettled(
      batch.map(async (proxy, indexInBatch) => {
        // Spread the departures: without this the whole batch leaves at the same tick and a
        // shared egress IP hits the target with CONCURRENCY simultaneous requests.
        await waitForProbeSlot(indexInBatch, STAGGER_MS);
        const { outcome, status } = await testOneProxy(proxy);
        // Ledger: only a sweep-observed 429 with a usable key is recorded.
        // No memory write happens on fail/hang; `proxy_unreachable` is written
        // only by the hot path (never here), so it is excluded by construction.
        if (outcome === "blocked" && status === 429) {
          noteSweepRefusal(proxyEgressKey(proxy), status);
        }
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
      else if (outcome === "hang") hangs++;

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
  if (hangs > 0) {
    console.debug(`${LOG_PREFIX} stalled handshakes observed: ${hangs}`);
  }
}

/**
 * Targeted recovery pass: re-test set-aside proxies before their
 * period expires, off the hot path. A success ends the set-aside now (the
 * streak is kept, so a repeat still doubles); a refusal re-records it, and
 * the existing doubling provides the longer repeat period. Never writes a
 * proxy status, never redirects traffic — only the set-aside memory changes.
 */
export async function runRecoveryPass(
  probe?: RecoveryProbe,
  candidates?: RecoveryCandidate[],
  limits?: RecoveryProbeLimits,
  env?: NodeJS.ProcessEnv
): Promise<{ planned: number; recovered: number; refused: number }> {
  const empty = { planned: 0, recovered: 0, refused: 0 };
  if (!isRecoveryEnabled(env)) return empty;
  const active = limits ?? resolveRecoveryLimits(env);
  const entries = candidates ?? [...recoveryLedger.entries()].map(([key, { setAsideAt }]) => ({
    key,
    kind: "ip_quota_429" as const,
    setAsideAt,
  }));
  const planned = planRecoveryProbes(entries, active);
  if (planned.length === 0) return empty;
  const concurrency = Math.max(
    1,
    Math.min(active.concurrency, MAX_PROBE_CONCURRENCY, planned.length)
  );
  const deadline = Date.now() + active.durationMs;
  let recovered = 0;
  let refused = 0;
  const runProbe = probe ?? probeLedgerKey;
  for (let i = 0; i < planned.length; i += concurrency) {
    if (Date.now() >= deadline) break;
    const batch = planned.slice(i, i + concurrency);
    const results = await Promise.allSettled(
      batch.map(async (candidate, indexInBatch) => {
        await waitForProbeSlot(indexInBatch, STAGGER_MS);
        const outcome = await runProbe(candidate.key as string);
        return { candidate, outcome };
      })
    );
    for (const result of results) {
      if (result.status !== "fulfilled") continue;
      const { candidate, outcome } = result.value;
      const key = candidate.key as string;
      recoveryLedger.delete(key);
      if (outcome === "ok") {
        noteProxyRecovered(key, "ip_quota_429");
        recovered++;
      } else if (outcome === "blocked" || outcome === "fail" || outcome === "hang") {
        noteProxyRefusal(key, "ip_quota_429");
        refused++;
      }
    }
  }
  return { planned: planned.length, recovered, refused };
}

/**
 * Default recovery probe for a ledger key: resolve the registry entry behind
 * the egress key and run the same reachability probe as the sweep. Keys with
 * no registry entry resolve to `inconclusive` (opaque entry, never tested).
 */
export async function probeLedgerKey(key: string): Promise<ProxyProbeOutcome> {
  try {
    const { items } = await listProxies({ includeSecrets: true });
    const entry = items.find((p) => proxyEgressKey(p) === key);
    if (!entry) return "inconclusive";
    const { outcome } = await testOneProxy(entry);
    return outcome;
  } catch {
    return "inconclusive";
  }
}

/** Test-only: clear the owned sweep-refusal ledger. */
export function __resetRecoveryLedgerForTesting(): void {
  recoveryLedger.clear();
}

/** Test-only: number of ledger entries held. */
export function __recoveryLedgerSizeForTesting(): number {
  return recoveryLedger.size;
}

function scheduleSweep(): void {
  const interval = getIntervalMs();
  globalThis.__proxyHealthInterval = setInterval(() => {
    void sweep().catch((err) => {
      console.error(`${LOG_PREFIX} Sweep error:`, err);
    });
  }, interval);
}

function getRecoveryIntervalMs(): number {
  const raw = parseInt(process.env.PROXY_HEALTH_RECOVERY_INTERVAL_MS ?? "", 10);
  return Number.isFinite(raw) && raw >= 60_000 ? raw : DEFAULT_INTERVAL_MS;
}

function scheduleRecoveryPass(): void {
  const interval = getRecoveryIntervalMs();
  globalThis.__proxyHealthRecoveryInterval = setInterval(() => {
    void runRecoveryPass().catch((err) => {
      console.error(`${LOG_PREFIX} Recovery error:`, err);
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
    // The recovery pass runs on its own timer, off by default. The gate
    // lives inside runRecoveryPass, so the timer is cheap when disabled.
    if (!globalThis.__proxyHealthRecoveryInterval) scheduleRecoveryPass();
  }, INITIAL_DELAY_MS);
}

export function stopProxyHealthCheck(): void {
  if (globalThis.__proxyHealthInterval) {
    clearInterval(globalThis.__proxyHealthInterval);
    globalThis.__proxyHealthInterval = undefined;
  }
  if (globalThis.__proxyHealthRecoveryInterval) {
    clearInterval(globalThis.__proxyHealthRecoveryInterval);
    globalThis.__proxyHealthRecoveryInterval = undefined;
  }
}

export async function forceProxyHealthSweep(): Promise<void> {
  await sweep();
}

// Auto-initialize on first import
initProxyHealthCheck();
