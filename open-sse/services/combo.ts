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
  isAccountSemaphoreFull,
  isModelLocked,
  lockModelIfPerModelQuota,
  MODEL_ACCESS_DENIED_PATTERNS,
  recordModelLockoutFailure,
  recordProviderFailure,
  recordProviderSuccess,
  retryHintBypassesMaxCooldownMs,
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
import { formatExhaustedConnectionKey } from "./combo/comboDiagFormat.ts";
import { buildTargetTimeoutRunner } from "./combo/targetTimeoutRunner.ts";
import { recordComboRequest, recordComboShadowRequest, getComboMetrics } from "./comboMetrics.ts";
import { qualityScoreFor } from "./routing/index.ts";
import {
  expandComboSystemPromptIfPresent,
  resolveTargetFingerprint,
} from "./comboAgentMiddleware.ts";
import {
  resolveComboConfig,
  getDefaultComboConfig,
  resolveComboQueueDepth,
  isComboCooldownWaitEligible,
  resolveComboTargetTimeoutMsForCombo,
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
import { resolveProviderId } from "../../src/shared/constants/providers.ts";
import { getQuotaFetchScope } from "./antigravityQuotaFamily.ts";
import * as semaphore from "./rateLimitSemaphore.ts";
import { getCircuitBreaker } from "../../src/shared/utils/circuitBreaker";
import { parseModel } from "./model.ts";
import { rejectRetiredAutoComboCandidates } from "./modelLifecycle.ts";
import { createComboContext } from "./combo/context.ts";
import { phaseComboSetup } from "./combo/comboSetup.ts";
import { checkCredentialGate, logCredentialSkip } from "./credentialGate.ts";
import { emit } from "../../src/lib/events/eventBus";
import { notifyWebhookEvent } from "../../src/lib/webhookDispatcher";
import { type ProviderCandidate } from "./autoCombo/scoring.ts";
import { estimateTokens } from "./contextManager.ts";
import { getSessionConnection } from "./sessionManager.ts";
import { getOAuthSessionAvailability } from "./oauthSessionOccupancy.ts";
import {
  applySessionStickiness,
  normalizeStickinessMessages,
  recordStickyBinding,
  clearStickyBinding,
  clearStickyBindingsForCombo,
  peekStickyConnectionId,
  resolveDisableSessionStickiness,
} from "./combo/sessionStickiness.ts";
import { selectQuotaShareTarget } from "./combo/quotaShareStrategy.ts";
import { makeConnectionConcurrencyResolver, lookupPositiveCap } from "./combo/concurrencyCaps.ts";
import { acquireQuotaShareConcurrencySlot } from "./combo/quotaShareConcurrency.ts";
import { canAffordRequest } from "../../src/lib/quota/quotaScheduler.ts";
import { resolveConnectionTimeoutMs } from "../handlers/chatCore/upstreamTimeouts.ts";
import { getCachedProviderConnectionById } from "../../src/lib/db/readCache.ts";
import { orderTargetsByEvalScores } from "./evalRouting.ts";

/**
 * Resolve the configured per-connection token budget (rateLimitOverrides.tpm)
 * for quota reservation. Returns undefined when unconfigured — the store then
 * keeps the previously recorded limit (or 0 for a fresh row, meaning "no
 * budget enforced").
 */
async function resolveTargetTokenLimit(target: {
  connectionId?: string | null;
}): Promise<number | undefined> {
  const connectionId = target?.connectionId;
  if (!connectionId) return undefined;
  try {
    const connection = await getCachedProviderConnectionById(connectionId);
    const overrides = (connection as { rateLimitOverrides?: Record<string, number> | null } | null)
      ?.rateLimitOverrides;
    const tpm = overrides?.tpm;
    return typeof tpm === "number" && tpm > 0 ? tpm : undefined;
  } catch {
    return undefined;
  }
}
import {
  applyPromptCacheAffinity,
  expandPromptCacheAffinityTargets,
  expandPromptCacheAffinityTargetsFromConnections,
  resolvePromptCacheAffinityKey,
} from "./combo/promptCacheAffinity.ts";
import {
  classifyComboOutcome,
  formatComboOutcomes,
  redactConnectionLabel,
  buildRedactedSummary,
  resolveComboTerminalStatus,
} from "./combo/comboErrorAggregation.ts";
import type { ComboErrorEntry } from "./combo/comboErrorAggregation.ts";
import type { CompressionMode } from "./compression/types.ts";
import { getCachedProviderConnections } from "../../src/lib/db/readCache";
import { isProviderInCooldown, recordProviderCooldown } from "./providerCooldownTracker.ts";
import {
  resolveResilienceSettings,
  type ResilienceSettings,
  type ComboCooldownWaitSettings,
} from "../../src/lib/resilience/settings";
import { resolveReasoningBufferedMaxTokens, toPositiveInteger } from "./reasoningTokenBuffer.ts";
import { RESET_WINDOW_NAMES } from "./combo/types.ts";
import type {
  ComboLike,
  ComboRetryAfter,
  ComboErrorBody,
  SingleModelTarget,
  ComboLogger,
  HandleComboChatOptions,
  HandleRoundRobinOptions,
  ResolvedComboTarget,
  AutoProviderCandidate,
  HistoricalLatencyStatsEntry,
} from "./combo/types.ts";

import {
  MAX_RR_COUNTERS,
  rrCounters,
  rrStickyTargets,
  clampStickyRoundRobinTargetLimit,
  clampStickyWeightedTargetLimit,
  getStickyRoundRobinStartIndex,
  recordStickyRoundRobinSuccess,
  getStickyWeightedExecutionKey,
  recordStickyWeightedSuccess,
  resolveComboStickyRoundRobinLimit,
} from "./combo/rrState.ts";
import { expandTargetsForAllStrategies } from "./combo/connectionAwareExpansion.ts";
import {
  validateResponseQuality,
  releaseQualityClone,
  releaseRejectedQualityResponse,
  toRetryAfterDisplayValue,
} from "./combo/validateQuality.ts";
import {
  resolveComboCooldownWaitDecision,
  resolveCircuitOpenWaitDecision,
  ResolveComboCooldownDecisionResult,
} from "./combo/comboCooldownRetry.ts";
import {
  computeClosestRetryAfter,
  waitForCooldownAwareRetry,
} from "../../src/sse/services/cooldownAwareRetry.ts";
import { dispatchChaosFromCombo, type ChaosTuning } from "./autoCombo/chaosEngine.ts";
import {
  TRANSIENT_FOR_SEMAPHORE,
  MAX_FALLBACK_WAIT_MS,
  MAX_GLOBAL_ATTEMPTS,
  MAX_GLOBAL_ATTEMPTS_HARD_CAP,
  COMBO_LOOP_SAFETY_TIMEOUT_MS,
  COMBO_SAFETY_DRAIN_MS,
  isAllAccountsRateLimitedResponse,
  clampComboDepth,
  clampGlobalAttempts,
  shouldSkipForPredictedTtft,
  shouldRecordProviderBreakerFailure,
  isComboRequestScopedFailure as isScopedFailure,
  isRequestScopedUpstreamFailure,
  isInputBoundRequestFailure,
  shouldSkipConnDisable,
  resolveDelayMs,
  comboModelNotFoundResponse,
  isStreamReadinessFailureErrorBody,
  isStreamEarlyEofErrorBody,
  isTokenLimitBreachErrorBody,
  isLocalQueueCapacityErrorBody,
  toRecordedTarget,
  getExhaustedTargetSkipReason,
  clampPercent,
  quotaRemainingPercentFromQuota,
  normalizeConnectionStatus,
  hasFutureRateLimitUntil,
  getConnectionStatusQuotaCutoffReason,
  getPersistedConnectionCooldownSkipReason,
  resolvePersistedConnectionCooldownSkipReason,
  isContextOverflow400,
  isParamValidation400,
  isModelScoped400,
} from "./combo/comboPredicates.ts";
export {
  getConnectionStatusQuotaCutoffReason,
  getPersistedConnectionCooldownSkipReason,
  resolvePersistedConnectionCooldownSkipReason,
  isContextOverflow400,
  isParamValidation400,
  isModelScoped400,
};
import { applyComboTargetExhaustion } from "./combo/targetExhaustion.ts";
import {
  applyNativeCodexTurnPin,
  areAllPinnedTargetsModelScopedUnusable,
  createPinnedModelUnavailableResponse,
  getNativeCodexTurnPin,
  pinNativeCodexTurn,
} from "./combo/nativeCodexTurnPin.ts";
import {
  pinIsDurablyUnhealthy,
  tryFusionDispatch,
  tryPinnedModelDispatch,
  tryPipelineDispatch,
  tryRuntimeUnitDispatch,
} from "./combo/dispatchPrelude.ts";
import { isRetryAfterEligibleStatus } from "./combo/unavailableRetryGate.ts";
import { isRecord } from "./combo/comboData.ts";
import {
  expandProviderWildcardsInCombo,
  expandProviderWildcardsInCollection,
} from "./combo/providerWildcard.ts";
import { resolveShadowTargets, scheduleShadowRouting } from "./combo/shadowRouting.ts";
import { attemptCompatRejectedFallback } from "./combo/comboCompatFallback.ts";
import {
  computeCompatRejectedTargets,
  describeCapabilityFilterExhaustion,
  filterTargetsByRequestCompatibility,
  resolveComboRuntimeUnits,
  resolveComboTargets,
} from "./combo/comboStructure.ts";
import {
  createInvocationId,
  finalizeComboTrace,
  finishComboTrace,
  getComboTrace,
  recordComboDecision,
  startComboTrace,
} from "./combo/decisionTrace.ts";
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
import { fetchResetAwareQuotaWithCache, preScreenTargets } from "./combo/quotaStrategies.ts";
import {
  buildAutoQuotaThresholds,
  resolveQuotaExhaustionCutoffForTarget,
} from "./combo/quotaExhaustionCutoff.ts";
import { expandTargetsByFingerprints } from "./combo/fingerprintExpansion.ts";
import { resolveComboTargetPipeline } from "./combo/targetResolution.ts";
import {
  isQuotaExhaustionResponse,
  recordQuotaExhaustionClassification,
  withQuotaExhaustionClassification,
} from "./combo/quotaExhaustion.ts";

export { RESET_WINDOW_NAMES, QUOTA_SOFT_DEPRIORITIZE_FACTOR, setCandidateQuotaSoftPenalty };
export { scoreAutoTargets, expandAutoComboCandidatePool };
export type { SingleModelTarget, ResolvedComboTarget };
export { validateResponseQuality };
export {
  clampComboDepth,
  clampGlobalAttempts,
  MAX_GLOBAL_ATTEMPTS,
  MAX_GLOBAL_ATTEMPTS_HARD_CAP,
  shouldSkipForPredictedTtft,
  shouldRecordProviderBreakerFailure,
  isRequestScopedUpstreamFailure,
  shouldSkipConnDisable,
};
export { resolveShadowTargets, scheduleShadowRouting };
export { preScreenTargets };
export { resolveComboRuntimeUnits, resolveComboTargets, filterTargetsByRequestCompatibility };
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
/**
 * Connection read for the pre-dispatch persisted-cooldown gate.
 *
 * `fresh: false` (first attempt) uses the shared 5s readCache — the row was just
 * read by the surrounding target resolution, so a second uncached hit is pure cost.
 * `fresh: true` (every retry) goes straight to SQLite: during a burst a sibling
 * request routinely writes `rate_limited_until` while this attempt is sleeping out
 * its retry delay, so the cached snapshot would still say "no cooldown" — which is
 * exactly how a retry ended up dispatching into a real upstream 429 on a connection
 * the engine had already marked unavailable.
 */
async function readConnectionForCooldownGate(
  connectionId: string,
  fresh: boolean
): Promise<Record<string, unknown> | null | undefined> {
  if (!fresh) return getCachedProviderConnectionById(connectionId);
  const { getProviderConnectionById } = await import("@/lib/db/providers");
  return (await getProviderConnectionById(connectionId)) as Record<string, unknown> | null;
}

export function releaseStickyPinOnFailure(
  messageHash: string | null | undefined,
  failedConnectionId: string | null | undefined
): void {
  if (!messageHash || !failedConnectionId) return;
  if (peekStickyConnectionId(messageHash) !== failedConnectionId) return;
  clearStickyBinding(messageHash);
}

/**
 * Clear persisted LKGP pins when a target fails or is skipped due to
 * exhaustion, cooldown, or unavailability (#11911 #919).
 */
export function clearStaleLKGP(
  comboName: string,
  executionKey?: string | null,
  comboId?: string | null,
  log?: { warn?: (tag: string, msg: string, data?: unknown) => void } | null,
  tag: string = "COMBO"
): void {
  void (async () => {
    try {
      const { clearLKGP } = await import("@/lib/db/settings");
      const promises: Promise<void>[] = [clearLKGP(comboName, comboId || comboName)];
      if (executionKey) {
        promises.push(clearLKGP(comboName, executionKey));
      }
      await Promise.all(promises);
    } catch (err) {
      log?.warn?.(tag, "Failed to clear Last Known Good Provider. This is non-fatal.", {
        err,
      });
    }
  })();
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
  const { getPricingForModel } = await import("@/lib/db/settings");
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
      // #10877: `provider` here may be a legacy/user-facing alias spelling
      // (target.provider/parseModel output); canonicalize before the fetcher
      // registry lookup so aliased combo members still hit quota-aware scoring.
      const fetcher = getQuotaFetcher(resolveProviderId(provider));
      const connection = target.connectionId ? connectionById.get(target.connectionId) : undefined;
      const authType = typeof connection?.authType === "string" ? connection.authType : null;
      const sessionAvailability =
        authType === "oauth" ? getOAuthSessionAvailability(target.connectionId, sessionId) : 1;
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
        const quotaScope = getQuotaFetchScope(provider, target.modelStr);
        const quotaKey = `${provider}:${target.connectionId}:${quotaScope}`;
        if (!quotaPromises.has(quotaKey)) {
          quotaPromises.set(
            quotaKey,
            fetchResetAwareQuotaWithCache({
              provider,
              connectionId: target.connectionId,
              connection: connection
                ? { ...connection, requestedModel: target.modelStr }
                : connection,
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
          quotaRemaining = quotaRemainingPercentFromQuota(quota, { provider, requestedModel: modelStr });
        }
        if (!quotaCutoffBlocked && quotaCutoffEnabled) {
          const cutoffDecision = evaluateQuotaCutoff(
            quota as QuotaInfo | null,
            buildAutoQuotaThresholds(provider, connection, resilienceSettings),
            { provider, requestedModel: modelStr }
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
        sessionAvailability,
        resetWindowAffinity,
        quotaCutoffBlocked,
        quotaCutoffReason,
        statusPenalty,
        statusPenaltyReason,
        connectionPoolSize: connectionPoolCounts.get(provider) ?? 1,
        connectionId: target.connectionId ?? undefined,
        authType,
        // Feedback-driven quality signal (routing quality tracker). Neutral 1.0
        // before enough samples accumulate — a cold model is never penalized.
        quality: qualityScoreFor(provider, model),
      };
    })
  );

  // Filter out candidates whose model is hidden by the user in the dashboard,
  // then drop vendor-retired ids so auto-combo cannot pick them (#11625).
  return rejectRetiredAutoComboCandidates(
    candidates.filter((c) => {
      const hiddenModels = hiddenModelsMap.get(c.provider);
      return !hiddenModels?.has(c.model);
    })
  );
}

// Context-cache pin health gate — moved to combo/dispatchPrelude.ts alongside the
// pinned-model dispatch branch that consumes it. Re-exported so existing importers
// (tests/unit/combo-pin-health-gate.test.ts) keep resolving from combo.ts.
export { pinIsDurablyUnhealthy };

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

/** @param {object} options */
/**
 * Resolves the per-target timeout ceiling for a combo target: when the target's
 * connection carries `providerSpecificData.timeoutMs`, re-runs
 * resolveComboTargetTimeoutMsForCombo with that timeout as the ceiling so the
 * combo's per-target timer follows the selected connection.
 * Returns undefined when the connection or its timeout is absent — the runner
 * then falls back to the setup-time comboTargetTimeoutMs.
 */
export async function resolveTargetTimeoutMsForTarget(
  config: Record<string, unknown> | null | undefined,
  strategy: string,
  comboCooldownWait: Pick<ComboCooldownWaitSettings, "enabled" | "budgetMs">,
  target?: SingleModelTarget,
  log?: Pick<ComboLogger, "debug"> | null
): Promise<number | undefined> {
  const connectionId = target && "connectionId" in target ? target.connectionId : null;
  if (!connectionId) return undefined;
  try {
    const connection = await getCachedProviderConnectionById(connectionId);
    if (!connection) return undefined;
    const timeoutMs = resolveConnectionTimeoutMs(connection.providerSpecificData);
    if (timeoutMs === undefined) return undefined;
    return resolveComboTargetTimeoutMsForCombo(config, timeoutMs, strategy, comboCooldownWait);
  } catch (err) {
    log?.debug?.(
      "COMBO",
      `resolveTargetTimeoutMsForTarget connection lookup failed: ${
        err instanceof Error ? err.message : String(err)
      }`
    );
    return undefined;
  }
}

/**
 * #10681 egress: every combo response carries the opaque trace id in an
 * `X-OmniRoute-Combo-Trace` header so a post-incident lookup of the ordered
 * per-target decisions is possible; the finalized summary is also emitted as
 * one metadata-only log line for durability across restarts.
 */
export async function handleComboChat(options: HandleComboChatOptions): Promise<Response> {
  const traceInvocationId = options.invocationId ?? createInvocationId();
  const response = await handleComboChatInner({ ...options, invocationId: traceInvocationId });
  response.headers.set("X-OmniRoute-Combo-Trace", traceInvocationId);
  const trace = getComboTrace(traceInvocationId);
  options.log.info(
    "COMBO",
    `combo trace ${traceInvocationId} terminal=${JSON.stringify(trace?.terminal ?? null)} decisions=${trace?.decisions.length ?? 0}`
  );
  return response;
}

async function handleComboChatInner({
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
  hiddenModelsByProvider = getHiddenModelsByProvider(),
  clientManagedResponsesContext = false,
  perTargetAdmission = null,
  deferContextOverflowWhenCompressible = false,
  compressionExclusions,
  sourceFormat = null,
  endpointPath = null,
  requestHeaders = null,
  invocationId,
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

  // #10681: opaque per-invocation decision trace (safe routing metadata only).
  const traceInvocationId = invocationId ?? createInvocationId();
  startComboTrace(traceInvocationId, { strategy, comboName: combo.name });

  const handleSingleModelWithTimeout = buildTargetTimeoutRunner({
    handleSingleModel,
    comboTargetTimeoutMs,
    resolveTargetTimeoutMs: (target) =>
      resolveTargetTimeoutMsForTarget(
        config,
        strategy,
        resilienceSettings.comboCooldownWait,
        target,
        log
      ),
    log,
  });

  // Dispatch prelude: context-cache pin → fusion → chaos → pipeline → nested
  // combo-ref execute mode → round-robin. Each branch either owns the request or
  // falls through to the target iteration loop below. Implementations live in
  // combo/dispatchPrelude.ts; only the chaos + round-robin hand-offs are short
  // enough to stay inline.
  if (pinnedModel) {
    const pinnedDispatch = await tryPinnedModelDispatch({
      body,
      combo,
      pinnedModel,
      allCombos,
      config,
      clientRequestedStream,
      handleSingleModelWithTimeout,
      log,
      hiddenModelsByProvider,
    });
    if (pinnedDispatch) return pinnedDispatch;
  }

  const cfg = config as Record<string, unknown>;
  const fusionDispatch = await tryFusionDispatch({
    body,
    combo,
    cfg,
    config,
    strategy,
    allCombos,
    nesting,
    handleSingleModel,
    handleSingleModelWithTimeout,
    isModelAvailable,
    log,
    settings,
    relayOptions,
    signal,
    apiKeyAllowedConnections,
    hiddenModelsByProvider,
    perTargetAdmission,
    deferContextOverflowWhenCompressible,
    compressionExclusions,
    sourceFormat,
    endpointPath,
    requestHeaders,
    runCombo: handleComboChat,
  });
  if (fusionDispatch) return fusionDispatch;

  // Chaos mode (parallel multi-model dispatch): detection + dispatch live in
  // chaosEngine.ts (dispatchChaosFromCombo), returning null when not chaos-enabled.
  const chaosDispatch = dispatchChaosFromCombo({
    cfg,
    comboModels: resolveComboTargets(
      combo,
      allCombos,
      clampComboDepth(config.maxComboDepth),
      hiddenModelsByProvider
    ).map((target) => target.modelStr),
    comboName: combo.name,
    body,
    handleSingleModel: handleSingleModelWithTimeout,
    log,
    perTargetAdmission,
  });
  if (chaosDispatch) return chaosDispatch;

  const pipelineDispatch = await tryPipelineDispatch({
    body,
    combo,
    config,
    strategy,
    settings,
    apiKeyAllowedConnections,
    allCombos,
    handleSingleModelWithTimeout,
    log,
    hiddenModelsByProvider,
  });
  if (pipelineDispatch) return pipelineDispatch;

  const runtimeUnitDispatch = await tryRuntimeUnitDispatch({
    body,
    combo,
    config,
    strategy,
    allCombos,
    nesting,
    handleSingleModel,
    handleSingleModelWithTimeout,
    isModelAvailable,
    log,
    settings,
    relayOptions,
    signal,
    apiKeyAllowedConnections,
    hiddenModelsByProvider,
    perTargetAdmission,
    deferContextOverflowWhenCompressible,
    compressionExclusions,
    sourceFormat,
    endpointPath,
    requestHeaders,
    runCombo: handleComboChat,
  });
  if (runtimeUnitDispatch) return runtimeUnitDispatch;

  const activeNativeTurnPin = clientManagedResponsesContext
    ? getNativeCodexTurnPin(body, combo.name)
    : null;

  // Route new round-robin turns to the specialized handler. A native Codex
  // continuation with an established provider/account pin must use the common
  // target pipeline below so it cannot rotate between tool rounds.
  if (strategy === "round-robin" && !activeNativeTurnPin) {
    return handleRoundRobinCombo({
      body,
      combo,
      handleSingleModel: handleSingleModelWithTimeout,
      isModelAvailable,
      log,
      settings,
      allCombos,
      signal,
      apiKeyAllowedConnections,
      hiddenModelsByProvider,
      clientManagedResponsesContext,
      deferContextOverflowWhenCompressible,
      compressionExclusions,
      sourceFormat,
      endpointPath,
      requestHeaders,
      relayOptions,
      perTargetAdmission,
    });
  }

  const maxRetries = activeNativeTurnPin ? 0 : (config.maxRetries ?? 1);
  const retryDelayMs = resolveDelayMs(config.retryDelayMs, 2000);
  const fallbackDelayMs = resolveDelayMs(config.fallbackDelayMs, 0);
  const maxSetRetries = activeNativeTurnPin ? 0 : (config.maxSetRetries ?? 0);
  const setRetryDelayMs = resolveDelayMs(config.setRetryDelayMs, 2000);

  const targetResolution = await resolveComboTargetPipeline({
    body,
    combo,
    strategy,
    config,
    settings,
    allCombos,
    relayOptions,
    signal,
    apiKeyAllowedConnections,
    log,
    resilienceSettings,
    isModelAvailable,
    handleSingleModelWithTimeout,
    buildAutoCandidates,
    hiddenModelsByProvider,
  });
  if ("earlyResponse" in targetResolution) return targetResolution.earlyResponse;
  const { stickyWeightedLimit, getWeightedStepKeyForTarget, preScreenMap } = targetResolution;
  const _sticky = targetResolution.sticky;
  let orderedTargets = targetResolution.orderedTargets;
  const quotaCutoffResetWindowConfig = resolveResetWindowConfig(config as Record<string, unknown>);

  if (activeNativeTurnPin) {
    const pinnedTargets = applyNativeCodexTurnPin(orderedTargets, activeNativeTurnPin);
    if (pinnedTargets.length === 0) {
      //#11371: quota-share ordering reserved a winner slot; release on
      //early exit (idempotent).
      targetResolution.quotaShareRelease?.();
      log.warn(
        "COMBO",
        `Native Codex turn cannot continue: pinned model ${activeNativeTurnPin.modelStr} unavailable (target not in combo); preserving turn pin and terminating turn`
      );
      return createPinnedModelUnavailableResponse();
    }
    const allPinnedUnusable = await areAllPinnedTargetsModelScopedUnusable({
      pinnedTargets,
      resilienceSettings,
      quotaCutoffResetWindowConfig,
      comboName: combo.name,
      body: body as Record<string, unknown>,
      log,
      isModelAvailable,
    });
    if (allPinnedUnusable) {
      targetResolution.quotaShareRelease?.();
      log.warn(
        "COMBO",
        `Native Codex turn cannot continue: pinned model ${activeNativeTurnPin.modelStr} is unavailable (model-scoped); preserving turn pin and terminating turn`
      );
      return createPinnedModelUnavailableResponse();
    } else {
      orderedTargets = pinnedTargets;
      log.info(
        "COMBO",
        `Native Codex turn pinned to ${activeNativeTurnPin.modelStr} on connection ${activeNativeTurnPin.connectionId.slice(0, 8)}`
      );
    }
  }

  // #5923 (Finding #4) — reset-window config for the shared per-target quota-
  // exhaustion cutoff below. The "auto" strategy already applies its own cutoff
  // via buildAutoCandidates/routableCandidates, so this only affects the other
  // 16 strategies (priority, weighted, etc.) that funnel through executeTarget.
  // (provider/model ids only) so a terminal combo failure can report the attempt
  // sequence alongside pool size + exhaustion reasons. Accumulates across set retries.
  const comboAttemptOrder: Array<{ provider: string; model: string }> = [];

  if (orderedTargets.length === 0) {
    // Surface a recovery hint + auto-clear the session pin after enough consecutive
    // no-target failures (silent-stop fix). Threshold of 3 prevents a one-off account
    // wipe from destroying the prompt-cache pin benefit on the next request.
    recordComboFailure(effectiveSessionId, combo.name);
    // #11371: same early-exit release as the pinned-turn path above.
    targetResolution.quotaShareRelease?.();
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
    resolveShadowTargets(combo, config, allCombos, hiddenModelsByProvider),
    handleSingleModel,
    isModelAvailable,
    strategy,
    log
  );

  // G2: Collect execution keys registered by _registerExecutionCandidates above (auto strategy).
  // We snapshot them now so cleanup can happen after the attempt loop finishes.
  const _registeredExecutionKeys = orderedTargets.map((t) => t.executionKey).filter(Boolean);

  let globalAttempts = 0;
  // #11134: operator-configurable shared attempt budget (clamped to the hard
  // cap). Defaults to MAX_GLOBAL_ATTEMPTS when unset.
  const maxGlobalAttempts = clampGlobalAttempts(config.maxGlobalAttempts);

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
  let comboErrors: Array<ComboErrorEntry> = [];
  // Quota trust spans set retries and recursive cooldown re-dispatches. Once any
  // failure is non-quota, a nested caller must never treat this dispatch as quota-only.
  let observedFailure = false;
  let allObservedFailuresQuota = true;
  const targetFailureTrust = new Map<
    string,
    { observedFailure: boolean; allObservedFailuresQuota: boolean }
  >();
  const observeFailure = (quotaExhausted: boolean, targetExecutionKey?: string) => {
    observedFailure = true;
    allObservedFailuresQuota &&= quotaExhausted;
    if (!targetExecutionKey) return;
    const trust = targetFailureTrust.get(targetExecutionKey) ?? {
      observedFailure: false,
      allObservedFailuresQuota: true,
    };
    trust.observedFailure = true;
    trust.allObservedFailuresQuota &&= quotaExhausted;
    targetFailureTrust.set(targetExecutionKey, trust);
  };

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
    let skippedForCircuitOpen = false;
    let earliestCircuitOpenRetryMs = 0;
    // #11804: the loop-safety timer is armed per setTry iteration but must be
    // cleared on EVERY exit path, not just the happy one. Hoisted to function
    // scope so the `finally` at the end of this function always reaches it —
    // otherwise each error path (all_targets_skipped / all_accounts_inactive /
    // aggregated status / final fallback / global timeout) returned to the client
    // leaving a 10-minute timer pending, whose closure retains orderedTargets and
    // the exhausted provider/connection sets. Field evidence on the issue: the
    // client got a 502 immediately, and "Combo loop safety timeout ...
    // force-terminating" was logged exactly 600s later.
    let activeLoopSafetyTimer: ReturnType<typeof setTimeout> | null = null;

    try {
      for (let setTry = 0; setTry <= maxSetRetries; setTry++) {
      // #1731: Per-set-iteration set of providers whose quota is fully exhausted.
      // Reset each retry so providers excluded in a previous attempt get another chance.
      const exhaustedProviders = new Set<string>();
      const exhaustedConnections = new Set<string>();
      const transientRateLimitedProviders = new Set<string>();
      skippedForCircuitOpen = false;
      earliestCircuitOpenRetryMs = 0;
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
          ...[...exhaustedConnections].map((c) => formatExhaustedConnectionKey(String(c))),
        ],
        attemptOrder: comboAttemptOrder,
        terminalReason,
        recovery: buildRecoveryHint(terminalReason, retryAfterSeconds),
      });

      let globalResolve: ((res: Response) => void) | null = null;
      const globalPromise = new Promise<Response>((res) => {
        globalResolve = res;
      });

      // G1 (silent-stop fix): the speculative loop's `Promise.race` waits on
      // `globalPromise`, which is ONLY resolved from inside a task (success or
      // fatal error). If a target hangs — e.g. the operator disabled the per-model
      // timeout (`targetTimeoutMs: 0`) and the upstream never settles — the race
      // never resolves and the request hangs forever with no response. This safety
      // promise force-resolves after the combo budget (comboTimeoutMs when set,
      // otherwise a hard ceiling) so the request ALWAYS terminates with an
      // actionable 504 instead of dying silently. `comboExpired` is flipped so the
      // target loop stops launching new work; the existing comboExpired branch
      // returns the aggregated 504.
      const loopSafetyMs = comboTimeoutMs > 0 ? comboTimeoutMs : COMBO_LOOP_SAFETY_TIMEOUT_MS;
      let loopSafetyFired = false;
      let loopSafetyTimer: ReturnType<typeof setTimeout> | null = null;
      const loopSafetyPromise = new Promise<Response>((resolve) => {
        loopSafetyTimer = setTimeout(() => {
          loopSafetyFired = true;
          log.warn(
            "COMBO",
            `Combo loop safety timeout (${loopSafetyMs}ms) reached without a terminal response — force-terminating`
          );
          resolve(
            errorResponseWithComboDiagnostics(
              504,
              `Combo global timeout (${loopSafetyMs}ms) without a terminal response`,
              buildComboDiag("combo_timeout"),
              { code: "COMBO_TIMEOUT", type: "server_error" }
            )
          );
        }, loopSafetyMs);
        loopSafetyTimer.unref?.();
        activeLoopSafetyTimer = loopSafetyTimer;
      });
      const runningTasks = new Set<Promise<void>>();
      let anySuccess = false;
      // #10681: steps already recorded as dispatched (so per-target retries do not
      // duplicate the decision).
      const dispatchedTargets = new Set<string>();
      // G1: flip comboExpired as soon as the safety timer fires so the next loop
      // iteration breaks instead of launching more targets after the budget, and
      // abort every in-flight target so a hung upstream actually gets cancelled
      // (not just "response stops").
      const markLoopExpiredIfSafetyFired = () => {
        if (loopSafetyFired) {
          comboExpired = true;
          for (const [, ac] of abortControllers.entries()) ac.abort();
        }
      };
      const abortControllers = new Map<number, AbortController>();
      const zeroLatencyOptimizationsEnabled = config.zeroLatencyOptimizationsEnabled === true;
      const hasProtectedPriorityTarget =
        strategy === "priority" &&
        orderedTargets.some((target) => target.fallbackOnlyOnQuotaExhaustion === true);

      const executeTarget = async (
        i: number
      ): Promise<{ ok: boolean; response?: Response } | null> => {
        const target = orderedTargets[i];
        const modelStr = target.modelStr;
        const rawModel = parseModel(modelStr).model || modelStr;
        const provider = target.provider;
        const protectedPriorityTarget =
          strategy === "priority" && target.fallbackOnlyOnQuotaExhaustion === true;
        const stopProtectedPriorityTarget = (message: string) => {
          observeFailure(false, target.executionKey);
          clearStaleLKGP(combo.name, target.executionKey, combo.id, log, "COMBO");
          return protectedPriorityTarget
            ? { ok: false, response: errorResponse(503, message) }
            : null;
        };

        const cb = getCircuitBreaker(provider);
        const cbStatus = cb.getStatus();
        if (cbStatus.state === "OPEN") {
          skippedForCircuitOpen = true;
          if (
            cbStatus.retryAfterMs > 0 &&
            (earliestCircuitOpenRetryMs === 0 || cbStatus.retryAfterMs < earliestCircuitOpenRetryMs)
          ) {
            earliestCircuitOpenRetryMs = cbStatus.retryAfterMs;
          }
          log.info("COMBO", `Skipping ${modelStr} — circuit breaker OPEN for ${provider}`);
          recordComboDecision(traceInvocationId, {
            step: target.executionKey,
            target: modelStr,
            decision: "skipped_before_dispatch",
            reason: "circuit_open",
          });
          if (i > 0) fallbackCount++;
          return stopProtectedPriorityTarget(`Provider ${provider} circuit breaker is open`);
        }

        if (
          resilienceSettings.providerCooldown.enabled &&
          Boolean(provider && provider !== "unknown") &&
          (isProviderInCooldown(provider, target.connectionId ?? undefined, resilienceSettings) ||
            isProviderInCooldown(provider, undefined, resilienceSettings))
        ) {
          log.info("COMBO", `Skipping ${modelStr} — provider ${provider} in global cooldown`);
          recordComboDecision(traceInvocationId, {
            step: target.executionKey,
            target: modelStr,
            decision: "skipped_before_dispatch",
            reason: "provider_cooldown",
          });
          if (i > 0) fallbackCount++;
          return stopProtectedPriorityTarget(`Provider ${provider} is in cooldown`);
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

        // Persist the connection cooldown before dispatch. AUTH only learns
        // unavailable during credential lookup, so a burst would otherwise
        // burn max_concurrent slots on real upstream calls against a row
        // SQLite already locked until the reset.
        if (target.connectionId && !allowRateLimitedConnection) {
          const persistedSkip = await resolvePersistedConnectionCooldownSkipReason(
            target,
            (id) => readConnectionForCooldownGate(id, false),
            allowRateLimitedConnection
          );
          if (persistedSkip) {
            log.info("COMBO", persistedSkip);
            clearStaleLKGP(combo.name, target.executionKey, combo.id, log, "COMBO");
            if (i > 0) fallbackCount++;
            return null;
          }
        }

        // #1731 / #1731v2: skip targets already known-exhausted this request (shared predicate).
        const exhaustedSkip = getExhaustedTargetSkipReason(
          target,
          exhaustedProviders,
          exhaustedConnections
        );
        if (exhaustedSkip) {
          log.info("COMBO", exhaustedSkip);
          recordComboDecision(traceInvocationId, {
            step: target.executionKey,
            target: modelStr,
            decision: "skipped_before_dispatch",
            reason: "request_exhaustion",
          });
          if (i > 0) fallbackCount++;
          return stopProtectedPriorityTarget(`Target ${modelStr} is unavailable`);
        }

        // Pre-check: skip models locked by the resilience system (model-level lockout)
        if (provider && rawModel && isModelLocked(provider, target.connectionId || "", rawModel)) {
          log.info("COMBO", `Skipping ${modelStr} — model locked by resilience (cooldown active)`);
          recordComboDecision(traceInvocationId, {
            step: target.executionKey,
            target: modelStr,
            decision: "skipped_before_dispatch",
            reason: "model_lockout",
          });
          if (i > 0) fallbackCount++;
          return stopProtectedPriorityTarget(`Model ${modelStr} is locked`);
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
            log,
            modelStr
          );
          if (quotaCutoff.blocked) {
            log.info(
              "COMBO",
              `Skipping ${modelStr} — quota exhaustion cutoff (${quotaCutoff.reason || "quota_exhausted"})`
            );
            clearStaleLKGP(combo.name, target.executionKey, combo.id, log, "COMBO");
            recordComboDecision(traceInvocationId, {
              step: target.executionKey,
              target: modelStr,
              decision: "skipped_before_dispatch",
              reason: "quota_cutoff",
            });
            if (i > 0) fallbackCount++;
            observeFailure(true, target.executionKey);
            if (protectedPriorityTarget) {
              const protectedTargetTrust = targetFailureTrust.get(target.executionKey);
              if (!protectedTargetTrust?.allObservedFailuresQuota) {
                return {
                  ok: false,
                  response: errorResponse(503, `Target ${modelStr} is unavailable`),
                };
              }
            }
            return null;
          }
        }

        // Quota-aware scheduling (opt-in, OMNIROUTE_QUOTA_AWARE_ROUTING=1):
        // when a per-connection token budget is configured (provider_quota_state),
        // skip targets whose remaining budget cannot afford this request —
        // BEFORE dispatching — instead of waiting for a 429. Fails open: when
        // no budget is configured the decision is always affordable.
        if (process.env.OMNIROUTE_QUOTA_AWARE_ROUTING === "1" && provider && target.connectionId) {
          const quotaDecision = canAffordRequest(
            target.connectionId,
            modelStr,
            body as Record<string, unknown> | null | undefined
          );
          if (!quotaDecision.affordable) {
            log.info(
              "COMBO",
              `Skipping ${modelStr} — quota budget ${quotaDecision.reason} (remaining ${quotaDecision.tokensRemaining ?? 0}, cost ${quotaDecision.estimatedCost ?? 0})`
            );
            clearStaleLKGP(combo.name, target.executionKey, combo.id, log, "COMBO");
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
            clearStaleLKGP(combo.name, target.executionKey, combo.id, log, "COMBO");
            recordComboDecision(traceInvocationId, {
              step: target.executionKey,
              target: modelStr,
              decision: "skipped_before_dispatch",
              reason: "availability",
            });
            if (i > 0) fallbackCount++;
            return stopProtectedPriorityTarget(`Model ${modelStr} is unavailable`);
          }
        }

        // Credential gate: skip targets with known-bad credentials (fail-fast)
        const connectionId = target.connectionId as string | undefined;
        if (connectionId) {
          const gateResult = checkCredentialGate(connectionId, provider, modelStr);
          if (gateResult.allowed === false) {
            logCredentialSkip(log, modelStr, gateResult.reason || "Credential gate blocked");
            recordComboDecision(traceInvocationId, {
              step: target.executionKey,
              target: modelStr,
              decision: "skipped_before_dispatch",
              reason: "credential_gate",
            });
            if (i > 0) fallbackCount++;
            return stopProtectedPriorityTarget(`Credential gate blocked ${modelStr}`);
          }

          // Concurrency gate: fail-fast skip when connection is at max_concurrent capacity (e.g. Featherless 1/1)
          const maxConcurrentCap = await lookupPositiveCap(connectionId);
          if (
            maxConcurrentCap &&
            isAccountSemaphoreFull(provider, connectionId, maxConcurrentCap)
          ) {
            log.info(
              "COMBO",
              `Skipping ${modelStr} — connection ${connectionId} is at max concurrency cap (${maxConcurrentCap})`
            );
            recordComboDecision(traceInvocationId, {
              step: target.executionKey,
              target: modelStr,
              decision: "skipped_before_dispatch",
              reason: "concurrency_cap",
            });
            if (i > 0) fallbackCount++;
            return stopProtectedPriorityTarget(`Connection capacity reached for ${modelStr}`);
          }
        }

        // #9654 Wave 2: per-target lane-aware admission probe. With virtual
        // lanes on, a tenant whose lane queue is full should skip extra
        // fan-out targets instead of piling more queued work onto the lane.
        // Strictly non-blocking (maxWaitMs 0) and a no-op when lanes are off —
        // see createPerTargetAdmissionHook for the full contract.
        if (
          perTargetAdmission &&
          !(await perTargetAdmission({ modelStr, executionKey: target.executionKey, body }))
        ) {
          log.info("COMBO", `Skipping ${modelStr} — admission lane full (#9654)`);
          recordComboDecision(traceInvocationId, {
            step: target.executionKey,
            target: modelStr,
            decision: "skipped_before_dispatch",
            reason: "admission_lane",
          });
          if (i > 0) fallbackCount++;
          return null;
        }

        // Retry loop for transient errors
        for (let retry = 0; retry <= maxRetries; retry++) {
          // Fix #1681: Bail out immediately if the client has disconnected
          if (signal?.aborted) {
            log.info("COMBO", `Client disconnected — aborting combo loop before model ${modelStr}`);
            return { ok: false, response: errorResponse(499, "Client disconnected") };
          }
          globalAttempts++;
          if (globalAttempts > maxGlobalAttempts) {
            log.warn(
              "COMBO",
              `Maximum combo attempts (${maxGlobalAttempts}) exceeded across all targets and fallbacks. Terminating loop to prevent runaway background requests.`
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
                recordComboDecision(traceInvocationId, {
                  step: target.executionKey,
                  target: modelStr,
                  decision: "skipped_before_dispatch",
                  reason: "predictive_ttft",
                });
                return stopProtectedPriorityTarget(`Predictive latency check rejected ${modelStr}`);
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

            // Retry re-check: a sibling attempt (or attempt 1) may have persisted
            // a quota cooldown while this attempt was sleeping out its retry delay
            // ("Trying model 1/7: zai/glm-5.3 (retry 1)" after "already marked
            // unavailable until …"). Reads fresh, not cached: see readConnectionForCooldownGate.
            const persistedRetrySkip = await resolvePersistedConnectionCooldownSkipReason(
              target,
              (id) => readConnectionForCooldownGate(id, true),
              allowRateLimitedConnection
            );
            if (persistedRetrySkip) {
              log.info("COMBO", persistedRetrySkip);
              if (i > 0) fallbackCount++;
              return null;
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

          // Copy-on-write, not a deep clone (#7847 — 9.53 MiB at 3 targets). Writes here are
          // top-level scalars. Invariant: tests/unit/combo-attempt-body-isolation-7847.test.ts.
          let attemptBody = { ...(body as Record<string, unknown>) } as typeof body;

          // Proactive Context Compression for fallbacks (Zero-Latency optimization)
          if (
            zeroLatencyOptimizationsEnabled &&
            i > 0 &&
            config.fallbackCompressionMode &&
            config.fallbackCompressionMode !== "off"
          ) {
            const { estimateTokens } = await import("./contextManager.ts");
            // #7847: object, not JSON.stringify — the string branch mis-counts inline images.
            const estimatedTokens = estimateTokens(attemptBody);
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

          // Universal handoff: inject existing handoff if model changed. i === 0
          // only: a fallback target (i > 0) serves the SAME client request the
          // failed primary target would have served, with the original messages
          // already intact -- there's nothing to hand off, since the client never
          // saw the earlier target fail. Injecting a handoff note there replaces
          // real context with a context-free note, which weaker fallback models
          // have been observed treating as license to fabricate content instead
          // of just answering the actual request (#12227 follow-up).
          if (
            i === 0 &&
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
                existingHandoff,
                universalHandoffConfig.relayMode
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
          // #5501: server-side template expansion for the combo system_message —
          // resolved per-target, scoped to combo-injected content only (never
          // client-owned system messages). Gate: a non-empty combo system_message.
          attemptBody = expandComboSystemPromptIfPresent(attemptBody, combo, {
            modelId: modelStr,
            providerId: provider !== "unknown" ? provider : "",
            account:
              typeof target.label === "string" && target.label.trim().length > 0
                ? target.label.trim()
                : "",
            fingerprint: resolveTargetFingerprint(target) ?? "",
          });
          // #10681: record dispatch once per target (retries keep the first decision).
          if (!dispatchedTargets.has(target.executionKey)) {
            dispatchedTargets.add(target.executionKey);
            recordComboDecision(traceInvocationId, {
              step: target.executionKey,
              target: modelStr,
              decision: "dispatched",
            });
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
              lastStatus = 502;
              // #10314: record quality failures as a FIRST-CLASS per-target outcome
              // so a quality reason is never silently dropped from the aggregated
              // terminal message when a later sibling overwrites lastError.
              comboErrors.push({
                model: modelStr,
                status: 502,
                error: quality.reason || "upstream response failed quality validation",
                kind: "quality",
              });
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
              observeFailure(false, target.executionKey);
              return protectedPriorityTarget
                ? {
                    ok: false,
                    response: errorResponse(502, "Upstream response failed quality validation"),
                  }
                : null;
            }

            if (clientManagedResponsesContext && effectiveConnectionId) {
              pinNativeCodexTurn({
                body,
                comboName: combo.name,
                target,
                connectionId: effectiveConnectionId,
              });
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
              // i === 0 only: a same-request fallback target (i > 0) never
              // needs a summary generated for it -- see the injection-site
              // comment above. recordSessionModelUsage above stays
              // unconditional regardless of i: it must reflect whichever
              // model actually served THIS response, since the next
              // request's i === 0 comparison depends on that being
              // accurate even when this response came from a fallback.
              if (i === 0 && prevModel && prevModel !== modelStr) {
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
                  const { setLKGP } = await import("@/lib/db/settings");
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
          // An early EOF is an upstream failure, not a readiness probe — the breaker must
          // see it even though the transient-retry path below treats both codes alike.
          const isStreamEarlyEof =
            (result.status === 502 || result.status === 504) &&
            isStreamEarlyEofErrorBody(errorBody);

          // FIX 5: a local per-API-key token-limit 429 must not cool shared accounts.
          const isTokenLimitBreach =
            result.status === 429 && isTokenLimitBreachErrorBody(errorBody);
          const isLocalQueueCapacity = isLocalQueueCapacityErrorBody(errorBody);

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
          if (isLocalQueueCapacity) {
            log.info(
              "COMBO",
              `Local rate-limit queue capacity reached for ${modelStr} — returning without upstream fallback`
            );
            recordComboRequest(combo.name, modelStr, {
              success: false,
              latencyMs: Date.now() - startTime,
              fallbackCount,
              strategy,
              target: toRecordedTarget(target),
            });
            recordedAttempts++;
            if (i > 0) fallbackCount++;
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
          const scopedFailure = isScopedFailure(result, errorText, structuredError);

          // #8375: input-bound request-scoped failures (context_length_exceeded) are
          // deterministic for the same input — retrying on other accounts of the same
          // model will fail identically. Short-circuit the combo immediately with the
          // original error instead of burning MAX_GLOBAL_ATTEMPTS.
          // Scoped to homogeneous remainders only: a heterogeneous combo (#6637) may
          // have a later target with a different, larger context window that would
          // NOT reject the same input — isContextOverflow400 below exists precisely to
          // let that case fall through, so only short-circuit when every remaining
          // target is the same model (the "retrying will fail identically" premise
          // only holds within a homogeneous same-model pool).
          const remainingTargets = orderedTargets.slice(i + 1);
          const remainderIsHomogeneous = remainingTargets.every(
            (nextInPool) => nextInPool.modelStr === modelStr
          );
          const isInputBoundFailure =
            isInputBoundRequestFailure(structuredError) && remainderIsHomogeneous;
          if (isInputBoundFailure) {
            log.warn(
              "COMBO",
              `Input-bound request failure from ${modelStr} — aborting combo (same input will fail identically on every account)`
            );
            recordComboRequest(combo.name, modelStr, {
              success: false,
              latencyMs: Date.now() - startTime,
              fallbackCount,
              strategy,
              target: toRecordedTarget(target),
            });
            recordedAttempts++;
            if (i > 0) fallbackCount++;
            return { ok: false, response: result };
          }
          const fallbackResult = checkFallbackError(
            result.status,
            errorText,
            0,
            protectedPriorityTarget ? rawModel : null,
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
          // Only a transport header or google.rpc.RetryInfo is authoritative enough
          // to bypass maxCooldownMs. Prose and generic JSON remain useful exact hints,
          // but the operator cap still bounds them.
          const lockoutHintVerified = retryHintBypassesMaxCooldownMs(
            fallbackResult.retryHintSource
          );
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
            requestScopedFailure: scopedFailure,
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
          if (
            providerExhausted ||
            exhaustedConnections.has(`${provider}:${targetWithConnection.connectionId}`) ||
            (provider && exhaustedProviders.has(provider))
          ) {
            clearStaleLKGP(combo.name, target.executionKey, combo.id, log, "COMBO");
          }

          // #2101: Prevent infinite fallback loops with 400 Bad Request errors that are genuinely
          // body-specific (malformed JSON, bad format, missing required fields).
          // These should NOT stop the combo:
          // - Context overflow: different models have different context windows
          // - Max_tokens / param errors: different models have different output limits
          // - Model access denied / "not supported": different providers serve different
          //   model sets — keep the model in the combo and try the next target (#5249).
          // Wrapper words like "invalid" / "bad request" still stop only when the text is
          // NOT model-scoped (e.g. "invalid message format").
          if (
            result.status === 400 &&
            fallbackResult.shouldFallback &&
            !isContextOverflow400(errorText) &&
            !isParamValidation400(errorText) &&
            !isModelScoped400(errorText) &&
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
              kind: classifyComboOutcome(result.status, errorText),
            });
            lastStatus = result.status;
            if (i > 0) fallbackCount++;
            log.warn("COMBO", `Model ${modelStr} failed with body-specific error, stopping combo`);
            clearStaleLKGP(combo.name, target.executionKey, combo.id, log, "COMBO");
            // #4279: surface the 400 via the {ok,response} contract so the OUTER
            // target loop resolves the combo and stops. A bare `break` here only
            // exits the inner retry loop; executeTarget then returns null, which
            // the outer loop treats as "this target produced nothing" and advances
            // to the next model — so the guard failed to stop fallback and a combo
            // of N body-rejecting targets tried all N. Mirrors the 499 path above.
            return { ok: false, response: result };
          }

          // A model-scoped 400 ("The requested model is not supported" / "not
          // available for integrator") is permanent for THIS connection — the
          // account/integration will not gain support for the model mid-session.
          // Combo still advances to the next target immediately (unchanged,
          // preserves #5249's cross-provider fallback), but without a lockout
          // here the SAME dead model gets retried on every future, separate
          // request forever (observed: every auto-combo request wasted several
          // upstream 400s on the same GitHub models, all day). isModelLocked()
          // is checked before dispatch (see the pre-check above this loop), so
          // this lockout is honored on the next request.
          if (result.status === 400 && isModelScoped400(errorText) && provider && rawModel) {
            lockModelIfPerModelQuota(
              provider,
              targetWithConnection.connectionId || "",
              rawModel,
              "model_capacity",
              60 * 60 * 1000 // 1h
            );
          }

          // Trigger shared provider circuit breaker for 5xx errors and connection failures. If the
          // next target is on the same provider, don't mark it failed (a different model may still
          // succeed) — #8376: EXCEPT a proxy-unreachable failure, which poisons every model alike.
          // G-02: when fallbackResult.skipProviderBreaker is set (embedded service supervisor outage
          // signalled via X-Omni-Fallback-Hint: connection_cooldown) apply cooldown only — never trip.
          const nextTarget = orderedTargets[i + 1];
          const sameProviderNext =
            typeof nextTarget?.provider === "string" && nextTarget.provider === provider;
          if (
            shouldRecordProviderBreakerFailure({
              isStreamReadinessFailure,
              isStreamEarlyEof,
              status: result.status,
              sameProviderNext,
              skipProviderBreaker: fallbackResult.skipProviderBreaker,
              requestScopedFailure: scopedFailure,
              error: errorText,
              isProxyUnreachable: structuredError?.code === "proxy_unreachable",
            })
          ) {
            const isQueueTimeout =
              errorText.includes("RATE_LIMIT_QUEUE_TIMEOUT") ||
              errorText.includes("RATE_LIMIT_QUEUE_WEDGED");
            recordProviderFailure(provider, log, targetWithConnection.connectionId, profile, {
              isQueueTimeout,
              isNetworkError: structuredError?.code === "proxy_unreachable",
            });
          }

          const quotaExhausted = await isQuotaExhaustionResponse(
            result,
            provider,
            rawModel,
            profile
          );
          recordQuotaExhaustionClassification(result, quotaExhausted);
          observeFailure(quotaExhausted, target.executionKey);

          // Check if this is a transient error worth retrying on same model.
          // A token-limit 429 is terminal for the client — never retry it.
          const isTransient =
            !isStreamReadinessFailure &&
            !isTokenLimitBreach &&
            !scopedFailure &&
            [408, 429, 500, 502, 503, 504].includes(result.status);
          // failoverBeforeRetry means what it says: prefer the next sibling
          // target over hammering this one again. Without this check, a
          // transient error always re-hit the SAME model up to maxRetries
          // times regardless of the setting — config.failoverBeforeRetry was
          // threaded through to skipUpstreamRetry (a different, lower-level
          // retry mechanism) but never consulted here, so a rate-limited
          // model got maxRetries+1 back-to-back attempts on itself before
          // this loop's own fallback-to-next-target ever ran (#2417). Only
          // skip the same-model retry when `nextTarget` (computed above)
          // actually gives us somewhere to fail over to — with no sibling
          // left, skipping just burns the last attempt for nothing.
          //
          // #10217 round-4 fix: this guard reads `failoverBeforeRetryExplicit`
          // (opt-in only), NOT `config.failoverBeforeRetry` — that field
          // defaults to true for the separate skipUpstreamRetry mechanism
          // (see DEFAULT_COMBO_CONFIG comment in comboConfig.ts) and reading
          // it here would silently skip the same-model retry for every combo,
          // not just ones that explicitly opted in.
          if (
            retry < maxRetries &&
            isTransient &&
            !providerExhausted &&
            (!config.failoverBeforeRetryExplicit || !nextTarget)
          ) {
            if (
              !protectedPriorityTarget &&
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
              lastStatus = result.status;
              if (i > 0) fallbackCount++;
              return null;
            }
            // Record model lockout immediately on the first transient failure —
            // once the model is cooling down, retrying it would waste an upstream
            // call and extend the cooldown via exponential backoff.
            let lockoutRecorded = false;
            if (!protectedPriorityTarget && provider && rawModel && retry === 0 && !scopedFailure) {
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
                    // the short base cooldown / exponential backoff when present. #7940's
                    // maxCooldownMs cap only applies to synthetic values — a verified
                    // upstream reset (lockoutHintVerified) bypasses it.
                    exactCooldownMs: selectLockoutCooldownMs(lockoutHintMs, mlSettings),
                    maxCooldownMs: mlSettings.maxCooldownMs,
                    // Preserve authoritative structured/header resets; clamp body prose.
                    exactCooldownIsUpstreamReset: lockoutHintVerified,
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
              lastStatus = result.status;
              if (i > 0) fallbackCount++;
              return null;
            }
            continue; // Retry same model (transient error, no lockout recorded)
          }

          // Done retrying this model
          const protectedTargetTrust = targetFailureTrust.get(target.executionKey);
          if (
            protectedPriorityTarget &&
            (!protectedTargetTrust?.observedFailure ||
              !protectedTargetTrust.allObservedFailuresQuota)
          ) {
            recordComboRequest(combo.name, modelStr, {
              success: false,
              latencyMs: Date.now() - startTime,
              fallbackCount,
              strategy,
              target: toRecordedTarget(target),
            });
            recordedAttempts++;
            return { ok: false, response: result };
          }
          recordComboRequest(combo.name, modelStr, {
            success: false,
            latencyMs: Date.now() - startTime,
            fallbackCount,
            strategy,
            target: toRecordedTarget(target),
          });
          // LKGP (#919) mirror of the success-path set below: a just-failed target
          // must not keep re-pinning itself as the "last known good" choice for the
          // *next* separate request. Circuit breaker / model lockout deliberately
          // don't react to request-scoped failure classes (see scopedFailure below),
          // so nothing else clears this stale pin.
          clearStaleLKGP(combo.name, target.executionKey, combo.id, log, "COMBO");
          recordedAttempts++;
          lastError = errorText || String(result.status);
          comboErrors.push({
            model: modelStr,
            status: result.status,
            error: errorText || String(result.status),
            kind: classifyComboOutcome(result.status, errorText),
          });
          lastStatus = result.status;
          if (i > 0) fallbackCount++;
          // Wire combo failures into the resilience dashboard (model-level lockout)
          // alongside the provider-level cooldown below — they govern different scopes.
          if (provider && rawModel && !scopedFailure) {
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
                  // #7940's maxCooldownMs cap only applies to synthetic values — a verified
                  // upstream reset (lockoutHintVerified) bypasses it.
                  exactCooldownMs: selectLockoutCooldownMs(lockoutHintMs, mlSettings),
                  maxCooldownMs: mlSettings.maxCooldownMs,
                  // Preserve authoritative structured/header resets; clamp body prose.
                  exactCooldownIsUpstreamReset: lockoutHintVerified,
                }
              );
            }
          }
          log.warn("COMBO", `Model ${modelStr} failed, trying next`, {
            status: result.status,
            errorBody: redactConnectionLabel(errorText),
          });

          // #5976: per-model-quota providers (Gemini, GitHub, etc.) multiplex models
          // behind one connection. A model-level 500 or 429 (RPM) must NOT cool down
          // the entire provider — sibling models may still succeed. Skip cooldown
          // recording for these providers on 500/429 errors so the next target can try.
          if (
            resilienceSettings.providerCooldown.enabled &&
            provider &&
            provider !== "unknown" &&
            !scopedFailure &&
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
          // G2 (silent-stop fix): never leave the speculative loop waiting on an
          // unresolved globalPromise. If a task throws unexpectedly (outside
          // executeTarget's error handling) and no other task succeeds, the post-loop
          // `Promise.race([globalPromise, ...])` would hang forever. Resolve with a
          // 502 so the request terminates with an actionable error.
          if (!anySuccess && globalResolve) {
            anySuccess = true;
            globalResolve(errorResponse(502, `Combo target ${i} failed with an unexpected error`));
          }
        });

        runningTasks.add(task);
        task.finally(() => runningTasks.delete(task));

        if (
          zeroLatencyOptimizationsEnabled &&
          config.hedging &&
          !hasProtectedPriorityTarget &&
          i + 1 < orderedTargets.length
        ) {
          const hedgeDelay = resolveDelayMs(config.hedgeDelayMs, 500);
          let timeoutResolve: () => void;
          const timeoutPromise = new Promise<void>((r) => {
            timeoutResolve = r;
            setTimeout(r, hedgeDelay);
          });
          await Promise.race([task, globalPromise, timeoutPromise, loopSafetyPromise]);
        } else {
          await Promise.race([task, globalPromise, loopSafetyPromise]);
        }
        markLoopExpiredIfSafetyFired();

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
        // G1: include loopSafetyPromise so a hung last task (per-model timeout
        // disabled) cannot freeze this post-loop race forever.
        await Promise.race([globalPromise, Promise.all([...runningTasks]), loopSafetyPromise]);
        markLoopExpiredIfSafetyFired();
      }

      // G1: if the safety timer won the race (request would otherwise hang), give
      // in-flight tasks a short drain window to land their per-model errors into
      // comboErrors so the 504 carries the same "tried: a (500)" summary the
      // regular comboExpired branch produces — then return the safety 504.
      if (loopSafetyFired && !anySuccess) {
        if (runningTasks.size > 0) {
          await Promise.race([
            Promise.allSettled([...runningTasks]),
            new Promise((resolve) => setTimeout(resolve, COMBO_SAFETY_DRAIN_MS)),
          ]);
        }
        const summary = comboErrors
          .slice(0, 5)
          .map((e) => `${e.model} (${e.status})`)
          .join(", ");
        const msg =
          `Combo global timeout (${loopSafetyMs}ms) after ${recordedAttempts}/${orderedTargets.length} targets` +
          (comboErrors.length > 0
            ? ` | tried: ${summary}${comboErrors.length > 5 ? `... (+${comboErrors.length - 5})` : ""}`
            : "") +
          " without a terminal response";
        return errorResponseWithComboDiagnostics(504, msg, buildComboDiag("combo_timeout"), {
          code: "COMBO_TIMEOUT",
          type: "server_error",
        });
      }

      // #10681: finalize the decision trace (success).
      finalizeComboTrace(traceInvocationId, orderedTargets);
      finishComboTrace(traceInvocationId, { status: 200 });
      if (anySuccess) {
        // G1: clear the safety timer on the happy path so a successful combo does
        // not leave a 10-minute timer alive per request.
        if (loopSafetyTimer) {
          clearTimeout(loopSafetyTimer);
          loopSafetyTimer = null;
        }
        return await globalPromise;
      }

      // #10681: finalize the decision trace (global timeout).
      finalizeComboTrace(traceInvocationId, orderedTargets);
      finishComboTrace(traceInvocationId, { status: 504 });
      // Global combo timeout: return aggregated error immediately, skipping set retries.
      if (comboExpired) {
        const summary = buildRedactedSummary(comboErrors);
        const msg =
          `Combo global timeout (${comboTimeoutMs}ms) after ${recordedAttempts}/${orderedTargets.length} targets` +
          (comboErrors.length > 0 ? ` | tried: ${summary}` : "");
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

      if (!lastStatus && recordedAttempts === 0 && comboCooldownWaitEnabled) {
        const circuitOpenWait = resolveCircuitOpenWaitDecision({
          skippedForCircuitOpen,
          retryAfterMs: earliestCircuitOpenRetryMs,
          attempt: comboCooldownAttempt,
          budgetLeftMs: comboCooldownBudgetLeftMs,
          settings: resilienceSettings.comboCooldownWait,
        });
        if (circuitOpenWait.wait) {
          log.info(
            "COMBO",
            `${strategy} circuit-open wait: waiting ${Math.ceil(circuitOpenWait.waitMs / 1000)}s (reason=${circuitOpenWait.reason ?? "circuit_open"}) then retrying (attempt ${comboCooldownAttempt + 1}/${resilienceSettings.comboCooldownWait.maxAttempts})`
          );
          const completed = await waitForCooldownAwareRetry(circuitOpenWait.waitMs, signal);
          if (!completed) {
            return errorResponse(499, "Request aborted");
          }
          comboCooldownAttempt += 1;
          comboCooldownBudgetLeftMs = Math.max(
            0,
            comboCooldownBudgetLeftMs - circuitOpenWait.waitMs
          );
          return dispatchWithCooldownRetry();
        }
      }

      // All set retries exhausted — return the final error
      // #10681: finalize the decision trace (all targets failed or skipped).
      finalizeComboTrace(traceInvocationId, orderedTargets);
      finishComboTrace(traceInvocationId, { status: 503 });
      if (!lastStatus) {
        if (recordedAttempts === 0) {
          notifyWebhookEvent("request.failed", {
            combo: combo.name,
            reason: "ALL_TARGETS_SKIPPED",
            latencyMs,
            fallbackCount,
          });
          return withQuotaExhaustionClassification(
            errorResponseWithComboDiagnostics(
              503,
              "Service temporarily unavailable: all targets were skipped by pre-dispatch filters",
              buildComboDiag("all_targets_skipped"),
              { code: "ALL_TARGETS_SKIPPED", type: "service_unavailable" }
            ),
            observedFailure ? allObservedFailuresQuota : null
          );
        }
        notifyWebhookEvent("request.failed", {
          combo: combo.name,
          reason: "ALL_ACCOUNTS_INACTIVE",
          latencyMs,
          fallbackCount,
        });
        recordComboFailure(effectiveSessionId, combo.name);
        return errorResponseWithComboDiagnostics(
          503,
          "Service temporarily unavailable: all upstream accounts are inactive",
          buildComboDiag("all_accounts_inactive"),
          { code: "ALL_ACCOUNTS_INACTIVE", type: "service_unavailable" }
        );
      }

      // #10501: derive the terminal HTTP status from the structured per-target
      // outcomes instead of `lastStatus` (whichever target happened to fail
      // LAST). A 4xx is preserved only when the request itself is genuinely
      // invalid across every eligible target; a heterogeneous mix of failure
      // classes (e.g. a quality failure + a sibling's 401) normalizes to a
      // 5xx-class status reflecting an infra/provider problem, not a client
      // error. See comboErrorAggregation.ts::resolveComboTerminalStatus.
      const status = resolveComboTerminalStatus(comboErrors, lastStatus);
      // #10314: build the terminal message from the structured per-target
      // outcomes (each distinct class+reason listed separately) instead of
      // mashing a single lastError with raw `[model (status)]` markers. Connection
      // identifiers are redacted. Falls back to lastError when no target recorded
      // a structured outcome.
      const msg = formatComboOutcomes(comboErrors) || lastError || "All combo models unavailable";

      // Cooldown-aware retry: instead of crystallizing a transient failure, wait
      // out a SHORT cooldown and re-run the whole set loop. Guarded by the helper
      // (quota_exhausted/auth/not-found excluded, ceiling, attempts, budget).
      // MAX_GLOBAL_ATTEMPTS still bounds total dispatches. Available to ALL combo
      // strategies when enabled — entry is driven by earliestRetryAfter + the
      // real model-lockout reason, NOT by whichever target last overwrote
      // `status` (a later 403 must not skip the allow-list check for an earlier
      // 429's retry-after hint). SECURITY (see comboCooldownRetry.ts header): the
      // allow-list is the PRIMARY barrier and `maxWaitMs` only the SECOND one.
      // Hardcoding reason:"rate_limit" would drop the primary barrier and leave
      // only the ceiling — which does NOT cover a quota_exhausted lock carrying a
      // SHORT upstream retry-after. Model lockouts are recorded for all strategies,
      // so the real reason is always available.
      if (comboCooldownWaitEnabled && earliestRetryAfter) {
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

      // #10681: finalize the decision trace with the aggregated terminal status.
      finalizeComboTrace(traceInvocationId, orderedTargets);
      finishComboTrace(traceInvocationId, { status });
      // Retry-after decoration is separate from the wait decision above: only
      // rate-limit-class final statuses may carry a `(reset after ...)` suffix
      // (see unavailableRetryGate.ts — do not stitch a peer target's window onto
      // a config-class status like 403/422).
      if (earliestRetryAfter && isRetryAfterEligibleStatus(status)) {
        const retryHuman = formatRetryAfter(toRetryAfterDisplayValue(earliestRetryAfter));
        log.warn("COMBO", `All models failed | ${msg} (${retryHuman})`);
        return withQuotaExhaustionClassification(
          unavailableResponse(status, msg, earliestRetryAfter, retryHuman),
          observedFailure ? allObservedFailuresQuota : null
        );
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
      // #10966: when every observed failure was independently classified as quota/
      // balance exhaustion (isQuotaExhaustionResponse, tracked via observeFailure's
      // allObservedFailuresQuota accumulator), stamp a stable `quota_exhausted`
      // terminalReason instead of forwarding the raw upstream error string. The raw
      // string falls through buildRecoveryHint's default branch ("retry" / "failed
      // transiently"), which is actively misleading for a durable wallet/quota
      // exhaustion — retrying the same combo will never refill it.
      const terminalReason =
        observedFailure && allObservedFailuresQuota
          ? "quota_exhausted"
          : (lastError ?? "all_models_failed");
      return withQuotaExhaustionClassification(
        errorResponseWithComboDiagnostics(
          status,
          msg,
          buildComboDiag(terminalReason, retryAfterSeconds)
        ),
        observedFailure ? allObservedFailuresQuota : null
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
    } finally {
      // #11804: always release the loop-safety timer. Covering every exit path by
      // construction here means a future `return` added to this function cannot
      // silently reintroduce the leak.
      if (activeLoopSafetyTimer) {
        clearTimeout(activeLoopSafetyTimer);
        activeLoopSafetyTimer = null;
      }
    }
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
    // #11371: release the in-flight slot quota-share ordering reserved for its
    // winner — the counter must not leak monotonically upward across requests.
    targetResolution.quotaShareRelease?.();
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
  apiKeyAllowedConnections = null,
  nesting = null,
  hiddenModelsByProvider = getHiddenModelsByProvider(),
  clientManagedResponsesContext,
  deferContextOverflowWhenCompressible = false,
  compressionExclusions,
  sourceFormat = null,
  endpointPath = null,
  requestHeaders = null,
  relayOptions,
  perTargetAdmission = null,
}: HandleRoundRobinOptions): Promise<Response> {
  const config = settings
    ? resolveComboConfig(combo, settings)
    : {
        ...getDefaultComboConfig(),
        ...(combo.config || {}),
        // See resolveComboConfig's failoverBeforeRetryExplicit comment in
        // comboConfig.ts (no `settings` here, so only the combo's own config
        // can opt in).
        failoverBeforeRetryExplicit:
          (combo.config as Record<string, unknown> | undefined)?.failoverBeforeRetry === true,
      };
  // #9158: clamp combo-level concurrency to a sane bound — a config carrying a
  // huge or negative value would otherwise open an unbounded semaphore and
  // flood targets (or deadlock at 0).
  const concurrency = Math.min(Math.max(config.concurrencyPerModel ?? 3, 1), 32);
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

  let orderedTargets = resolveComboTargets(
    rrExpandedCombo,
    rrExpandedAllCombos,
    clampComboDepth(config.maxComboDepth),
    hiddenModelsByProvider
  );
  // Connection-aware expansion is opt-in. RR runs outside
  // resolveComboTargetPipeline, so it wires the same stage here. Rotation
  // granularity becomes model x connection: rrStartIndex takes mod over the
  // expanded list, so each account occupies its own rotation slot.
  orderedTargets = await expandTargetsForAllStrategies({
    strategy: "round-robin",
    targets: orderedTargets,
    comboName: combo.name,
    config: combo.config,
    settings: settings as Record<string, unknown> | null | undefined,
    log,
    apiKeyAllowedConnectionIds: apiKeyAllowedConnections,
  });
  const tagFilteredTargets = await applyRequestTagRouting(orderedTargets, body, log);
  const evalRankedTargets = orderTargetsByEvalScores(tagFilteredTargets, config.evalRouting, log);
  // Align with the main/auto paths: combo config OR top-level settings (#8488 / #8494).
  const rrCompatFailOpen =
    (config as { compatFilterFailOpen?: unknown }).compatFilterFailOpen === true ||
    (settings as { compatFilterFailOpen?: unknown } | null | undefined)?.compatFilterFailOpen ===
      true;
  let filteredTargets = filterTargetsByRequestCompatibility(
    evalRankedTargets,
    body,
    log,
    "Context-aware round-robin fallback",
    { failOpen: rrCompatFailOpen }
  );
  // #6238: keep the targets the compat pre-filter rejected so they can serve as a
  // last-resort fallback tier. The pre-filter drops request-incompatible targets
  // BEFORE availability is known; if every compat-kept target then turns out to be
  // runtime-unavailable, we must reconsider these before returning 503, instead of
  // permanently dropping a compat-rejected-but-healthy provider.
  const compatRejectedTargets = computeCompatRejectedTargets(
    evalRankedTargets,
    filteredTargets,
    body
  );
  let modelCount = filteredTargets.length;
  if (modelCount === 0) {
    const exhaustion = describeCapabilityFilterExhaustion(
      evalRankedTargets,
      body,
      rrExpandedCombo?.name || combo?.name
    );
    if (exhaustion) {
      return errorResponseWithComboDiagnostics(
        400,
        exhaustion.message,
        {
          poolSize: evalRankedTargets.length,
          attempted: 0,
          excluded: exhaustion.excluded,
          attemptOrder: [],
          terminalReason: exhaustion.terminalReason,
        },
        { code: "capability_mismatch", type: "invalid_request_error" }
      );
    }
    return comboModelNotFoundResponse("Round-robin combo has no executable targets");
  }

  scheduleShadowRouting(
    combo,
    config,
    body,
    resolveShadowTargets(combo, config, allCombos, hiddenModelsByProvider),
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
  if (disableSessionStickiness) {
    clearStickyBindingsForCombo(combo.name);
  }
  const _rrSessionSticky = disableSessionStickiness
    ? ({ targets: filteredTargets, messageHash: null, stuck: false } as const)
    : await applySessionStickiness(
        filteredTargets,
        // #7270: normalize both wire shapes (.messages / Responses-API .input) so RR
        // stickiness engages on the /v1/responses surface, not just Chat Completions.
        normalizeStickinessMessages(body as { messages?: unknown; input?: unknown }),
        combo.name
      );
  const rrAffinity = applyPromptCacheAffinity(
    filteredTargets,
    body,
    rrAffinityEnabled,
    "global",
    relayOptions?.sessionId
  );
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
  // #11134: operator-configurable shared attempt budget (clamped to the hard
  // cap). Defaults to MAX_GLOBAL_ATTEMPTS when unset.
  const maxGlobalAttempts = clampGlobalAttempts(config.maxGlobalAttempts);
  // #10314: per-target outcome accumulator for the round-robin twin so the
  // terminal message lists each distinct reason separately (see the quality path
  // and the "Done with this model" path below), mirroring handleComboChat.
  const rrOutcomes: Array<ComboErrorEntry> = [];

  // G4 (silent-stop fix): round-robin has NO global timeout — a hung model
  // (per-model timeout disabled via targetTimeoutMs: 0) would freeze the request
  // forever with no response. Safety promise + timer bound the whole loop; when
  // it fires, rrExpired flips and every subsequent model attempt short-circuits
  // to the 504. Cleaned up in the loop's finally.
  const rrConfiguredTimeoutMs = (config as { comboTimeoutMs?: number }).comboTimeoutMs ?? 0;
  const rrLoopSafetyMs =
    rrConfiguredTimeoutMs > 0 ? rrConfiguredTimeoutMs : COMBO_LOOP_SAFETY_TIMEOUT_MS;
  let rrExpired = false;
  let rrLoopSafetyTimer: ReturnType<typeof setTimeout> | null = null;
  let rrResolveSafety: ((res: Response) => void) | null = null;
  const rrSafetyPromise = new Promise<Response>((resolve) => {
    rrResolveSafety = resolve;
  });
  rrLoopSafetyTimer = setTimeout(() => {
    rrExpired = true;
    log.warn(
      "COMBO-RR",
      `Round-robin loop exceeded ${rrLoopSafetyMs}ms without a terminal response — force-terminating`
    );
    rrResolveSafety?.(
      errorResponse(
        504,
        `Round-robin combo exceeded ${rrLoopSafetyMs}ms without a terminal response`
      )
    );
  }, rrLoopSafetyMs);
  rrLoopSafetyTimer.unref?.();

  // #1731: Per-request in-memory set of providers whose quota is fully exhausted.
  // When a target returns a quota-exhausted 429, remaining targets from the same
  // provider are skipped to avoid the cascade through N same-provider targets.
  const exhaustedProviders = new Set<string>();
  const exhaustedConnections = new Set<string>();
  const transientRateLimitedProviders = new Set<string>();

  // Try each model starting from the round-robin target
  try {
    for (let offset = 0; offset < modelCount; offset++) {
      // G4: stop launching new work once the safety timer fired.
      if (rrExpired) break;
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
          clearStaleLKGP(combo.name, target.executionKey, combo.id, log, "COMBO-RR");
          if (offset > 0) fallbackCount++;
          continue;
        }
      }

      if (
        resilienceSettings.providerCooldown.enabled &&
        Boolean(provider && provider !== "unknown") &&
        isProviderInCooldown(
          provider,
          target.connectionId as string | undefined,
          resilienceSettings
        )
      ) {
        log.info("COMBO-RR", `Skipping ${modelStr} — provider ${provider} in global cooldown`);
        clearStaleLKGP(combo.name, target.executionKey, combo.id, log, "COMBO-RR");
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
        clearStaleLKGP(combo.name, target.executionKey, combo.id, log, "COMBO-RR");
        if (offset > 0) fallbackCount++;
        continue;
      }

      // #9654 Wave 2: per-target lane-aware admission probe (see executeTarget
      // for the full contract — strictly non-blocking, lanes-off no-op).
      if (
        perTargetAdmission &&
        !(await perTargetAdmission({ modelStr, executionKey: target.executionKey, body }))
      ) {
        log.info("COMBO-RR", `Skipping ${modelStr} — admission lane full (#9654)`);
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
          if (globalAttempts > maxGlobalAttempts) {
            log.warn(
              "COMBO-RR",
              `Maximum combo attempts (${maxGlobalAttempts}) exceeded. Terminating loop to prevent runaway requests.`
            );
            return errorResponseWithComboDiagnostics(503, "Maximum combo retry limit reached", {
              poolSize: modelCount,
              attempted: globalAttempts,
              excluded: [
                ...[...exhaustedProviders].map((p) => ({ provider: p, reason: "exhausted" })),
                ...[...exhaustedConnections].map((c) => formatExhaustedConnectionKey(String(c))),
              ],
              attemptOrder: rrOutcomes.map((o) => ({
                provider: o.model.split("/")[0] || "unknown",
                model: o.model,
              })),
              terminalReason: "max_attempts_exceeded",
              recovery: buildRecoveryHint("max_attempts_exceeded"),
            });
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
          // #7847: UNCONDITIONAL — copying only when the buffer changed max_tokens left every
          // other attempt sharing the caller's object, leaking chatCore's `body.model` forward.
          let attemptBody = { ...(body as Record<string, unknown>) } as typeof body;
          {
            const bodyRecord = attemptBody as Record<string, unknown>;
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
              // Safe to write in place: bodyRecord is the per-attempt copy above, not the caller's.
              bodyRecord.max_tokens = bufferedMaxTokens;
              log.info(
                "COMBO-RR",
                `Reasoning model ${modelStr}: adjusted max_tokens ${currentMaxTokens} -> ${bufferedMaxTokens}`
              );
            }
          }

          // #5501: combo system_message template expansion per target (same gate
          // as the main iteration loop — round-robin branches here, not executeTarget).
          attemptBody = expandComboSystemPromptIfPresent(attemptBody, combo, {
            modelId: modelStr,
            providerId: provider !== "unknown" ? provider : "",
            account:
              typeof target.label === "string" && target.label.trim().length > 0
                ? target.label.trim()
                : "",
            fingerprint: resolveTargetFingerprint(target) ?? "",
          });

          const result = await Promise.race([
            handleSingleModel(attemptBody, modelStr, {
              ...targetForAttempt,
              effectiveComboStrategy: "round-robin",
              failoverBeforeRetry: config.failoverBeforeRetry,
            }),
            rrSafetyPromise,
          ]);
          if (rrExpired) return result; // G4: safety timer won — stop everything

          // Quota-aware scheduling: reserve the estimated budget for this
          // dispatch (opt-in, same env gate as the pre-request check). Best-effort
          // and non-blocking — recording must never break the request path.
          if (
            process.env.OMNIROUTE_QUOTA_AWARE_ROUTING === "1" &&
            target.connectionId &&
            attemptBody &&
            typeof attemptBody === "object"
          ) {
            try {
              const { reserveQuota } = await import("../../src/lib/quota/quotaScheduler.ts");
              reserveQuota(target.connectionId, modelStr, attemptBody as Record<string, unknown>, {
                tokenLimit: await resolveTargetTokenLimit(target),
              });
            } catch {
              // best-effort only
            }
          }

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
              lastStatus = 502;
              rrOutcomes.push({
                model: modelStr,
                status: 502,
                error: quality.reason || "upstream response failed quality validation",
                kind: "quality",
              });
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
                  const { setLKGP } = await import("@/lib/db/settings");
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
          const isTokenLimitBreach =
            result.status === 429 && isTokenLimitBreachErrorBody(errorBody);
          const isLocalQueueCapacity = isLocalQueueCapacityErrorBody(errorBody);

          if (isLocalQueueCapacity) {
            log.info(
              "COMBO-RR",
              `Local rate-limit queue capacity reached for ${modelStr} — returning without upstream fallback`
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
          const scopedFailure = isScopedFailure(result, errorText, structuredError);
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
            requestScopedFailure: scopedFailure,
            sets: { exhaustedProviders, exhaustedConnections, transientRateLimitedProviders },
            log,
            tag: "COMBO-RR",
            exhaustedLogLevel: "debug",
            structuredError,
          });
          // #6692: mirrors handleComboChat's exhaustion-point release above.
          releaseStickyPinOnFailure(
            _rrSessionSticky.messageHash,
            targetWithConnection.connectionId
          );
          if (
            providerExhausted ||
            exhaustedConnections.has(`${provider}:${targetWithConnection.connectionId}`) ||
            (provider && exhaustedProviders.has(provider))
          ) {
            clearStaleLKGP(combo.name, target.executionKey, combo.id, log, "COMBO-RR");
          }

          // Transient errors → mark in semaphore so round-robin stops stampeding this target.
          if (
            !isStreamReadinessFailure &&
            !isTokenLimitBreach &&
            !scopedFailure &&
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
            !scopedFailure &&
            [408, 429, 500, 502, 503, 504].includes(result.status);
          // See the same guard's comment in the "auto" strategy loop above —
          // failoverBeforeRetry must prevent this same-model retry too, not
          // just the lower-level skipUpstreamRetry mechanism. Only skip when
          // `offset + 1 < modelCount` means a sibling target is actually left
          // in this rotation; with none left, skipping just wastes the attempt.
          // #10217 round-4 fix: opt-in only — read failoverBeforeRetryExplicit,
          // not config.failoverBeforeRetry (see comboConfig.ts comment).
          const hasNextRrTarget = offset + 1 < modelCount;
          if (
            retry < maxRetries &&
            isTransient &&
            !providerExhausted &&
            (!config.failoverBeforeRetryExplicit || !hasNextRrTarget)
          ) {
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
          // LKGP (#919) mirror of handleComboChat's failure-path clear above — see
          // that comment for why this must happen (nothing else clears a pin left
          // by a request-scoped failure class like a stream-readiness timeout).
          clearStaleLKGP(combo.name, target.executionKey, combo.id, log, "COMBO-RR");
          recordedAttempts++;
          lastError = errorText || String(result.status);
          lastStatus = result.status;
          rrOutcomes.push({
            model: modelStr,
            status: result.status,
            error: errorText || String(result.status),
            kind: classifyComboOutcome(result.status, errorText),
          });
          if (offset > 0) fallbackCount++;
          log.warn("COMBO-RR", `${modelStr} failed, trying next model`, {
            status: result.status,
            errorBody: redactConnectionLabel(errorText),
          });

          if (
            resilienceSettings.providerCooldown.enabled &&
            provider &&
            provider !== "unknown" &&
            !scopedFailure &&
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
  } catch (err) {
    // G4: unexpected exception in the round-robin loop must never crash the
    // request silently — surface a 500 instead of hanging the client.
    log.error?.("COMBO-RR", "Unexpected error in round-robin loop", err);
    return errorResponse(500, "Unexpected error in round-robin combo");
  } finally {
    if (rrLoopSafetyTimer) {
      clearTimeout(rrLoopSafetyTimer);
      rrLoopSafetyTimer = null;
    }
  }

  // G4: if the safety timer fired between iterations (no race captured it),
  // terminate with the actionable 504 instead of the generic exhaustion path.
  if (rrExpired) {
    return errorResponse(
      504,
      `Round-robin combo exceeded ${rrLoopSafetyMs}ms without a terminal response`
    );
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
    if (recordedAttempts === 0) {
      return new Response(
        JSON.stringify({
          error: {
            message:
              "Service temporarily unavailable: all targets were skipped by pre-dispatch filters",
            type: "service_unavailable",
            code: "ALL_TARGETS_SKIPPED",
          },
        }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }
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

  // #10501: same terminal-status policy as handleComboChat — see
  // comboErrorAggregation.ts::resolveComboTerminalStatus.
  const status = resolveComboTerminalStatus(rrOutcomes, lastStatus);
  // #10314: same structured per-target aggregation as handleComboChat — list each
  // distinct reason separately (redacted), fall back to lastError when no outcome.
  const msg =
    formatComboOutcomes(rrOutcomes) || lastError || "All round-robin combo models unavailable";

  if (earliestRetryAfter && isRetryAfterEligibleStatus(status)) {
    const retryHuman = formatRetryAfter(toRetryAfterDisplayValue(earliestRetryAfter));
    log.warn("COMBO-RR", `All models failed | ${msg} (${retryHuman})`);
    return unavailableResponse(status, msg, earliestRetryAfter, retryHuman);
  }

  log.warn("COMBO-RR", `All models failed | ${msg}`);
  return new Response(JSON.stringify({ error: { message: msg } }), { status, headers: { "Content-Type": "application/json" } });
}
