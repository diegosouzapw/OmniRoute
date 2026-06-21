/**
 * Shared combo (model combo) handling with fallback support
 * Supports: priority, weighted, round-robin, random, least-used, cost-optimized,
 * reset-aware, reset-window, strict-random, auto, fill-first, p2c, lkgp,
 * context-optimized, and context-relay strategies
 */

import {
  checkFallbackError,
  classifyLockoutReason,
  decayModelFailureCount,
  formatRetryAfter,
  getRuntimeProviderProfile,
  isModelLocked,
  recordModelLockoutFailure,
  recordProviderFailure,
  selectLockoutCooldownMs,
} from "./accountFallback.ts";
import { RateLimitReason } from "../config/constants.ts";
import { errorResponse, unavailableResponse } from "../utils/error.ts";
import {
  recordComboIntent,
  recordComboRequest,
  recordComboShadowRequest,
  getComboMetrics,
} from "./comboMetrics.ts";
import {
  resolveComboConfig,
  getDefaultComboConfig,
  resolveComboQueueDepth,
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
import {
  evaluateQuotaCutoff,
  getQuotaFetcher,
  type PreflightQuotaThresholds,
  type QuotaInfo,
} from "./quotaPreflight.ts";
import * as semaphore from "./rateLimitSemaphore.ts";
import { getCircuitBreaker } from "../../src/shared/utils/circuitBreaker";
import { fisherYatesShuffle, getNextFromDeck } from "../../src/shared/utils/shuffleDeck";
import { parseModel } from "./model.ts";
import { createComboContext } from "./combo/context.ts";
import { phaseComboSetup } from "./combo/comboSetup.ts";
import { checkCredentialGate, logCredentialSkip } from "./credentialGate.ts";
import { emit } from "../../src/lib/events/eventBus";
import { notifyWebhookEvent } from "../../src/lib/webhookDispatcher";
import { classifyWithConfig } from "./intentClassifier.ts";
import { selectProvider as selectAutoProvider } from "./autoCombo/engine.ts";
import { selectWithStrategy } from "./autoCombo/routerStrategy.ts";
import { parseAutoPrefix } from "./autoCombo/autoPrefix.ts";
import { handlePipelineCombo, buildPipelineResponse } from "./autoCombo/pipelineRouter.ts";
import {
  DEFAULT_WEIGHTS,
  type ProviderCandidate,
  type ScoringWeights,
} from "./autoCombo/scoring.ts";
import { supportsToolCalling } from "./modelCapabilities.ts";
import { estimateTokens } from "./contextManager.ts";
import { getSessionConnection } from "./sessionManager.ts";
import { orderTargetsByEvalScores } from "./evalRouting.ts";
import { generateRoutingHints } from "./manifestAdapter";
import type { RoutingHint } from "./manifestAdapter";
import { buildComplexityRoutingHint } from "./autoCombo/complexityRouter";
import type { CompressionMode } from "./compression/types.ts";
import { getProviderConnections } from "../../src/lib/db/providers";
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
  ResolvedComboTarget,
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
} from "./combo/rrState.ts";
import { validateResponseQuality, toRetryAfterDisplayValue } from "./combo/validateQuality.ts";
import {
  TRANSIENT_FOR_SEMAPHORE,
  MAX_FALLBACK_WAIT_MS,
  MAX_GLOBAL_ATTEMPTS,
  isAllAccountsRateLimitedResponse,
  clampComboDepth,
  shouldSkipForPredictedTtft,
  shouldRecordProviderBreakerFailure,
  resolveDelayMs,
  comboModelNotFoundResponse,
  isStreamReadinessFailureErrorBody,
  isTokenLimitBreachErrorBody,
  toRecordedTarget,
  getExhaustedTargetSkipReason,
} from "./combo/comboPredicates.ts";
import { applyComboTargetExhaustion } from "./combo/targetExhaustion.ts";
import { dedupeTargetsByExecutionKey, isRecord } from "./combo/comboData.ts";
import {
  expandProviderWildcardsInCombo,
  expandProviderWildcardsInCollection,
} from "./combo/providerWildcard.ts";
import { resolveShadowTargets, scheduleShadowRouting } from "./combo/shadowRouting.ts";
import {
  sortTargetsByCost,
  sortTargetsByUsage,
  orderTargetsByPowerOfTwoChoices,
} from "./combo/targetSorters.ts";
import {
  filterTargetsByRequestCompatibility,
  getModelContextLimitForModelString,
  resolveComboTargets,
  resolveWeightedTargets,
  resolveWeightedStepGroups,
  sortTargetsByContextSize,
} from "./combo/comboStructure.ts";
import {
  QUOTA_SOFT_DEPRIORITIZE_FACTOR,
  setCandidateQuotaSoftPenalty,
  _registerExecutionCandidates,
  _unregisterExecutionCandidates,
  extractPromptForIntent,
  mapIntentToTaskType,
  getIntentConfig,
  applyRequestTagRouting,
  scoreAutoTargets,
  expandAutoComboCandidatePool,
} from "./combo/autoStrategy.ts";
import {
  resolveResetWindowConfig,
  resolveSlaRoutingPolicy,
  calculateResetWindowAffinity,
  type ResetWindowConfig,
} from "./combo/quotaScoring.ts";
import {
  fetchResetAwareQuotaWithCache,
  preScreenTargets,
  orderTargetsByResetAwareQuota,
  orderTargetsByResetWindow,
  type PreScreenResult,
} from "./combo/quotaStrategies.ts";

