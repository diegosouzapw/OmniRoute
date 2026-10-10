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
import type { BaseExecutor } from "@omniroute/open-sse/executors/base";
import { splitCodexReasoningSuffix } from "@omniroute/open-sse/executors/codex/reasoningSuffix.ts";
import { isModelSelectable } from "@omniroute/open-sse/services/modelLifecycle.ts";
import { getCodexUsage } from "@omniroute/open-sse/services/usage/codex.ts";
import { getFactoryUsage } from "@omniroute/open-sse/services/usage/factory.ts";
import { throttleQuotaFetch } from "@omniroute/open-sse/services/quotaFetchThrottle.ts";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";
import { getSettings, resolveProxyForConnection } from "@/lib/db/settings";
import { getProviderConnections, updateProviderConnection } from "@/lib/db/providers";
import { isConnectionUnavailableToAuxiliaryActivity } from "@/lib/exclusiveLeaseIsolation";
import { refreshAndUpdateCredentialsWithResolver } from "@/lib/usage/providerLimits/credentialRefresh";
import { getCircuitBreaker } from "@/shared/utils/circuitBreaker";
import {
  FACTORY_PING_MODEL,
  QUOTA_AUTOPING_FAILURE_COOLDOWN_MS,
  QUOTA_AUTOPING_FAR_RESET_SKIP_MS,
  QUOTA_AUTOPING_PROVIDERS,
  QUOTA_AUTOPING_REFRESH_AHEAD_MS,
  QUOTA_AUTOPING_TICK_INTERVAL_MS,
  type QuotaAutoPingProviderConfig,
  type QuotaAutoPingProviderId,
} from "@/shared/constants/quotaAutoPing";

const log = logger("QuotaAutoPing");

type JsonRecord = Record<string, unknown>;

/** Provider config plus the ping model resolved for this tick (#11905). */
type ResolvedQuotaAutoPingProviderConfig = QuotaAutoPingProviderConfig & { pingModel: string };

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
  getProviderConnections: (filter: JsonRecord) => Promise<QuotaAutoPingConnection[]>;
  updateProviderConnection: (id: string, data: JsonRecord) => Promise<unknown>;
  refreshAndUpdateCredentials: (
    connection: QuotaAutoPingConnection
  ) => Promise<{ connection: QuotaAutoPingConnection }>;
  getProviderUsage?: (
    provider: QuotaAutoPingProviderId,
    accessToken?: string,
    providerSpecificData?: JsonRecord
  ) => Promise<JsonRecord>;
  getCodexUsage: (accessToken?: string, providerSpecificData?: JsonRecord) => Promise<JsonRecord>;
  getFactoryUsage?: (
    accessToken?: string,
    providerSpecificData?: JsonRecord
  ) => Promise<JsonRecord>;
  throttleQuotaFetch: () => Promise<void>;
  resolveProxyForConnection: (connectionId: string) => Promise<{ proxy?: unknown } | null>;
  runWithProxyContext: <T>(proxyConfig: unknown, callback: () => Promise<T>) => Promise<T>;
  getExecutor: (provider: QuotaAutoPingProviderId) => Promise<BaseExecutor>;
  canExecuteProvider: (provider: string) => boolean;
  isConnectionUnavailableToAuxiliaryActivity: (connectionId: string) => Promise<boolean>;
  resolvePingModel: (provider: QuotaAutoPingProviderId, nowMs: number) => Promise<string | null>;
}

export interface QuotaAutoPingState {
  running: boolean;
  resetCache: Record<string, string>;
  failureCache: Record<string, number>;
  /** Last resolved ping model per provider (`null` = nothing selectable); logs on change only. */
  pingModelCache: Record<string, string | null>;
}

export function createQuotaAutoPingState(): QuotaAutoPingState {
  return { running: false, resetCache: {}, failureCache: {}, pingModelCache: {} };
}

let codexExecutorPromise: Promise<BaseExecutor> | null = null;
let factoryExecutorPromise: Promise<BaseExecutor> | null = null;

async function loadQuotaAutoPingExecutor(provider: string): Promise<BaseExecutor> {
  if (provider === "factory") {
    try {
      factoryExecutorPromise ??= import("@omniroute/open-sse/executors/factory.ts").then(
        ({ FactoryExecutor }) => new FactoryExecutor()
      );
      return await factoryExecutorPromise;
    } catch (error) {
      factoryExecutorPromise = null;
      throw error;
    }
  }
  if (provider !== "codex") {
    throw new Error(`Quota auto-ping does not support provider "${provider}"`);
  }

  try {
    codexExecutorPromise ??= import("@omniroute/open-sse/executors/codex.ts").then(
      ({ CodexExecutor }) => new CodexExecutor()
    );
    return await codexExecutorPromise;
  } catch (error) {
    codexExecutorPromise = null;
    throw error;
  }
}

