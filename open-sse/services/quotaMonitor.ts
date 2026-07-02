/**
 * quotaMonitor.ts — Feature 06
 * Monitoramento de Quota em Sessão Ativa
 *
 * Toggle: providerSpecificData.quotaMonitorEnabled (default: false)
 * Polling adaptativo: NORMAL (60s) → CRITICAL (15s) → EXHAUSTED
 * timer.unref() garante que o processo pode fechar normalmente.
 * Alertas deduplicados por sessão (janela de 5min).
 */

import { registerQuotaFetcher, type QuotaFetcher } from "./quotaPreflight.ts";
import { getSessionInfo } from "./sessionManager.ts";

export { registerQuotaFetcher };
export type { QuotaFetcher };

const NORMAL_INTERVAL_MS = 60_000;
const CRITICAL_INTERVAL_MS = 15_000;
const WARN_THRESHOLD = 0.8;
const EXHAUSTION_THRESHOLD = 0.95;
const ALERT_SUPPRESS_WINDOW_MS = 5 * 60_000;

interface MonitorState {
  timer: ReturnType<typeof setTimeout> | null;
  stopped: boolean;
  provider: string;
  accountId: string;
  connectionSnapshot: Record<string, unknown> | null;
  sessionBound: boolean;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  startedAt: number;
  lastPolledAt: number | null;
  lastSuccessAt: number | null;
  lastErrorAt: number | null;
  lastError: string | null;
  lastQuotaPercent: number | null;
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  lastAlertAt: number | null;
  nextPollDelayMs: number | null;
  nextPollAt: number | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}

export interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  startedAt: string;
  lastPolledAt: string | null;
  lastSuccessAt: string | null;
  lastErrorAt: string | null;
  lastError: string | null;
  lastQuotaPercent: number | null;
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  lastAlertAt: string | null;
  nextPollDelayMs: number | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}

export interface QuotaMonitorSummary {
  active: number;
  alerting: number;
  exhausted: number;
  errors: number;
  statusCounts: Record<QuotaMonitorSnapshot["status"], number>;
  byProvider: Record<string, number>;
}

const activeMonitors = new Map<string, MonitorState>();
const MAX_ALERT_ENTRIES = 500;
const alertSuppression = new Map<string, number>();

const _alertSweep = setInterval(() => {
  const now = Date.now();
  for (const [key, timestamp] of alertSuppression) {
    if (now - timestamp > ALERT_SUPPRESS_WINDOW_MS) alertSuppression.delete(key);
  }
  while (alertSuppression.size > MAX_ALERT_ENTRIES) {
    const oldestKey = alertSuppression.keys().next().value;
    if (oldestKey !== undefined) alertSuppression.delete(oldestKey);
    else break;
  }
}, 60_000);
if (typeof _alertSweep === "object" && "unref" in _alertSweep) {
  (_alertSweep as { unref?: () => void }).unref?.();
}
// Registry mirror from quotaPreflight (same Map reference via re-export)
const quotaFetcherRegistry = new Map<string, QuotaFetcher>();
export function registerMonitorFetcher(provider: string, fetcher: QuotaFetcher): void {
  quotaFetcherRegistry.set(provider, fetcher);
  registerQuotaFetcher(provider, fetcher);
}

export function isQuotaMonitorEnabled(connection: Record<string, unknown>): boolean {
  const psd = connection?.providerSpecificData as Record<string, unknown> | undefined;
  return psd?.quotaMonitorEnabled === true;
}

function suppressedAlert(
  sessionId: string,
  provider: string,
  accountId: string,
  percentUsed: number
): boolean {
  const key = `${sessionId}:${provider}:${accountId}`;
  const last = alertSuppression.get(key) ?? 0;
  if (Date.now() - last < ALERT_SUPPRESS_WINDOW_MS) return false;
  if (alertSuppression.size >= MAX_ALERT_ENTRIES && !alertSuppression.has(key)) {
    const oldestKey = alertSuppression.keys().next().value;
    if (oldestKey !== undefined) alertSuppression.delete(oldestKey);
  }
  alertSuppression.set(key, Date.now());
  console.warn(
    `[QuotaMonitor] session=${sessionId} ${provider}/${accountId}: ${(percentUsed * 100).toFixed(1)}% quota used`
  );
  return true;
}

function toIsoTimestamp(value: number | null): string | null {
  return typeof value === "number" && Number.isFinite(value) ? new Date(value).toISOString() : null;
}