// Backward-compatible re-exports — these were public from combo.ts before the
// types extraction (Quality Gate v2 / Fase 9). Keep the external surface stable.
export { RESET_WINDOW_NAMES };
// chatCore.ts's dynamic `import("../services/combo")` reads these two — keep them
// re-exported from combo.ts after the auto-strategy extraction (combo split D8).
export { QUOTA_SOFT_DEPRIORITIZE_FACTOR, setCandidateQuotaSoftPenalty };
export { scoreAutoTargets, expandAutoComboCandidatePool };
export type { SingleModelTarget, ResolvedComboTarget };
export { validateResponseQuality };
export { clampComboDepth, shouldSkipForPredictedTtft, shouldRecordProviderBreakerFailure };
export { resolveShadowTargets, scheduleShadowRouting };
// preScreenTargets was public from combo.ts before the reset-aware quota
// extraction (combo split D7b). Keep the external surface stable.
export { preScreenTargets };
export { resolveComboTargets, filterTargetsByRequestCompatibility };
export {
  getComboFromData,
  getComboModelsFromData,
  resolveNestedComboModels,
  resolveNestedComboTargets,
  validateComboDAG,
} from "./combo/comboStructure.ts";

// Reset-aware / reset-window quota config, scoring, and window-math helpers were
// extracted to combo/quotaScoring.ts (pure) and the stateful cache + strategy
// orderers to combo/quotaStrategies.ts (combo split D7b). The two cache Maps
// (resetAwareConnectionCache, resetAwareQuotaCache) live as single instances in
// quotaStrategies.ts alongside their only readers/writers (state cohesion).
// combo.ts imports back the three reset-window helpers buildAutoCandidates +
// orchestration need, plus the strategy orderers and preScreenTargets (above).

// Bootstrap defaults from ClawRouter benchmark (used when no local latency history exists yet)
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
// Assumed fraction of tokens that are output when blending input+output prices
// for auto-combo cost scoring. 0.4 = 40% output, 60% input.
// Matches the example in GitHub issue #1812 (e.g. o3-like model: $3 input/$15 output).
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

function clampPercent(value: number): number {
  if (!Number.isFinite(value)) return 100;
  return Math.max(0, Math.min(100, value));
}

function asThresholdMap(value: unknown): Record<string, number> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const result: Record<string, number> = {};
  for (const [key, raw] of Object.entries(value as Record<string, unknown>)) {
    const numeric = Number(raw);
    if (key && Number.isFinite(numeric)) result[key] = numeric;
  }
  return result;
}

function quotaWindowLookupNames(provider: string, windowName: string): string[] {
  const names = [windowName];
  const lower = windowName.toLowerCase();
  if (lower !== windowName) names.push(lower);
  if (provider === "codex") {
    if (lower.includes("session") || lower === "5h" || lower === "five_hour") names.push("session");
    if (lower.includes("weekly") || lower === "7d" || lower === "seven_day") names.push("weekly");
    if (lower.includes("monthly") || lower === "30d") names.push("monthly");
  }
  return [...new Set(names)];
}