export async function resolveQuotaAutoPingModel(
  provider: QuotaAutoPingProviderId,
  asOf: Date | number | string = Date.now()
): Promise<string | null> {
  if (provider === "factory") {
    const { isModelSelectable } = await import("@omniroute/open-sse/services/modelLifecycle.ts");
    return isModelSelectable("factory", FACTORY_PING_MODEL, { asOf }) ? FACTORY_PING_MODEL : null;
  }
  const { getProviderModels } = await import("@omniroute/open-sse/config/providerModels.ts");
  for (const model of getProviderModels(provider)) {
    if (splitCodexReasoningSuffix(model.id).effort !== null) continue;
    if (!isModelSelectable(provider, model.id, { asOf })) continue;
    return model.id;
  }
  return null;
}

export function createDefaultQuotaAutoPingDeps(): QuotaAutoPingDeps {
  return {
    getSettings,
    getProviderConnections,
    updateProviderConnection,
    refreshAndUpdateCredentials: async (connection) =>
      refreshAndUpdateCredentialsWithResolver(connection, loadQuotaAutoPingExecutor, {
        allowRotatingRefresh: connection.provider === "factory",
      }),
    getProviderUsage: async (provider, accessToken, providerSpecificData) => {
      if (provider === "factory") {
        return (await getFactoryUsage(accessToken, providerSpecificData)) as JsonRecord;
      }
      return (await getCodexUsage(accessToken, providerSpecificData)) as JsonRecord;
    },
    getCodexUsage,
    getFactoryUsage,
    throttleQuotaFetch,
    resolveProxyForConnection,
    runWithProxyContext,
    getExecutor: loadQuotaAutoPingExecutor,
    canExecuteProvider: (provider) => getCircuitBreaker(provider).canExecute(),
    isConnectionUnavailableToAuxiliaryActivity,
    resolvePingModel: resolveQuotaAutoPingModel,
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
  const sessionTier = sessionKey.startsWith("core_")
    ? "core_"
    : sessionKey.startsWith("standard_")
      ? "standard_"
      : null;
  return Object.entries(quotas).some(([name, quota]) => {
    if (name === sessionKey) return false;
    const lower = String(name).toLowerCase();
    if (lower.includes("session") || lower.includes("5h")) return false;
    if (sessionTier && !name.startsWith(sessionTier)) return false;
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

function shouldSkipAfterFailure(state: QuotaAutoPingState, key: string, nowMs: number): boolean {
  const failedAt = state.failureCache[key];
  return Boolean(failedAt) && nowMs - failedAt < QUOTA_AUTOPING_FAILURE_COOLDOWN_MS;
}

function isRateLimited(connection: QuotaAutoPingConnection, nowMs: number): boolean {
  if (!connection.rateLimitedUntil) return false;
  const untilMs = new Date(connection.rateLimitedUntil).getTime();
  return Number.isFinite(untilMs) && untilMs > nowMs;
}

function buildCodexPingBody(providerConfig: ResolvedQuotaAutoPingProviderConfig): JsonRecord {
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
  providerConfig: ResolvedQuotaAutoPingProviderConfig,
  deps: QuotaAutoPingDeps
): Promise<boolean> {
  const executor = await deps.getExecutor("codex");
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

function buildFactoryPingBody(providerConfig: ResolvedQuotaAutoPingProviderConfig): JsonRecord {
  return {
    model: providerConfig.pingModel,
    messages: [{ role: "user", content: providerConfig.pingText }],
    max_tokens: providerConfig.pingMaxTokens ?? 1,
    stream: true,
  };
}

async function sendFactoryPing(
  connection: QuotaAutoPingConnection,
  providerConfig: ResolvedQuotaAutoPingProviderConfig,
  deps: QuotaAutoPingDeps
): Promise<boolean> {
  const executor = await deps.getExecutor("factory");
  const result = await executor.execute({
    model: providerConfig.pingModel,
    stream: true,
    credentials: {
      accessToken: connection.accessToken,
      connectionId: connection.id,
      providerSpecificData: connection.providerSpecificData,
    },
    log: null,
    body: buildFactoryPingBody(providerConfig),
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
  await drainResponseBody(response);
  return true;
}

function shouldPingForReset(
  providerConfig: QuotaAutoPingProviderConfig,
  cachedReset: string | undefined,
  resetAt: string | undefined,
  nowMs: number
): boolean {
  if (providerConfig.pingWhenResetAtSlides) {
    if (!cachedReset || !resetAt) return false;
    return getResetDriftMs(cachedReset, resetAt) >= (providerConfig.resetAtDriftMs || 0);
  }
  if (providerConfig.pingWhenWindowInactive) {
    if (!resetAt) return true;
    const resetMs = new Date(resetAt).getTime();
    return !Number.isFinite(resetMs) || nowMs >= resetMs;
  }
  return false;
}

/**
 * Cheap pre-fetch guards — none of these require a network call. Extracted so
 * `pingConnection` reads as a single linear flow instead of a wall of `if`s.
 */
async function isPingCandidateBlocked(
  connection: QuotaAutoPingConnection,
  provider: QuotaAutoPingProviderId,
  providerConfig: QuotaAutoPingProviderConfig,
  deps: QuotaAutoPingDeps,
  state: QuotaAutoPingState,
  key: string,
  cachedReset: string | undefined,
  nowMs: number
): Promise<boolean> {
  if (!deps.canExecuteProvider(provider)) return true;
  if (await deps.isConnectionUnavailableToAuxiliaryActivity(connection.id)) return true;
  if (isRateLimited(connection, nowMs)) return true;
  if (shouldSkipAfterFailure(state, key, nowMs)) return true;
  return Boolean(
    !providerConfig.pingWhenResetAtSlides &&
    !providerConfig.pingWhenWindowInactive &&
    cachedReset &&
    nowMs < new Date(cachedReset).getTime() - QUOTA_AUTOPING_REFRESH_AHEAD_MS
  );
}

function shouldSendPing(
  providerConfig: QuotaAutoPingProviderConfig,
  quotas: JsonRecord,
  quota: JsonRecord | undefined,
  cachedReset: string | undefined,
  resetAt: string | undefined,
  current: QuotaAutoPingConnection,
  resetKey: string,
  nowMs: number
): boolean {
  if (resetAt) {
    const resetAtMs = new Date(resetAt).getTime();
    if (Number.isFinite(resetAtMs) && resetAtMs - nowMs > QUOTA_AUTOPING_FAR_RESET_SKIP_MS) {
      return false;
    }
  }
  if (
    providerConfig.skipWhenBlockingQuotaExhausted &&
    hasExhaustedBlockingQuota(quotas, providerConfig.quotaKey)
  ) {
    return false;
  }
  if (isQuotaExhausted(quota)) return false;
  if (!shouldPingForReset(providerConfig, cachedReset, resetAt, nowMs)) return false;
  if (wasPingedRecently(current, providerConfig.minPingIntervalMs, nowMs)) return false;
  if (providerConfig.pingWhenWindowInactive) {
    if (current.lastPingedResetKey && current.lastPingedResetKey !== "factory:standard:inactive") {
      if (
        resetAt &&
        current.lastPingedResetKey === `factory:standard:${normalizeResetKey(resetAt)}`
      ) {
        return false;
      }
    }
  } else {
    if (current.lastPingedResetKey === resetKey) return false;
  }
  return true;
}

async function refreshConnectionForPing(
  connection: QuotaAutoPingConnection,
  provider: QuotaAutoPingProviderId,
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
  provider: QuotaAutoPingProviderId,
  providerConfig: ResolvedQuotaAutoPingProviderConfig,
  deps: QuotaAutoPingDeps,
  state: QuotaAutoPingState,
  nowMs: number
): Promise<void> {
  const key = cacheKey(provider, connection.id);
  const cachedReset = state.resetCache[key];
  if (
    await isPingCandidateBlocked(
      connection,
      provider,
      providerConfig,
      deps,
      state,
      key,
      cachedReset,
      nowMs
    )
  ) {
    return;
  }

  const current = await refreshConnectionForPing(connection, provider, deps, state, key, nowMs);
  if (!current) return;

  const proxyInfo = await deps.resolveProxyForConnection(current.id);
  await deps.runWithProxyContext(proxyInfo?.proxy ?? null, async () => {
    await deps.throttleQuotaFetch();
    const fetchUsage =
      deps.getProviderUsage ??
      (async (p: QuotaAutoPingProviderId, token?: string, psd?: JsonRecord) => {
        if (p === "factory") {
          return deps.getFactoryUsage
            ? deps.getFactoryUsage(token, psd)
            : getFactoryUsage(token, psd);
        }
        return deps.getCodexUsage ? deps.getCodexUsage(token, psd) : getCodexUsage(token, psd);
      });
    const usage = await fetchUsage(provider, current.accessToken, current.providerSpecificData);
    const quotas =
      usage &&
      typeof usage === "object" &&
      "quotas" in usage &&
      usage.quotas &&
      typeof usage.quotas === "object"
        ? (usage.quotas as JsonRecord)
        : {};
    const quota = quotas[providerConfig.quotaKey];
    const quotaRecord = quota && typeof quota === "object" ? (quota as JsonRecord) : undefined;
    const resetAt = typeof quotaRecord?.resetAt === "string" ? quotaRecord.resetAt : undefined;
    if (resetAt) state.resetCache[key] = resetAt;
    if (provider === "factory" && !quotaRecord) return;
    const resetKey = resetAt ? normalizeResetKey(resetAt) : "";
    if (!resetKey && !providerConfig.pingWhenWindowInactive) return;
    if (
      !shouldSendPing(
        providerConfig,
        quotas,
        quotaRecord,
        cachedReset,
        resetAt,
        current,
        resetKey,
        nowMs
      )
    ) {
      return;
    }

    const ok =
      provider === "factory"
        ? await sendFactoryPing(current, providerConfig, deps)
        : await sendCodexPing(current, providerConfig, deps);
    if (!ok) {
      state.failureCache[key] = nowMs;
      log.warn(`${provider}:${current.id}: ping failed`, { resetAt });
      return;
    }

    delete state.failureCache[key];
    let nextResetKey = resetKey;
    if (provider === "factory") {
      nextResetKey = "factory:standard:inactive";
      try {
        const postUsage = await fetchUsage(
          provider,
          current.accessToken,
          current.providerSpecificData
        );
        const postQuotas =
          postUsage &&
          typeof postUsage === "object" &&
          "quotas" in postUsage &&
          postUsage.quotas &&
          typeof postUsage.quotas === "object"
            ? (postUsage.quotas as JsonRecord)
            : {};
        const postQuota = postQuotas[providerConfig.quotaKey];
        const postResetAt =
          typeof (postQuota as JsonRecord)?.resetAt === "string"
            ? ((postQuota as JsonRecord).resetAt as string)
            : undefined;
        if (postResetAt) {
          const postResetMs = new Date(postResetAt).getTime();
          if (Number.isFinite(postResetMs) && postResetMs > nowMs) {
            nextResetKey = `factory:standard:${normalizeResetKey(postResetAt)}`;
            state.resetCache[key] = postResetAt;
          }
        }
      } catch {
        // Fall back to inactive marker on post-ping fetch failure
      }
    }
    await deps.updateProviderConnection(current.id, {
      lastPingedResetKey: nextResetKey,
      lastPingAt: new Date(nowMs).toISOString(),
    });
    log.info(`${provider}:${current.id}: ping sent`, { resetAt, model: providerConfig.pingModel });
  });
}

/**
 * Resolve this tick's ping model and log only when the answer changes, so a
 * catalog with nothing selectable produces one actionable warning rather than one
 * per tick, and a model swap after an upgrade is visible in the log.
 */
async function resolveProviderPingModel(
  provider: QuotaAutoPingProviderId,
  deps: QuotaAutoPingDeps,
  state: QuotaAutoPingState,
  nowMs: number
): Promise<string | null> {
  const pingModel = await deps.resolvePingModel(provider, nowMs);
  if (state.pingModelCache[provider] !== pingModel) {
    state.pingModelCache[provider] = pingModel;
    if (pingModel) {
      log.info(`${provider}: ping model resolved`, { model: pingModel });
    } else {
      log.warn(
        `${provider}: no selectable ping model in the ${provider} catalog — auto-ping paused ` +
          "until the model registry or lifecycle data lists a live model (#11905)"
      );
    }
  }
  return pingModel;
}

function getEnabledConnectionIds(
  settings: JsonRecord,
  providerConfig: QuotaAutoPingProviderConfig
): Record<string, boolean> {
  return (
    ((settings[providerConfig.settingsKey] as JsonRecord | undefined)?.connections as
      Record<string, boolean> | undefined) || {}
  );
}

async function pingProviderConnections(
  provider: QuotaAutoPingProviderId,
  providerConfig: ResolvedQuotaAutoPingProviderConfig,
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
      const pingModel = await resolveProviderPingModel(
        provider as QuotaAutoPingProviderId,
        deps,
        state,
        nowMs
      );
      if (!pingModel) continue;
      await pingProviderConnections(
        provider as QuotaAutoPingProviderId,
        { ...providerConfig, pingModel },
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
