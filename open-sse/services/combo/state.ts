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

import { parseModel } from "../model.ts";

import { applyComboAgentMiddleware } from "../comboAgentMiddleware.ts";

import { checkCredentialGate, logCredentialSkip } from "../credentialGate.ts";

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

import { buildAutoCandidates, scoreAutoTargets } from "./auto.ts";
import { QUOTA_SOFT_DEPRIORITIZE_FACTOR } from "./constants.ts";
import { handleComboChat } from "./chat.ts";

// G2: Module-level registry of active combo execution candidates.
// Maps executionKey → Map<stepId, candidate mutable ref>.
// Populated by buildAutoCandidates registrations; cleaned up after each execution.
// This allows chatCore.ts to mark a candidate's quotaSoftPenalty flag so that
// subsequent scoring iterations (auto-combo fallback) deprioritize it.
const _activeExecutionCandidates = new Map<string, Map<string, { quotaSoftPenalty?: boolean }>>();

/**
 * Mark a specific candidate (by comboExecutionKey + stepId) with soft quota penalty.
 * Called from chatCore.ts when enforceQuotaShare returns a "soft deprioritize" decision.
 * The flag is read on subsequent auto-combo scoring iterations (fallback chain)
 * within the same combo execution via scoreAutoTargets → QUOTA_SOFT_DEPRIORITIZE_FACTOR.
 *
 * Guards:
 * - null executionKey or stepId → no-op (non-combo or context not available).
 * - unknown executionKey → no-op (candidate not yet registered or already cleaned up).
 * - Idempotent: calling twice with the same (key, stepId, true) is safe.
 */
export function setCandidateQuotaSoftPenalty(
  comboExecutionKey: string | null,
  comboStepId: string | null,
  penalty: boolean
): void {
  if (!comboExecutionKey || !comboStepId) return;
  const byStep = _activeExecutionCandidates.get(comboExecutionKey);
  if (!byStep) return;
  const candidate = byStep.get(comboStepId);
  if (candidate) {
    candidate.quotaSoftPenalty = penalty;
  }
}

/**
 * Register candidates for a combo execution so setCandidateQuotaSoftPenalty can
 * locate them by (executionKey, stepId).
 * Each candidate object is stored by reference — mutations via setCandidateQuotaSoftPenalty
 * propagate back to the original candidate array used by scoreAutoTargets.
 * @internal — not exported; only called within combo.ts by buildAutoCandidates callers.
 */
export function _registerExecutionCandidates(
  candidates: Array<{ executionKey: string; stepId: string; quotaSoftPenalty?: boolean }>
): void {
  for (const candidate of candidates) {
    if (!candidate.executionKey) continue;
    let byStep = _activeExecutionCandidates.get(candidate.executionKey);
    if (!byStep) {
      byStep = new Map();
      _activeExecutionCandidates.set(candidate.executionKey, byStep);
    }
    byStep.set(candidate.stepId, candidate);
  }
}

/**
 * Unregister all candidates for a given execution key once the execution completes.
 * Prevents unbounded memory growth.
 * @internal — not exported; called after each handleComboChat iteration.
 */
export function _unregisterExecutionCandidates(executionKeys: string[]): void {
  for (const key of executionKeys) {
    _activeExecutionCandidates.delete(key);
  }
}

// In-memory atomic counter per combo for round-robin distribution
// Resets on server restart (by design — no stale state)
// Eviction limits to prevent unbounded memory growth
export const MAX_RR_COUNTERS = 500;

export const MAX_RESET_AWARE_CACHE = 200;

export const rrCounters = new Map<string, number>();

export const resetAwareConnectionCache = new Map<
  string,
  { fetchedAt: number; connections: Array<Record<string, unknown>> }
>();

export const resetAwareQuotaCache = new Map<
  string,
  { fetchedAt: number; quota: unknown; refreshPromise: Promise<unknown> | null }
>();
