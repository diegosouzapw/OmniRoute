/**
 * Shared combo (model combo) handling with fallback support
 * Supports: priority, weighted, round-robin, random, least-used, cost-optimized,
 * reset-aware, reset-window, strict-random, auto, fill-first, p2c, lkgp,
 * context-optimized, context-relay, and fusion strategies
 */

import {
  checkFallbackError,
  classifyLockoutReason,
  CONTEXT_OVERFLOW_PATTERNS,
  decayModelFailureCount,
  formatRetryAfter,
  getModelLockoutInfo,
  getRuntimeProviderProfile,
  hasPerModelQuota,
  isModelLocked,
  recordModelLockoutFailure,
  recordProviderFailure,
  selectLockoutCooldownMs,
} from "./accountFallback.ts";
import {
  errorResponse,
  unavailableResponse,
  errorResponseWithComboDiagnostics,
} from "../utils/error.ts";
import type { ComboDiagnostics } from "../utils/error.ts";
import {
  COMBO_FAILURE_THRESHOLD,
  clearComboFailureTracking,
  recordComboFailure,
} from "./combo/failureTracker.ts";
import { buildNoUpstreamResponseDiagnostics, buildRecoveryHint } from "./combo/pinRecovery.ts";
import { buildTargetTimeoutRunner } from "./combo/targetTimeoutRunner.ts";
import { recordComboRequest, recordComboShadowRequest, getComboMetrics } from "./comboMetrics.ts";
import {
  resolveComboConfig,
  getDefaultComboConfig,
  resolveComboQueueDepth,
  isComboCooldownWaitEligible,
} from "./comboConfig.ts";
import {
  maybeGenerateHandoff,
  maybeGenerateUniversalHandoff,
  injectUniversalHandoffBody,
  SKIP_UNIVERSAL_HANDOFF_FLAG,
  type MessageLike,
} from "./contextHandoff.ts";
import {
  recordSessionModelUsage,
  getLastSessionModel,
  getHandoff,
} from "../../src/lib/db/contextHandoffs.ts";
import { extractSessionAffinityKey } from "@/sse/services/auth";
import { getHiddenModelsByProvider } from "@/models";
import { resolveModelLockoutSettings } from "../../src/lib/resilience/modelLockoutSettings";
import { fetchCodexQuota } from "./codexQuotaFetcher.ts";
import { evaluateQuotaCutoff, getQuotaFetcher, type QuotaInfo } from "./quotaPreflight.ts";
import * as semaphore from "./rateLimitSemaphore.ts";
import { getCircuitBreaker } from "../../src/shared/utils/circuitBreaker";
import { fisherYatesShuffle, getNextFromDeck } from "../../src/shared/utils/shuffleDeck";
import { parseModel } from "./model.ts";
import { createComboContext } from "./combo/context.ts";
import { phaseComboSetup } from "./combo/comboSetup.ts";
import { checkCredentialGate, logCredentialSkip } from "./credentialGate.ts";
import { emit } from "../../src/lib/events/eventBus";
import { notifyWebhookEvent } from "../../src/lib/webhookDispatcher";
import { parseAutoPrefix } from "./autoCombo/autoPrefix.ts";
import { resolveAutoStrategyOrder } from "./combo/resolveAutoStrategy.ts";
import { applyStrategyOrdering } from "./combo/applyStrategyOrdering.ts";
import { handlePipelineCombo, buildPipelineResponse } from "./autoCombo/pipelineRouter.ts";
import { type ProviderCandidate } from "./autoCombo/scoring.ts";
import { estimateTokens } from "./contextManager.ts";
import { getSessionConnection } from "./sessionManager.ts";
import {
  applySessionStickiness,
  normalizeStickinessMessages,
  recordStickyBinding,
  clearStickyBinding,
  peekStickyConnectionId,
  resolveDisableSessionStickiness,
} from "./combo/sessionStickiness.ts";
import { selectQuotaShareTarget } from "./combo/quotaShareStrategy.ts";
import { makeConnectionConcurrencyResolver, lookupPositiveCap } from "./combo/concurrencyCaps.ts";
import { acquireQuotaShareConcurrencySlot } from "./combo/quotaShareConcurrency.ts";
import { orderTargetsByEvalScores } from "./evalRouting.ts";
import {
  applyPromptCacheAffinity,
  expandPromptCacheAffinityTargets,
  expandPromptCacheAffinityTargetsFromConnections,
  resolvePromptCacheAffinityKey,
} from "./combo/promptCacheAffinity.ts";
import type { CompressionMode } from "./compression/types.ts";
import { getCachedProviderConnections } from "../../src/lib/db/readCache";
import {
  isProviderInCooldown,
  recordProviderCooldown,
  recordProviderSuccess,
} from "./providerCooldownTracker.ts";
import {
  resolveResilienceSettings,
  type ResilienceSettings,
} from "../../src/lib/resilience/settings";
import { resolveReasoningBufferedMaxTokens, toPositiveInteger } from "./reasoningTokenBuffer.ts";
import { RESET_WINDOW_NAMES } from "./combo/types.ts";
import type {
  ComboLike,
  ComboRetryAfter,
  ComboErrorBody,
  SingleModelTarget,
  HandleComboChatOptions,
  HandleRoundRobinOptions,
  NestedComboMode,
  ResolvedComboTarget,
  ResolvedComboUnit,
  AutoProviderCandidate,
  ComboRuntimeStep,
  HistoricalLatencyStatsEntry,
} from "./combo/types.ts";

import {
  MAX_RR_COUNTERS,
  rrCounters,
  rrStickyTargets,
  weightedStickyTargets,
  clampStickyRoundRobinTargetLimit,
  clampStickyWeightedTargetLimit,
  getStickyRoundRobinStartIndex,
  recordStickyRoundRobinSuccess,
  getStickyWeightedExecutionKey,
  recordStickyWeightedSuccess,
  resolveComboStickyRoundRobinLimit,
} from "./combo/rrState.ts";
import {
  validateResponseQuality,
  releaseQualityClone,
  releaseRejectedQualityResponse,
  toRetryAfterDisplayValue,
} from "./combo/validateQuality.ts";
import {
  resolveComboCooldownWaitDecision,
  ResolveComboCooldownDecisionResult,
} from "./combo/comboCooldownRetry.ts";
import {
  computeClosestRetryAfter,
  waitForCooldownAwareRetry,
} from "../../src/sse/services/cooldownAwareRetry.ts";
import { handleFusionChat, type FusionTuning } from "./fusion.ts";
import { dispatchChaosFromCombo } from "./autoCombo/chaosEngine.ts";
import { handlePipelineChat, type PipelineStep } from "./pipeline.ts";
import {
  TRANSIENT_FOR_SEMAPHORE,
  MAX_FALLBACK_WAIT_MS,
  MAX_GLOBAL_ATTEMPTS,
  isAllAccountsRateLimitedResponse,
  clampComboDepth,
  shouldSkipForPredictedTtft,
  shouldRecordProviderBreakerFailure,
  isRequestScopedUpstreamFailure,
  shouldSkipConnDisable,
  resolveDelayMs,
  comboModelNotFoundResponse,
  isStreamReadinessFailureErrorBody,
  isTokenLimitBreachErrorBody,
  toRecordedTarget,
  getExhaustedTargetSkipReason,
} from "./combo/comboPredicates.ts";
import { applyComboTargetExhaustion } from "./combo/targetExhaustion.ts";
import { executeRuntimeUnitCombo } from "./combo/runtimeUnits.ts";
import { extractFusionPanelSpec, buildFusionHandleSingleModel } from "./combo/fusionPanel.ts";
import { isRecord } from "./combo/comboData.ts";
import {
  expandProviderWildcardsInCombo,
  expandProviderWildcardsInCollection,
} from "./combo/providerWildcard.ts";
import { resolveShadowTargets, scheduleShadowRouting } from "./combo/shadowRouting.ts";
import { attemptCompatRejectedFallback } from "./combo/comboCompatFallback.ts";
import { applyContextRequirements } from "./combo/contextRequirements.ts";
import {
  filterTargetsByRequestCompatibility,
  resolveComboRuntimeUnits,
  resolveComboTargets,
  resolveWeightedTargets,
  resolveWeightedStepGroups,
} from "./combo/comboStructure.ts";
import { getKnownContextOverflow } from "./combo/knownContextOverflow.ts";
import {
  QUOTA_SOFT_DEPRIORITIZE_FACTOR,
  setCandidateQuotaSoftPenalty,
  _registerExecutionCandidates,
  _unregisterExecutionCandidates,
  applyRequestTagRouting,
  scoreAutoTargets,
  expandAutoComboCandidatePool,
  deriveSpeedTelemetry,
} from "./combo/autoStrategy.ts";
import {
  resolveResetWindowConfig,
  calculateResetWindowAffinity,
  type ResetWindowConfig,
} from "./combo/quotaScoring.ts";
import {
  fetchResetAwareQuotaWithCache,
  preScreenTargets,
  type PreScreenResult,
} from "./combo/quotaStrategies.ts";
import {
  buildAutoQuotaThresholds,
  resolveQuotaExhaustionCutoffForTarget,
} from "./combo/quotaExhaustionCutoff.ts";
import {
  classifyTask,
  getConversationCacheKey,
  isTaskRoutingStrategy,
  reorderByTaskWeight,
} from "./taskAwareRouting.ts";
import { expandTargetsByFingerprints } from "./combo/fingerprintExpansion.ts";

export { RESET_WINDOW_NAMES };
export { QUOTA_SOFT_DEPRIORITIZE_FACTOR, setCandidateQuotaSoftPenalty };
export { scoreAutoTargets, expandAutoComboCandidatePool };
export type { SingleModelTarget, ResolvedComboTarget };
export { validateResponseQuality };
export {
  clampComboDepth,
  shouldSkipForPredictedTtft,
  shouldRecordProviderBreakerFailure,
  isRequestScopedUpstreamFailure,
  shouldSkipConnDisable,
};
export { resolveShadowTargets, scheduleShadowRouting };
export { preScreenTargets };
export {
  resolveComboRuntimeUnits,
  resolveComboTargets,
  filterTargetsByRequestCompatibility,
  getKnownContextOverflow,
};
export {
  getComboFromData,
  getComboModelsFromData,
  resolveNestedComboModels,
  resolveNestedComboTargets,
  validateComboDAG,
} from "./combo/comboStructure.ts";

/**
 * #6692: release a session-stickiness pin the moment its bound connection is
 * the one that just failed. applySessionStickiness() only re-checks health on
 * the NEXT turn (lazily) — without this, a terminal/quality-rejected
 * connection stays pinned until that lazy recheck fires, and a masked
 * daily-cap 200-body rejection never trips the lazy recheck's DB-backed
 * testStatus gate at all (the connection row itself isn't marked unhealthy).
 * Exported for the two failure branches in handleComboChat + handleRoundRobinCombo.
 * peekStickyConnectionId guards against clearing an unrelated pin when the
 * failing target isn't actually the currently sticky-bound connection.
 */
export function releaseStickyPinOnFailure(
  messageHash: string | null | undefined,
  failedConnectionId: string | null | undefined
): void {
  if (!messageHash || !failedConnectionId) return;
  if (peekStickyConnectionId(messageHash) !== failedConnectionId) return;
  clearStickyBinding(messageHash);
}

const DEFAULT_MODEL_P95_MS: Record<string, number> = {
  "grok-4-fast-non-reasoning": 1143,
  "grok-4-1-fast-non-reasoning": 1244,
  "gemini-2.5-flash": 1238,
  "kimi-k2.5": 1646,
  "gpt-4o-mini": 2764,
  "claude-sonnet-4.6": 4000,
  "claude-opus-4.6": 6000,
  "deepseek-chat": 2000,
};
const MIN_HISTORY_SAMPLES = 10;
const OUTPUT_TOKEN_RATIO = 0.4;

function normalizeNestedComboMode(value: unknown): NestedComboMode {
  return value === "execute" ? "execute" : "flatten";
}

function calculateTargetContextAffinity(
  target: ResolvedComboTarget,
  sessionId: string | null | undefined
): number {
  const sessionConnectionId = getSessionConnection(sessionId || null);
  if (!sessionConnectionId) return 0.5;
  if (target.connectionId === sessionConnectionId) return 1;
  if (!target.connectionId) return 0.5;
  return 0.1;
}

function getBootstrapLatencyMs(modelId: string): number {
  const normalized = String(modelId || "").toLowerCase();
  return DEFAULT_MODEL_P95_MS[normalized] ?? 1500;
}

function clampPercent(value: number): number {
  if (!Number.isFinite(value)) return 100;
  return Math.max(0, Math.min(100, value));
}

function quotaRemainingPercentFromQuota(quota: unknown): number {
  if (!quota || typeof quota !== "object") return 100;
  const record = quota as Record<string, unknown>;
  if (record.limitReached === true) return 0;

  const windows = record.windows;
  if (windows && typeof windows === "object" && !Array.isArray(windows)) {
    let minRemaining: number | null = null;
    for (const windowInfo of Object.values(windows as Record<string, unknown>)) {
      if (!windowInfo || typeof windowInfo !== "object") continue;
      const percentUsed = Number((windowInfo as Record<string, unknown>).percentUsed);
      if (!Number.isFinite(percentUsed)) continue;
      const remaining = clampPercent((1 - percentUsed) * 100);
      minRemaining = minRemaining === null ? remaining : Math.min(minRemaining, remaining);
    }
    if (minRemaining !== null) return minRemaining;
  }

  const percentUsed = Number(record.percentUsed);
  if (Number.isFinite(percentUsed)) return clampPercent((1 - percentUsed) * 100);
  return 100;
}

const QUOTA_BLOCKING_CONNECTION_STATUSES = new Set([
  "banned",
  "credits_exhausted",
  "deactivated",
  "expired",
  "rate_limited",
]);

function normalizeConnectionStatus(value: unknown): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function hasFutureRateLimitUntil(value: unknown): boolean {
  if (value == null || value === "") return false;
  const time = new Date(String(value)).getTime();
  return Number.isFinite(time) && time > Date.now();
}

export function getConnectionStatusQuotaCutoffReason(
  connection: Record<string, unknown> | undefined
): string | undefined {
  if (!connection) return undefined;
  const status = normalizeConnectionStatus(connection.testStatus);
  if (QUOTA_BLOCKING_CONNECTION_STATUSES.has(status)) return status;
  if (status === "unavailable" && hasFutureRateLimitUntil(connection.rateLimitedUntil)) {
    return "rate_limited";
  }
  return undefined;
}

