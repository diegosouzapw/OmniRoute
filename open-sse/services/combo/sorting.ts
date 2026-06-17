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
  resolveComboConfig,
  getDefaultComboConfig,
  resolveComboTargetTimeoutMs,
  PRE_SCREEN_CONCURRENCY,
} from "../comboConfig.ts";

import {
  maybeGenerateHandoff,
  resolveContextRelayConfig,
  maybeGenerateUniversalHandoff,
  injectUniversalHandoffBody,
  resolveUniversalHandoffConfig,
  SKIP_UNIVERSAL_HANDOFF_FLAG,
  type MessageLike,
} from "../contextHandoff.ts";

import {
  recordSessionModelUsage,
  getLastSessionModel,
  getHandoff,
} from "../../../src/lib/db/contextHandoffs.ts";

import { fetchCodexQuota } from "../codexQuotaFetcher.ts";

import { getQuotaFetcher } from "../quotaPreflight.ts";

import * as semaphore from "../rateLimitSemaphore.ts";

import { getCircuitBreaker } from "../../../src/shared/utils/circuitBreaker";

import { fisherYatesShuffle, getNextFromDeck } from "../../../src/shared/utils/shuffleDeck";

import { parseModel } from "../model.ts";

import { applyComboAgentMiddleware } from "../comboAgentMiddleware.ts";

import { checkCredentialGate, logCredentialSkip } from "../credentialGate.ts";

import { emit } from "../../../src/lib/events/eventBus";

import { notifyWebhookEvent } from "../../../src/lib/webhookDispatcher";

import {
  classifyWithConfig,
  DEFAULT_INTENT_CONFIG,
  type IntentClassifierConfig,
} from "../intentClassifier.ts";

import { selectProvider as selectAutoProvider } from "../autoCombo/engine.ts";

import { selectWithStrategy, type SlaRoutingPolicy } from "../autoCombo/routerStrategy.ts";

import { getTaskFitness } from "../autoCombo/taskFitness.ts";

import { parseAutoPrefix } from "../autoCombo/autoPrefix.ts";

import { handlePipelineCombo, buildPipelineResponse } from "../autoCombo/pipelineRouter.ts";

import {
  calculateFactors,
  calculateScore,
  DEFAULT_WEIGHTS,
  type ProviderCandidate,
  type ScoringWeights,
} from "../autoCombo/scoring.ts";

import {
  getResolvedModelCapabilities,
  supportsReasoning,
  supportsToolCalling,
} from "../modelCapabilities.ts";

import { estimateTokens } from "../contextManager.ts";

import { getReasoningTokens } from "../../../src/lib/usage/tokenAccounting.ts";

import { getSessionConnection } from "../sessionManager.ts";

import { orderTargetsByEvalScores } from "../evalRouting.ts";

import type { CompressionMode } from "../compression/types.ts";

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
  isProviderInCooldown,
  recordProviderCooldown,
  recordProviderSuccess,
} from "../providerCooldownTracker.ts";

import {
  resolveResilienceSettings,
  type ResilienceSettings,
} from "../../../src/lib/resilience/settings";

import { ResolvedComboTarget } from "./types.ts";

export function selectWeightedTarget<T extends { weight?: number }>(targets: T[]) {
  if (targets.length === 0) return null;

  const totalWeight = targets.reduce((sum, target) => sum + (target.weight || 0), 0);
  if (totalWeight <= 0) {
    return targets[Math.floor(Math.random() * targets.length)];
  }

  let random = Math.random() * totalWeight;
  for (const target of targets) {
    random -= target.weight || 0;
    if (random <= 0) return target;
  }

  return targets[targets.length - 1];
}

export function orderTargetsForWeightedFallback<T extends { executionKey: string; weight: number }>(
  targets: T[],
  selectedExecutionKey: string,
  preserveExistingOrder = false
): T[] {
  const selected = targets.find((target) => target.executionKey === selectedExecutionKey);
  const rest = targets.filter((target) => target.executionKey !== selectedExecutionKey);
  if (!preserveExistingOrder) {
    rest.sort((a, b) => b.weight - a.weight);
  }
  return selected ? [selected, ...rest] : rest;
}

// shuffleArray and getNextModelFromDeck moved to src/shared/utils/shuffleDeck.ts
// combo.ts now uses the shared, mutex-protected getNextFromDeck with "combo:" namespace.

/**
 * Sort models by pricing (cheapest first) for cost-optimized strategy
 * @param {Array<string>} models - Model strings in "provider/model" format
 * @returns {Promise<Array<string>>} Sorted model strings
 */
async function sortModelsByCost(models: string[]): Promise<string[]> {
  try {
    const { getPricingForModel } = await import("../../../src/lib/localDb");
    const withCost = await Promise.all(
      models.map(async (modelStr) => {
        const parsed = parseModel(modelStr);
        const provider = parsed.provider || parsed.providerAlias || "unknown";
        const model = parsed.model || modelStr;
        try {
          const pricing = await getPricingForModel(provider, model);
          const cost = Number(pricing?.input);
          return { modelStr, cost: Number.isFinite(cost) ? cost : Infinity };
        } catch {
          return { modelStr, cost: Infinity };
        }
      })
    );
    withCost.sort((a, b) => a.cost - b.cost);
    return withCost.map((e) => e.modelStr);
  } catch {
    // If pricing lookup fails entirely, return original order
    return models;
  }
}

