/**
 * quotaAutoPing.ts — opt-in Codex quota window warm-up (#6977).
 *
 * A connection's Codex "session" quota window resets on a rolling 5h basis but
 * only starts counting down once a request lands inside it — an idle window
 * just keeps sliding forward. That means the FIRST real request after a long
 * idle period pays for the whole warm-up latency. This scheduler watches each
 * opted-in connection's reported `resetAt` and, once it slides forward (i.e.
 * the window rolled while nobody was using it), fires one tiny non-billed-model
 * request through the real Codex executor to nudge the window "live" again.
 *
 * Strictly opt-in (`settings.codexAutoPing.connections[id] === true`, default
 * off — see src/lib/db/settings.ts) because every ping consumes a small amount
 * of real quota. Reimplemented in TS from the shipped 9router
 * src/shared/services/quotaAutoPing.js (Codex half only; Antigravity is a
 * follow-up — no upstream reference exists for its 2-bucket reset shape).
 *
 * All external effects are behind an injectable `deps` object and the tick
 * loop takes an injectable `now()` clock, so tests are fully deterministic —
 * no real timers, no real DB, no real network.
 */

import { logger } from "@omniroute/open-sse/utils/logger.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { getExecutor } from "@omniroute/open-sse/executors/index.ts";
import { getCodexUsage } from "@omniroute/open-sse/services/usage/codex.ts";
import { getSettings, getProviderConnections, updateProviderConnection } from "@/lib/localDb";
import { refreshAndUpdateCredentials } from "@/lib/usage/providerLimits";
import { getCircuitBreaker } from "@/shared/utils/circuitBreaker";
import {
  QUOTA_AUTOPING_FAILURE_COOLDOWN_MS,
  QUOTA_AUTOPING_PROVIDERS,
  QUOTA_AUTOPING_REFRESH_AHEAD_MS,
  QUOTA_AUTOPING_TICK_INTERVAL_MS,
  type QuotaAutoPingProviderConfig,
} from "@/shared/constants/quotaAutoPing";

const log = logger("QuotaAutoPing");

type JsonRecord = Record<string, unknown>;

export interface QuotaAutoPingConnection {
  id: string;
  provider: string;
  authType?: string;
  accessToken?: string;
  refreshToken?: string;
  tokenExpiresAt?: string | null;
  expiresAt?: string | null;
  providerSpecificData?: JsonRecord;
  rateLimitedUntil?: string | null;
  lastPingAt?: string | null;
  lastPingedResetKey?: string | null;
}

export interface QuotaAutoPingDeps {
  getSettings: () => Promise<JsonRecord>;
  getProviderConnections: (
    filter: JsonRecord
  ) => Promise<QuotaAutoPingConnection[]>;
  updateProviderConnection: (id: string, data: JsonRecord) => Promise<unknown>;
  refreshAndUpdateCredentials: (
    connection: QuotaAutoPingConnection
  ) => Promise<{ connection: QuotaAutoPingConnection }>;
  getCodexUsage: (
    accessToken?: string,
    providerSpecificData?: JsonRecord
  ) => Promise<JsonRecord>;
  getExecutor: (provider: string) => { execute: (input: JsonRecord) => Promise<JsonRecord> };
  canExecuteProvider: (provider: string) => boolean;
}

export interface QuotaAutoPingState {
  running: boolean;
  resetCache: Record<string, string>;
  failureCache: Record<string, number>;
}

export function createQuotaAutoPingState(): QuotaAutoPingState {
  return { running: false, resetCache: {}, failureCache: {} };
}

export function createDefaultQuotaAutoPingDeps(): QuotaAutoPingDeps {
  return {
    getSettings,
    getProviderConnections,
    updateProviderConnection,
    refreshAndUpdateCredentials: async (connection) =>
      refreshAndUpdateCredentials(connection as never),
    getCodexUsage,
    getExecutor,
    canExecuteProvider: (provider) => getCircuitBreaker(provider).canExecute(),
  };
}

function cacheKey(provider: string, connectionId: string): string {
  return `${provider}:${connectionId}`;
}