export async function buildAutoCandidates(
  targets: ResolvedComboTarget[],
  comboName: string,
  sessionId: string | null | undefined = null,
  resetWindowConfig: ResetWindowConfig = resolveResetWindowConfig(null),
  resilienceSettings: ResilienceSettings | null = null
): Promise<AutoProviderCandidate[]> {
  const hiddenModelsMap = getHiddenModelsByProvider();
  const metrics = getComboMetrics(comboName);
  // Opt-in hard quota cutoff (default OFF). When disabled, candidates are never
  // dropped for low quota here — the soft quota penalty + connection cooldown still
  // apply, so auto-routing behavior is unchanged.
  const quotaCutoffEnabled =
    (resilienceSettings ?? resolveResilienceSettings(null))?.quotaPreflight?.enabled === true;
  const { getPricingForModel } = await import("../../src/lib/localDb");
  const quotaPromises = new Map<string, Promise<unknown>>();
  let historicalLatencyStats: Record<string, HistoricalLatencyStatsEntry> = {};
  try {
    const { getModelLatencyStats } = await import("../../src/lib/usageDb");
    historicalLatencyStats = await getModelLatencyStats({
      windowHours: 24,
      minSamples: 3,
      maxRows: 10000,
    });
  } catch {
    // keep empty stats — auto-combo will use runtime + bootstrap signals
  }

  const uniqueProviders = Array.from(
    new Set(
      targets.map((target) => target.provider || parseModel(target.modelStr).provider || "unknown")
    )
  );
  const connectionPoolCounts = new Map<string, number>();
  const connectionsByProvider = new Map<string, Array<Record<string, unknown>>>();
  const connectionById = new Map<string, Record<string, unknown>>();
  await Promise.all(
    uniqueProviders.map(async (provider) => {
      try {
        const connections = (await getCachedProviderConnections({
          provider,
          isActive: true,
        })) as Array<Record<string, unknown>>;
        const active = Array.isArray(connections) ? connections : [];
        connectionPoolCounts.set(provider, active.length);
        connectionsByProvider.set(provider, active);
        for (const connection of active) {
          if (connection && typeof connection === "object" && typeof connection.id === "string") {
            connectionById.set(connection.id, connection as Record<string, unknown>);
          }
        }
      } catch {
        connectionPoolCounts.set(provider, 0);
        connectionsByProvider.set(provider, []);
      }
    })
  );

  const expandedTargets = expandPromptCacheAffinityTargetsFromConnections(
    targets,
    connectionsByProvider
  );

  // #5521: Expand fingerprint-based providers (mimocode, mcode, opencode) so each
  // fingerprint gets its own combo slot instead of being bundled into one connection.
  const fingerprintExpandedTargets = expandTargetsByFingerprints(
    expandedTargets,
    connectionById,
    (t) => {
      const parsed = parseModel(t.modelStr);
      return t.provider || parsed.provider || parsed.providerAlias || "unknown";
    }
  );

  const candidates = await Promise.all(
    fingerprintExpandedTargets.map(async (target) => {
      const modelStr = target.modelStr;
      const parsed = parseModel(modelStr);
      const provider = target.provider || parsed.provider || parsed.providerAlias || "unknown";
      const model = parsed.model || modelStr;
      const historicalKey = `${provider}/${model}`;
      const historicalModelMetric = historicalLatencyStats[historicalKey] || null;
      const historicalTotal = Number(historicalModelMetric?.totalRequests);
      const hasHistoricalSignal =
        Number.isFinite(historicalTotal) && historicalTotal >= MIN_HISTORY_SAMPLES;

      let costPer1MTokens = 1;
      try {
        const pricing = await getPricingForModel(provider, model);
        const inputPrice = Number(pricing?.input);
        const outputPrice = Number(pricing?.output);
        if (Number.isFinite(inputPrice) && inputPrice >= 0) {
          if (Number.isFinite(outputPrice) && outputPrice >= 0) {
            costPer1MTokens =
              inputPrice * (1 - OUTPUT_TOKEN_RATIO) + outputPrice * OUTPUT_TOKEN_RATIO;
          } else {
            costPer1MTokens = inputPrice;
          }
        }
      } catch {
        // keep default cost
      }

      const modelMetric = metrics?.byModel?.[modelStr] || null;
      const avgLatency = Number(modelMetric?.avgLatencyMs);
      const successRate = Number(modelMetric?.successRate);
      const historicalP95Latency = Number(historicalModelMetric?.p95LatencyMs);
      const historicalStdDev = Number(historicalModelMetric?.latencyStdDev);
      const historicalSuccessRate = Number(historicalModelMetric?.successRate); // 0..1

      const p95LatencyMs = hasHistoricalSignal
        ? Number.isFinite(historicalP95Latency) && historicalP95Latency > 0
          ? historicalP95Latency
          : getBootstrapLatencyMs(model)
        : Number.isFinite(avgLatency) && avgLatency > 0
          ? avgLatency
          : getBootstrapLatencyMs(model);

      const errorRate = hasHistoricalSignal
        ? Number.isFinite(historicalSuccessRate) &&
          historicalSuccessRate >= 0 &&
          historicalSuccessRate <= 1
          ? 1 - historicalSuccessRate
          : 0.05
        : Number.isFinite(successRate) && successRate >= 0 && successRate <= 100
          ? 1 - successRate / 100
          : 0.05;
      const latencyStdDev =
        hasHistoricalSignal && Number.isFinite(historicalStdDev) && historicalStdDev > 0
          ? Math.max(10, historicalStdDev)
          : Math.max(10, p95LatencyMs * 0.1);
      // #6875: surface TTFT/E2E-latency/tokens-per-second onto the candidate so the
      // existing speed-ranking factor (#6011, speedRanking.ts/routerStrategy.ts) picks
      // up real telemetry instead of falling back to the pool median. Additive only —
      // no scoring weights change here.
      const speedTelemetry = hasHistoricalSignal
        ? deriveSpeedTelemetry(historicalModelMetric)
        : undefined;

      const breakerStateRaw = getCircuitBreaker(provider)?.getStatus?.()?.state;
      const circuitBreakerState: ProviderCandidate["circuitBreakerState"] =
        breakerStateRaw === "OPEN" || breakerStateRaw === "HALF_OPEN" ? breakerStateRaw : "CLOSED";
      const contextAffinity = calculateTargetContextAffinity(target, sessionId);
      let resetWindowAffinity = 0.5;
      let quotaRemaining = 100;
      let quotaCutoffBlocked = false;
      let quotaCutoffReason: string | undefined;
      const fetcher = getQuotaFetcher(provider);
      const connection = target.connectionId ? connectionById.get(target.connectionId) : undefined;
      // Gate the terminal-status cutoff behind the same opt-in as the quota-percent
      // cutoff (#4483): when quota cutoff is disabled, a connection in a terminal
      // testStatus must still fall through to normal connection-cooldown / model-lockout
      // handling instead of being hard-blocked here (which would surface a misleading
      // "below quota cutoff" 429 when every candidate is transiently unavailable).
      // The connection's terminal/transient status (credits_exhausted / rate_limited /
      // banned / expired / future-dated unavailable) is classified unconditionally.
      const connectionStatusReason = getConnectionStatusQuotaCutoffReason(connection);
      const statusCutoffReason = quotaCutoffEnabled ? connectionStatusReason : undefined;
      // #4540: when the HARD cutoff is OFF (default), a status-flagged connection is NOT
      // hard-blocked (that would surface a misleading "below quota cutoff" 429), but it
      // also must not score identically to a healthy provider. A no-fetcher exhausted
      // connection keeps quotaRemaining=100, so we tag a SOFT penalty applied at scoring
      // time (scoreAutoTargets → STATUS_SOFT_DEPRIORITIZE_FACTOR) instead.
      let statusPenalty = false;
      let statusPenaltyReason: string | undefined;
      if (statusCutoffReason) {
        quotaCutoffBlocked = true;
        quotaCutoffReason = statusCutoffReason;
        quotaRemaining = 0;
      } else if (connectionStatusReason) {
        statusPenalty = true;
        statusPenaltyReason = connectionStatusReason;
      }
      if (fetcher && target.connectionId) {
        const quotaKey = `${provider}:${target.connectionId}`;
        if (!quotaPromises.has(quotaKey)) {
          quotaPromises.set(
            quotaKey,
            fetchResetAwareQuotaWithCache({
              provider,
              connectionId: target.connectionId,
              connection,
              fetcher,
              config: resetWindowConfig,
              log: {},
              comboName,
            })
          );
        }
        const quota = await quotaPromises.get(quotaKey)!;
        resetWindowAffinity = calculateResetWindowAffinity(quota, resetWindowConfig);
        if (!quotaCutoffBlocked) {
          quotaRemaining = quotaRemainingPercentFromQuota(quota);
        }
        if (!quotaCutoffBlocked && quotaCutoffEnabled) {
          const cutoffDecision = evaluateQuotaCutoff(
            quota as QuotaInfo | null,
            buildAutoQuotaThresholds(provider, connection, resilienceSettings)
          );
          if (!cutoffDecision.proceed) {
            quotaCutoffBlocked = true;
            quotaCutoffReason = cutoffDecision.reason || "quota_exhausted";
          }
        }
      }

      return {
        stepId: target.stepId,
        executionKey: target.executionKey,
        modelStr,
        provider,
        model,
        quotaRemaining,
        quotaTotal: 100,
        circuitBreakerState,
        costPer1MTokens,
        p95LatencyMs,
        latencyStdDev,
        errorRate,
        ...speedTelemetry,
        accountTier: "standard" as const,
        quotaResetIntervalSecs: 86400,
        contextAffinity,
        resetWindowAffinity,
        quotaCutoffBlocked,
        quotaCutoffReason,
        statusPenalty,
        statusPenaltyReason,
        connectionPoolSize: connectionPoolCounts.get(provider) ?? 1,
        connectionId: target.connectionId ?? undefined,
      };
    })
  );

  // Filter out candidates whose model is hidden by the user in the dashboard
  return candidates.filter((c) => {
    const hiddenModels = hiddenModelsMap.get(c.provider);
    return !hiddenModels?.has(c.model);
  });
}

const TERMINAL_PIN_STATUSES = new Set(["credits_exhausted", "banned", "expired"]);

/**
 * Pure decision: should a context-cache pin be DROPPED because its provider has
 * DURABLY fallen? A ccp pin keeps the prompt cache warm by bypassing the combo
 * strategy — but if the pinned provider is dead (credits exhausted / banned /
 * expired, circuit-open, repeated failures, or a long rate-limit) honoring the
 * pin pounds a dead account forever with no failover (laila throttle + credits
 * incidents, 2026-06-22). A brief transient cooldown is tolerated (pin kept) so
 * an unstable provider does not churn the pin every turn. Connection-level
 * `backoffLevel` already resets on success, so `backoffLevel >= K` ≈ K
 * consecutive failures — no per-session counter needed.
 *
 * Returns true ⇒ drop the pin and use the strategy. Pure + unit-testable.
 */
export function pinIsDurablyUnhealthy(
  circuitState: string | undefined,
  connections: Array<{
    testStatus?: string | null;
    backoffLevel?: number | null;
    rateLimitedUntil?: string | null;
  }>,
  now: number,
  opts: { backoffLevel?: number; graceMs?: number } = {}
): boolean {
  if (circuitState === "OPEN") return true;
  if (!Array.isArray(connections) || connections.length === 0) return true;
  const backoffThreshold = opts.backoffLevel ?? Number(process.env.PIN_DROP_BACKOFF_LEVEL || "2");
  const graceMs = opts.graceMs ?? Number(process.env.PIN_DROP_GRACE_MS || "20000");
  // The pin survives as long as AT LEAST ONE connection is healthy or only
  // briefly cooling down — failover only when every connection is durably down.
  const anyUsable = connections.some((c) => {
    const status = typeof c.testStatus === "string" ? c.testStatus : "";
    if (TERMINAL_PIN_STATUSES.has(status)) return false;
    if (Number(c.backoffLevel ?? 0) >= backoffThreshold) return false;
    const rl = c.rateLimitedUntil ? new Date(String(c.rateLimitedUntil)).getTime() : 0;
    if (Number.isFinite(rl) && rl - now > graceMs) return false;
    return true;
  });
  return !anyUsable;
}

/**
 * Async wrapper: resolve the pinned model's provider, read its circuit state and
 * active connections, and decide via {@link pinIsDurablyUnhealthy}. Fail-open
 * (return false) on any error so a lookup bug never drops a healthy pin.
 */
async function isPinnedModelDurablyUnhealthy(pinnedModel: string): Promise<boolean> {
  try {
    const provider = parseModel(pinnedModel).provider;
    if (!provider) return false;
    const circuitState = getCircuitBreaker(provider)?.getStatus?.()?.state;
    const connections = (await getCachedProviderConnections({
      provider,
      isActive: true,
    })) as Array<{
      testStatus?: string | null;
      backoffLevel?: number | null;
      rateLimitedUntil?: string | null;
    }>;
    return pinIsDurablyUnhealthy(circuitState, connections || [], Date.now());
  } catch {
    return false;
  }
}

/**
 * Handle combo chat with fallback.
 * @param {Object} options
 * @param {Object} options.body - Request body
 * @param {Object} options.combo - Full combo object { name, models, strategy, config }
 * @param {Function} options.handleSingleModel - Function: (body, modelStr) => Promise<Response>
 * @param {Function} [options.isModelAvailable] - Optional pre-check: (modelStr) => Promise<boolean>
 * @param {Object} options.log - Logger object
 * @returns {Promise<Response>}
 */
// #2101 guard helpers: a 400 caused by context overflow or parameter validation
// is NOT body-specific — different combo targets have different context windows /
// output limits, so the request should fall through to the next target instead of
// being short-circuited. Exported as pure predicates so the guard is unit-testable.
/** @param {string} errorText */
export function isContextOverflow400(errorText) {
  return (
    /\bcontext.*(?:length_exceeded|too long|overflow|exceeded|window|limit)\b/i.test(errorText) ||
    /exceeds.*context/i.test(errorText) ||
    /your input exceeds/i.test(errorText) ||
    // Reuse accountFallback.ts's CONTEXT_OVERFLOW_PATTERNS (single source of truth)
    // so wording like Kimi's "exceeded model token limit" — which never says the
    // literal word "context" — is still recognized as an overflow/fallback-worthy
    // 400 instead of halting the whole combo (issue #6637).
    CONTEXT_OVERFLOW_PATTERNS.some((p) => p.test(errorText))
  );
}
/** @param {string} errorText */
export function isParamValidation400(errorText) {
  return (
    /\bmax_tokens\b.*(?:illegal|must|range|invalid)/i.test(errorText) ||
    /\bparameter is illegal\b/i.test(errorText) ||
    /\bis illegal.*range\b/i.test(errorText)
  );
}

