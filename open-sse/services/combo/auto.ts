/**
 * Shared combo (model combo) handling with fallback support
 * Supports: priority, weighted, round-robin, random, least-used, cost-optimized,
 * reset-aware, reset-window, strict-random, auto, fill-first, p2c, lkgp,
 * context-optimized, and context-relay strategies
 */

import {
  checkFallbackError,
  classifyErrorText,
  formatRetryAfter,
  getRuntimeProviderProfile,
  recordProviderFailure,
  isProviderFailureCode,
  isProviderExhaustedReason,
  type ProviderProfile,
} from "../accountFallback.ts";

import { FETCH_TIMEOUT_MS, RateLimitReason } from "../../config/constants.ts";

import { errorResponse, unavailableResponse } from "../../utils/error.ts";

import { clamp01 } from "../../utils/number.ts";

import {
  recordComboIntent,
  recordComboRequest,
  recordComboShadowRequest,
  getComboMetrics,
} from "../comboMetrics.ts";

import {
  recordSessionModelUsage,
  getLastSessionModel,
  getHandoff,
} from "../../../src/lib/db/contextHandoffs.ts";

import { getQuotaFetcher } from "../quotaPreflight.ts";

import { getCircuitBreaker } from "../../../src/shared/utils/circuitBreaker";

import { fisherYatesShuffle, getNextFromDeck } from "../../../src/shared/utils/shuffleDeck";

import { parseModel } from "../model.ts";

import { emit } from "../../../src/lib/events/eventBus";

import { notifyWebhookEvent } from "../../../src/lib/webhookDispatcher";

import { getTaskFitness } from "../autoCombo/taskFitness.ts";

import {
  calculateFactors,
  calculateScore,
  DEFAULT_WEIGHTS,
  type ProviderCandidate,
  type ScoringWeights,
} from "../autoCombo/scoring.ts";

import { getReasoningTokens } from "../../../src/lib/usage/tokenAccounting.ts";

import { getModelContextLimit } from "../../../src/lib/modelCapabilities";

import { getProviderConnections } from "../../../src/lib/db/providers";

import { getProviderModels } from "../../config/providerModels.ts";

import {
  getComboModelString,
  getComboStepTarget,
  getComboStepWeight,
  normalizeComboStep,
} from "../../../src/lib/combos/steps.ts";

import {
  getConnectionRoutingTags,
  matchesRoutingTags,
  resolveRequestRoutingTags,
  type RoutingTagMatchMode,
} from "../../../src/domain/tagRouter.ts";

import { normalizeRoutingStrategy } from "../../../src/shared/constants/routingStrategies.ts";

import {
  resolveResilienceSettings,
  type ResilienceSettings,
} from "../../../src/lib/resilience/settings";

import {
  ResolvedComboTarget,
  ResetWindowConfig,
  AutoProviderCandidate,
  HistoricalLatencyStatsEntry,
  ComboLike,
  ComboCollectionLike,
  ComboRuntimeStep,
} from "./types.ts";
import {
  resolveResetWindowConfig,
  fetchResetAwareQuotaWithCache,
  calculateResetWindowAffinity,
} from "./quota.ts";
import {
  MIN_HISTORY_SAMPLES,
  OUTPUT_TOKEN_RATIO,
  QUOTA_SOFT_DEPRIORITIZE_FACTOR,
} from "./constants.ts";
import { getBootstrapLatencyMs, calculateTargetContextAffinity } from "./context.ts";
import {
  resolveNestedComboTargets,
  getDirectComboTargets,
  getOrderedTopLevelRuntimeSteps,
  hasCompositeTierRuntimeOrder,
  expandRuntimeStep,
  dedupeTargetsByExecutionKey,
} from "./dag.ts";
import { selectWeightedTarget, orderTargetsForWeightedFallback } from "./sorting.ts";
import { isRecord } from "./utils.ts";

