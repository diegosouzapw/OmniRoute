/**
 * Shared combo (model combo) handling with fallback support
 * Supports: priority, weighted, round-robin, random, least-used, cost-optimized,
 * reset-aware, reset-window, strict-random, auto, fill-first, p2c, lkgp,
 * context-optimized, context-relay, and fusion strategies
 */

import {
  checkFallbackError,
  decayModelFailureCount,
  formatRetryAfter,
  getRuntimeProviderProfile,
  hasPerModelQuota,
  isModelLocked,
  recordProviderSuccess,
} from "./accountFallback.ts";
import {
  errorResponse,
  unavailableResponse,
  errorResponseWithComboDiagnostics,
} from "../utils/error.ts";

import { recordComboFailure } from "./combo/failureTracker.ts";
import { buildRecoveryHint } from "./combo/pinRecovery.ts";
import { formatExhaustedConnectionKey } from "./combo/comboDiagFormat.ts";
import { buildTargetTimeoutRunner } from "./combo/targetTimeoutRunner.ts";
import { recordComboRequest, getComboMetrics } from "./comboMetrics.ts";
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

import { getHiddenModelsByProvider } from "@/models";

import { evaluateQuotaCutoff, getQuotaFetcher, type QuotaInfo } from "./quotaPreflight.ts";
import { resolveProviderId } from "../../src/shared/constants/providers.ts";
import { getQuotaFetchScope } from "./antigravityQuotaFamily.ts";
import * as semaphore from "./rateLimitSemaphore.ts";
import { getCircuitBreaker } from "../../src/shared/utils/circuitBreaker";
import { parseModel } from "./model.ts";
import { rejectRetiredAutoComboCandidates } from "./modelLifecycle.ts";
import { createComboContext } from "./combo/context.ts";
import { phaseComboSetup } from "./combo/comboSetup.ts";

import { type ProviderCandidate } from "./autoCombo/scoring.ts";

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