/** @param {object} options */
export async function handleComboChat({
  body,
  combo,
  handleSingleModel,
  isModelAvailable,
  log,
  settings,
  allCombos,
  relayOptions,
  signal,
  apiKeyAllowedConnections = null,
  nesting = null,
}: HandleComboChatOptions): Promise<Response> {
  const comboCtx = createComboContext({ body, combo, settings, relayOptions, log });
  const {
    strategy,
    relayConfig,
    resilienceSettings,
    universalHandoffConfig,
    effectiveSessionId,
    pinnedModel,
    clientRequestedStream,
    config,
    comboTargetTimeoutMs,
    reasoningTokenBufferEnabled,
  } = phaseComboSetup(comboCtx);
  body = comboCtx.body;

  const handleSingleModelWithTimeout = buildTargetTimeoutRunner({
    handleSingleModel,
    comboTargetTimeoutMs,
    log,
  });

  // Route to pinned model if context caching specifies one (Fix #679)
  if (pinnedModel) {
    // The pin is read from session_model_history (a PRIOR turn) and may name a
    // model that has since been removed from this combo, or a provider whose
    // credentials are gone. Without this guard a stale pin bypasses the strategy
    // and routes to a dead model forever — incident 2026-06-21: cli-claude-heavy
    // pinned to a deepseek connection with no active credentials → instant fail,
    // never falling through to the live targets; and combos re-pointed Opus→Sonnet
    // kept serving the old model. Validate the pin is still reachable in THIS
    // combo's resolved targets (refs flattened) before honoring it. Only validate
    // when allCombos is authoritative (non-empty) so we can resolve combo-refs;
    // the auto-combo redirect path passes an empty list and keeps prior behavior.
    const haveFullCombos = Array.isArray(allCombos) ? allCombos.length > 0 : !!allCombos;
    const pinInCombo =
      !haveFullCombos ||
      resolveComboTargets(combo, allCombos, clampComboDepth(config.maxComboDepth)).some(
        (t) => t.modelStr === pinnedModel
      );
    // Honor the pin only if it is still a combo target AND its provider is not
    // DURABLY down. Without the health gate a pin keeps routing a session to a
    // dead/credits-exhausted/throttled account forever (strategy bypassed, no
    // failover) — incident 2026-06-22: laila stuck on a throttled claude account
    // and credits_exhausted accounts never failing over. A transient cooldown is
    // tolerated (pin kept) so an unstable provider does not churn the pin.
    const pinDurablyDown = pinInCombo ? await isPinnedModelDurablyUnhealthy(pinnedModel) : false;
    if (pinInCombo && !pinDurablyDown) {
      log.info(
        "COMBO",
        `Bypassing strategy — routing directly to pinned context model: ${pinnedModel}`
      );
      let pinnedResult: Response | null = null;
      try {
        pinnedResult = await handleSingleModelWithTimeout(body, pinnedModel, {
          modelPinned: true,
        } as SingleModelTarget);
      } catch (pinErr) {
        log.warn(
          "COMBO",
          `Pinned model ${pinnedModel} threw error: ${pinErr instanceof Error ? pinErr.message : String(pinErr)}, falling through to combo retry/fallback`
        );
      }
      if (pinnedResult) {
        if (pinnedResult.ok) {
          let pinnedClone: Response;
          try {
            pinnedClone = pinnedResult.clone();
          } catch {
            pinnedClone = pinnedResult;
          }
          const pinnedQuality = await validateResponseQuality(
            pinnedClone,
            clientRequestedStream,
            log,
            config.responseValidation
          );
          releaseQualityClone(pinnedClone, pinnedResult, pinnedQuality);
          if (pinnedQuality.valid) return pinnedResult;
          releaseRejectedQualityResponse(pinnedClone, pinnedResult);
          log.warn(
            "COMBO",
            `Pinned model ${pinnedModel} returned 200 but failed quality check: ${pinnedQuality.reason}, falling through to combo retry/fallback`
          );
        } else {
          const pinnedStatus = pinnedResult.status || 500;
          if (![408, 429, 500, 502, 503, 504].includes(pinnedStatus)) {
            return pinnedResult;
          }
          log.warn(
            "COMBO",
            `Pinned model ${pinnedModel} failed (${pinnedStatus}), falling through to combo retry/fallback`
          );
        }
      }
      // Fall through to the target iteration loop below — retries and sibling
      // models will be tried via the normal combo machinery.
    }
    log.warn(
      "COMBO",
      pinInCombo
        ? `Context-cache pin "${pinnedModel}" provider durably unhealthy — dropping pin, using strategy`
        : `Stale context-cache pin "${pinnedModel}" not in combo "${combo.name}" targets — dropping pin, using strategy`
    );
    // Fall through to the normal target iteration loop below — the pin is
    // dropped, so the combo strategy picks the best available target.
  }

  // Fusion strategy: parallel panel + judge synthesis. Handled in a separate module
  // because it neither iterates targets in order nor needs the failover/retry/credential
  // gate machinery that follows — it fans out, then synthesizes once.
  const cfg = config as Record<string, unknown>;
  const judgeModel = typeof cfg.judgeModel === "string" ? cfg.judgeModel : undefined;
  const fusionTuning =
    cfg.fusionTuning && typeof cfg.fusionTuning === "object"
      ? (cfg.fusionTuning as FusionTuning)
      : undefined;
  if (strategy !== "fusion" && (judgeModel || fusionTuning)) {
    log.warn(
      "COMBO",
      `Combo "${combo.name}" sets config.judgeModel/fusionTuning but strategy is "${strategy}" — these fields are only consumed by the fusion strategy and will be ignored (#6455)`
    );
  }
  if (strategy === "fusion") {
    const { panel: fusionModels, comboRefUnits } = extractFusionPanelSpec(
      combo.models || [],
      combo.name,
      allCombos
    );
    // Untyped like the existing `nestingContext` further down — `nesting` is
    // already `ComboNestingContext | null` per HandleComboChatOptions, no new
    // import needed.
    const fusionNesting = nesting || {
      depth: 0,
      maxDepth: clampComboDepth(config.maxComboDepth),
      visitedComboNames: [combo.name],
      rootComboName: combo.name,
      attemptBudget: { count: 0, limit: MAX_GLOBAL_ATTEMPTS },
    };
    const fusionHandleSingleModel =
      comboRefUnits.size > 0
        ? buildFusionHandleSingleModel({
            handleSingleModel: handleSingleModelWithTimeout,
            comboRefUnits,
            allCombos,
            nesting: fusionNesting,
            baseOptions: {
              body,
              combo,
              handleSingleModel,
              isModelAvailable,
              log,
              settings,
              allCombos,
              relayOptions,
              signal,
              apiKeyAllowedConnections,
            },
            runCombo: handleComboChat,
          })
        : handleSingleModelWithTimeout;
    return handleFusionChat({
      body,
      models: fusionModels,
      handleSingleModel: fusionHandleSingleModel,
      log,
      comboName: combo.name,
      judgeModel,
      tuning: fusionTuning,
    });
  }

  // Chaos mode (parallel multi-model dispatch): detection + dispatch live in
  // chaosEngine.ts (dispatchChaosFromCombo), returning null when not chaos-enabled.
  const chaosDispatch = dispatchChaosFromCombo({
    cfg,
    comboModels: combo.models || [],
    comboName: combo.name,
    body,
    handleSingleModel: handleSingleModelWithTimeout,
    log,
  });
  if (chaosDispatch) return chaosDispatch;

  // Pipeline strategy: sequential chain — each step's output feeds the next step's
  // input, only the final step's response is returned. Handled in a separate module
  // because it neither iterates targets as fallbacks nor needs the failover/retry
  // machinery below — it runs targets in order, threading output → input. The step
  // list is `combo.models` (in order); an optional per-step `prompt` is read off the
  // target object (comboModelStepInputSchema.prompt).
  if (strategy === "pipeline") {
    const pipelineSteps = (combo.models || [])
      .map((m): PipelineStep | null => {
        if (typeof m === "string") return { model: m };
        if (m && typeof m === "object") {
          const obj = m as Record<string, unknown>;
          if (typeof obj.model === "string") {
            return {
              model: obj.model,
              prompt: typeof obj.prompt === "string" ? obj.prompt : undefined,
            };
          }
        }
        return null;
      })
      .filter((s): s is PipelineStep => Boolean(s));
    return handlePipelineChat({
      body,
      steps: pipelineSteps,
      handleSingleModel: handleSingleModelWithTimeout,
      log,
      comboName: combo.name,
      maxRetries: config.maxRetries ?? 0,
      retryDelayMs: resolveDelayMs(config.retryDelayMs, 1000),
    });
  }

  const nestingContext = nesting || {
    depth: 0,
    maxDepth: clampComboDepth(config.maxComboDepth),
    visitedComboNames: [combo.name],
    rootComboName: combo.name,
    attemptBudget: { count: 0, limit: MAX_GLOBAL_ATTEMPTS },
  };
  const nestedComboMode = normalizeNestedComboMode(config.nestedComboMode);

  const executeModeUnits =
    nestedComboMode === "execute" && allCombos
      ? resolveComboRuntimeUnits(combo, allCombos, "execute", nestingContext.maxDepth)
      : [];
  const hasExecutableComboRef = executeModeUnits.some((unit) => unit.kind === "combo-ref");
  const simpleExecuteStrategies = new Set([
    "priority",
    "round-robin",
    "random",
    "strict-random",
    "weighted",
    "fill-first",
  ]);

  if (hasExecutableComboRef && simpleExecuteStrategies.has(strategy)) {
    let runtimeUnits = executeModeUnits;
    let unitExecutionStrategy = strategy;
    if (strategy === "weighted") {
      const stickyLimit = clampStickyWeightedTargetLimit(
        (config as Record<string, unknown>).stickyWeightedLimit
      );
      const stickyKey = getStickyWeightedExecutionKey(combo.name, stickyLimit);
      const stickyUnit = stickyKey
        ? runtimeUnits.find((unit) => unit.executionKey === stickyKey)
        : null;
      if (stickyUnit) {
        runtimeUnits = [
          stickyUnit,
          ...runtimeUnits.filter((unit) => unit.executionKey !== stickyUnit.executionKey),
        ];
        unitExecutionStrategy = "priority";
      }
    }
    if (strategy === "random") runtimeUnits = fisherYatesShuffle([...runtimeUnits]);
    if (strategy === "strict-random") {
      const key = await getNextFromDeck(
        `combo:${combo.name}`,
        runtimeUnits.map((unit) => unit.executionKey)
      );
      const selected = runtimeUnits.find((unit) => unit.executionKey === key) || runtimeUnits[0];
      runtimeUnits = [
        selected,
        ...runtimeUnits.filter((unit) => unit.executionKey !== selected.executionKey),
      ];
    }
    let runtimeStickyLimit: number | null = null;
    let runtimeStickyTargets: ResolvedComboUnit[] = runtimeUnits;
    if (strategy === "round-robin") {
      const perComboStickyLimit = (config as Record<string, unknown>).stickyRoundRobinLimit;
      runtimeStickyLimit = resolveComboStickyRoundRobinLimit(
        perComboStickyLimit,
        settings as Record<string, unknown> | null
      );
      const { startIndex, counter } = getStickyRoundRobinStartIndex(
        combo.name,
        runtimeUnits,
        runtimeStickyLimit
      );
      if (runtimeStickyLimit <= 1) rrCounters.set(combo.name, counter + 1);
      runtimeUnits = runtimeUnits.map(
        (_, offset) => runtimeUnits[(startIndex + offset) % runtimeUnits.length]
      );
      runtimeStickyTargets = executeModeUnits;
    }
    const execution = await executeRuntimeUnitCombo({
      body,
      combo,
      strategy: unitExecutionStrategy,
      effectiveComboStrategy: strategy,
      units: runtimeUnits,
      handleSingleModel: handleSingleModelWithTimeout,
      isModelAvailable,
      log,
      config,
      settings,
      allCombos,
      signal,
      nesting: nestingContext,
      baseOptions: {
        body,
        combo,
        handleSingleModel,
        isModelAvailable,
        log,
        settings,
        allCombos,
        relayOptions,
        signal,
        apiKeyAllowedConnections,
      },
      runCombo: handleComboChat,
    });
    if (strategy === "weighted" && execution.response.ok && execution.unit) {
      const stickyLimit = clampStickyWeightedTargetLimit(
        (config as Record<string, unknown>).stickyWeightedLimit
      );
      if (stickyLimit > 1)
        recordStickyWeightedSuccess(combo.name, execution.unit.executionKey, stickyLimit);
    }
    if (
      strategy === "round-robin" &&
      execution.response.ok &&
      execution.unit &&
      runtimeStickyLimit &&
      runtimeStickyLimit > 1
    ) {
      recordStickyRoundRobinSuccess(
        combo.name,
        execution.unit,
        runtimeStickyLimit,
        runtimeStickyTargets
      );
    }
    return execution.response;
  }

  // Route to round-robin handler if strategy matches
  if (strategy === "round-robin") {
    return handleRoundRobinCombo({
      body,
      combo,
      handleSingleModel: handleSingleModelWithTimeout,
      isModelAvailable,
      log,
      settings,
      allCombos,
      signal,
    });
  }

  const maxRetries = config.maxRetries ?? 1;
  const retryDelayMs = resolveDelayMs(config.retryDelayMs, 2000);
  const fallbackDelayMs = resolveDelayMs(config.fallbackDelayMs, 0);
  const maxSetRetries = config.maxSetRetries ?? 0;
  const setRetryDelayMs = resolveDelayMs(config.setRetryDelayMs, 2000);

  const isTargetSelectableForWeighted = async (target: ResolvedComboTarget): Promise<boolean> => {
    const rawModel = parseModel(target.modelStr).model || target.modelStr;
    if (target.provider && getCircuitBreaker(target.provider).getStatus().state === "OPEN")
      return false;
    if (
      resilienceSettings.providerCooldown.enabled &&
      Boolean(target.provider && target.provider !== "unknown") &&
      isProviderInCooldown(target.provider, target.connectionId ?? undefined, resilienceSettings)
    ) {
      return false;
    }
    if (
      target.provider &&
      rawModel &&
      isModelLocked(target.provider, target.connectionId || "", rawModel)
    ) {
      return false;
    }
    return isModelAvailable ? await isModelAvailable(target.modelStr, target) : true;
  };

  // #2562: Expand provider-wildcard steps (e.g. `fta/*`, `openai/gpt-4*`) into
  // concrete model entries sourced from the live synced-models catalog + registry.
  // Must run before any step-group / target resolution so that wildcard-originated
  // steps are treated identically to hand-authored entries by all downstream logic
  // (including the sticky-weighted eligibility pass below).
  const expandedCombo = await expandProviderWildcardsInCombo(combo);
  const expandedAllCombos = allCombos
    ? Array.isArray(allCombos)
      ? await expandProviderWildcardsInCollection(allCombos as ComboLike[])
      : {
          ...allCombos,
          combos: await expandProviderWildcardsInCollection(
            ((allCombos as { combos?: ComboLike[] }).combos || []) as ComboLike[]
          ),
        }
    : allCombos;

  const stickyWeightedLimit = clampStickyWeightedTargetLimit(
    (config as Record<string, unknown>).stickyWeightedLimit
  );
  if (
    strategy === "weighted" &&
    !weightedStickyTargets.has(combo.name) &&
    weightedStickyTargets.size >= MAX_RR_COUNTERS
  ) {
    const oldest = weightedStickyTargets.keys().next().value;
    if (oldest !== undefined) weightedStickyTargets.delete(oldest);
  }
  let stepGroups: Array<{ step: ComboRuntimeStep; targets: ResolvedComboTarget[] }> | undefined;
  const weightedEligibleKeys = new Set<string>();
  if (strategy === "weighted") {
    stepGroups = resolveWeightedStepGroups(expandedCombo, expandedAllCombos);
    for (const group of stepGroups) {
      const availability = await Promise.all(group.targets.map(isTargetSelectableForWeighted));
      if (availability.some(Boolean)) weightedEligibleKeys.add(group.step.executionKey);
    }
  }
  const rawStickyWeightedKey =
    strategy === "weighted" ? getStickyWeightedExecutionKey(combo.name, stickyWeightedLimit) : null;
  const stickyWeightedKey =
    rawStickyWeightedKey && weightedEligibleKeys.has(rawStickyWeightedKey)
      ? rawStickyWeightedKey
      : null;
  if (strategy !== "weighted" || stickyWeightedLimit <= 1) {
    weightedStickyTargets.delete(combo.name);
  } else if (rawStickyWeightedKey && !stickyWeightedKey) {
    weightedStickyTargets.delete(combo.name);
  }
  const weightedResolution =
    strategy === "weighted"
      ? resolveWeightedTargets(
          expandedCombo,
          expandedAllCombos,
          stickyWeightedKey,
          weightedEligibleKeys,
          stepGroups
        )
      : null;
  const getWeightedStepKeyForTarget = (target: ResolvedComboTarget): string | null => {
    if (!weightedResolution?.orderedSteps) return null;
    const step = weightedResolution.orderedSteps.find(
      (entry) =>
        target.executionKey === entry.executionKey ||
        target.executionKey.startsWith(entry.executionKey + ">")
    );
    return step?.executionKey || null;
  };
  let orderedTargets =
    strategy === "weighted"
      ? weightedResolution?.orderedTargets || []
      : resolveComboTargets(
          expandedCombo,
          expandedAllCombos,
          clampComboDepth(config.maxComboDepth)
        );

  orderedTargets = await applyRequestTagRouting(orderedTargets, body, log);

  const knownContextOverflow = getKnownContextOverflow(orderedTargets, body);
  if (knownContextOverflow) {
    const { requiredContextTokens, maxKnownContextTokens } = knownContextOverflow;
    log.warn(
      "COMBO",
      `Request context exceeds every known target limit (${requiredContextTokens} > ${maxKnownContextTokens} tokens)`
    );
    return errorResponseWithComboDiagnostics(
      400,
      `Request requires approximately ${requiredContextTokens} tokens, but the largest known context limit in this combo is ${maxKnownContextTokens} tokens. Reduce or compact the request context.`,
      {
        poolSize: orderedTargets.length,
        attempted: 0,
        excluded: orderedTargets.map((target) => ({
          provider: target.provider,
          model: target.modelStr,
          reason: "context_window",
        })),
        attemptOrder: [],
        terminalReason: "context_length_exceeded",
      },
      { code: "context_length_exceeded", type: "invalid_request_error" }
    );
  }

  if (strategy === "weighted") {
    log.info(
      "COMBO",
      `Weighted selection${stickyWeightedKey ? " (sticky)" : ""}${allCombos ? " with nested resolution" : ""}: ${orderedTargets.length} total targets`
    );
  } else if (allCombos) {
    log.info("COMBO", `${strategy} with nested resolution: ${orderedTargets.length} total targets`);
  }

  // Pipeline dispatch: route smart/pipeline-enabled combos through the multi-stage pipeline
  if (strategy === "auto") {
    const autoParsed = parseAutoPrefix(combo.name);
    const autoVariant = autoParsed.valid ? autoParsed.variant : undefined;
    if (autoVariant === "smart" || config.pipeline_enabled) {
      try {
        const pipelineRaw = await handlePipelineCombo({
          body,
          combo,
          handleChatCore: handleSingleModelWithTimeout,
          log: {
            info: log.info,
            warn: log.warn,
            error: log.error ?? log.warn,
          },
          settings: settings ?? {},
          signal: signal ?? undefined,
        });
        // handlePipelineCombo resolves to a PipelineResult (buffered text) or,
        // in the streaming-final-stage case, a Response. Callers downstream
        // (chat.ts → withSessionHeader) require a Response, so adapt the
        // PipelineResult here instead of leaking the raw object.
        return pipelineRaw instanceof Response
          ? pipelineRaw
          : buildPipelineResponse(pipelineRaw, body);
      } catch (pipelineErr) {
        const pipelineMsg = pipelineErr instanceof Error ? pipelineErr.message : "";
        if (pipelineMsg === "PIPELINE_DISABLED") {
          log.info("COMBO", "Pipeline disabled, falling through to standard auto routing");
        } else if (pipelineMsg === "PIPELINE_TOKEN_THRESHOLD") {
          log.info(
            "COMBO",
            "Pipeline skipped (prompt below token threshold), falling through to standard auto routing"
          );
        } else {
          log.warn("COMBO", "Pipeline dispatch failed, falling through to standard auto routing", {
            err: pipelineErr,
          });
        }
      }
    }
  }

  // #4945 regression guard: when an "auto" combo uses an EXPLICIT router
  // (routingStrategy lkgp/cost/etc, not the default "rules" scorer), that router
  // pins orderedTargets[0]. The task-aware reordering below must then refine only
  // the fallback order, never override the router's primary choice.
  let autoUsedExplicitRouter = false;
  if (strategy === "auto") {
    const autoResult = await resolveAutoStrategyOrder({
      orderedTargets,
      body,
      combo,
      settings,
      config,
      relayOptions,
      resilienceSettings,
      log,
      buildAutoCandidates,
    });
    if ("earlyResponse" in autoResult) return autoResult.earlyResponse;
    orderedTargets = autoResult.orderedTargets;
    autoUsedExplicitRouter = autoResult.autoUsedExplicitRouter;
  } else {
    orderedTargets = await applyStrategyOrdering(strategy, orderedTargets, {
      combo,
      config,
      body,
      log,
      apiKeyAllowedConnections,
    });
  }
  // An explicit cache-optimized combo outranks the global cache-affinity default,
  // but only protects its ordering when this request actually produced a reusable
  // cache key. Cache misses retain the normal session/eval routing behavior.
  const cacheStrategyAffinityApplied =
    strategy === "cache-optimized" && applyPromptCacheAffinity(orderedTargets, body).applied;
  // #6168: session stickiness opt-out. Per-combo `config.disableSessionStickiness`
  // overrides the global `settings.disableSessionStickiness` fallback (default false,
  // preserving the #3825 prompt-cache/504 fix). When disabled, skip the reorder and
  // treat the result as a no-op so the recordStickyBinding write-back below is skipped.
  const disableSessionStickiness =
    cacheStrategyAffinityApplied ||
    resolveDisableSessionStickiness(
      config as Record<string, unknown> | null | undefined,
      settings as Record<string, unknown> | null | undefined
    );
  const _sticky = disableSessionStickiness
    ? ({ targets: orderedTargets, messageHash: null, stuck: false } as const)
    : await applySessionStickiness(
        orderedTargets,
        // #7270: normalize both wire shapes (.messages / Responses-API .input) so the
        // stickiness key is derivable on the /v1/responses surface, not just Chat Completions.
        normalizeStickinessMessages(body as { messages?: unknown; input?: unknown })
      );
  orderedTargets = _sticky.targets;
  if (!cacheStrategyAffinityApplied) {
    orderedTargets = orderTargetsByEvalScores(orderedTargets, config.evalRouting, log);
  }
  orderedTargets = filterTargetsByRequestCompatibility(orderedTargets, body, log);
  orderedTargets = applyContextRequirements(orderedTargets, config.contextRequirements, log);

  // Task-aware reordering: only active for strategies ["smart","task","task-aware","task_aware","auto"].
  // Additive — does not affect any of the other 15 strategies.
  if (isTaskRoutingStrategy(strategy)) {
    const task = classifyTask(body);
    const conversationCacheKey = getConversationCacheKey(body);
    const taskReordered = reorderByTaskWeight(orderedTargets, task);
    // #4945 regression guard: when an explicit auto router (lkgp/cost/…) pinned
    // orderedTargets[0], keep that primary choice and let task-aware refine only
    // the fallback tail — otherwise task weighting silently defeats the operator's
    // chosen LKGP/cost selection. reorderByTaskWeight returns the same target
    // objects (no clone), so identity filtering is safe.
    const pinnedFirst = autoUsedExplicitRouter ? orderedTargets[0] : undefined;
    const nextOrder = pinnedFirst
      ? [pinnedFirst, ...taskReordered.filter((t) => t !== pinnedFirst)]
      : taskReordered;
    if (nextOrder[0]?.modelStr !== orderedTargets[0]?.modelStr) {
      const reasons =
        Array.isArray(task.reasons) && task.reasons.length > 0
          ? ` (${task.reasons.join(",")})`
          : "";
      log.info(
        "COMBO",
        `task-route task=${task.level}${reasons} cacheKey=${conversationCacheKey ?? "none"} → ${nextOrder[0]?.modelStr}`
      );
    }
    orderedTargets = nextOrder;
  }

  // Prompt-cache locality is applied after request eligibility and task routing.
  // Session stickiness and explicit auto-router pins remain stronger continuity
  // decisions; quota, health, and circuit-breaker gates still run per attempt.
  const autoConfigForCacheWeight =
    strategy === "auto"
      ? ((combo.autoConfig ||
          ((config as Record<string, unknown>).auto &&
          typeof (config as Record<string, unknown>).auto === "object"
            ? (config as Record<string, unknown>).auto
            : null) ||
          config) as Record<string, unknown>)
      : null;
  const autoWeightsForCache =
    autoConfigForCacheWeight?.weights && typeof autoConfigForCacheWeight.weights === "object"
      ? (autoConfigForCacheWeight.weights as Record<string, unknown>)
      : null;
  const autoUsesCacheScore = Number(autoWeightsForCache?.cacheAffinity) > 0;
  const promptCacheAffinityEnabled =
    settings?.promptCacheAffinityEnabled !== false && !autoUsesCacheScore;
  const promptCacheAffinityTargets =
    promptCacheAffinityEnabled && resolvePromptCacheAffinityKey(body)
      ? await expandPromptCacheAffinityTargets(orderedTargets)
      : orderedTargets;
  const promptCacheAffinity = applyPromptCacheAffinity(
    promptCacheAffinityTargets,
    body,
    promptCacheAffinityEnabled
  );
  if (promptCacheAffinity.applied) {
    const protectedOriginal =
      (_sticky.stuck ||
        autoUsedExplicitRouter ||
        strategy === "quota-share" ||
        strategy === "weighted") &&
      orderedTargets[0];
    const protectedFirst = protectedOriginal
      ? (promptCacheAffinity.targets.find(
          (target) =>
            target === protectedOriginal ||
            target.executionKey === protectedOriginal.executionKey ||
            target.executionKey.startsWith(`${protectedOriginal.executionKey}@`)
        ) ?? protectedOriginal)
      : null;
    orderedTargets = protectedFirst
      ? [
          protectedFirst,
          ...promptCacheAffinity.targets.filter((target) => target !== protectedFirst),
        ]
      : promptCacheAffinity.targets;
    log.debug?.("COMBO", "Prompt-cache affinity applied", {
      source: promptCacheAffinity.source,
      fingerprint: promptCacheAffinity.fingerprint,
      targetCount: orderedTargets.length,
    });
  }

  // Parallel pre-screen: check provider profiles and model availability for all targets
  // Only runs for priority strategy where sequential checking causes latency
  const preScreenMap =
    strategy === "priority"
      ? await preScreenTargets(orderedTargets, isModelAvailable).catch(
          () => new Map<string, PreScreenResult>()
        )
      : new Map<string, PreScreenResult>();

  // #5923 (Finding #4) — reset-window config for the shared per-target quota-
  // exhaustion cutoff below. The "auto" strategy already applies its own cutoff
  // via buildAutoCandidates/routableCandidates, so this only affects the other
  // 16 strategies (priority, weighted, etc.) that funnel through executeTarget.
  const quotaCutoffResetWindowConfig = resolveResetWindowConfig(config as Record<string, unknown>);

  // QA P0 diagnostics: record the order in which targets were actually attempted
  // (provider/model ids only) so a terminal combo failure can report the attempt
  // sequence alongside pool size + exhaustion reasons. Accumulates across set retries.
  const comboAttemptOrder: Array<{ provider: string; model: string }> = [];

  if (orderedTargets.length === 0) {
    // Surface a recovery hint + auto-clear the session pin after enough consecutive
    // no-target failures (silent-stop fix). Threshold of 3 prevents a one-off account
    // wipe from destroying the prompt-cache pin benefit on the next request.
    recordComboFailure(effectiveSessionId, combo.name);
    return errorResponseWithComboDiagnostics(
      404,
      "Combo has no executable targets",
      {
        poolSize: 0,
        attempted: 0,
        excluded: [],
        attemptOrder: [],
        terminalReason: "no_executable_targets",
        recovery: buildRecoveryHint("no_executable_targets"),
      },
      { code: "model_not_found", type: "invalid_request_error" }
    );
  }

  scheduleShadowRouting(
    combo,
    config,
    body,
    resolveShadowTargets(combo, config, allCombos),
    handleSingleModel,
    isModelAvailable,
    strategy,
    log
  );

  // G2: Collect execution keys registered by _registerExecutionCandidates above (auto strategy).
  // We snapshot them now so cleanup can happen after the attempt loop finishes.
  const _registeredExecutionKeys = orderedTargets.map((t) => t.executionKey).filter(Boolean);

  let globalAttempts = 0;

  // Cooldown-aware retry (Variante A). Originally quota-share (qtSd/) only;
  // extended to "auto" combos too (#7360 — a 2-model "default" auto combo
  // hitting Gemini TPM/RPM on both targets was crystallizing a 503 "all
  // targets exhausted" after ~6s instead of waiting out the ~60s TPM window):
  // when the set loop would crystallize a 429 model_cooldown because the
  // target hit a SHORT transient cooldown, we wait it out and re-run the
  // whole set loop instead of propagating the 429. `globalAttempts` persists
  // across these waits so MAX_GLOBAL_ATTEMPTS still bounds total work. The
  // wait happens at the crystallization point. The only semaphore slot the
  // quota-share path may hold is the FASE 2.1 per-connection concurrency slot
  // (acquired once around dispatchWithCooldownRetry below); it is intentionally
  // kept across the wait so the account stays "busy", and is released by the
  // outer finally — not here.
  //
  // The set loop is wrapped in a small recursive closure rather than an extra
  // labelled `while (true)` so the loop body keeps its original indentation; a
  // wait+redispatch is a tail `return dispatchWithCooldownRetry()`, which
  // re-runs ONLY the set loop (selection / shadow routing / setup above stay
  // untouched), preserving the pre-existing `continue`-to-top-of-set-loop
  // semantics exactly.
  const comboCooldownWaitEnabled = isComboCooldownWaitEligible(
    strategy,
    resilienceSettings.comboCooldownWait
  );
  let comboCooldownAttempt = 0;
  let comboCooldownBudgetLeftMs = resilienceSettings.comboCooldownWait.budgetMs;

  // Global combo timeout: when set (>0), limits total wall-clock time the combo
  // spends iterating through targets. After each target completes, if elapsed time
  // exceeds comboTimeoutMs, remaining targets are skipped and a 504 with aggregated
  // error diagnostics is returned. 0 = disabled (backward-compatible, unlimited).
  const comboTimeoutMs = config.comboTimeoutMs || 0;
  const comboStartTime = Date.now();
  let comboExpired = false;
  // Accumulator for per-model error details across targets in the current set try.
  // Reset at the start of each set retry (same lifecycle as lastError/recordedAttempts).
  let comboErrors: Array<{ model: string; status: number; error: string }> = [];

  // FASE 2.1: per-connection concurrency limit for quota-share. The gating in
  // selectQuotaShareTarget is fail-open and cannot hard-limit a single-connection
  // pool, so we serialize concurrent requests to the selected account through a
  // per-connection semaphore. Enabled only for quota-share combos (the cap is the
  // account's) and gated by the kill-switch; the slot wraps the whole dispatch.
  const quotaShareConcurrencyEnabled =
    strategy === "quota-share" && resilienceSettings.quotaShareConcurrencyLimit.enabled;

  const dispatchWithCooldownRetry = async (): Promise<Response> => {
    // #7360: hoisted OUTSIDE the setTry loop (not reset each iteration) so they
    // persist across set retries. Without this, a combo whose targets all get
    // locked out on setTry 0 would have every SUBSEQUENT setTry pre-skip both
    // targets via the isModelLocked check (no real dispatch, so these are never
    // touched) — and the wait/crystallize decision below only runs on the FINAL
    // setTry, which would see lastStatus/earliestRetryAfter reset to null and
    // wrongly fall into the generic "all accounts inactive" 503 instead of ever
    // reaching the cooldown-aware wait, even though a real 429 with a known
    // retry-after WAS observed earlier in the same dispatch (live incident,
    // #7360 follow-up: log id 1784416706646-51 — 6.9s to a 503 despite both
    // targets reporting a clean 40s rate_limit lockout on the first attempt).
    let lastError: string | null = null;
    let earliestRetryAfter: ComboRetryAfter | null = null;
    let lastStatus: number | null = null;

    for (let setTry = 0; setTry <= maxSetRetries; setTry++) {
      // #1731: Per-set-iteration set of providers whose quota is fully exhausted.
      // Reset each retry so providers excluded in a previous attempt get another chance.
      const exhaustedProviders = new Set<string>();
      const exhaustedConnections = new Set<string>();
      const transientRateLimitedProviders = new Set<string>();
      if (setTry > 0) {
        log.info("COMBO", `All targets failed — retrying set (${setTry}/${maxSetRetries})`);
        await new Promise((resolve) => {
          const timer = setTimeout(resolve, setRetryDelayMs);
          signal?.addEventListener(
            "abort",
            () => {
              clearTimeout(timer);
              resolve(undefined);
            },
            { once: true }
          );
        });
        if (signal?.aborted) {
          log.info("COMBO", "Client disconnected during set retry delay — aborting");
          return errorResponse(499, "Client disconnected");
        }
      }

      const startTime = Date.now();
      let fallbackCount = 0;
      let recordedAttempts = 0;
      comboErrors = [];

      // QA P0: assemble a sanitized diagnostic trace from the state already in scope
      // (pool size + this set-try's exhausted providers/connections + attempt order +
      // a terminal-reason code). Never touches keys/tokens — provider/model ids only.
      // Silent-stop fix: include a `recovery` hint (action verb + human next-step) so the
      // OC plugin + non-header-aware clients can render an actionable error instead of an
      // opaque 5xx. The optional `retryAfterSeconds` carries the upstream Retry-After hint.
      const buildComboDiag = (
        terminalReason: string,
        retryAfterSeconds?: number
      ): ComboDiagnostics => ({
        poolSize: orderedTargets.length,
        attempted: recordedAttempts,
        excluded: [
          ...[...exhaustedProviders].map((p) => ({ provider: p, reason: "exhausted" })),
          ...[...exhaustedConnections].map((c) => ({
            provider: "unknown",
            reason: `exhausted_connection:${String(c).slice(0, 8)}`,
          })),
        ],
        attemptOrder: comboAttemptOrder,
        terminalReason,
        recovery: buildRecoveryHint(terminalReason, retryAfterSeconds),
      });

      let globalResolve: ((res: Response) => void) | null = null;
      const globalPromise = new Promise<Response>((res) => {
        globalResolve = res;
      });
      const runningTasks = new Set<Promise<void>>();
      let anySuccess = false;
      const abortControllers = new Map<number, AbortController>();
      const zeroLatencyOptimizationsEnabled = config.zeroLatencyOptimizationsEnabled === true;

      const executeTarget = async (
        i: number
      ): Promise<{ ok: boolean; response?: Response } | null> => {
        const target = orderedTargets[i];
        const modelStr = target.modelStr;
        const rawModel = parseModel(modelStr).model || modelStr;
        const provider = target.provider;

        const cb = getCircuitBreaker(provider);
        if (cb.getStatus().state === "OPEN") {
          log.info("COMBO", `Skipping ${modelStr} — circuit breaker OPEN for ${provider}`);
          if (i > 0) fallbackCount++;
          return null;
        }

        if (
          resilienceSettings.providerCooldown.enabled &&
          Boolean(provider && provider !== "unknown") &&
          isProviderInCooldown(provider, target.connectionId ?? undefined, resilienceSettings)
        ) {
          log.info("COMBO", `Skipping ${modelStr} — provider ${provider} in global cooldown`);
          if (i > 0) fallbackCount++;
          return null;
        }

        // Use pre-screened profile if available, otherwise fetch on demand
        const preScreenEntry = preScreenMap.get(target.executionKey);
        const profile = preScreenEntry?.profile ?? (await getRuntimeProviderProfile(provider));

        const allowRateLimitedConnection =
          Boolean(provider && provider !== "unknown") &&
          transientRateLimitedProviders.has(provider);
        const targetForAttempt = allowRateLimitedConnection
          ? {
              ...target,
              allowRateLimitedConnection: true,
              modelAbortSignal: abortControllers.get(i)!.signal,
            }
          : { ...target, modelAbortSignal: abortControllers.get(i)!.signal };

        // #1731 / #1731v2: skip targets already known-exhausted this request (shared predicate).
        const exhaustedSkip = getExhaustedTargetSkipReason(
          target,
          exhaustedProviders,
          exhaustedConnections
        );
        if (exhaustedSkip) {
          log.info("COMBO", exhaustedSkip);
          if (i > 0) fallbackCount++;
          return null;
        }

        // Pre-check: skip models locked by the resilience system (model-level lockout)
        if (provider && rawModel && isModelLocked(provider, target.connectionId || "", rawModel)) {
          log.info("COMBO", `Skipping ${modelStr} — model locked by resilience (cooldown active)`);
          if (i > 0) fallbackCount++;
          return null;
        }

        // #5923 (Finding #4) — honor the same opt-in quota-exhaustion cutoff the
        // "auto" strategy already applies (buildAutoCandidates), for every other
        // strategy (priority, weighted, etc.). Strictly scoped per (provider,
        // connectionId): a 0%-remaining connection is skipped here, but sibling
        // connections/models on the same provider are untouched — the provider
        // circuit breaker is never touched by this check. The "auto" strategy is
        // excluded to avoid a redundant duplicate fetch — it already filtered its
        // candidate pool via `routableCandidates` before reaching this loop.
        if (strategy !== "auto" && provider && target.connectionId) {
          const quotaCutoff = await resolveQuotaExhaustionCutoffForTarget(
            provider,
            target.connectionId,
            resilienceSettings,
            quotaCutoffResetWindowConfig,
            combo.name,
            log
          );
          if (quotaCutoff.blocked) {
            log.info(
              "COMBO",
              `Skipping ${modelStr} — quota exhaustion cutoff (${quotaCutoff.reason || "quota_exhausted"})`
            );
            if (i > 0) fallbackCount++;
            return null;
          }
        }

        // Pre-screen snapshot is NOT used as a permanent skip — availability
        // is always re-checked via isModelAvailable below because connection
        // cooldowns can expire between setTry retries, making a previously
        // unavailable target available again.  Circuit-breaker-OPEN providers
        // are already caught by the dedicated breaker check above.
        if (isModelAvailable) {
          const available = await isModelAvailable(modelStr, targetForAttempt);
          if (!available) {
            log.debug?.(
              "COMBO",
              `Skipping ${modelStr} — no credentials available or model excluded`
            );
            if (i > 0) fallbackCount++;
            return null;
          }
        }

        // Credential gate: skip targets with known-bad credentials (fail-fast)
        const connectionId = target.connectionId as string | undefined;
        if (connectionId) {
          const gateResult = checkCredentialGate(connectionId, provider, modelStr);
          if (gateResult.allowed === false) {
            logCredentialSkip(log, modelStr, gateResult.reason || "Credential gate blocked");
            if (i > 0) fallbackCount++;
            return null;
          }
        }

        // Retry loop for transient errors
        for (let retry = 0; retry <= maxRetries; retry++) {
          // Fix #1681: Bail out immediately if the client has disconnected
          if (signal?.aborted) {
            log.info("COMBO", `Client disconnected — aborting combo loop before model ${modelStr}`);
            return { ok: false, response: errorResponse(499, "Client disconnected") };
          }
          globalAttempts++;
          if (globalAttempts > MAX_GLOBAL_ATTEMPTS) {
            log.warn(
              "COMBO",
              `Maximum combo attempts (${MAX_GLOBAL_ATTEMPTS}) exceeded across all targets and fallbacks. Terminating loop to prevent runaway background requests.`
            );
            // Actionable failure instead of an opaque 503 when every candidate
            // failed the same recoverable way. If the dominant cause was reasoning
            // models exhausting a too-small max_tokens budget (no content output),
            // retrying other models can't help — tell the caller to raise max_tokens.
            // Silent-stop fix: bump the consecutive-failure counter for this session-combo pair
            // so the pin gets cleared on the 3rd attempt (recovery.next_step tells the client).
            const reasoningExhausted = /reasoning consumed \d+\/\d+ tokens/.test(lastError || "");
            const failureReason = reasoningExhausted
              ? "reasoning_budget_exhausted"
              : "max_attempts_exceeded";
            recordComboFailure(effectiveSessionId, combo.name);
            return {
              ok: false,
              response: errorResponseWithComboDiagnostics(
                503,
                reasoningExhausted
                  ? "All combo candidates exhausted their token budget on reasoning without producing content. Increase max_tokens — reasoning models need a larger budget to emit content."
                  : "Maximum combo retry limit reached",
                buildComboDiag(failureReason)
              ),
            };
          }
          // Predictive TTFT Circuit Breaker (skip slow models)
          if (
            zeroLatencyOptimizationsEnabled &&
            config.predictiveTtftMs &&
            config.predictiveTtftMs > 0 &&
            retry === 0
          ) {
            const cMetrics = getComboMetrics(combo.name);
            if (cMetrics) {
              const targetKey = orderedTargets[i].executionKey || modelStr;
              const m = cMetrics.byTarget[targetKey] || cMetrics.byModel[modelStr];
              if (shouldSkipForPredictedTtft(m, config.predictiveTtftMs)) {
                log.warn(
                  "COMBO",
                  `Predictive TTFT Circuit Breaker: skipping ${modelStr} (avg ${m.avgLatencyMs}ms > max ${config.predictiveTtftMs}ms)`
                );
                return null;
              }
            }
          }

          if (retry > 0) {
            log.info(
              "COMBO",
              `Retrying ${modelStr} in ${retryDelayMs}ms (attempt ${retry + 1}/${maxRetries + 1})`
            );
            await new Promise((resolve) => {
              const timer = setTimeout(resolve, retryDelayMs);
              signal?.addEventListener(
                "abort",
                () => {
                  clearTimeout(timer);
                  resolve(undefined);
                },
                { once: true }
              );
            });
            if (signal?.aborted) {
              log.info("COMBO", `Client disconnected during retry delay — aborting`);
              return { ok: false, response: errorResponse(499, "Client disconnected") };
            }
          }

          log.info(
            "COMBO",
            `Trying model ${i + 1}/${orderedTargets.length}: ${modelStr}${retry > 0 ? ` (retry ${retry})` : ""}`
          );
          emit("combo.target.attempt", {
            comboName: combo.name,
            targetIndex: i,
            provider,
            model: modelStr,
            timestamp: Date.now(),
            strategy,
          });
          // QA P0 diagnostics: capture the attempt order (provider/model ids only).
          comboAttemptOrder.push({ provider: provider ?? "unknown", model: modelStr });

          // Deep clone the body to ensure context preservation and prevent mutations
          // from affecting other targets in the combo. structuredClone avoids the
          // full intermediate JSON string that JSON.parse(JSON.stringify(...)) builds
          // (a second multi-hundred-KB allocation per target on large agent payloads),
          // halving the per-target transient heap on the hot path (#5152).
          let attemptBody = structuredClone(body);

          // Proactive Context Compression for fallbacks (Zero-Latency optimization)
          if (
            zeroLatencyOptimizationsEnabled &&
            i > 0 &&
            config.fallbackCompressionMode &&
            config.fallbackCompressionMode !== "off"
          ) {
            const { estimateTokens } = await import("./contextManager.ts");
            const estimatedTokens = estimateTokens(JSON.stringify(attemptBody));
            if (estimatedTokens > (config.fallbackCompressionThreshold ?? 1000)) {
              const { applyCompression } = await import("./compression/strategySelector.ts");
              const compressionResult = applyCompression(
                attemptBody,
                config.fallbackCompressionMode as CompressionMode,
                // Opt into the TV1 bail-out so a throwing fallback engine is SKIPPED rather than
                // propagating out of executeTarget and being swallowed as a "Speculative task
                // error" (which silently drops this combo target). minGainPercent:0 keeps the
                // advance behavior identical to the default path — this only adds skip-on-throw.
                { model: modelStr, bailout: { enabled: true, minGainPercent: 0 } }
              );
              if (compressionResult.compressed) {
                log.info(
                  "COMBO",
                  `Proactive fallback compression applied (${config.fallbackCompressionMode}): ${estimatedTokens} -> ${compressionResult.stats?.compressedTokens} tokens`
                );
                attemptBody = compressionResult.body;
              }
            }
          }

          // Universal handoff: inject existing handoff if model changed
          if (
            universalHandoffConfig.enabled &&
            relayOptions?.sessionId &&
            !(body as Record<string, unknown>)?.[SKIP_UNIVERSAL_HANDOFF_FLAG]
          ) {
            const lastModel = getLastSessionModel(relayOptions.sessionId, combo.name);
            if (lastModel && lastModel !== modelStr) {
              const existingHandoff = getHandoff(relayOptions.sessionId, combo.name);
              attemptBody = injectUniversalHandoffBody(
                attemptBody, // Use the cloned body to maintain isolation
                lastModel,
                modelStr,
                `Model routing: ${lastModel} → ${modelStr}`,
                existingHandoff
              );
            }
          }

          // Issue #3587: Reasoning models can spend the whole output budget on
          // reasoning. Only add headroom when the complete buffer fits inside the
          // model's known output cap; otherwise preserve the client's explicit limit.
          {
            const bodyRecord = attemptBody as Record<string, unknown>;
            const currentMaxTokens = toPositiveInteger(bodyRecord.max_tokens);
            const bufferedMaxTokens = resolveReasoningBufferedMaxTokens(
              modelStr,
              bodyRecord.max_tokens,
              { enabled: reasoningTokenBufferEnabled }
            );
            if (currentMaxTokens !== null && bufferedMaxTokens !== null) {
              bodyRecord.max_tokens = bufferedMaxTokens;
              if (bufferedMaxTokens !== currentMaxTokens) {
                log.info(
                  "COMBO",
                  `Reasoning model ${modelStr}: adjusted max_tokens ${currentMaxTokens} -> ${bufferedMaxTokens}`
                );
              }
            }
          }
          const result = await handleSingleModelWithTimeout(attemptBody, modelStr, {
            ...targetForAttempt,
            effectiveComboStrategy: strategy,
            failoverBeforeRetry: config.failoverBeforeRetry,
          });

          // Success — validate response quality before returning
          if (result.ok) {
            const selectedConnectionId =
              result.headers?.get("X-OmniRoute-Selected-Connection-Id") ||
              result.headers?.get("x-omniroute-selected-connection-id") ||
              undefined;
            const effectiveConnectionId = selectedConnectionId || target.connectionId || "";

            // Clone BEFORE quality check — validateResponseQuality reads the body
            // via getReader() which locks the stream. The clone's body is consumed
            // by the quality check; the original stays unlocked for piping.
            let qualityClone: Response;
            try {
              qualityClone = result.clone();
            } catch {
              qualityClone = result;
            }
            const quality = await validateResponseQuality(
              qualityClone,
              clientRequestedStream,
              log,
              config.responseValidation
            );
            releaseQualityClone(qualityClone, result, quality);
            if (!quality.valid) {
              releaseRejectedQualityResponse(qualityClone, result);
              log.warn(
                "COMBO",
                `Model ${modelStr} returned 200 but failed quality check: ${quality.reason}`
              );
              // #6692: a quality-rejected 200 never marks the connection row
              // unhealthy, so the sticky pin's lazy headroom recheck would never
              // catch it either — release it here, on the failing response.
              releaseStickyPinOnFailure(_sticky.messageHash, effectiveConnectionId);
              recordComboRequest(combo.name, modelStr, {
                success: false,
                latencyMs: Date.now() - startTime,
                fallbackCount,
                strategy,
                target: toRecordedTarget(target),
              });
              recordedAttempts++;
              // Fix #1707: Set terminal state so the fallback doesn't emit
              // misleading ALL_ACCOUNTS_INACTIVE when the real issue is quality.
              lastError = `Upstream response failed quality validation: ${quality.reason}`;
              if (!lastStatus) lastStatus = 502;
              if (i > 0) fallbackCount++;
              if (provider && rawModel) {
                const mlSettings = resolveModelLockoutSettings(settings);
                if (mlSettings.enabled && mlSettings.errorCodes.includes(502)) {
                  recordModelLockoutFailure(
                    provider,
                    target.connectionId || "",
                    rawModel,
                    "quality_failure",
                    502,
                    mlSettings.baseCooldownMs,
                    profile,
                    {
                      exactCooldownMs: mlSettings.useExponentialBackoff
                        ? 0
                        : mlSettings.baseCooldownMs,
                      maxCooldownMs: mlSettings.maxCooldownMs,
                    }
                  );
                }
              }
              emit("combo.target.failed", {
                comboName: combo.name,
                targetIndex: i,
                provider,
                model: modelStr,
                error: `Quality: ${quality.reason}`,
                latencyMs: Date.now() - startTime,
              });
              return null;
            }

            // Success decay: a healthy response walks the model's lockout failure
            // count back down (and eventually clears an expired lockout entirely).
            if (provider && rawModel) {
              const dcResult = decayModelFailureCount(provider, effectiveConnectionId, rawModel);
              if (dcResult.cleared) {
                log.info("COMBO", `Model ${modelStr} fully recovered — lockout cleared`);
              } else if (dcResult.newFailureCount > 0) {
                log.debug(
                  "COMBO",
                  `Model ${modelStr} decayed to failureCount=${dcResult.newFailureCount}`
                );
              }
            }

            const latencyMs = Date.now() - startTime;
            emit("combo.target.succeeded", {
              comboName: combo.name,
              targetIndex: i,
              provider,
              model: modelStr,
              latencyMs,
            });
            log.info(
              "COMBO",
              `Model ${modelStr} succeeded (${latencyMs}ms, ${fallbackCount} fallbacks)`
            );
            recordComboRequest(combo.name, modelStr, {
              success: true,
              latencyMs,
              fallbackCount,
              strategy,
              target: toRecordedTarget(target),
            });
            recordedAttempts++;

            // Reset cooldown on success
            if (provider && provider !== "unknown") {
              recordProviderSuccess(provider, effectiveConnectionId || undefined);
            }
            if (strategy === "weighted" && stickyWeightedLimit > 1) {
              const stickySuccessKey = getWeightedStepKeyForTarget(target);
              if (stickySuccessKey) {
                recordStickyWeightedSuccess(combo.name, stickySuccessKey, stickyWeightedLimit);
              }
            }
            // Webhook fan-out: best-effort, never blocks the response stream.
            notifyWebhookEvent("request.completed", {
              combo: combo.name,
              provider,
              model: modelStr,
              account:
                typeof target.label === "string" && target.label.trim().length > 0
                  ? target.label.trim()
                  : "",
              accountId: effectiveConnectionId ?? "",
              latencyMs,
              fallbackCount,
            });

            // Silent-stop fix: reset the consecutive-failure counter for this session-combo pair
            // on every successful dispatch so a transient recovery doesn't get "credited" against
            // the threshold the user already paid through to clear the stale pin.
            if (effectiveSessionId) {
              clearComboFailureTracking(effectiveSessionId, combo.name);
            }
            // Context cache pinning: record model usage for session-based pinning
            // (independent of universal handoff — always fires when context_cache_protection is on)
            // #3825: write under the SAME effectiveSessionId used by the read site so a
            // sessionless conversation re-pins to this model on its next turn.
            if (
              combo.context_cache_protection &&
              effectiveSessionId &&
              !(body as Record<string, unknown>)?.[SKIP_UNIVERSAL_HANDOFF_FLAG]
            ) {
              recordSessionModelUsage(
                effectiveSessionId,
                combo.name,
                modelStr,
                provider,
                target.connectionId ?? undefined
              );
            }

            // Universal handoff: record model usage for session
            if (
              universalHandoffConfig.enabled &&
              relayOptions?.sessionId &&
              !(body as Record<string, unknown>)?.[SKIP_UNIVERSAL_HANDOFF_FLAG]
            ) {
              const prevModel = getLastSessionModel(relayOptions.sessionId, combo.name);
              recordSessionModelUsage(
                relayOptions.sessionId,
                combo.name,
                modelStr,
                provider,
                target.connectionId ?? undefined
              );
              if (prevModel && prevModel !== modelStr) {
                const handoffSourceMessages =
                  Array.isArray(body?.messages) && body.messages.length > 0
                    ? body.messages
                    : Array.isArray(body?.input)
                      ? body.input
                      : [];

                maybeGenerateUniversalHandoff({
                  sessionId: relayOptions.sessionId,
                  comboName: combo.name,
                  messages: handoffSourceMessages as MessageLike[],
                  prevModel,
                  currModel: modelStr,
                  universalConfig: universalHandoffConfig,
                  handleSingleModel: handleSingleModelWithTimeout,
                });
              }

              recordSessionModelUsage(
                relayOptions.sessionId,
                combo.name,
                modelStr,
                provider,
                target.connectionId ?? undefined
              );
            }
            // Context-relay intentionally splits responsibilities:
            // combo.ts decides whether a successful turn should generate a handoff,
            // while chat.ts injects the handoff after the real connectionId is resolved.
            if (
              strategy === "context-relay" &&
              relayOptions?.sessionId &&
              relayConfig &&
              relayConfig.handoffProviders.includes(provider) &&
              provider === "codex"
            ) {
              const connectionId = getSessionConnection(relayOptions.sessionId);
              if (connectionId) {
                const quotaInfo = await fetchCodexQuota(connectionId).catch(() => null);
                if (quotaInfo) {
                  const resetCandidates = [
                    quotaInfo.windows?.session?.resetAt,
                    quotaInfo.windows?.weekly?.resetAt,
                    quotaInfo.resetAt,
                  ]
                    .filter(
                      (value): value is string => typeof value === "string" && value.length > 0
                    )
                    .sort((a, b) => a.localeCompare(b));
                  const handoffSourceMessages =
                    Array.isArray(body?.messages) && body.messages.length > 0
                      ? body.messages
                      : Array.isArray(body?.input)
                        ? body.input
                        : [];

                  maybeGenerateHandoff({
                    sessionId: relayOptions.sessionId,
                    comboName: combo.name,
                    connectionId,
                    percentUsed: quotaInfo.percentUsed,
                    messages: handoffSourceMessages,
                    model: modelStr,
                    expiresAt: resetCandidates[0] || null,
                    config: relayConfig,
                    handleSingleModel: handleSingleModelWithTimeout,
                  });
                }
              }
            }
            if (_sticky.messageHash && target.connectionId)
              recordStickyBinding(_sticky.messageHash, target.connectionId); // LKGP (#919):
            if (provider) {
              const connId = effectiveConnectionId || undefined;
              void (async () => {
                try {
                  const { setLKGP } = await import("../../src/lib/localDb");
                  await Promise.all([
                    setLKGP(combo.name, target.executionKey, provider, connId),
                    setLKGP(combo.name, combo.id || combo.name, provider, connId),
                  ]);
                } catch (err) {
                  log.warn(
                    "COMBO",
                    "Failed to record Last Known Good Provider. This is non-fatal.",
                    {
                      err,
                    }
                  );
                }
              })();
            }

            return { ok: true, response: result };
          }

          // Extract error info from response
          let errorText = result.statusText || "";
          let errorBody: ComboErrorBody = null;
          let retryAfter: ComboRetryAfter | null = null;
          try {
            const cloned = result.clone();
            try {
              const text = await cloned.text();
              if (text) {
                errorText = text.substring(0, 500);
                errorBody = JSON.parse(text);
                const parsedError = errorBody?.error;
                errorText =
                  (typeof parsedError === "object" && parsedError?.message) ||
                  (typeof parsedError === "string" ? parsedError : null) ||
                  errorBody?.message ||
                  errorText;
                // Live incident (log id 1784457764961-73 follow-up): the pre-dispatch
                // "all credentials cooling down" rejection (buildModelCooldownBody /
                // handleNoCredentials in src/sse/handlers/chatHelpers.ts) nests its
                // retry hint as error.retry_after (ISO string) / error.reset_seconds
                // (seconds), not the top-level `retryAfter` every other 429 shape
                // uses. Without this fallback, lastStatus gets recorded (fixed above)
                // but earliestRetryAfter stays null, so the final check falls through
                // to the generic "all combo models unavailable" error instead of ever
                // reaching the cooldown-wait decision — same class of bug, different
                // response shape.
                const nestedRetryAfter =
                  typeof parsedError === "object" ? (parsedError?.retry_after ?? null) : null;
                const nestedResetSeconds =
                  typeof parsedError === "object" ? (parsedError?.reset_seconds ?? null) : null;
                retryAfter =
                  errorBody?.retryAfter ||
                  nestedRetryAfter ||
                  (typeof nestedResetSeconds === "number" && nestedResetSeconds > 0
                    ? new Date(Date.now() + nestedResetSeconds * 1000).toISOString()
                    : null);
              }
            } catch {
              /* Clone parse failed */
            }
          } catch {
            /* Clone failed */
          }

          // Track earliest retryAfter
          if (
            retryAfter &&
            (!earliestRetryAfter || new Date(retryAfter) < new Date(earliestRetryAfter))
          ) {
            earliestRetryAfter = retryAfter;
          }

          // Normalize error text
          if (typeof errorText !== "string") {
            try {
              errorText = JSON.stringify(errorText);
            } catch {
              errorText = String(errorText);
            }
          }

          const isStreamReadinessFailure =
            (result.status === 502 || result.status === 504) &&
            isStreamReadinessFailureErrorBody(errorBody);

          // FIX 5: a local per-API-key token-limit 429 must not cool shared accounts.
          const isTokenLimitBreach =
            result.status === 429 && isTokenLimitBreachErrorBody(errorBody);

          // Fix #1681: Status 499 means client disconnected — stop combo loop immediately.
          // There is no point trying fallback models when nobody is listening.
          if (result.status === 499) {
            log.info("COMBO", `Client disconnected (499) during ${modelStr} — stopping combo loop`);
            recordComboRequest(combo.name, modelStr, {
              success: false,
              latencyMs: Date.now() - startTime,
              fallbackCount,
              strategy,
              target: toRecordedTarget(target),
            });
            recordedAttempts++;
            // executeTarget must return the {ok,response} contract — a raw Response
            // here makes the speculative loop's res.ok/res.response checks both miss,
            // so the combo would wrongly fall through to the next model after a 499.
            return { ok: false, response: result };
          }

          // Combo fallback is target-level orchestration: a non-ok target response is
          // treated as local to that target and the combo continues to the next target.
          // Error classification is retained only for retry/cooldown pacing; it must
          // not decide whether fallback happens, including for generic 400 responses.
          const rawError = errorBody?.error;
          const structuredError =
            rawError && typeof rawError === "object"
              ? {
                  // Upstream JSON may carry a numeric `code`/`type` (e.g. {"code":40001}).
                  // Coerce to string if present instead of discarding, so downstream string
                  // ops (.toLowerCase, .startsWith) can run safely without type crashes.
                  code:
                    (rawError as Record<string, unknown>).code !== undefined &&
                    (rawError as Record<string, unknown>).code !== null
                      ? String((rawError as Record<string, unknown>).code)
                      : undefined,
                  type:
                    (rawError as Record<string, unknown>).type !== undefined &&
                    (rawError as Record<string, unknown>).type !== null
                      ? String((rawError as Record<string, unknown>).type)
                      : undefined,
                }
              : undefined;
          const requestScopedFailure = isRequestScopedUpstreamFailure(structuredError);
          const fallbackResult = checkFallbackError(
            result.status,
            errorText,
            0,
            null,
            provider,
            result.headers,
            profile,
            structuredError
          );
          const { cooldownMs } = fallbackResult;
          // #6863: a parsed upstream quota reset (e.g. Antigravity "Resets in 92h27m28s")
          // arrives in `quotaResetHintMs` — it bypasses the operator-gated
          // `useUpstreamRetryHints` connection-cooldown setting. Mirror the
          // single-model path (src/sse/services/auth.ts): when the retry hint was
          // already honored, `cooldownMs` IS the upstream value; otherwise prefer the
          // parsed quota reset — even when it is SHORTER than the fallback cooldown
          // (e.g. subscription-quota 1h default vs a real "resets in 10m").
          // `selectLockoutCooldownMs` still ignores hints at/below the base cooldown,
          // so absent/tiny hints keep the #1308 exponential-backoff behavior.
          const lockoutHintMs =
            fallbackResult.usedUpstreamRetryHint === true
              ? cooldownMs
              : (fallbackResult.quotaResetHintMs ?? 0);
          const selectedConnectionId =
            result.headers?.get("X-OmniRoute-Selected-Connection-Id") ||
            result.headers?.get("x-omniroute-selected-connection-id") ||
            undefined;
          const targetWithConnection = selectedConnectionId
            ? { ...target, connectionId: selectedConnectionId }
            : target;

          // #1731 / #1731v2: classify the upstream error and update the exhaustion sets
          // (shared with handleRoundRobinCombo). Returns whether the provider is fully exhausted.
          const providerExhausted = applyComboTargetExhaustion(targetWithConnection, {
            result,
            fallbackResult,
            errorText,
            rawModel,
            isTokenLimitBreach,
            allAccountsRateLimited: false,
            sets: { exhaustedProviders, exhaustedConnections, transientRateLimitedProviders },
            log,
            tag: "COMBO",
            exhaustedLogLevel: "info",
            structuredError,
          });
          // #6692: this connection was just classified as provider/connection-level
          // exhausted — if it's the currently sticky-bound one, release the pin now
          // rather than waiting for the next turn's lazy headroom/status recheck.
          releaseStickyPinOnFailure(_sticky.messageHash, targetWithConnection.connectionId);

          // #2101: Prevent infinite fallback loops with 400 Bad Request errors that are genuinely
          // body-specific (malformed JSON, bad format, missing required fields).
          // Context overflow and parameter validation errors are NOT body-specific:
          // - Context overflow: different models have different context windows
          // - Max_tokens / param errors: different models have different output limits
          // - Model access denied: different providers serve different model sets
          // These should fall through so the next combo target can try.
          if (
            result.status === 400 &&
            fallbackResult.shouldFallback &&
            !isContextOverflow400(errorText) &&
            !isParamValidation400(errorText) &&
            (errorText.toLowerCase().includes("context") ||
              errorText.toLowerCase().includes("prompt") ||
              errorText.toLowerCase().includes("token") ||
              errorText.toLowerCase().includes("malformed") ||
              errorText.toLowerCase().includes("invalid") ||
              errorText.toLowerCase().includes("bad request"))
          ) {
            log.warn(
              "COMBO",
              `400 Bad Request with body-specific error detected on ${modelStr} — skipping fallback to other targets to prevent infinite loop`
            );
            // Record the failure and break to avoid trying other targets with the same bad request
            recordComboRequest(combo.name, modelStr, {
              success: false,
              latencyMs: Date.now() - startTime,
              fallbackCount,
              strategy,
              target: toRecordedTarget(target),
            });
            recordedAttempts++;
            lastError = errorText || String(result.status);
            comboErrors.push({
              model: modelStr,
              status: result.status,
              error: errorText || String(result.status),
            });
            if (!lastStatus) lastStatus = result.status;
            if (i > 0) fallbackCount++;
            log.warn("COMBO", `Model ${modelStr} failed with body-specific error, stopping combo`);
            // #4279: surface the 400 via the {ok,response} contract so the OUTER
            // target loop resolves the combo and stops. A bare `break` here only
            // exits the inner retry loop; executeTarget then returns null, which
            // the outer loop treats as "this target produced nothing" and advances
            // to the next model — so the guard failed to stop fallback and a combo
            // of N body-rejecting targets tried all N. Mirrors the 499 path above.
            return { ok: false, response: result };
          }

          // Trigger shared provider circuit breaker for 5xx errors and connection failures.
          // If the next target in the combo is on the same provider, don't mark the provider
          // as failed — different models on the same provider may still succeed.
          // G-02: when fallbackResult.skipProviderBreaker is set (embedded service supervisor
          // outage signalled via X-Omni-Fallback-Hint: connection_cooldown) apply connection
          // cooldown only — do NOT trip the whole-provider breaker.
          const nextTarget = orderedTargets[i + 1];
          const sameProviderNext =
            typeof nextTarget?.provider === "string" && nextTarget.provider === provider;
          if (
            shouldRecordProviderBreakerFailure({
              isStreamReadinessFailure,
              status: result.status,
              sameProviderNext,
              skipProviderBreaker: fallbackResult.skipProviderBreaker,
              requestScopedFailure,
              error: errorText,
            })
          ) {
            recordProviderFailure(provider, log, targetWithConnection.connectionId, profile);
          }

          // Check if this is a transient error worth retrying on same model.
          // A token-limit 429 is terminal for the client — never retry it.
          const isTransient =
            !isStreamReadinessFailure &&
            !isTokenLimitBreach &&
            [408, 429, 500, 502, 503, 504].includes(result.status);
          if (retry < maxRetries && isTransient && !providerExhausted) {
            if (
              provider &&
              rawModel &&
              isModelLocked(provider, targetWithConnection.connectionId || "", rawModel)
            ) {
              log.info("COMBO", `Skipping retry for ${modelStr} — model lockout active`);
              // Live incident (log id 1784457764961-73): earliestRetryAfter is already
              // captured above from THIS dispatch's own response, but lastStatus was
              // never recorded on this bail-out path — so once every target in the set
              // hit an existing lockout, lastStatus stayed null and the final `if
              // (!lastStatus)` check crystallized an immediate ALL_ACCOUNTS_INACTIVE 503
              // instead of ever reaching the `if (earliestRetryAfter)` cooldown-wait
              // decision below, even though a real 429 with a short (~1min) retry-after
              // was just observed. Recording it here mirrors the "done retrying" path.
              lastError = errorText || String(result.status);
              if (!lastStatus) lastStatus = result.status;
              if (i > 0) fallbackCount++;
              return null;
            }
            // Record model lockout immediately on the first transient failure —
            // once the model is cooling down, retrying it would waste an upstream
            // call and extend the cooldown via exponential backoff.
            let lockoutRecorded = false;
            if (provider && rawModel && retry === 0 && !requestScopedFailure) {
              const mlSettings = resolveModelLockoutSettings(settings);
              if (mlSettings.enabled && mlSettings.errorCodes.includes(result.status)) {
                recordModelLockoutFailure(
                  provider,
                  targetWithConnection.connectionId || "",
                  rawModel,
                  classifyLockoutReason(result.status),
                  result.status,
                  mlSettings.baseCooldownMs,
                  profile,
                  {
                    // #1308/#6863: honor a long upstream reset (e.g. "Resets in 160h") over
                    // the short base cooldown / exponential backoff when present.
                    exactCooldownMs: selectLockoutCooldownMs(lockoutHintMs, mlSettings),
                    maxCooldownMs: mlSettings.maxCooldownMs,
                  }
                );
                lockoutRecorded = true;
              }
            }
            if (lockoutRecorded) {
              log.info("COMBO", `Skipping retry for ${modelStr} — model lockout active`);
              // Same fix as the already-locked branch above — this is the
              // first-failure lockout path, so lastStatus needs recording here too.
              lastError = errorText || String(result.status);
              if (!lastStatus) lastStatus = result.status;
              if (i > 0) fallbackCount++;
              return null;
            }
            continue; // Retry same model (transient error, no lockout recorded)
          }

          // Done retrying this model
          recordComboRequest(combo.name, modelStr, {
            success: false,
            latencyMs: Date.now() - startTime,
            fallbackCount,
            strategy,
            target: toRecordedTarget(target),
          });
          recordedAttempts++;
          lastError = errorText || String(result.status);
          comboErrors.push({
            model: modelStr,
            status: result.status,
            error: errorText || String(result.status),
          });
          if (!lastStatus) lastStatus = result.status;
          if (i > 0) fallbackCount++;
          // Wire combo failures into the resilience dashboard (model-level lockout)
          // alongside the provider-level cooldown below — they govern different scopes.
          if (provider && rawModel && !requestScopedFailure) {
            const mlSettings = resolveModelLockoutSettings(settings);
            if (mlSettings.enabled && mlSettings.errorCodes.includes(result.status)) {
              recordModelLockoutFailure(
                provider,
                targetWithConnection.connectionId || "",
                rawModel,
                classifyLockoutReason(result.status),
                result.status,
                mlSettings.baseCooldownMs,
                profile,
                {
                  // #1308/#6863: honor a long upstream reset over base/exponential cooldown.
                  exactCooldownMs: selectLockoutCooldownMs(lockoutHintMs, mlSettings),
                  maxCooldownMs: mlSettings.maxCooldownMs,
                }
              );
            }
          }
          log.warn("COMBO", `Model ${modelStr} failed, trying next`, { status: result.status });

          // #5976: per-model-quota providers (Gemini, GitHub, etc.) multiplex models
          // behind one connection. A model-level 500 or 429 (RPM) must NOT cool down
          // the entire provider — sibling models may still succeed. Skip cooldown
          // recording for these providers on 500/429 errors so the next target can try.
          if (
            resilienceSettings.providerCooldown.enabled &&
            provider &&
            provider !== "unknown" &&
            !requestScopedFailure &&
            !(
              (result.status === 500 || result.status === 429) &&
              hasPerModelQuota(provider, rawModel)
            )
          ) {
            recordProviderCooldown(
              provider,
              targetWithConnection.connectionId ?? undefined,
              resilienceSettings
            );
          }

          const fallbackWaitMs =
            fallbackDelayMs > 0 && cooldownMs > 0 && cooldownMs <= MAX_FALLBACK_WAIT_MS
              ? Math.min(cooldownMs, fallbackDelayMs)
              : 0;
          if ([502, 503, 504].includes(result.status) && fallbackWaitMs > 0) {
            log.debug?.("COMBO", `Waiting ${fallbackWaitMs}ms before fallback to next model`);
            await new Promise((resolve) => {
              const timer = setTimeout(resolve, fallbackWaitMs);
              signal?.addEventListener(
                "abort",
                () => {
                  clearTimeout(timer);
                  resolve(undefined);
                },
                { once: true }
              );
            });
            if (signal?.aborted) {
              log.info("COMBO", `Client disconnected during fallback wait — aborting`);
              return { ok: false, response: errorResponse(499, "Client disconnected") };
            }
          }

          return null;
        }
        return null;
      };

      for (let i = 0; i < orderedTargets.length; i++) {
        if (anySuccess || comboExpired) break;

        const abortController = new AbortController();
        abortControllers.set(i, abortController);
        const onClientAbort = () => abortController.abort();
        signal?.addEventListener("abort", onClientAbort);

        const task = (async () => {
          try {
            const res = await executeTarget(i);
            if (res && !anySuccess) {
              if (res.ok) {
                anySuccess = true;
                globalResolve!(res.response!);
                for (const [idx, ac] of abortControllers.entries()) {
                  if (idx !== i) ac.abort();
                }
              } else if (res.response) {
                // Fatal error, abort combo
                anySuccess = true;
                globalResolve!(res.response);
              }
            }
          } finally {
            signal?.removeEventListener("abort", onClientAbort);
          }
        })().catch((err) => {
          const logError = log.error ?? log.warn;
          logError("COMBO", `Speculative task error for target ${i}`, err);
        });

        runningTasks.add(task);
        task.finally(() => runningTasks.delete(task));

        if (zeroLatencyOptimizationsEnabled && config.hedging && i + 1 < orderedTargets.length) {
          const hedgeDelay = resolveDelayMs(config.hedgeDelayMs, 500);
          let timeoutResolve: () => void;
          const timeoutPromise = new Promise<void>((r) => {
            timeoutResolve = r;
            setTimeout(r, hedgeDelay);
          });
          await Promise.race([task, globalPromise, timeoutPromise]);
        } else {
          await Promise.race([task, globalPromise]);
        }

        // Global combo timeout check: after each target completes, stop trying
        // further targets if the total elapsed time exceeds comboTimeoutMs.
        if (!anySuccess && comboTimeoutMs > 0 && Date.now() - comboStartTime >= comboTimeoutMs) {
          comboExpired = true;
          log.info(
            "COMBO",
            `Combo global timeout (${comboTimeoutMs}ms) reached after ` +
              `${i + 1}/${orderedTargets.length} targets (${recordedAttempts} attempted) — stopping`
          );
        }
      }

      if (!anySuccess && runningTasks.size > 0) {
        await Promise.race([globalPromise, Promise.all([...runningTasks])]);
      }

      if (anySuccess) {
        return await globalPromise;
      }

      // Global combo timeout: return aggregated error immediately, skipping set retries.
      if (comboExpired) {
        const summary = comboErrors
          .slice(0, 5)
          .map((e) => `${e.model} (${e.status})`)
          .join(", ");
        const msg =
          `Combo global timeout (${comboTimeoutMs}ms) after ${recordedAttempts}/${orderedTargets.length} targets` +
          (comboErrors.length > 0
            ? ` | tried: ${summary}${comboErrors.length > 5 ? `... (+${comboErrors.length - 5})` : ""}`
            : "");
        const latencyMs = Date.now() - startTime;
        if (recordedAttempts === 0) {
          recordComboRequest(combo.name, null, {
            success: false,
            latencyMs,
            fallbackCount,
            strategy,
          });
        }
        notifyWebhookEvent("request.failed", {
          combo: combo.name,
          reason: "COMBO_TIMEOUT",
          latencyMs,
          fallbackCount,
        });
        return errorResponseWithComboDiagnostics(504, msg, buildComboDiag("combo_timeout"), {
          code: "COMBO_TIMEOUT",
          type: "server_error",
        });
      }

      // All models failed in this set try
      const latencyMs = Date.now() - startTime;
      if (recordedAttempts === 0) {
        recordComboRequest(combo.name, null, {
          success: false,
          latencyMs,
          fallbackCount,
          strategy,
        });
      }

      // Retry the entire set if more attempts remain
      if (setTry < maxSetRetries) continue;

      // All set retries exhausted — return the final error
      if (!lastStatus) {
        notifyWebhookEvent("request.failed", {
          combo: combo.name,
          reason: "ALL_ACCOUNTS_INACTIVE",
          latencyMs,
          fallbackCount,
        });
        // Silent-stop fix: bump the failure counter so the session pin clears on the 3rd
        // consecutive all-inactive cascade; buildRecoveryHint emits `switch-combo` with a
        // next-step that points the user at /dashboard/providers.
        recordComboFailure(effectiveSessionId, combo.name);
        return errorResponseWithComboDiagnostics(
          503,
          "Service temporarily unavailable: all upstream accounts are inactive",
          buildComboDiag("all_accounts_inactive"),
          { code: "ALL_ACCOUNTS_INACTIVE", type: "service_unavailable" }
        );
      }

      const status = lastStatus;
      // Build aggregated error message with per-model failure details for diagnostics.
      const comboErrorSummary =
        comboErrors.length > 0
          ? " [" +
            comboErrors
              .slice(0, 5)
              .map((e) => `${e.model} (${e.status})`)
              .join(", ") +
            (comboErrors.length > 5 ? `... (+${comboErrors.length - 5})` : "") +
            "]"
          : "";
      const msg = (lastError || "All combo models unavailable") + comboErrorSummary;

      if (earliestRetryAfter) {
        // Cooldown-aware retry: instead of crystallizing the 429/503, wait out
        // a SHORT transient cooldown and re-run the whole set loop. Guarded by
        // the helper (quota_exhausted/auth/not-found excluded, ceiling,
        // attempts, budget). MAX_GLOBAL_ATTEMPTS still bounds total dispatches.
        // Available to ALL combo strategies (not just quota-share).
        if (comboCooldownWaitEnabled && status === 429) {
          // ONE decision path for EVERY strategy. The reason that drives the
          // wait is always the target's REAL model-lockout reason, resolved
          // through the helper's allow-list — never a hardcoded literal.
          //
          // SECURITY (see comboCooldownRetry.ts header): the allow-list is the
          // PRIMARY barrier and `maxWaitMs` only the SECOND one. Hardcoding
          // reason:"rate_limit" for non-quota-share strategies would drop the
          // primary barrier and leave only the ceiling — which does NOT cover a
          // quota_exhausted lock carrying a SHORT upstream retry-after (e.g.
          // 3s < maxWaitMs): the combo would wait, redispatch against a model
          // locked until midnight, and burn the attempt. Model lockouts are
          // recorded for all strategies (recordModelLockoutFailure above is not
          // gated on quota-share), so the real reason is always available.
          const decision: ResolveComboCooldownDecisionResult = resolveComboCooldownWaitDecision({
            targets: orderedTargets,
            earliestRetryAfter,
            attempt: comboCooldownAttempt,
            budgetLeftMs: comboCooldownBudgetLeftMs,
            settings: resilienceSettings.comboCooldownWait,
            // Key each lookup on the TARGET's own model: quota-share combos are
            // single-model/multi-account (so this is identical to the previous
            // orderedTargets[0] behavior), but heterogeneous combos carry a
            // different model per target.
            lookupLock: (provider, connectionId, target) => {
              const rawModel = parseModel(target?.modelStr ?? "").model || "";
              if (!rawModel) return null;
              return getModelLockoutInfo(provider, connectionId, rawModel);
            },
            computeWaitMs: (retryAfter) => computeClosestRetryAfter(retryAfter).waitMs,
          });

          if (decision.wait) {
            log.info(
              "COMBO",
              `${strategy} cooldown wait: ${msg} — waiting ${Math.ceil(
                decision.waitMs / 1000
              )}s (reason=${decision.reason ?? "?"}) then retrying (attempt ${
                comboCooldownAttempt + 1
              }/${resilienceSettings.comboCooldownWait.maxAttempts})`
            );
            const completed = await waitForCooldownAwareRetry(decision.waitMs, signal);
            if (!completed) {
              log.info("COMBO", `${strategy} cooldown wait aborted by client disconnect`);
              return errorResponse(499, "Request aborted");
            }
            comboCooldownAttempt += 1;
            comboCooldownBudgetLeftMs = Math.max(0, comboCooldownBudgetLeftMs - decision.waitMs);
            return dispatchWithCooldownRetry();
          }
        }
        const retryHuman = formatRetryAfter(toRetryAfterDisplayValue(earliestRetryAfter));
        log.warn("COMBO", `All models failed | ${msg} (${retryHuman})`);
        return unavailableResponse(status, msg, earliestRetryAfter, retryHuman);
      }

      // Silent-stop fix: bump the failure counter (pin clears on 3rd consecutive) and emit
      // `try-auto` recovery action via buildRecoveryHint so the OC plugin can show "→ Try
      // model: auto" instead of an opaque 5xx. We pass the upstream retry-after seconds to
      // the hint so the client can render a precise "wait Ns and retry" message.
      log.warn("COMBO", `All models failed | ${msg}`);
      const { pinClearedNow } = recordComboFailure(effectiveSessionId, combo.name);
      if (pinClearedNow) {
        log.info(
          "COMBO",
          `Auto-cleared session_model_history pin for combo "${combo.name}" after ${COMBO_FAILURE_THRESHOLD} consecutive failures to break the silent-stop loop`
        );
      }
      const retryAfterSeconds = undefined;
      return errorResponseWithComboDiagnostics(
        status,
        msg,
        buildComboDiag(lastError ?? "all_models_failed", retryAfterSeconds)
      );
    }

    // Final fallback — when the dispatch returned without crystallizing a status (rare).
    // Surface the recovery hint with a generic retry recommendation so the client at least
    // gets a non-opaque message instead of "Combo routing completed without an upstream response".
    recordComboFailure(effectiveSessionId, combo.name);
    return errorResponseWithComboDiagnostics(
      503,
      "Combo routing completed without an upstream response",
      buildNoUpstreamResponseDiagnostics(orderedTargets.length)
    );
  };

  // FASE 2.1: acquire the per-connection concurrency slot for the selected
  // quota-share target once, around the whole dispatch (including any
  // cooldown-aware re-dispatch), so concurrent requests to one subscription
  // account are serialized through the connection's max_concurrent ceiling. The
  // cap is read fresh from the selected connection; a null cap (no limit) or a
  // saturated queue is a no-op (fail-open). Released in the finally below.
  let quotaShareConcurrencyRelease: (() => void) | null = null;
  const qsConnectionId = orderedTargets[0]?.connectionId;
  if (quotaShareConcurrencyEnabled && qsConnectionId) {
    const qsCap = await lookupPositiveCap(qsConnectionId);
    quotaShareConcurrencyRelease = await acquireQuotaShareConcurrencySlot(
      orderedTargets[0],
      qsCap,
      {
        queueTimeoutMs: config.queueTimeoutMs ?? 30000,
        maxQueueSize: resolveComboQueueDepth(config),
      },
      log
    );
  }

  try {
    return await dispatchWithCooldownRetry();
  } finally {
    quotaShareConcurrencyRelease?.();
    // G2: Clean up candidate registry to prevent unbounded memory growth.
    _unregisterExecutionCandidates(_registeredExecutionKeys);
  }
}