function normalizeResetKey(resetAt: string): string {
  const ms = new Date(resetAt).getTime();
  if (!Number.isFinite(ms)) return resetAt;
  // Round to the minute so a few seconds of clock jitter between reads never
  // registers as "a different window" (mirrors 9router parity).
  return new Date(Math.floor(ms / 60000) * 60000).toISOString();
}

function getResetDriftMs(previousResetAt: string, nextResetAt: string): number {
  const previousMs = new Date(previousResetAt).getTime();
  const nextMs = new Date(nextResetAt).getTime();
  if (!Number.isFinite(previousMs) || !Number.isFinite(nextMs)) return 0;
  return nextMs - previousMs;
}

function toFiniteNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function isQuotaExhausted(quota: JsonRecord | undefined): boolean {
  if (!quota || quota.unlimited === true) return false;
  const remaining = toFiniteNumber(quota.remaining);
  if (remaining !== null) return remaining <= 0;
  const used = toFiniteNumber(quota.used);
  const total = toFiniteNumber(quota.total);
  return total !== null && total > 0 && used !== null && used >= total;
}

function hasExhaustedBlockingQuota(quotas: JsonRecord, sessionKey: string): boolean {
  return Object.entries(quotas).some(([name, quota]) => {
    if (name === sessionKey) return false;
    if (String(name).toLowerCase().includes("session")) return false;
    return isQuotaExhausted(quota as JsonRecord);
  });
}

function wasPingedRecently(
  connection: QuotaAutoPingConnection,
  intervalMs: number,
  nowMs: number
): boolean {
  if (!intervalMs || !connection.lastPingAt) return false;
  const lastPingAtMs = new Date(connection.lastPingAt).getTime();
  return Number.isFinite(lastPingAtMs) && nowMs - lastPingAtMs < intervalMs;
}

function shouldSkipAfterFailure(
  state: QuotaAutoPingState,
  key: string,
  nowMs: number
): boolean {
  const failedAt = state.failureCache[key];
  return Boolean(failedAt) && nowMs - failedAt < QUOTA_AUTOPING_FAILURE_COOLDOWN_MS;
}

function isRateLimited(connection: QuotaAutoPingConnection, nowMs: number): boolean {
  if (!connection.rateLimitedUntil) return false;
  const untilMs = new Date(connection.rateLimitedUntil).getTime();
  return Number.isFinite(untilMs) && untilMs > nowMs;
}

function buildCodexPingBody(providerConfig: QuotaAutoPingProviderConfig): JsonRecord {
  return {
    model: providerConfig.pingModel,
    input: [
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: providerConfig.pingText }],
      },
    ],
    instructions: providerConfig.pingInstructions,
    reasoning: providerConfig.pingReasoningEffort
      ? { effort: providerConfig.pingReasoningEffort, summary: "auto" }
      : undefined,
    store: false,
    stream: true,
  };
}

async function drainResponseBody(response: Response | undefined): Promise<void> {
  if (!response) return;
  if (typeof response.text === "function") {
    await response.text().catch(() => undefined);
    return;
  }
  const reader = (response as { body?: ReadableStream<Uint8Array> }).body?.getReader?.();
  if (!reader) return;
  try {
    for (;;) {
      const { done } = await reader.read();
      if (done) return;
    }
  } finally {
    reader.releaseLock?.();
  }
}

async function sendCodexPing(
  connection: QuotaAutoPingConnection,
  providerConfig: QuotaAutoPingProviderConfig,
  deps: QuotaAutoPingDeps
): Promise<boolean> {
  const executor = deps.getExecutor("codex");
  const result = await executor.execute({
    model: providerConfig.pingModel,
    stream: true,
    credentials: {
      accessToken: connection.accessToken,
      connectionId: connection.id,
      providerSpecificData: connection.providerSpecificData,
    },
    log: null,
    body: buildCodexPingBody(providerConfig),
  });
  const response = (result as { response?: Response }).response;
  if (!response || !response.ok) {
    try {
      await (response as { body?: { cancel?: () => Promise<void> } })?.body?.cancel?.();
    } catch {
      // Ignore — best-effort cleanup of an already-failed ping.
    }
    return false;
  }
  // Codex only starts the 5h window after the streaming response completes.
  await drainResponseBody(response);
  return true;
}