function getMonitorStatus(percentUsed: number | null): MonitorState["status"] {
  if (!Number.isFinite(percentUsed)) return "idle";
  if ((percentUsed as number) >= EXHAUSTION_THRESHOLD) return "exhausted";
  if ((percentUsed as number) >= WARN_THRESHOLD) return "warning";
  return "healthy";
}

function toPublicSnapshot(sessionId: string, state: MonitorState): QuotaMonitorSnapshot {
  return {
    sessionId,
    provider: state.provider,
    accountId: state.accountId,
    status: state.status,
    startedAt: new Date(state.startedAt).toISOString(),
    lastPolledAt: toIsoTimestamp(state.lastPolledAt),
    lastSuccessAt: toIsoTimestamp(state.lastSuccessAt),
    lastErrorAt: toIsoTimestamp(state.lastErrorAt),
    lastError: state.lastError,
    lastQuotaPercent: state.lastQuotaPercent,
    lastQuotaUsed: state.lastQuotaUsed,
    lastQuotaTotal: state.lastQuotaTotal,
    lastResetAt: state.lastResetAt,
    lastAlertAt: toIsoTimestamp(state.lastAlertAt),
    nextPollDelayMs: state.nextPollDelayMs,
    nextPollAt: toIsoTimestamp(state.nextPollAt),
    totalPolls: state.totalPolls,
    totalAlerts: state.totalAlerts,
    consecutiveFailures: state.consecutiveFailures,
  };
}

function sortSnapshots(snapshots: QuotaMonitorSnapshot[]): QuotaMonitorSnapshot[] {
  const severityRank: Record<QuotaMonitorSnapshot["status"], number> = {
    exhausted: 5,
    warning: 4,
    error: 3,
    starting: 2,
    idle: 1,
    healthy: 0,
  };

  return [...snapshots].sort((left, right) => {
    const severityDelta = severityRank[right.status] - severityRank[left.status];
    if (severityDelta !== 0) return severityDelta;
    const quotaDelta = (right.lastQuotaPercent ?? -1) - (left.lastQuotaPercent ?? -1);
    if (quotaDelta !== 0) return quotaDelta;
    return (
      (right.lastPolledAt ? Date.parse(right.lastPolledAt) : 0) -
      (left.lastPolledAt ? Date.parse(left.lastPolledAt) : 0)
    );
  });
}

function scheduleNextPoll(sessionId: string, intervalMs: number): void {
  const state = activeMonitors.get(sessionId);
  if (!state || state.stopped) return;
  state.nextPollDelayMs = intervalMs;
  state.nextPollAt = Date.now() + intervalMs;

  const { provider, accountId } = state;
  const timer = setTimeout(async () => {
    const current = activeMonitors.get(sessionId);
    if (!current || current.stopped) return;
    if (current.sessionBound && !getSessionInfo(sessionId)) {
      stopQuotaMonitor(sessionId);
      return;
    }

    try {
      const fetcher = quotaFetcherRegistry.get(provider);
      if (!fetcher) {
        current.status = current.lastQuotaPercent === null ? "idle" : current.status;
        scheduleNextPoll(sessionId, NORMAL_INTERVAL_MS);
        return;
      }
      current.lastPolledAt = Date.now();
      current.totalPolls += 1;
      const previousStatus = current.status;
      const quota = await fetcher(accountId, current.connectionSnapshot || undefined);
      const percentUsed =
        quota && typeof quota.percentUsed === "number" && Number.isFinite(quota.percentUsed)
          ? quota.percentUsed
          : null;
      current.lastSuccessAt = Date.now();
      current.lastError = null;
      current.lastErrorAt = null;
      current.consecutiveFailures = 0;
      current.lastQuotaPercent = percentUsed;
      current.lastQuotaUsed =
        quota && typeof quota.used === "number" && Number.isFinite(quota.used) ? quota.used : null;
      current.lastQuotaTotal =
        quota && typeof quota.total === "number" && Number.isFinite(quota.total)
          ? quota.total
          : null;
      current.lastResetAt =
        quota && typeof quota.resetAt === "string" && quota.resetAt.trim().length > 0
          ? quota.resetAt
          : null;
      current.status = getMonitorStatus(percentUsed);

      if (percentUsed !== null && percentUsed >= EXHAUSTION_THRESHOLD) {
        const emittedAlert = suppressedAlert(sessionId, provider, accountId, percentUsed);
        if (emittedAlert) {
          current.lastAlertAt = Date.now();
          current.totalAlerts += 1;
        }
        if (emittedAlert || previousStatus !== "exhausted") {
          console.info(
            `[QuotaMonitor] session=${sessionId}: marking ${accountId} for next-session cooldown`
          );
        }
        scheduleNextPoll(sessionId, CRITICAL_INTERVAL_MS);
      } else if (percentUsed !== null && percentUsed >= WARN_THRESHOLD) {
        const emittedAlert = suppressedAlert(sessionId, provider, accountId, percentUsed);
        if (emittedAlert) {
          current.lastAlertAt = Date.now();
          current.totalAlerts += 1;
        }
        scheduleNextPoll(sessionId, CRITICAL_INTERVAL_MS);
      } else {
        scheduleNextPoll(sessionId, NORMAL_INTERVAL_MS);
      }
    } catch (error) {
      current.lastErrorAt = Date.now();
      current.lastError = error instanceof Error ? error.message : String(error);
      current.consecutiveFailures += 1;
      current.status = "error";
      scheduleNextPoll(sessionId, NORMAL_INTERVAL_MS);
    }
  }, intervalMs);

  if (typeof timer.unref === "function") timer.unref();
  state.timer = timer;
}