/**
 * Handle round-robin combo: each request goes to the next model in circular order.
 * Uses semaphore-based concurrency control with queue + rate-limit awareness.
 *
 * Flow:
 * 1. Pick target model via atomic counter (counter % models.length)
 * 2. Acquire semaphore slot (may queue if at max concurrency)
 * 3. Send request to target model
 * 4. On 429 → mark model rate-limited, try next model in rotation
 * 5. On semaphore timeout → fallback to next available model
 */
async function handleRoundRobinCombo({
  body,
  combo,
  handleSingleModel,
  isModelAvailable,
  log,
  settings,
  allCombos,
  signal,
}: HandleRoundRobinOptions): Promise<Response> {
  const config = settings
    ? resolveComboConfig(combo, settings)
    : { ...getDefaultComboConfig(), ...(combo.config || {}) };
  const concurrency = config.concurrencyPerModel ?? 3;
  // Honor each target connection's own maxConcurrent ceiling (cached per dispatch)
  // so a low-concurrency subscription account is not flooded; falls back to the
  // combo-level concurrency when the connection has no positive cap.
  const resolveTargetConcurrency = makeConnectionConcurrencyResolver(concurrency);
  const queueTimeout = config.queueTimeoutMs ?? 30000;
  // #3872: pre-cascade queue depth — lower values fail over to the next combo member
  // sooner under concurrency saturation (0 = never queue). Default 20 (backward-compat).
  const queueDepth = resolveComboQueueDepth(config);
  const maxRetries = config.maxRetries ?? 1;
  const retryDelayMs = resolveDelayMs(config.retryDelayMs, 2000);
  const fallbackDelayMs = resolveDelayMs(config.fallbackDelayMs, 0);
  const reasoningTokenBufferEnabled = config.reasoningTokenBufferEnabled !== false;

  const resilienceSettings: ResilienceSettings = settings
    ? resolveResilienceSettings(settings)
    : resolveResilienceSettings(null);

  // #2562: Expand provider-wildcard steps before resolving targets.
  const rrExpandedCombo = await expandProviderWildcardsInCombo(combo);
  const rrExpandedAllCombos = allCombos
    ? Array.isArray(allCombos)
      ? await expandProviderWildcardsInCollection(allCombos as ComboLike[])
      : {
          ...allCombos,
          combos: await expandProviderWildcardsInCollection(
            ((allCombos as { combos?: ComboLike[] }).combos || []) as ComboLike[]
          ),
        }
    : allCombos;

  const orderedTargets = resolveComboTargets(
    rrExpandedCombo,
    rrExpandedAllCombos,
    clampComboDepth(config.maxComboDepth)
  );
  const tagFilteredTargets = await applyRequestTagRouting(orderedTargets, body, log);
  const evalRankedTargets = orderTargetsByEvalScores(tagFilteredTargets, config.evalRouting, log);
  const knownContextOverflow = getKnownContextOverflow(evalRankedTargets, body);
  if (knownContextOverflow) {
    return errorResponseWithComboDiagnostics(
      400,
      `Request requires approximately ${knownContextOverflow.requiredContextTokens} tokens, but the largest known context limit in this combo is ${knownContextOverflow.maxKnownContextTokens} tokens. Reduce or compact the request context.`,
      {
        poolSize: evalRankedTargets.length,
        attempted: 0,
        excluded: evalRankedTargets.map((target) => ({
          provider: target.provider,
          model: target.modelStr,
          reason: "context_window",
        })),
        attemptOrder: [],
        terminalReason: "context_length_exceeded",
      },
      { code: "context_length_exceeded", type: "invalid_request_error" }
    );
  }
  let filteredTargets = filterTargetsByRequestCompatibility(
    evalRankedTargets,
    body,
    log,
    "Context-aware round-robin fallback"
  );
  // #6238: keep the targets the compat pre-filter rejected so they can serve as a
  // last-resort fallback tier. The pre-filter drops request-incompatible targets
  // BEFORE availability is known; if every compat-kept target then turns out to be
  // runtime-unavailable, we must reconsider these before returning 503, instead of
  // permanently dropping a compat-rejected-but-healthy provider.
  const compatKeptSet = new Set(filteredTargets);
  const compatRejectedTargets = evalRankedTargets.filter((target) => !compatKeptSet.has(target));
  let modelCount = filteredTargets.length;
  if (modelCount === 0) {
    return comboModelNotFoundResponse("Round-robin combo has no executable targets");
  }

  scheduleShadowRouting(
    combo,
    config,
    body,
    resolveShadowTargets(combo, config, allCombos),
    handleSingleModel,
    isModelAvailable,
    "round-robin",
    log
  );

  // Sticky batch size at the combo level. A per-combo `stickyRoundRobinLimit` (in
  // combo.config, resolved through the cascade) overrides the global setting so one
  // combo can batch differently from the default. When the per-combo value is unset,
  // fall back to the global `stickyRoundRobinLimit` so the existing knob still controls
  // sticky batching for both account fallback and combo targets. Values <= 1 preserve
  // the historical one-request-per-target rotation.
  const perComboStickyLimit = (config as Record<string, unknown>).stickyRoundRobinLimit;
  const stickyLimit = resolveComboStickyRoundRobinLimit(
    perComboStickyLimit,
    settings as Record<string, unknown> | null
  );
  const stickyRoundRobinEnabled = stickyLimit > 1;
  // Exhaustion-aware sticky: if the currently sticky target is no longer
  // available (circuit breaker OPEN, provider cooldown, model lockout, or
  // isModelAvailable returns false), clear the sticky record so the rotation
  // starts at the counter position instead of probing a dead target.
  if (stickyRoundRobinEnabled) {
    const sticky = rrStickyTargets.get(combo.name);
    if (sticky) {
      const stickyTarget = filteredTargets.find(
        (target) => target.executionKey === sticky.executionKey
      );
      if (stickyTarget) {
        const rawModel = parseModel(stickyTarget.modelStr).model || stickyTarget.modelStr;
        const stickyAvailable =
          (!stickyTarget.provider ||
            getCircuitBreaker(stickyTarget.provider).getStatus().state !== "OPEN") &&
          !(
            resilienceSettings.providerCooldown.enabled &&
            Boolean(stickyTarget.provider && stickyTarget.provider !== "unknown") &&
            isProviderInCooldown(
              stickyTarget.provider,
              stickyTarget.connectionId ?? undefined,
              resilienceSettings
            )
          ) &&
          !(
            stickyTarget.provider &&
            rawModel &&
            isModelLocked(stickyTarget.provider, stickyTarget.connectionId || "", rawModel)
          ) &&
          (isModelAvailable ? await isModelAvailable(stickyTarget.modelStr, stickyTarget) : true);
        if (!stickyAvailable) {
          log.info(
            "COMBO-RR",
            `Clearing stale sticky target ${stickyTarget.modelStr} — unavailable`
          );
          rrStickyTargets.delete(combo.name);
        }
      }
    }
  }
  if (
    !rrCounters.has(combo.name) &&
    !rrStickyTargets.has(combo.name) &&
    rrCounters.size >= MAX_RR_COUNTERS
  ) {
    const oldest = rrCounters.keys().next().value;
    if (oldest !== undefined) {
      rrCounters.delete(oldest);
      rrStickyTargets.delete(oldest);
    }
  }
  // Ensure rrCounters has an entry for this combo so the eviction logic above
  // applies to both maps even when sticky round-robin is enabled (in which
  // case rrCounters isn't incremented per request).
  if (!rrCounters.has(combo.name)) {
    rrCounters.set(combo.name, 0);
  }
  const { startIndex, counter } = getStickyRoundRobinStartIndex(
    combo.name,
    filteredTargets,
    stickyLimit
  );
  if (!stickyRoundRobinEnabled) {
    rrCounters.set(combo.name, counter + 1);
  }

  // #3825: per-conversation session stickiness for round-robin. weighted/priority honor a
  // sticky connection via applySessionStickiness, but this RR handler returns before that
  // call — so sessionless RR combos rotated every turn, busting the upstream prompt-cache.
  // Reuse the SAME mechanism: start the rotation at the conversation's sticky connection
  // (the loop still falls through to the other targets on failure → failover preserved).
  // #6168: honor the session-stickiness opt-out here too, otherwise round-robin would
  // still pin the conversation even when the flag is set. Per-combo `config` overrides
  // the global `settings.disableSessionStickiness` fallback (default false).
  const disableSessionStickiness = resolveDisableSessionStickiness(
    config as Record<string, unknown> | null | undefined,
    settings as Record<string, unknown> | null | undefined
  );
  const rrAffinityEnabled = settings?.promptCacheAffinityEnabled !== false;
  if (rrAffinityEnabled && resolvePromptCacheAffinityKey(body)) {
    filteredTargets = await expandPromptCacheAffinityTargets(filteredTargets);
    modelCount = filteredTargets.length;
  }
  const _rrSessionSticky = disableSessionStickiness
    ? ({ targets: filteredTargets, messageHash: null, stuck: false } as const)
    : await applySessionStickiness(
        filteredTargets,
        // #7270: normalize both wire shapes (.messages / Responses-API .input) so RR
        // stickiness engages on the /v1/responses surface, not just Chat Completions.
        normalizeStickinessMessages(body as { messages?: unknown; input?: unknown })
      );
  const rrAffinity = applyPromptCacheAffinity(filteredTargets, body, rrAffinityEnabled);
  if (rrAffinity.applied) {
    const stickyFirst = _rrSessionSticky.stuck ? _rrSessionSticky.targets[0] : null;
    filteredTargets = stickyFirst
      ? [stickyFirst, ...rrAffinity.targets.filter((target) => target !== stickyFirst)]
      : rrAffinity.targets;
    log.debug?.("COMBO-RR", "Prompt-cache affinity applied", {
      source: rrAffinity.source,
      fingerprint: rrAffinity.fingerprint,
      targetCount: filteredTargets.length,
    });
  }
  let rrStartIndex = startIndex;
  if (rrAffinity.applied) {
    rrStartIndex = 0;
  }
  if (_rrSessionSticky.stuck) {
    const stickyIdx = filteredTargets.findIndex(
      (t) => t.connectionId === _rrSessionSticky.targets[0]?.connectionId
    );
    if (stickyIdx >= 0) rrStartIndex = stickyIdx;
  }

  const clientRequestedStream = body?.stream === true;
  const startTime = Date.now();
  let lastError: string | null = null;
  let lastStatus: number | null = null;
  let earliestRetryAfter: ComboRetryAfter | null = null;
  let globalAttempts = 0;
  let fallbackCount = 0;
  let recordedAttempts = 0;

  // #1731: Per-request in-memory set of providers whose quota is fully exhausted.
  // When a target returns a quota-exhausted 429, remaining targets from the same
  // provider are skipped to avoid the cascade through N same-provider targets.
  const exhaustedProviders = new Set<string>();
  const exhaustedConnections = new Set<string>();
  const transientRateLimitedProviders = new Set<string>();

  // Try each model starting from the round-robin target
  for (let offset = 0; offset < modelCount; offset++) {
    const modelIndex = (rrStartIndex + offset) % modelCount;
    const target = filteredTargets[modelIndex];
    const modelStr = target.modelStr;
    const provider = target.provider;
    const profile = await getRuntimeProviderProfile(provider);
    const semaphoreKey = `combo:${combo.name}:${target.executionKey}`;
    const allowRateLimitedConnection =
      Boolean(provider && provider !== "unknown") && transientRateLimitedProviders.has(provider);
    const targetForAttempt = allowRateLimitedConnection
      ? { ...target, allowRateLimitedConnection: true }
      : target;

    // Pre-check availability
    if (isModelAvailable) {
      const available = await isModelAvailable(modelStr, targetForAttempt);
      if (!available) {
        log.debug?.(
          "COMBO-RR",
          `Skipping ${modelStr} — no credentials available or model excluded`
        );
        if (offset > 0) fallbackCount++;
        continue;
      }
    }

    if (
      resilienceSettings.providerCooldown.enabled &&
      Boolean(provider && provider !== "unknown") &&
      isProviderInCooldown(provider, target.connectionId as string | undefined, resilienceSettings)
    ) {
      log.info("COMBO-RR", `Skipping ${modelStr} — provider ${provider} in global cooldown`);
      if (offset > 0) fallbackCount++;
      continue;
    }

    // #1731 / #1731v2: skip targets already known-exhausted this request (shared predicate).
    const exhaustedSkip = getExhaustedTargetSkipReason(
      target,
      exhaustedProviders,
      exhaustedConnections
    );
    if (exhaustedSkip) {
      log.info("COMBO-RR", exhaustedSkip);
      if (offset > 0) fallbackCount++;
      continue;
    }

    // Acquire semaphore slot (may wait in queue). Honor the connection's own
    // maxConcurrent cap when set; else fall back to the combo-level concurrency.
    const targetConcurrency = await resolveTargetConcurrency(target.connectionId);
    let release: () => void;
    try {
      release = await semaphore.acquire(semaphoreKey, {
        maxConcurrency: targetConcurrency,
        timeoutMs: queueTimeout,
        maxQueueSize: queueDepth,
      });
    } catch (err) {
      const errCode = isRecord(err) && typeof err.code === "string" ? err.code : null;
      if (errCode === "SEMAPHORE_TIMEOUT" || errCode === "SEMAPHORE_QUEUE_FULL") {
        log.warn(
          "COMBO-RR",
          `Semaphore ${errCode === "SEMAPHORE_QUEUE_FULL" ? "queue full" : "timeout"} for ${modelStr}, trying next model`
        );
        if (offset > 0) fallbackCount++;
        continue;
      }
      throw err;
    }

    // Retry loop within this model
    try {
      for (let retry = 0; retry <= maxRetries; retry++) {
        globalAttempts++;
        if (globalAttempts > MAX_GLOBAL_ATTEMPTS) {
          log.warn(
            "COMBO-RR",
            `Maximum combo attempts (${MAX_GLOBAL_ATTEMPTS}) exceeded. Terminating loop to prevent runaway requests.`
          );
          return errorResponse(503, "Maximum combo retry limit reached");
        }
        if (retry > 0) {
          log.info(
            "COMBO-RR",
            `Retrying ${modelStr} in ${retryDelayMs}ms (attempt ${retry + 1}/${maxRetries + 1})`
          );
          await new Promise((r) => setTimeout(r, retryDelayMs));
        }

        log.info(
          "COMBO-RR",
          `[RR #${counter}] → ${modelStr}${offset > 0 ? ` (fallback +${offset})` : ""}${retry > 0 ? ` (retry ${retry})` : ""}`
        );

        // Issue #3587: Reasoning models can spend the whole output budget on
        // reasoning. Apply any safe buffer to a per-attempt copy so round-robin
        // retries never compound across models.
        let attemptBody = body;
        {
          const bodyRecord = body as Record<string, unknown>;
          const currentMaxTokens = toPositiveInteger(bodyRecord.max_tokens);
          const bufferedMaxTokens = resolveReasoningBufferedMaxTokens(
            modelStr,
            bodyRecord.max_tokens,
            { enabled: reasoningTokenBufferEnabled }
          );
          if (
            currentMaxTokens !== null &&
            bufferedMaxTokens !== null &&
            bufferedMaxTokens !== currentMaxTokens
          ) {
            attemptBody = {
              ...bodyRecord,
              max_tokens: bufferedMaxTokens,
            } as typeof body;
            log.info(
              "COMBO-RR",
              `Reasoning model ${modelStr}: adjusted max_tokens ${currentMaxTokens} -> ${bufferedMaxTokens}`
            );
          }
        }

        const result = await handleSingleModel(attemptBody, modelStr, {
          ...targetForAttempt,
          effectiveComboStrategy: "round-robin",
          failoverBeforeRetry: config.failoverBeforeRetry,
        });

        // Success — validate response quality before returning
        if (result.ok) {
          let rrClone: Response;
          try {
            rrClone = result.clone();
          } catch {
            rrClone = result;
          }
          const quality = await validateResponseQuality(
            rrClone,
            clientRequestedStream,
            log,
            config.responseValidation
          );
          releaseQualityClone(rrClone, result, quality);
          if (!quality.valid) {
            releaseRejectedQualityResponse(rrClone, result);
            log.warn(
              "COMBO-RR",
              `${modelStr} returned 200 but failed quality check: ${quality.reason}`
            );
            // #6692: same rationale as handleComboChat's quality-fail branch —
            // a quality-rejected 200 never marks the connection row unhealthy,
            // so release the sticky pin here rather than on the next turn.
            {
              const rrSelectedConnectionId =
                result.headers?.get("X-OmniRoute-Selected-Connection-Id") ||
                result.headers?.get("x-omniroute-selected-connection-id") ||
                undefined;
              releaseStickyPinOnFailure(
                _rrSessionSticky.messageHash,
                rrSelectedConnectionId || target.connectionId
              );
            }
            recordComboRequest(combo.name, modelStr, {
              success: false,
              latencyMs: Date.now() - startTime,
              fallbackCount,
              strategy: "round-robin",
              target: toRecordedTarget(target),
            });
            recordedAttempts++;
            // Fix #1707: Set terminal state so the fallback doesn't emit
            // misleading ALL_ACCOUNTS_INACTIVE when the real issue is quality.
            lastError = `Upstream response failed quality validation: ${quality.reason}`;
            if (!lastStatus) lastStatus = 502;
            if (offset > 0) fallbackCount++;
            break; // move to next model
          }
          const latencyMs = Date.now() - startTime;
          log.info(
            "COMBO-RR",
            `${modelStr} succeeded (${latencyMs}ms, ${fallbackCount} fallbacks)`
          );
          recordComboRequest(combo.name, modelStr, {
            success: true,
            latencyMs,
            fallbackCount,
            strategy: "round-robin",
            target: toRecordedTarget(target),
          });
          recordedAttempts++;

          const selectedConnectionId =
            result.headers?.get("X-OmniRoute-Selected-Connection-Id") ||
            result.headers?.get("x-omniroute-selected-connection-id") ||
            undefined;
          const effectiveConnectionId = selectedConnectionId || target.connectionId || "";

          const rawModel = parseModel(modelStr).model || modelStr;
          if (provider && rawModel) {
            const dcResult = decayModelFailureCount(provider, effectiveConnectionId, rawModel);
            if (dcResult.cleared) {
              log.info("COMBO-RR", `Model ${modelStr} fully recovered — lockout cleared`);
            } else if (dcResult.newFailureCount > 0) {
              log.debug?.(
                "COMBO-RR",
                `Model ${modelStr} decayed to failureCount=${dcResult.newFailureCount}`
              );
            }
          }

          if (provider && provider !== "unknown") {
            recordProviderSuccess(provider, effectiveConnectionId || undefined);
          }

          if (stickyRoundRobinEnabled) {
            recordStickyRoundRobinSuccess(combo.name, target, stickyLimit, filteredTargets);
          } else {
            // #948: true round-robin (stickyLimit <= 1). The counter was advanced
            // eagerly (+1 from the scheduled start index) before this loop ran, so
            // when the scheduled model failed and a *different* model served via
            // fallback, the next request reused the fallback-served model. Advance
            // the pointer past the model that ACTUALLY served (modelIndex) instead,
            // mirroring recordStickyRoundRobinSuccess's served-index logic. Read
            // side applies `% modelCount`, so storing modelIndex + 1 is correct.
            rrCounters.set(combo.name, modelIndex + 1);
          }

          // #3825: (re)record the sticky binding so the next turn re-pins (prompt-cache).
          if (_rrSessionSticky.messageHash) {
            const stickyConn = effectiveConnectionId || target.connectionId;
            if (stickyConn) recordStickyBinding(_rrSessionSticky.messageHash, stickyConn);
          }

          if (provider) {
            const connId = effectiveConnectionId || undefined;
            void (async () => {
              try {
                const { setLKGP } = await import("../../src/lib/localDb");
                await Promise.all([
                  setLKGP(combo.name, target.executionKey, provider, connId),
                  setLKGP(combo.name, combo.id || combo.name, provider, connId),
                ]);
              } catch (err) {
                log.warn(
                  "COMBO-RR",
                  "Failed to record Last Known Good Provider. This is non-fatal.",
                  {
                    err,
                  }
                );
              }
            })();
          }
          // Clone is consumed by quality check; original stays unlocked.
          return result;
        }

        // Extract error info
        let errorText = result.statusText || "";
        let retryAfter: ComboRetryAfter | null = null;
        let errorBody: ComboErrorBody = null;
        try {
          const cloned = result.clone();
          try {
            const text = await cloned.text();
            if (text) {
              errorText = text.substring(0, 500);
              errorBody = JSON.parse(text);
              const parsedError = errorBody?.error;
              errorText =
                (typeof parsedError === "object" && parsedError?.message) ||
                (typeof parsedError === "string" ? parsedError : null) ||
                errorBody?.message ||
                errorText;
              retryAfter = errorBody?.retryAfter || null;
            }
          } catch {
            /* Clone parse failed */
          }
        } catch {
          /* Clone failed */
        }

        if (result.status === 499) {
          log.info(
            "COMBO-RR",
            `Client disconnected (499) during ${modelStr} — stopping combo loop`
          );
          recordComboRequest(combo.name, modelStr, {
            success: false,
            latencyMs: Date.now() - startTime,
            fallbackCount,
            strategy: "round-robin",
            target: toRecordedTarget(target),
          });
          recordedAttempts++;
          return result;
        }

        if (
          retryAfter &&
          (!earliestRetryAfter || new Date(retryAfter) < new Date(earliestRetryAfter))
        ) {
          earliestRetryAfter = retryAfter;
        }

        if (typeof errorText !== "string") {
          try {
            errorText = JSON.stringify(errorText);
          } catch {
            errorText = String(errorText);
          }
        }

        const isStreamReadinessFailure =
          (result.status === 502 || result.status === 504) &&
          isStreamReadinessFailureErrorBody(errorBody);

        // FIX 5: a local per-API-key token-limit 429 must not cool shared accounts.
        const isTokenLimitBreach = result.status === 429 && isTokenLimitBreachErrorBody(errorBody);

        // Round-robin uses the same target-level fallback rule as other combo
        // strategies: non-ok target responses fall through to the next target.
        // Classification stays here only to support cooldown/semaphore pacing,
        // not to decide whether fallback is allowed.
        const rawError = errorBody?.error;
        const structuredError =
          rawError && typeof rawError === "object"
            ? {
                // Upstream JSON may carry a numeric `code`/`type` (e.g. {"code":40001}).
                // Coerce to string if present instead of discarding, so downstream string
                // ops (.toLowerCase, .startsWith) can run safely without type crashes.
                code:
                  (rawError as Record<string, unknown>).code !== undefined &&
                  (rawError as Record<string, unknown>).code !== null
                    ? String((rawError as Record<string, unknown>).code)
                    : undefined,
                type:
                  (rawError as Record<string, unknown>).type !== undefined &&
                  (rawError as Record<string, unknown>).type !== null
                    ? String((rawError as Record<string, unknown>).type)
                    : undefined,
              }
            : undefined;
        const requestScopedFailure = isRequestScopedUpstreamFailure(structuredError);
        const fallbackResult = checkFallbackError(
          result.status,
          errorText,
          0,
          null,
          provider,
          result.headers,
          profile,
          structuredError
        );
        const { cooldownMs } = fallbackResult;
        const selectedConnectionId =
          result.headers?.get("X-OmniRoute-Selected-Connection-Id") ||
          result.headers?.get("x-omniroute-selected-connection-id") ||
          undefined;
        const targetWithConnection = selectedConnectionId
          ? { ...target, connectionId: selectedConnectionId }
          : target;

        const isAllAccountsRateLimited = isAllAccountsRateLimitedResponse(
          result.status,
          result.headers?.get("content-type") ?? null,
          errorText
        );

        // #1731: If the entire provider quota is exhausted, mark it so subsequent
        // same-provider targets are skipped immediately. API-key 429s still use
        // the short resilience cooldown, but explicit quota text should stop the
        // combo from trying another target for the same provider in this request.
        // #1731 / #1731v2: classify the upstream error and update the exhaustion sets
        // (shared with handleComboChat). Returns whether the provider is fully exhausted.
        const providerExhausted = applyComboTargetExhaustion(targetWithConnection, {
          result,
          fallbackResult,
          errorText,
          rawModel: parseModel(modelStr).model || modelStr,
          isTokenLimitBreach,
          allAccountsRateLimited: isAllAccountsRateLimited,
          sets: { exhaustedProviders, exhaustedConnections, transientRateLimitedProviders },
          log,
          tag: "COMBO-RR",
          exhaustedLogLevel: "debug",
          structuredError,
        });
        // #6692: mirrors handleComboChat's exhaustion-point release above.
        releaseStickyPinOnFailure(_rrSessionSticky.messageHash, targetWithConnection.connectionId);

        // Transient errors → mark in semaphore so round-robin stops stampeding this target.
        if (
          !isStreamReadinessFailure &&
          !isTokenLimitBreach &&
          !requestScopedFailure &&
          TRANSIENT_FOR_SEMAPHORE.includes(result.status) &&
          cooldownMs > 0
        ) {
          semaphore.markRateLimited(semaphoreKey, cooldownMs);
          log.warn("COMBO-RR", `${modelStr} error ${result.status}, cooldown ${cooldownMs}ms`);
        }

        if (isAllAccountsRateLimited) {
          log.info(
            "COMBO-RR",
            `All accounts rate-limited for ${modelStr}, falling back to next model`
          );
        }

        // Transient error → retry same model.
        // A token-limit 429 is terminal for the client — never retry it.
        const isTransient =
          !isStreamReadinessFailure &&
          !isTokenLimitBreach &&
          [408, 429, 500, 502, 503, 504].includes(result.status);
        if (retry < maxRetries && isTransient && !providerExhausted) {
          continue;
        }

        // Done with this model
        recordComboRequest(combo.name, modelStr, {
          success: false,
          latencyMs: Date.now() - startTime,
          fallbackCount,
          strategy: "round-robin",
          target: toRecordedTarget(target),
        });
        recordedAttempts++;
        lastError = errorText || String(result.status);
        if (!lastStatus) lastStatus = result.status;
        if (offset > 0) fallbackCount++;
        log.warn("COMBO-RR", `${modelStr} failed, trying next model`, { status: result.status });

        if (
          resilienceSettings.providerCooldown.enabled &&
          provider &&
          provider !== "unknown" &&
          !requestScopedFailure &&
          !(
            (result.status === 500 || result.status === 429) &&
            hasPerModelQuota(provider, parseModel(modelStr).model || modelStr)
          )
        ) {
          recordProviderCooldown(
            provider,
            targetWithConnection.connectionId ?? undefined,
            resilienceSettings
          );
        }

        const fallbackWaitMs =
          fallbackDelayMs > 0 && cooldownMs > 0 && cooldownMs <= MAX_FALLBACK_WAIT_MS
            ? Math.min(cooldownMs, fallbackDelayMs)
            : 0;
        if ([502, 503, 504].includes(result.status) && fallbackWaitMs > 0) {
          log.debug?.("COMBO-RR", `Waiting ${fallbackWaitMs}ms before fallback to next model`);
          await new Promise((resolve) => {
            const timer = setTimeout(resolve, fallbackWaitMs);
            signal?.addEventListener(
              "abort",
              () => {
                clearTimeout(timer);
                resolve(undefined);
              },
              { once: true }
            );
          });
          if (signal?.aborted) {
            log.info("COMBO-RR", `Client disconnected during fallback wait — aborting`);
            return errorResponse(499, "Client disconnected");
          }
        }

        break;
      }
    } finally {
      // ALWAYS release semaphore slot
      release();
    }
  }

  // All models exhausted
  const latencyMs = Date.now() - startTime;

  // #6238: every compat-kept target was skipped as unavailable and NONE was ever
  // attempted (recordedAttempts === 0). Before crystallizing 503, probe the targets
  // the compat pre-filter rejected — a compat-rejected-but-healthy provider is a
  // valid last-resort fallback tier, not a permanently dropped target.
  if (recordedAttempts === 0 && compatRejectedTargets.length > 0) {
    const compatFallbackResult = await attemptCompatRejectedFallback(compatRejectedTargets, body, {
      handleSingleModel,
      isModelAvailable,
      isProviderInCooldown: (target) =>
        resilienceSettings.providerCooldown.enabled &&
        Boolean(target.provider && target.provider !== "unknown") &&
        isProviderInCooldown(
          target.provider as string,
          target.connectionId as string | undefined,
          resilienceSettings
        ),
      log,
      strategy: "round-robin",
    });
    if (compatFallbackResult) {
      recordComboRequest(combo.name, null, {
        success: true,
        latencyMs: Date.now() - startTime,
        fallbackCount,
        strategy: "round-robin",
      });
      return compatFallbackResult;
    }
  }

  if (recordedAttempts === 0) {
    recordComboRequest(combo.name, null, {
      success: false,
      latencyMs,
      fallbackCount,
      strategy: "round-robin",
    });
  }

  if (!lastStatus) {
    return new Response(
      JSON.stringify({
        error: {
          message: "Service temporarily unavailable: all upstream accounts are inactive",
          type: "service_unavailable",
          code: "ALL_ACCOUNTS_INACTIVE",
        },
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  const status = lastStatus;
  const msg = lastError || "All round-robin combo models unavailable";

  if (earliestRetryAfter) {
    const retryHuman = formatRetryAfter(toRetryAfterDisplayValue(earliestRetryAfter));
    log.warn("COMBO-RR", `All models failed | ${msg} (${retryHuman})`);
    return unavailableResponse(status, msg, earliestRetryAfter, retryHuman);
  }

  log.warn("COMBO-RR", `All models failed | ${msg}`);
  return new Response(JSON.stringify({ error: { message: msg } }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