function buildAutoQuotaThresholds(
  provider: string,
  connection: Record<string, unknown> | undefined,
  resilienceSettings: ResilienceSettings | null | undefined
): PreflightQuotaThresholds {
  const quotaPreflight = (resilienceSettings ?? resolveResilienceSettings(null))?.quotaPreflight;
  const defaultThresholdPercent = quotaPreflight?.defaultThresholdPercent ?? 2;
  const warnThresholdPercent = quotaPreflight?.warnThresholdPercent ?? 20;
  const providerWindowMap = asThresholdMap(quotaPreflight?.providerWindowDefaults?.[provider]);
  const perConnectionWindowOverrides = asThresholdMap(connection?.quotaWindowThresholds);

  return {
    resolveMinRemainingPercent: (windowName: string | null): number => {
      if (windowName !== null) {
        for (const lookupWindowName of quotaWindowLookupNames(provider, windowName)) {
          const override = perConnectionWindowOverrides[lookupWindowName];
          if (typeof override === "number") return override;
          const providerDefault = providerWindowMap[lookupWindowName];
          if (typeof providerDefault === "number") return providerDefault;
        }
      }
      return defaultThresholdPercent;
    },
    resolveWarnRemainingPercent: () => warnThresholdPercent,
  };
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
        const connections = await getProviderConnections({ provider, isActive: true });
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

  const expandedTargets: ResolvedComboTarget[] = [];
  for (const target of targets) {
    const provider = target.provider || parseModel(target.modelStr).provider || "unknown";
    const providerConnections = connectionsByProvider.get(provider) || [];
    if (target.connectionId) {
      expandedTargets.push(target);
      continue;
    }
    const connectionIds = providerConnections
      .map((c) => (c && typeof c === "object" && typeof c.id === "string" ? c.id : null))
      .filter((id): id is string => id !== null);
    if (connectionIds.length === 0) {
      expandedTargets.push(target);
      continue;
    }
    for (const connectionId of connectionIds) {
      expandedTargets.push({
        ...target,
        connectionId,
        executionKey: `${target.executionKey}@${connectionId}`,
      });
    }
  }

  const candidates = await Promise.all(
    expandedTargets.map(async (target) => {
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
        quotaRemaining = quotaRemainingPercentFromQuota(quota);
        if (quotaCutoffEnabled) {
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
        accountTier: "standard" as const,
        quotaResetIntervalSecs: 86400,
        contextAffinity,
        resetWindowAffinity,
        quotaCutoffBlocked,
        quotaCutoffReason,
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
    /your input exceeds/i.test(errorText)
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
}: HandleComboChatOptions): Promise<Response> {
  // Combo setup phase (god-file decomposition fase 1): strategy / relay / resilience /
  // universal-handoff / context-cache pinning / agent middleware / config cascade / timeout.
  // phaseComboSetup rewrites ctx.body (pinning + middleware); rebind `body` from it so the
  // rest of handleComboChat is unchanged. See combo/comboSetup.ts + combo/context.ts.
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

  // ── Per-model timeout wrapper ────────────────────────────────────────────
  // Combo target timeouts inherit FETCH_TIMEOUT_MS by default. Operators can
  // configure targetTimeoutMs to shorten fallback latency, but never to extend
  // beyond the current upstream request timeout.
  //
  // The timeoutController is forwarded to the inner caller via target.modelAbortSignal.
  // When the timeout fires we (a) resolve the race with a synthetic 524 and
  // (b) abort the inner request so its upstream fetch is cancelled and downstream
  // cooldown/breaker/usage mutations stop — preventing "ghost" state mutations
  // that diverge from the routing decision the operator sees.
  const handleSingleModelWithTimeout = async (
    b: Record<string, unknown>,
    modelStr: string,
    target?: SingleModelTarget
  ): Promise<Response> => {
    if (comboTargetTimeoutMs <= 0) {
      return handleSingleModel(b, modelStr, target).catch((err) =>
        errorResponse(502, err?.message ?? "Upstream model error")
      );
    }

    const timeoutController = new AbortController();
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let timedOut = false;
    const timeoutPromise = new Promise<Response>((resolve) => {
      timeoutId = setTimeout(() => {
        timedOut = true;
        log.warn(
          "COMBO",
          `Model ${modelStr} exceeded ${comboTargetTimeoutMs}ms timeout — falling back`
        );
        // Abort the inner request so its upstream fetch is cancelled and
        // downstream cooldown/breaker/usage mutations don't continue mutating
        // state behind the routing decision's back.
        timeoutController.abort(new Error("combo-per-model-timeout"));
        resolve(
          new Response(JSON.stringify({ error: { message: `Model ${modelStr} timed out` } }), {
            status: 524,
            headers: { "Content-Type": "application/json" },
          })
        );
      }, comboTargetTimeoutMs);
    });
    const targetWithSignal = {
      ...(target ?? {}),
      modelAbortSignal: timeoutController.signal,
    };
    const parentHedgeSignal = target?.modelAbortSignal ?? null;
    let onParentHedgeAbort: (() => void) | null = null;
    if (parentHedgeSignal) {
      if (parentHedgeSignal.aborted) {
        timeoutController.abort(new Error("hedge-cancelled"));
      } else {
        onParentHedgeAbort = () => {
          timeoutController.abort(new Error("hedge-cancelled"));
        };
        parentHedgeSignal.addEventListener("abort", onParentHedgeAbort, { once: true });
      }
    }
    try {
      return await Promise.race([
        handleSingleModel(b, modelStr, targetWithSignal).catch((err) => {
          if (timedOut) {
            // Inner call rejected because we aborted it. The synthetic 524 from
            // timeoutPromise already wins the race; return an empty response so
            // the loser branch resolves cleanly without leaking err.message.
            return new Response(null, { status: 599 });
          }
          return errorResponse(502, err?.message ?? "Upstream model error");
        }),
        timeoutPromise,
      ]);
    } finally {
      clearTimeout(timeoutId);
      // Detach our listener from the SHARED parent hedge signal. Without this, every target
      // attempt left a listener on the long-lived parent signal for the whole request, so a
      // request that tries many combo targets accumulated listeners on one signal.
      if (parentHedgeSignal && onParentHedgeAbort) {
        parentHedgeSignal.removeEventListener("abort", onParentHedgeAbort);
      }
    }
  };

  // Route to pinned model if context caching specifies one (Fix #679)
  if (pinnedModel) {
    log.info(
      "COMBO",
      `Bypassing strategy — routing directly to pinned context model: ${pinnedModel}`
    );
    return handleSingleModelWithTimeout(body, pinnedModel);
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
    if (target.provider && getCircuitBreaker(target.provider).getStatus().state === "OPEN") return false;
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
    const step = weightedResolution.orderedSteps.find((entry) =>
      target.executionKey === entry.executionKey ||
      target.executionKey.startsWith(entry.executionKey + ">")
    );
    return step?.executionKey || null;
  };
  let orderedTargets =
    strategy === "weighted"
      ? weightedResolution?.orderedTargets || []
      : resolveComboTargets(expandedCombo, expandedAllCombos, clampComboDepth(config.maxComboDepth));

  orderedTargets = await applyRequestTagRouting(orderedTargets, body, log);

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

  if (strategy === "auto") {
    const requestHasTools = Array.isArray(body?.tools) && body.tools.length > 0;
    let eligibleTargets = [...orderedTargets];

    if (requestHasTools) {
      const filtered = eligibleTargets.filter((target) => supportsToolCalling(target.modelStr));
      if (filtered.length > 0) {
        eligibleTargets = filtered;
      } else {
        log.warn(
          "COMBO",
          "Auto strategy: all candidates filtered by tool-calling policy, falling back to full pool"
        );
      }
    }

    // Context-window pre-filter (#1808)
    // Estimate input tokens once; exclude candidates whose known context limit is too small.
    // Uses the same 4-chars-per-token heuristic as contextManager.ts::compressContext().
    // Null/unknown limits are treated as "include" to avoid incorrectly dropping valid targets.
    const requestMessages = body.messages;
    const estimatedInputTokens = estimateTokens(
      typeof requestMessages === "string" ||
        (requestMessages !== null && typeof requestMessages === "object")
        ? requestMessages
        : []
    );
    if (estimatedInputTokens > 0) {
      const filteredByContext = eligibleTargets.filter((target) => {
        const limit = getModelContextLimitForModelString(target.modelStr);
        if (limit === null || limit === undefined) return true; // unknown — include to be safe
        return limit >= estimatedInputTokens;
      });
      if (filteredByContext.length > 0) {
        log.debug?.(
          "COMBO",
          `Auto strategy: context-window filter kept ${filteredByContext.length}/${eligibleTargets.length} candidates (est. ${estimatedInputTokens} tokens)`
        );
        eligibleTargets = filteredByContext;
      } else {
        log.warn(
          "COMBO",
          `Auto strategy: all candidates filtered by context-window policy (est. ${estimatedInputTokens} tokens), falling back to full pool`
        );
        // eligibleTargets intentionally unchanged — same fallback contract as tool-calling filter
      }

      eligibleTargets = await expandAutoComboCandidatePool(eligibleTargets, combo);
    }

    const prompt = extractPromptForIntent(body);
    const systemPrompt =
      typeof combo?.system_message === "string" ? combo.system_message : undefined;
    const intentConfig = getIntentConfig(settings, combo);
    const intent = classifyWithConfig(prompt, intentConfig, systemPrompt);
    recordComboIntent(combo.name, intent);
    const taskType = mapIntentToTaskType(intent);

    const rawAutoConfigSource =
      combo?.autoConfig ||
      (isRecord(combo?.config?.auto) ? combo.config.auto : null) ||
      combo?.config ||
      {};
    const autoConfigSource: Record<string, unknown> = isRecord(rawAutoConfigSource)
      ? rawAutoConfigSource
      : {};
    const routingStrategy =
      typeof autoConfigSource.routerStrategy === "string"
        ? autoConfigSource.routerStrategy
        : typeof autoConfigSource.routingStrategy === "string"
          ? autoConfigSource.routingStrategy
          : typeof autoConfigSource.strategyName === "string"
            ? autoConfigSource.strategyName
            : "rules";

    const candidatePool = Array.isArray(autoConfigSource.candidatePool)
      ? autoConfigSource.candidatePool
      : [...new Set(eligibleTargets.map((target) => target.provider))];

    const weights =
      autoConfigSource.weights && typeof autoConfigSource.weights === "object"
        ? (autoConfigSource.weights as ScoringWeights)
        : DEFAULT_WEIGHTS;
    const explorationRate = Number.isFinite(Number(autoConfigSource.explorationRate))
      ? Number(autoConfigSource.explorationRate)
      : 0.05;
    const budgetCap = Number.isFinite(Number(autoConfigSource.budgetCap))
      ? Number(autoConfigSource.budgetCap)
      : undefined;
    const modePack =
      typeof autoConfigSource.modePack === "string" ? autoConfigSource.modePack : undefined;
    const resetWindowConfig = resolveResetWindowConfig(autoConfigSource);
    const slaPolicy = resolveSlaRoutingPolicy(autoConfigSource);

    let lastKnownGoodProvider: string | undefined;
    try {
      const { getLKGP } = await import("../../src/lib/localDb");
      const lkgp = await getLKGP(combo.name, combo.id || combo.name);
      if (lkgp) lastKnownGoodProvider = lkgp.provider;
    } catch (err) {
      log.warn("COMBO", "Failed to retrieve Last Known Good Provider. This is non-fatal.", { err });
    }

    const candidates = await buildAutoCandidates(
      eligibleTargets,
      combo.name,
      relayOptions?.sessionId,
      resetWindowConfig,
      resilienceSettings
    );
    const routableCandidates = candidates.filter(
      (candidate) => candidate.quotaCutoffBlocked !== true
    );
    const quotaBlockedCount = candidates.length - routableCandidates.length;
    if (quotaBlockedCount > 0) {
      log.info(
        "COMBO",
        `Auto strategy: quota cutoff skipped ${quotaBlockedCount}/${candidates.length} account candidates`
      );
    }
    // G2: Register candidates so chatCore can mark quotaSoftPenalty via setCandidateQuotaSoftPenalty.
    _registerExecutionCandidates(routableCandidates);
    if (candidates.length > 0 && routableCandidates.length === 0) {
      return unavailableResponse(
        429,
        "All auto strategy candidates are below configured quota cutoffs"
      );
    }
    if (routableCandidates.length > 0) {
      let selectedProvider: string | null = null;
      let selectedModel: string | null = null;
      let selectionReason = "";

      if (routingStrategy !== "rules") {
        try {
          const decision = selectWithStrategy(
            routableCandidates,
            {
              taskType,
              requestHasTools,
              lastKnownGoodProvider,
              estimatedInputTokens,
              sla: slaPolicy,
            },
            routingStrategy
          );
          selectedProvider = decision.provider;
          selectedModel = decision.model;
          selectionReason = decision.reason;
        } catch (err) {
          log.warn(
            "COMBO",
            `Auto strategy '${routingStrategy}' failed (${err?.message || "unknown"}), falling back to rules`
          );
        }
      }

      if (!selectedProvider || !selectedModel) {
        const selection = selectAutoProvider(
          {
            id: combo.id || combo.name,
            name: combo.name,
            type: "auto",
            candidatePool,
            weights,
            modePack,
            budgetCap,
            explorationRate,
          },
          routableCandidates,
          taskType
        );
        selectedProvider = selection.provider;
        selectedModel = selection.model;
        selectionReason = `score=${selection.score.toFixed(3)}${selection.isExploration ? " (exploration)" : ""}`;
      }

      // Complexity-aware routing (2026, opt-in): classify the request's
      // difficulty and feed a tier hint into scoring so tierAffinity /
      // specificityMatch favor candidates whose tier matches the request.
      const autoManifestHint: RoutingHint | null =
        config.complexityAwareRouting === true
          ? buildComplexityRoutingHint(
              eligibleTargets.filter((t) => t.kind === "model"),
              body,
              log
            )
          : null;

      const scoredTargets = scoreAutoTargets(
        eligibleTargets,
        routableCandidates,
        taskType,
        weights,
        autoManifestHint
      );
      const rankedTargets = scoredTargets.map((entry) => entry.target);
      const selectedTarget =
        scoredTargets.find((entry) => {
          const parsed = parseModel(entry.target.modelStr);
          const modelId = parsed.model || entry.target.modelStr;
          return entry.target.provider === selectedProvider && modelId === selectedModel;
        })?.target ||
        rankedTargets[0] ||
        eligibleTargets[0];
      if (!selectedTarget) {
        return unavailableResponse(
          429,
          "No auto strategy targets remained after quota cutoff filtering"
        );
      }

      // Keep eligibleTargets as the last-resort fallback tail: dedupe drops the
      // routable ranked ones (and, when the cutoff is OFF, makes this identical to
      // the pre-cutoff behavior), but a quota-blocked target still survives as a
      // final fallback instead of vanishing — the hard cutoff only de-prioritizes.
      orderedTargets = dedupeTargetsByExecutionKey(
        [selectedTarget, ...rankedTargets, ...eligibleTargets].filter(
          (entry): entry is ResolvedComboTarget => entry !== undefined && entry !== null
        )
      );

      log.info(
        "COMBO",
        `Auto selection: ${selectedTarget?.modelStr || `${selectedProvider}/${selectedModel}`} | intent=${intent} task=${taskType} | strategy=${routingStrategy} | ${selectionReason}`
      );
    } else {
      log.warn("COMBO", "Auto strategy has no candidates, keeping default ordering");
    }
  } else if (strategy === "lkgp") {
    try {
      const { getLKGP } = await import("../../src/lib/localDb");
      const lkgpProvider = await getLKGP(combo.name, combo.id || combo.name);

      if (lkgpProvider) {
        const lkgpRecord = lkgpProvider;
        const providerName = lkgpRecord.provider;
        const connId = lkgpRecord.connectionId;

        let lkgpIndex = -1;
        if (connId) {
          lkgpIndex = orderedTargets.findIndex(
            (target) => target.provider === providerName && target.connectionId === connId
          );
        }
        if (lkgpIndex < 0) {
          lkgpIndex = orderedTargets.findIndex(
            (target) =>
              target.provider === providerName ||
              // Issue #2359: Defensive guard. The `target.modelStr` type
              // annotation is `string`, but malformed combo entries (e.g.,
              // local-provider rows whose `modelStr` failed to resolve when
              // the executor catalogue was being rebuilt) have leaked
              // through and surfaced as `e.startsWith is not a function`
              // 500s on combo test/dispatch. The fast path stays
              // unchanged for the common case; this only avoids the
              // crash when the field is unexpectedly non-string.
              (typeof target.modelStr === "string" &&
                target.modelStr.startsWith(`${providerName}/`))
          );
        }

        if (lkgpIndex > 0) {
          const [lkgpTarget] = orderedTargets.splice(lkgpIndex, 1);
          orderedTargets.unshift(lkgpTarget);
          log.info(
            "COMBO",
            `[LKGP] Prioritizing last known good provider ${providerName}${connId ? ` (account ${connId})` : ""} for combo "${combo.name}"`
          );
        } else if (lkgpIndex === 0) {
          log.debug?.(
            "COMBO",
            `[LKGP] Last known good provider ${providerName}${connId ? ` (account ${connId})` : ""} already first for combo "${combo.name}"`
          );
        }
      }
    } catch (err) {
      log.warn("COMBO", "Failed to retrieve Last Known Good Provider. This is non-fatal.", { err });
    }
  } else if (strategy === "strict-random") {
    const selectedExecutionKey = await getNextFromDeck(
      `combo:${combo.name}`,
      orderedTargets.map((target) => target.executionKey)
    );
    const selectedTarget =
      orderedTargets.find((target) => target.executionKey === selectedExecutionKey) || null;
    // #3959: shuffle the fallback remainder too. Previously `rest` kept fixed
    // priority order, so after a failing deck pick the chain always fell through
    // to the same top-priority model — a persistently-failing model was retried
    // on essentially every request and fallback load never spread across peers.
    const rest = fisherYatesShuffle(
      orderedTargets.filter((target) => target.executionKey !== selectedExecutionKey)
    );
    orderedTargets = [selectedTarget, ...rest].filter(
      (target): target is ResolvedComboTarget => target !== null
    );
    log.info(
      "COMBO",
      `Strict-random deck: ${selectedExecutionKey} selected (${orderedTargets.length} targets)`
    );
  } else if (strategy === "random") {
    orderedTargets = fisherYatesShuffle([...orderedTargets]);
    log.info("COMBO", `Random shuffle: ${orderedTargets.length} targets`);
  } else if (strategy === "fill-first") {
    log.info(
      "COMBO",
      `Fill-first ordering: preserving priority order (${orderedTargets.length} targets)`
    );
  } else if (strategy === "p2c") {
    orderedTargets = orderTargetsByPowerOfTwoChoices(orderedTargets, combo.name);
    log.info("COMBO", `Power-of-two-choices ordering: selected ${orderedTargets[0]?.modelStr}`);
  } else if (strategy === "least-used") {
    orderedTargets = sortTargetsByUsage(orderedTargets, combo.name);
    log.info("COMBO", `Least-used ordering: ${orderedTargets[0]?.modelStr} has fewest requests`);
  } else if (strategy === "cost-optimized") {
    orderedTargets = await sortTargetsByCost(orderedTargets);
    if (config.manifestRouting === true) {
      try {
        const manifestHint = generateRoutingHints(
          orderedTargets.filter((t) => t.kind === "model"),
          {
            messages: Array.isArray(body?.messages)
              ? (body.messages as Array<{ role?: string; content?: string | unknown }>)
              : [],
            tools: Array.isArray(body?.tools)
              ? (body.tools as Array<{
                  function?: { name: string; description?: string; parameters?: unknown };
                }>)
              : undefined,
            model: typeof body?.model === "string" ? body.model : undefined,
          }
        );
        if (manifestHint.strategyModifier === "require-premium") {
          const eligible = orderedTargets.filter(
            (t) =>
              t.kind !== "model" ||
              manifestHint.eligibleTargets.some(
                (e) => e.provider === t.provider && e.modelStr === t.modelStr
              )
          );
          if (eligible.length > 0) orderedTargets = eligible;
        }
        log.debug?.(
          {
            strategyModifier: manifestHint.strategyModifier,
            specificityLevel: manifestHint.specificityLevel,
            score: manifestHint.specificity.score,
          },
          "manifest routing applied"
        );
      } catch (err) {
        log.warn({ err }, "manifest routing failed, falling back to standard strategy");
      }
    }
    log.info("COMBO", `Cost-optimized ordering: cheapest first (${orderedTargets[0]?.modelStr})`);
  } else if (strategy === "reset-aware") {
    orderedTargets = await orderTargetsByResetAwareQuota(
      orderedTargets,
      combo.name,
      config,
      log,
      apiKeyAllowedConnections
    );
    log.info(
      "COMBO",
      `Reset-aware ordering: ${orderedTargets[0]?.modelStr}${orderedTargets[0]?.connectionId ? ` (${orderedTargets[0].connectionId})` : ""} first`
    );
  } else if (strategy === "reset-window") {
    orderedTargets = await orderTargetsByResetWindow(
      orderedTargets,
      combo.name,
      config,
      log,
      apiKeyAllowedConnections
    );
    log.info(
      "COMBO",
      `Reset-window ordering: ${orderedTargets[0]?.modelStr}${orderedTargets[0]?.connectionId ? ` (${orderedTargets[0].connectionId})` : ""} first`
    );
  } else if (strategy === "context-optimized") {
    orderedTargets = sortTargetsByContextSize(orderedTargets);
    log.info("COMBO", `Context-optimized ordering: largest first (${orderedTargets[0]?.modelStr})`);
  }

  orderedTargets = orderTargetsByEvalScores(orderedTargets, config.evalRouting, log);
  orderedTargets = filterTargetsByRequestCompatibility(orderedTargets, body, log);

  // Parallel pre-screen: check provider profiles and model availability for all targets
  // Only runs for priority strategy where sequential checking causes latency
  const preScreenMap =
    strategy === "priority"
      ? await preScreenTargets(orderedTargets, isModelAvailable).catch(
          () => new Map<string, PreScreenResult>()
        )
      : new Map<string, PreScreenResult>();

  if (orderedTargets.length === 0) {
    return comboModelNotFoundResponse("Combo has no executable targets");
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

  try {
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

      let lastError: string | null = null;
      let earliestRetryAfter: ComboRetryAfter | null = null;
      let lastStatus: number | null = null;
      const startTime = Date.now();
      let fallbackCount = 0;
      let recordedAttempts = 0;

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

        // Pre-screen may have already determined this target unavailable (e.g.
        // circuit-breaker OPEN at resolve time).  Skip immediately in that case.
        // For targets pre-screened as "available" we still call isModelAvailable
        // below because connection cooldowns (rateLimitedUntil) can change
        // mid-request after a same-provider failure — the pre-screen snapshot is
        // stale by the time we reach the 2nd/3rd same-provider target.
        const preCheckedAvailable = preScreenEntry?.available ?? null;
        if (preCheckedAvailable === false) {
          log.info("COMBO", `Skipping ${modelStr} — pre-screen marked unavailable`);
          if (i > 0) fallbackCount++;
          return null;
        }
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
            return { ok: false, response: errorResponse(503, "Maximum combo retry limit reached") };
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

          // Deep clone the body to ensure context preservation and prevent mutations
          // from affecting other targets in the combo
          let attemptBody = JSON.parse(JSON.stringify(body));

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
            failoverBeforeRetry: config.failoverBeforeRetry,
          });

          // Success — validate response quality before returning
          if (result.ok) {
            const quality = await validateResponseQuality(result, clientRequestedStream, log);
            if (!quality.valid) {
              log.warn(
                "COMBO",
                `Model ${modelStr} returned 200 but failed quality check: ${quality.reason}`
              );
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
              const dcResult = decayModelFailureCount(
                provider,
                target.connectionId || "",
                rawModel
              );
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
              recordProviderSuccess(provider, target.connectionId ?? undefined);
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
              accountId: target.connectionId ?? "",
              latencyMs,
              fallbackCount,
            });

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

            // Record last known good provider (LKGP) for this combo/model (#919)
            if (provider) {
              const connId = target.connectionId || undefined;
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

            return { ok: true, response: quality.clonedResponse ?? result };
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
                retryAfter = errorBody?.retryAfter || null;
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

          // #1731 / #1731v2: classify the upstream error and update the exhaustion sets
          // (shared with handleRoundRobinCombo). Returns whether the provider is fully exhausted.
          const providerExhausted = applyComboTargetExhaustion(target, {
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
          });

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
            (fallbackResult.reason === RateLimitReason.MODEL_CAPACITY ||
              errorText.toLowerCase().includes("context") ||
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
            })
          ) {
            recordProviderFailure(provider, log, target.connectionId, profile);
          }

          // Check if this is a transient error worth retrying on same model.
          // A token-limit 429 is terminal for the client — never retry it.
          const isTransient =
            !isStreamReadinessFailure &&
            !isTokenLimitBreach &&
            [408, 429, 500, 502, 503, 504].includes(result.status);
          if (retry < maxRetries && isTransient && !providerExhausted) {
            // Record model lockout immediately on the first transient failure —
            // once the model is cooling down, retrying it would waste an upstream
            // call and extend the cooldown via exponential backoff.
            let lockoutRecorded = false;
            if (provider && rawModel && retry === 0) {
              const mlSettings = resolveModelLockoutSettings(settings);
              if (mlSettings.enabled && mlSettings.errorCodes.includes(result.status)) {
                recordModelLockoutFailure(
                  provider,
                  target.connectionId || "",
                  rawModel,
                  classifyLockoutReason(result.status),
                  result.status,
                  mlSettings.baseCooldownMs,
                  profile,
                  {
                    // #1308: honor a long upstream reset (e.g. "Resets in 160h") over
                    // the short base cooldown / exponential backoff when present.
                    exactCooldownMs: selectLockoutCooldownMs(cooldownMs, mlSettings),
                    maxCooldownMs: mlSettings.maxCooldownMs,
                  }
                );
                lockoutRecorded = true;
              }
            }
            if (lockoutRecorded) {
              log.info("COMBO", `Skipping retry for ${modelStr} — model lockout active`);
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
          if (!lastStatus) lastStatus = result.status;
          if (i > 0) fallbackCount++;
          // Wire combo failures into the resilience dashboard (model-level lockout)
          // alongside the provider-level cooldown below — they govern different scopes.
          if (provider && rawModel) {
            const mlSettings = resolveModelLockoutSettings(settings);
            if (mlSettings.enabled && mlSettings.errorCodes.includes(result.status)) {
              recordModelLockoutFailure(
                provider,
                target.connectionId || "",
                rawModel,
                classifyLockoutReason(result.status),
                result.status,
                mlSettings.baseCooldownMs,
                profile,
                {
                  // #1308: honor a long upstream reset over base/exponential cooldown.
                  exactCooldownMs: selectLockoutCooldownMs(cooldownMs, mlSettings),
                  maxCooldownMs: mlSettings.maxCooldownMs,
                }
              );
            }
          }
          log.warn("COMBO", `Model ${modelStr} failed, trying next`, { status: result.status });

          if (resilienceSettings.providerCooldown.enabled && provider && provider !== "unknown") {
            recordProviderCooldown(provider, target.connectionId ?? undefined, resilienceSettings);
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
        if (anySuccess) break;

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
      }

      if (!anySuccess && runningTasks.size > 0) {
        await Promise.race([globalPromise, Promise.all([...runningTasks])]);
      }

      if (anySuccess) {
        return await globalPromise;
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
      const msg = lastError || "All combo models unavailable";

      if (earliestRetryAfter) {
        const retryHuman = formatRetryAfter(toRetryAfterDisplayValue(earliestRetryAfter));
        log.warn("COMBO", `All models failed | ${msg} (${retryHuman})`);
        return unavailableResponse(status, msg, earliestRetryAfter, retryHuman);
      }

      log.warn("COMBO", `All models failed | ${msg}`);
      return new Response(JSON.stringify({ error: { message: msg } }), {
        status,
        headers: { "Content-Type": "application/json" },
      });
    }

    return errorResponse(503, "Combo routing completed without an upstream response");
  } finally {
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
  const filteredTargets = filterTargetsByRequestCompatibility(
    evalRankedTargets,
    body,
    log,
    "Context-aware round-robin fallback"
  );
  const modelCount = filteredTargets.length;
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
  const stickyLimit = clampStickyRoundRobinTargetLimit(
    perComboStickyLimit !== undefined && perComboStickyLimit !== null
      ? perComboStickyLimit
      : (settings as Record<string, unknown> | null)?.stickyRoundRobinLimit
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
          (!stickyTarget.provider || getCircuitBreaker(stickyTarget.provider).getStatus().state !== "OPEN") &&
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
    const modelIndex = (startIndex + offset) % modelCount;
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

    // Acquire semaphore slot (may wait in queue)
    let release: () => void;
    try {
      release = await semaphore.acquire(semaphoreKey, {
        maxConcurrency: concurrency,
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
          failoverBeforeRetry: config.failoverBeforeRetry,
        });

        // Success — validate response quality before returning
        if (result.ok) {
          const quality = await validateResponseQuality(result, clientRequestedStream, log);
          if (!quality.valid) {
            log.warn(
              "COMBO-RR",
              `${modelStr} returned 200 but failed quality check: ${quality.reason}`
            );
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

          if (provider && provider !== "unknown") {
            recordProviderSuccess(provider, target.connectionId ?? undefined);
          }

          if (stickyRoundRobinEnabled) {
            recordStickyRoundRobinSuccess(combo.name, target, stickyLimit, filteredTargets);
          }

          if (provider) {
            const connId = target.connectionId || undefined;
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
          // validateResponseQuality peeks streaming bodies via getReader(),
          // which locks `result.body`. It returns a clonedResponse that replays
          // the buffered prefix and forwards the rest. Returning the original
          // (now-locked) `result` makes Next.js throw "ReadableStream is locked"
          // → 500. Mirror the priority strategy and return the replay response.
          return quality.clonedResponse ?? result;
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
        const providerExhausted = applyComboTargetExhaustion(target, {
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
        });

        // Transient errors → mark in semaphore so round-robin stops stampeding this target.
        if (
          !isStreamReadinessFailure &&
          !isTokenLimitBreach &&
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

        if (resilienceSettings.providerCooldown.enabled && provider && provider !== "unknown") {
          recordProviderCooldown(provider, target.connectionId ?? undefined, resilienceSettings);
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