export async function sortTargetsByCost(targets: ResolvedComboTarget[]) {
  const orderedModels = await sortModelsByCost(targets.map((target) => target.modelStr));
  const byModel = new Map<string, ResolvedComboTarget[]>();
  for (const target of targets) {
    const queue = byModel.get(target.modelStr) || [];
    queue.push(target);
    byModel.set(target.modelStr, queue);
  }
  return orderedModels
    .map((modelStr) => {
      const queue = byModel.get(modelStr);
      return queue?.shift() || null;
    })
    .filter((target): target is ResolvedComboTarget => target !== null);
}

/**
 * Sort models by usage count (least-used first) for least-used strategy
 * @param {Array<string>} models - Model strings
 * @param {string} comboName - Combo name for metrics lookup
 * @returns {Array<string>} Sorted model strings
 */
function sortModelsByUsage(models: string[], comboName: string): string[] {
  const metrics = getComboMetrics(comboName);
  if (!metrics?.byModel) return models;

  const withUsage = models.map((modelStr) => ({
    modelStr,
    requests: metrics.byModel[modelStr]?.requests ?? 0,
  }));
  withUsage.sort((a, b) => a.requests - b.requests);
  return withUsage.map((e) => e.modelStr);
}

export function sortTargetsByUsage(targets: ResolvedComboTarget[], comboName: string) {
  const orderedModels = sortModelsByUsage(
    targets.map((target) => target.modelStr),
    comboName
  );
  const byModel = new Map<string, ResolvedComboTarget[]>();
  for (const target of targets) {
    const queue = byModel.get(target.modelStr) || [];
    queue.push(target);
    byModel.set(target.modelStr, queue);
  }
  return orderedModels
    .map((modelStr) => {
      const queue = byModel.get(modelStr);
      return queue?.shift() || null;
    })
    .filter((target): target is ResolvedComboTarget => target !== null);
}

/**
 * Sort models by context window size (largest first) for context-optimized strategy.
 * Uses models.dev synced capabilities to get context limits.
 * @param {Array<string>} models - Model strings in "provider/model" format
 * @returns {Array<string>} Sorted model strings (largest context first)
 */
function sortModelsByContextSize(models: string[]): string[] {
  const withContext = models.map((modelStr) => {
    return { modelStr, context: getModelContextLimitForModelString(modelStr) ?? 0 };
  });
  withContext.sort((a, b) => b.context - a.context);
  return withContext.map((e) => e.modelStr);
}

export function getModelContextLimitForModelString(modelStr: string) {
  const parsed = parseModel(modelStr);
  const provider = parsed.provider || parsed.providerAlias || "unknown";
  const model = parsed.model || modelStr;
  return getModelContextLimit(provider, model);
}

export function sortTargetsByContextSize(targets: ResolvedComboTarget[]) {
  const hasKnownContext = targets.some(
    (target) => getModelContextLimitForModelString(target.modelStr) != null
  );
  if (!hasKnownContext) return targets;

  const orderedModels = sortModelsByContextSize(targets.map((target) => target.modelStr));
  const byModel = new Map<string, ResolvedComboTarget[]>();
  for (const target of targets) {
    const queue = byModel.get(target.modelStr) || [];
    queue.push(target);
    byModel.set(target.modelStr, queue);
  }
  return orderedModels
    .map((modelStr) => {
      const queue = byModel.get(modelStr);
      return queue?.shift() || null;
    })
    .filter((target): target is ResolvedComboTarget => target !== null);
}

function getP2CTargetScore(
  target: ResolvedComboTarget,
  metrics: ReturnType<typeof getComboMetrics>
): number {
  const breakerState = getCircuitBreaker(target.provider)?.getStatus?.()?.state;
  if (breakerState === "OPEN") return -Infinity;
  const modelMetric = metrics?.byModel?.[target.modelStr] || null;
  const successRate = Number(modelMetric?.successRate);
  const avgLatency = Number(modelMetric?.avgLatencyMs);
  const successScore = Number.isFinite(successRate) ? successRate / 100 : 0.5;
  const latencyScore =
    Number.isFinite(avgLatency) && avgLatency > 0 ? 1 / Math.log10(avgLatency + 10) : 0.25;
  const breakerPenalty = breakerState === "HALF_OPEN" ? 0.25 : 0;
  return successScore + latencyScore - breakerPenalty;
}

export function orderTargetsByPowerOfTwoChoices(targets: ResolvedComboTarget[], comboName: string) {
  if (targets.length <= 1) return targets;
  const metrics = getComboMetrics(comboName);
  const firstIndex = Math.floor(Math.random() * targets.length);
  let secondIndex = Math.floor(Math.random() * (targets.length - 1));
  if (secondIndex >= firstIndex) secondIndex++;

  const first = targets[firstIndex];
  const second = targets[secondIndex];
  const selectedIndex =
    getP2CTargetScore(second, metrics) > getP2CTargetScore(first, metrics)
      ? secondIndex
      : firstIndex;
  return [targets[selectedIndex], ...targets.filter((_, index) => index !== selectedIndex)];
}
