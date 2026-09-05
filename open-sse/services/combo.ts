/**
 * Shared combo (model combo) handling with fallback support
 * Supports: priority, weighted, round-robin, random, least-used, cost-optimized,
 * reset-aware, reset-window, strict-random, auto, fill-first, p2c, lkgp,
 * context-optimized, context-relay, and fusion strategies
 */

import { errorResponseWithComboDiagnostics } from "../utils/error.ts";

import { recordComboFailure } from "./combo/failureTracker.ts";
import { buildRecoveryHint } from "./combo/pinRecovery.ts";
import { buildTargetTimeoutRunner } from "./combo/targetTimeoutRunner.ts";
import { getComboMetrics } from "./comboMetrics.ts";
import { qualityScoreFor } from "./routing/index.ts";
import {
  resolveComboQueueDepth,
  isComboCooldownWaitEligible,
  resolveComboTargetTimeoutMsForCombo,
} from "./comboConfig.ts";

import { getHiddenModelsByProvider } from "@/models";

import {
  evaluateQuotaCutoff,
  getQuotaFetcher,
  type QuotaInfo,
} from "./quotaPreflight.ts";
import { resolveProviderId } from "../../src/shared/constants/providers.ts";
import { getQuotaFetchScope } from "./antigravityQuotaFamily.ts";
import { getCircuitBreaker } from "../../src/shared/utils/circuitBreaker";
import { parseModel } from "./model.ts";
import { rejectRetiredAutoComboCandidates } from "./modelLifecycle.ts";
import { createComboContext } from "./combo/context.ts";
import { phaseComboSetup } from "./combo/comboSetup.ts";

import { type ProviderCandidate } from "./autoCombo/scoring.ts";

import { getSessionConnection } from "./sessionManager.ts";
import { getOAuthSessionAvailability } from "./oauthSessionOccupancy.ts";
import {
  clearStickyBinding,
  peekStickyConnectionId,
} from "./combo/sessionStickiness.ts";

import { lookupPositiveCap } from "./combo/concurrencyCaps.ts";
import { acquireQuotaShareConcurrencySlot } from "./combo/quotaShareConcurrency.ts";

import { resolveConnectionTimeoutMs } from "../handlers/chatCore/upstreamTimeouts.ts";
import { getCachedProviderConnectionById } from "../../src/lib/db/readCache.ts";

import { expandPromptCacheAffinityTargetsFromConnections } from "./combo/promptCacheAffinity.ts";

import { getCachedProviderConnections } from "../../src/lib/db/readCache";
import {
  resolveResilienceSettings,
  type ResilienceSettings,
  type ComboCooldownWaitSettings,
} from "../../src/lib/resilience/settings";
import { RESET_WINDOW_NAMES } from "./combo/types.ts";
import type {
  SingleModelTarget,
  ComboLogger,
  HandleComboChatOptions,
  ResolvedComboTarget,
  AutoProviderCandidate,
  HistoricalLatencyStatsEntry,
} from "./combo/types.ts";

import { validateResponseQuality } from "./combo/validateQuality.ts";
import { dispatchChaosFromCombo } from "./autoCombo/chaosEngine.ts";
import {
  MAX_GLOBAL_ATTEMPTS,
  MAX_GLOBAL_ATTEMPTS_HARD_CAP,
  clampComboDepth,
  clampGlobalAttempts,
  shouldSkipForPredictedTtft,
  shouldRecordProviderBreakerFailure,
  isRequestScopedUpstreamFailure,
  shouldSkipConnDisable,
  resolveDelayMs,
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
import {
  resolveShadowTargets,
  scheduleShadowRouting,
} from "./combo/shadowRouting.ts";
import {
  filterTargetsByRequestCompatibility,
  resolveComboRuntimeUnits,
  resolveComboTargets,
} from "./combo/comboStructure.ts";
import {
  createInvocationId,
  getComboTrace,
  startComboTrace,
} from "./combo/decisionTrace.ts";
import {
  QUOTA_SOFT_DEPRIORITIZE_FACTOR,
  setCandidateQuotaSoftPenalty,
  _registerExecutionCandidates,
  _unregisterExecutionCandidates,
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
} from "./combo/quotaStrategies.ts";
import { buildAutoQuotaThresholds } from "./combo/quotaExhaustionCutoff.ts";
import { expandTargetsByFingerprints } from "./combo/fingerprintExpansion.ts";
import { resolveComboTargetPipeline } from "./combo/targetResolution.ts";
import { dispatchWithCooldownRetry } from "./combo/comboAttemptLoop.ts";
import { evaluateExecuteTargetGates } from "./combo/executeTargetGates.ts";
import { executeTargetAttempt } from "./combo/executeTargetAttempt.ts";
import type {
  AttemptLoopDeps,
  AttemptLoopState,
} from "./combo/attemptLoopTypes.ts";

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
    const { handleRoundRobinCombo } = await import("./combo/roundRobinCombo.ts");
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