export async function buildAutoCandidates(
  targets: ResolvedComboTarget[],
  comboName: string,
  sessionId: string | null | undefined = null,
  resetWindowConfig: ResetWindowConfig = resolveResetWindowConfig(null)
): Promise<AutoProviderCandidate[]> {
  const metrics = getComboMetrics(comboName);
  const { getPricingForModel } = await import("../../../src/lib/localDb");
  const quotaPromises = new Map<string, Promise<unknown>>();
  let historicalLatencyStats: Record<string, HistoricalLatencyStatsEntry> = {};
  try {
    const { getModelLatencyStats } = await import("../../../src/lib/usageDb");
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
  await Promise.all(
    uniqueProviders.map(async (provider) => {
      try {
        const connections = await getProviderConnections({ provider, isActive: true });
        const active = Array.isArray(connections) ? connections : [];
        connectionPoolCounts.set(provider, active.length);
        connectionsByProvider.set(provider, active);
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
      const fetcher = getQuotaFetcher(provider);
      if (fetcher && target.connectionId) {
        const quotaKey = `${provider}:${target.connectionId}`;
        if (!quotaPromises.has(quotaKey)) {
          quotaPromises.set(
            quotaKey,
            fetchResetAwareQuotaWithCache({
              provider,
              connectionId: target.connectionId,
              fetcher,
              config: resetWindowConfig,
              log: {},
              comboName,
            })
          );
        }
        const quota = await quotaPromises.get(quotaKey)!;
        resetWindowAffinity = calculateResetWindowAffinity(quota, resetWindowConfig);
      }

      return {
        stepId: target.stepId,
        executionKey: target.executionKey,
        modelStr,
        provider,
        model,
        quotaRemaining: 100,
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
        connectionPoolSize: connectionPoolCounts.get(provider) ?? 1,
        connectionId: target.connectionId ?? undefined,
      };
    })
  );

  return candidates;
}

export async function applyRequestTagRouting(
  targets: ResolvedComboTarget[],
  body: Record<string, unknown> | null | undefined,
  log: { info?: (...args: unknown[]) => void; warn?: (...args: unknown[]) => void }
): Promise<ResolvedComboTarget[]> {
  const { tags, matchMode } = resolveRequestRoutingTags(body);
  if (tags.length === 0 || targets.length === 0) {
    return targets;
  }

  const providerIds = Array.from(
    new Set(targets.map((target) => target.providerId || target.provider))
  ).filter(
    (providerId): providerId is string => typeof providerId === "string" && providerId.length > 0
  );
  const providerConnections = new Map<string, Array<Record<string, unknown>>>();

  await Promise.all(
    providerIds.map(async (providerId) => {
      try {
        const connections = await getProviderConnections({ provider: providerId, isActive: true });
        providerConnections.set(
          providerId,
          Array.isArray(connections) ? (connections as Array<Record<string, unknown>>) : []
        );
      } catch (error) {
        log.warn?.(
          "COMBO",
          `Tag routing failed to load connections for provider=${providerId}: ${error instanceof Error ? error.message : String(error)}`
        );
        providerConnections.set(providerId, []);
      }
    })
  );

  const filteredTargets = targets.reduce<ResolvedComboTarget[]>((acc, target) => {
    const providerKey = target.providerId || target.provider;
    const candidateConnections =
      providerConnections.get(providerKey)?.filter((connection) => {
        const connectionId =
          typeof connection.id === "string" && connection.id.trim().length > 0
            ? connection.id
            : null;
        if (!connectionId) return false;
        if (target.connectionId) {
          return connectionId === target.connectionId;
        }
        return true;
      }) || [];

    const matchedConnectionIds = candidateConnections
      .filter((connection) =>
        matchesRoutingTags(
          getConnectionRoutingTags(connection.providerSpecificData),
          tags,
          matchMode
        )
      )
      .map((connection) => connection.id)
      .filter((connectionId): connectionId is string => typeof connectionId === "string");

    if (matchedConnectionIds.length === 0) {
      return acc;
    }

    if (target.connectionId) {
      acc.push(target);
      return acc;
    }

    acc.push({
      ...target,
      allowedConnectionIds: Array.from(new Set(matchedConnectionIds)),
    });
    return acc;
  }, []);

  if (filteredTargets.length === 0) {
    log.info?.(
      "COMBO",
      `Tag routing matched 0/${targets.length} targets for [${tags.join(", ")}] (${matchMode}); falling back to the full target set`
    );
    return targets;
  }

  log.info?.(
    "COMBO",
    `Tag routing matched ${filteredTargets.length}/${targets.length} targets for [${tags.join(", ")}] (${matchMode})`
  );
  return filteredTargets;
}

export function resolveComboTargets(
  combo: ComboLike,
  allCombos: ComboCollectionLike
): ResolvedComboTarget[] {
  return allCombos ? resolveNestedComboTargets(combo, allCombos) : getDirectComboTargets(combo);
}

export function resolveWeightedTargets(
  combo: ComboLike,
  allCombos: ComboCollectionLike
): {
  orderedTargets: ResolvedComboTarget[];
  selectedStep: ComboRuntimeStep | null;
} {
  const topLevelSteps = getOrderedTopLevelRuntimeSteps(combo, allCombos);
  if (topLevelSteps.length === 0) {
    return { orderedTargets: [], selectedStep: null };
  }

  const selectedStep = selectWeightedTarget(topLevelSteps);
  if (!selectedStep) {
    return { orderedTargets: [], selectedStep: null };
  }

  const orderedSteps = orderTargetsForWeightedFallback(
    topLevelSteps,
    selectedStep.executionKey,
    hasCompositeTierRuntimeOrder(combo)
  );
  const expandedTargets = orderedSteps.flatMap((step) => {
    if (!step) return [];
    if (!allCombos) {
      return step.kind === "model" ? [step] : [];
    }
    return expandRuntimeStep(step, allCombos, new Set([combo.name]));
  });

  return {
    orderedTargets: dedupeTargetsByExecutionKey(expandedTargets),
    selectedStep,
  };
}

export function scoreAutoTargets(
  targets: ResolvedComboTarget[],
  candidates: AutoProviderCandidate[],
  taskType: string | null,
  weights: ScoringWeights
) {
  const candidateByExecutionKey = new Map(
    candidates.map((candidate: ProviderCandidate & { executionKey: string }) => [
      candidate.executionKey,
      candidate,
    ])
  );
  return targets
    .map((target) => {
      const candidate = candidateByExecutionKey.get(target.executionKey);
      if (!candidate) return null;
      const factors = calculateFactors(
        candidate as ProviderCandidate,
        candidates,
        taskType ?? "general",
        getTaskFitness
      );
      let score = calculateScore(factors, weights);
      // B17: Quota Share soft-policy deprioritization
      if ("quotaSoftPenalty" in candidate && candidate.quotaSoftPenalty === true) {
        score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR;
      }
      return {
        target,
        score,
      };
    })
    .filter((entry): entry is { target: ResolvedComboTarget; score: number } => entry !== null)
    .sort((a, b) => b.score - a.score);
}

/**
 * For an auto-combo WITHOUT an explicit `candidatePool`, broaden the eligible
 * targets to every model of every active provider connection so the router has
 * the full pool to score over. Already-present `modelStr`s are not duplicated.
 *
 * Best-effort: if loading active connections or provider models throws, the
 * explicitly-resolved targets are returned unchanged (the combo still runs).
 * Exported for unit testing. Mutates and returns `eligibleTargets`.
 */
export async function expandAutoComboCandidatePool(
  eligibleTargets: ResolvedComboTarget[],
  combo: { autoConfig?: unknown; config?: unknown } | null | undefined
): Promise<ResolvedComboTarget[]> {
  const localAutoConfig =
    (combo?.autoConfig as Record<string, unknown> | undefined) ||
    (isRecord((combo?.config as Record<string, unknown>)?.auto)
      ? ((combo?.config as Record<string, unknown>).auto as Record<string, unknown>)
      : null) ||
    (combo?.config as Record<string, unknown> | undefined) ||
    {};

  if (Array.isArray(localAutoConfig?.candidatePool)) return eligibleTargets;

  try {
    const allConnections = await getProviderConnections({ isActive: true });
    const providerIds = [
      ...new Set(
        (allConnections as Array<{ provider?: unknown }>)
          .map((c) => c.provider)
          .filter((p): p is string => typeof p === "string" && p.length > 0)
      ),
    ];
    for (const providerId of providerIds) {
      const providerModels = getProviderModels(providerId);
      for (const model of providerModels) {
        const modelStr = `${providerId}/${model.id}`;
        if (!eligibleTargets.some((t) => t.modelStr === modelStr)) {
          eligibleTargets.push({
            kind: "model",
            stepId: modelStr,
            executionKey: modelStr,
            provider: providerId,
            providerId: providerId,
            modelStr,
            weight: 1,
            connectionId: null,
            label: null,
          });
        }
      }
    }
  } catch {
    // Best-effort candidate expansion only: if loading active connections or
    // provider models fails, fall back to the explicitly-resolved targets
    // rather than aborting the combo. The push above is the only mutation,
    // so a throw leaves eligibleTargets exactly as explicit resolution built it.
  }

  return eligibleTargets;
}