import { makeConnectionConcurrencyResolver, lookupPositiveCap } from "./combo/concurrencyCaps.ts";
import { acquireQuotaShareConcurrencySlot } from "./combo/quotaShareConcurrency.ts";

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
  resolveComboTerminalStatus,
} from "./combo/comboErrorAggregation.ts";
import type { ComboErrorEntry } from "./combo/comboErrorAggregation.ts";

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
  getStickyRoundRobinStartIndex,
  recordStickyRoundRobinSuccess,
  resolveComboStickyRoundRobinLimit,
} from "./combo/rrState.ts";
import { expandTargetsForAllStrategies } from "./combo/connectionAwareExpansion.ts";
import {
  validateResponseQuality,
  releaseQualityClone,
  releaseRejectedQualityResponse,
  toRetryAfterDisplayValue,
} from "./combo/validateQuality.ts";
import { dispatchChaosFromCombo } from "./autoCombo/chaosEngine.ts";
import {
  TRANSIENT_FOR_SEMAPHORE,
  MAX_FALLBACK_WAIT_MS,
  MAX_GLOBAL_ATTEMPTS,
  MAX_GLOBAL_ATTEMPTS_HARD_CAP,
  COMBO_LOOP_SAFETY_TIMEOUT_MS,
  isAllAccountsRateLimitedResponse,
  clampComboDepth,
  clampGlobalAttempts,
  shouldSkipForPredictedTtft,
  shouldRecordProviderBreakerFailure,
  isComboRequestScopedFailure as isScopedFailure,
  isRequestScopedUpstreamFailure,
  shouldSkipConnDisable,
  resolveDelayMs,
  comboModelNotFoundResponse,
  isStreamReadinessFailureErrorBody,
  isTokenLimitBreachErrorBody,
  isLocalQueueCapacityErrorBody,
  toRecordedTarget,
  getExhaustedTargetSkipReason,
  quotaRemainingPercentFromQuota,
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
import { createInvocationId, getComboTrace, startComboTrace } from "./combo/decisionTrace.ts";
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
import { buildAutoQuotaThresholds } from "./combo/quotaExhaustionCutoff.ts";
import { expandTargetsByFingerprints } from "./combo/fingerprintExpansion.ts";
import { resolveComboTargetPipeline } from "./combo/targetResolution.ts";
import { dispatchWithCooldownRetry } from "./combo/comboAttemptLoop.ts";
import { evaluateExecuteTargetGates } from "./combo/executeTargetGates.ts";
import { executeTargetAttempt } from "./combo/executeTargetAttempt.ts";
import type { AttemptLoopDeps, AttemptLoopState } from "./combo/attemptLoopTypes.ts";

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
          quotaRemaining = quotaRemainingPercentFromQuota(quota, {
            provider,
            requestedModel: modelStr,
          });
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

  const comboCooldownWaitEnabled = isComboCooldownWaitEligible(
    strategy,
    resilienceSettings.comboCooldownWait
  );
  const comboCooldownAttempt = { current: 0 };
  const comboCooldownBudgetLeftMs = { current: resilienceSettings.comboCooldownWait.budgetMs };
  const comboTimeoutMs = config.comboTimeoutMs || 0;
  const comboStartTime = Date.now();

  const state: AttemptLoopState = {
    orderedTargets,
    fallbackCount: 0,
    recordedAttempts: 0,
    comboErrors: [],
    lastError: null,
    lastStatus: null,
    earliestRetryAfter: null,
    comboExpired: false,
    exhaustedProviders: new Set(),
    exhaustedConnections: new Set(),
    transientRateLimitedProviders: new Set(),
    abortControllers: new Map(),
    dispatchedTargets: new Set(),
    targetFailureTrust: new Map(),
    comboAttemptOrder,
    skippedForCircuitOpen: false,
    earliestCircuitOpenRetryMs: 0,
    globalAttempts: 0,
    observedFailure: false,
    allObservedFailuresQuota: true,
    observeFailure(quotaExhausted, targetExecutionKey) {
      this.observedFailure = true;
      this.allObservedFailuresQuota &&= quotaExhausted;
      if (!targetExecutionKey) return;
      const trust = this.targetFailureTrust.get(targetExecutionKey) ?? {
        observedFailure: false,
        allObservedFailuresQuota: true,
      };
      trust.observedFailure = true;
      trust.allObservedFailuresQuota &&= quotaExhausted;
      this.targetFailureTrust.set(targetExecutionKey, trust);
    },
  };

  const deps: AttemptLoopDeps = {
    strategy,
    combo,
    config: config as AttemptLoopDeps["config"],
    log,
    settings: settings ?? null,
    resilienceSettings,
    sticky: _sticky,
    effectiveSessionId,
    preScreenMap,
    quotaCutoffResetWindowConfig,
    maxRetries,
    traceInvocationId,
    clientRequestedStream,
    handleSingleModelWithTimeout,
    isModelAvailable,
    perTargetAdmission,
    signal,
    body: body as Record<string, unknown>,
    startTime: comboStartTime,
    releaseStickyPinOnFailure,
    clearStaleLKGP,
    clientManagedResponsesContext,
    reasoningTokenBufferEnabled,
    stickyWeightedLimit,
    getWeightedStepKeyForTarget,
    universalHandoffConfig,
    relayOptions,
    relayConfig,
  };

  const extra = {
    maxSetRetries,
    setRetryDelayMs,
    comboTimeoutMs,
    comboStartTime,
    comboCooldownWaitEnabled,
    comboCooldownAttempt,
    comboCooldownBudgetLeftMs,
    evaluateGates: evaluateExecuteTargetGates,
    executeAttempt: executeTargetAttempt,
  };

  const quotaShareConcurrencyEnabled =
    strategy === "quota-share" && resilienceSettings.quotaShareConcurrencyLimit.enabled;

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
    return await dispatchWithCooldownRetry({ state, deps, extra });
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
  nesting: _nesting = null,
  hiddenModelsByProvider = getHiddenModelsByProvider(),
  clientManagedResponsesContext: _clientManagedResponsesContext,
  deferContextOverflowWhenCompressible: _deferContextOverflowWhenCompressible = false,
  compressionExclusions: _compressionExclusions,
  sourceFormat: _sourceFormat = null,
  endpointPath: _endpointPath = null,
  requestHeaders: _requestHeaders = null,
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
  return new Response(JSON.stringify({ error: { message: msg } }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