function shouldPingForReset(
  providerConfig: QuotaAutoPingProviderConfig,
  cachedReset: string | undefined,
  resetAt: string,
  nowMs: number
): boolean {
  void nowMs;
  if (!cachedReset) return false;
  return getResetDriftMs(cachedReset, resetAt) >= providerConfig.resetAtDriftMs;
}

/**
 * Cheap pre-fetch guards — none of these require a network call. Extracted so
 * `pingConnection` reads as a single linear flow instead of a wall of `if`s.
 */
function isPingCandidateBlocked(
  connection: QuotaAutoPingConnection,
  provider: "codex",
  providerConfig: QuotaAutoPingProviderConfig,
  deps: QuotaAutoPingDeps,
  state: QuotaAutoPingState,
  key: string,
  cachedReset: string | undefined,
  nowMs: number
): boolean {
  if (!deps.canExecuteProvider(provider)) return true; // provider circuit breaker OPEN
  if (isRateLimited(connection, nowMs)) return true; // connection cooldown active
  if (shouldSkipAfterFailure(state, key, nowMs)) return true;

  // Codex has no fixed reset schedule (pingWhenResetAtSlides): resetAt keeps
  // sliding forward while the window is idle, so we must re-fetch usage every
  // tick to detect the slide. Providers with a real fixed reset (future
  // Antigravity buckets) would skip re-fetching until close to the cached
  // resetAt — the guard is preserved here for that case.
  return Boolean(
    !providerConfig.pingWhenResetAtSlides &&
      cachedReset &&
      nowMs < new Date(cachedReset).getTime() - QUOTA_AUTOPING_REFRESH_AHEAD_MS
  );
}

/** Post-fetch decision — everything we know once usage has been read. */
function shouldSendPing(
  providerConfig: QuotaAutoPingProviderConfig,
  quotas: JsonRecord,
  quota: JsonRecord | undefined,
  cachedReset: string | undefined,
  resetAt: string,
  current: QuotaAutoPingConnection,
  resetKey: string,
  nowMs: number
): boolean {
  if (
    providerConfig.skipWhenBlockingQuotaExhausted &&
    hasExhaustedBlockingQuota(quotas, providerConfig.quotaKey)
  ) {
    return false;
  }
  if (isQuotaExhausted(quota)) return false;
  if (!shouldPingForReset(providerConfig, cachedReset, resetAt, nowMs)) return false;
  if (wasPingedRecently(current, providerConfig.minPingIntervalMs, nowMs)) return false;
  if (current.lastPingedResetKey === resetKey) return false;
  return true;
}

async function refreshConnectionForPing(
  connection: QuotaAutoPingConnection,
  provider: "codex",
  deps: QuotaAutoPingDeps,
  state: QuotaAutoPingState,
  key: string,
  nowMs: number
): Promise<QuotaAutoPingConnection | null> {
  try {
    const refreshed = await deps.refreshAndUpdateCredentials(connection);
    return refreshed.connection;
  } catch (err) {
    state.failureCache[key] = nowMs;
    log.warn(`${provider}:${connection.id}: credential refresh failed`, {
      error: sanitizeErrorMessage((err as Error)?.message ?? String(err)),
    });
    return null;
  }
}

async function pingConnection(
  connection: QuotaAutoPingConnection,
  provider: "codex",
  providerConfig: QuotaAutoPingProviderConfig,
  deps: QuotaAutoPingDeps,
  state: QuotaAutoPingState,
  nowMs: number
): Promise<void> {
  const key = cacheKey(provider, connection.id);
  const cachedReset = state.resetCache[key];
  if (isPingCandidateBlocked(connection, provider, providerConfig, deps, state, key, cachedReset, nowMs)) {
    return;
  }

  const current = await refreshConnectionForPing(connection, provider, deps, state, key, nowMs);
  if (!current) return;

  const usage = await deps.getCodexUsage(current.accessToken, current.providerSpecificData);
  const quotas = (usage.quotas as JsonRecord) || {};
  const quota = quotas[providerConfig.quotaKey] as JsonRecord | undefined;
  const resetAt = quota?.resetAt as string | undefined;
  if (!resetAt) return;
  state.resetCache[key] = resetAt;

  const resetKey = normalizeResetKey(resetAt);
  if (!shouldSendPing(providerConfig, quotas, quota, cachedReset, resetAt, current, resetKey, nowMs)) {
    return;
  }

  const ok = await sendCodexPing(current, providerConfig, deps);
  if (!ok) {
    state.failureCache[key] = nowMs;
    log.warn(`${provider}:${current.id}: ping failed`, { resetAt });
    return;
  }

  delete state.failureCache[key];
  await deps.updateProviderConnection(current.id, {
    lastPingedResetKey: resetKey,
    lastPingAt: new Date(nowMs).toISOString(),
  });
  log.info(`${provider}:${current.id}: ping sent`, { resetAt });
}