export function startQuotaMonitor(
  sessionId: string,
  provider: string,
  accountId: string,
  connection: Record<string, unknown>
): void {
  if (!isQuotaMonitorEnabled(connection)) return;
  const current = activeMonitors.get(sessionId);
  if (current && !current.stopped) {
    if (current.provider === provider && current.accountId === accountId) {
      current.connectionSnapshot = connection;
      current.sessionBound = current.sessionBound || getSessionInfo(sessionId) !== null;
      return;
    }
    stopQuotaMonitor(sessionId);
  }

  activeMonitors.set(sessionId, {
    timer: null,
    stopped: false,
    provider,
    accountId,
    connectionSnapshot: connection,
    sessionBound: getSessionInfo(sessionId) !== null,
    status: "starting",
    startedAt: Date.now(),
    lastPolledAt: null,
    lastSuccessAt: null,
    lastErrorAt: null,
    lastError: null,
    lastQuotaPercent: null,
    lastQuotaUsed: null,
    lastQuotaTotal: null,
    lastResetAt: null,
    lastAlertAt: null,
    nextPollDelayMs: null,
    nextPollAt: null,
    totalPolls: 0,
    totalAlerts: 0,
    consecutiveFailures: 0,
  });
  scheduleNextPoll(sessionId, NORMAL_INTERVAL_MS);
}

export function stopQuotaMonitor(sessionId: string): void {
  const state = activeMonitors.get(sessionId);
  if (!state) return;
  state.stopped = true;
  if (state.timer) {
    clearTimeout(state.timer);
    state.timer = null;
  }
  activeMonitors.delete(sessionId);
  for (const key of alertSuppression.keys()) {
    if (key.startsWith(`${sessionId}:`)) alertSuppression.delete(key);
  }
}

export function getActiveMonitorCount(): number {
  return activeMonitors.size;
}

export function getQuotaMonitorSnapshot(sessionId: string): QuotaMonitorSnapshot | null {
  const state = activeMonitors.get(sessionId);
  if (!state || state.stopped) return null;
  return toPublicSnapshot(sessionId, state);
}

export function getQuotaMonitorSnapshots(): QuotaMonitorSnapshot[] {
  const snapshots: QuotaMonitorSnapshot[] = [];
  for (const [sessionId, state] of activeMonitors) {
    if (state.stopped) continue;
    snapshots.push(toPublicSnapshot(sessionId, state));
  }
  return sortSnapshots(snapshots);
}

export function getQuotaMonitorSummary(): QuotaMonitorSummary {
  const snapshots = getQuotaMonitorSnapshots();
  const statusCounts: Record<QuotaMonitorSnapshot["status"], number> = {
    starting: 0,
    idle: 0,
    healthy: 0,
    warning: 0,
    exhausted: 0,
    error: 0,
  };
  const byProvider: Record<string, number> = {};

  for (const snapshot of snapshots) {
    statusCounts[snapshot.status] += 1;
    byProvider[snapshot.provider] = (byProvider[snapshot.provider] || 0) + 1;
  }

  return {
    active: snapshots.length,
    alerting: statusCounts.warning + statusCounts.exhausted,
    exhausted: statusCounts.exhausted,
    errors: statusCounts.error,
    statusCounts,
    byProvider,
  };
}

export function clearQuotaMonitors(): void {
  for (const sessionId of [...activeMonitors.keys()]) {
    stopQuotaMonitor(sessionId);
  }
  alertSuppression.clear();
}