function getEnabledConnectionIds(
  settings: JsonRecord,
  providerConfig: QuotaAutoPingProviderConfig
): Record<string, boolean> {
  return (
    ((settings[providerConfig.settingsKey] as JsonRecord | undefined)?.connections as
      | Record<string, boolean>
      | undefined) || {}
  );
}

async function pingProviderConnections(
  provider: "codex",
  providerConfig: QuotaAutoPingProviderConfig,
  enabledMap: Record<string, boolean>,
  deps: QuotaAutoPingDeps,
  state: QuotaAutoPingState,
  nowMs: number
): Promise<void> {
  const connections = await deps.getProviderConnections({ provider, isActive: true });
  const targets = connections.filter(
    (conn) => conn.authType === "oauth" && enabledMap[conn.id] === true
  );
  for (const connection of targets) {
    try {
      await pingConnection(connection, provider, providerConfig, deps, state, nowMs);
    } catch (err) {
      state.failureCache[cacheKey(provider, connection.id)] = nowMs;
      log.warn(`${provider}:${connection.id}: tick error`, {
        error: sanitizeErrorMessage((err as Error)?.message ?? String(err)),
      });
    }
  }
}

/**
 * Run one scheduler tick: for every provider with at least one opted-in
 * connection, ping the connections whose quota window just rolled over.
 * Safe to call concurrently — re-entrant calls while already `running` are a
 * no-op, matching the reference scheduler's guard.
 */
export async function runQuotaAutoPingTick(
  deps: QuotaAutoPingDeps = createDefaultQuotaAutoPingDeps(),
  state: QuotaAutoPingState = createQuotaAutoPingState(),
  now: () => number = Date.now
): Promise<void> {
  if (state.running) return;
  state.running = true;
  const nowMs = now();
  try {
    const settings = await deps.getSettings();
    for (const [provider, providerConfig] of Object.entries(QUOTA_AUTOPING_PROVIDERS)) {
      const enabledMap = getEnabledConnectionIds(settings, providerConfig);
      if (Object.keys(enabledMap).length === 0) continue;
      await pingProviderConnections(
        provider as "codex",
        providerConfig,
        enabledMap,
        deps,
        state,
        nowMs
      );
    }
  } catch (err) {
    log.warn("tick error", { error: sanitizeErrorMessage((err as Error)?.message ?? String(err)) });
  } finally {
    state.running = false;
  }
}

let schedulerInterval: ReturnType<typeof setInterval> | null = null;
const schedulerState = createQuotaAutoPingState();

/** Start the in-process scheduler. Idempotent — a second call is a no-op. */
export function startQuotaAutoPing(): void {
  if (schedulerInterval) return;
  log.info("scheduler started");
  runQuotaAutoPingTick(createDefaultQuotaAutoPingDeps(), schedulerState).catch(() => undefined);
  schedulerInterval = setInterval(() => {
    runQuotaAutoPingTick(createDefaultQuotaAutoPingDeps(), schedulerState).catch(() => undefined);
  }, QUOTA_AUTOPING_TICK_INTERVAL_MS);
  schedulerInterval.unref?.();
}

/** Stop the in-process scheduler. Idempotent — a second call is a no-op. */
export function stopQuotaAutoPing(): void {
  if (!schedulerInterval) return;
  clearInterval(schedulerInterval);
  schedulerInterval = null;
  log.info("scheduler stopped");
}
