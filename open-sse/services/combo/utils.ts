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

import {
  ComboRetryAfter,
  ComboInput,
  ComboLike,
  ComboCollectionLike,
  ResolvedComboTarget,
} from "./types.ts";

export function toRetryAfterDisplayValue(value: ComboRetryAfter): string | Date {
  if (typeof value !== "number") return value;
  if (value > 0 && value < 1_000_000_000) {
    return new Date(Date.now() + value * 1000);
  }
  return new Date(value);
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

export function toTrimmedString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function toComboLike(combo: ComboInput): ComboLike {
  return {
    ...combo,
    id: toTrimmedString(combo.id) || undefined,
    name: toTrimmedString(combo.name) || "",
    models: Array.isArray(combo.models) ? combo.models : [],
    config: isRecord(combo.config) ? combo.config : null,
    autoConfig: isRecord(combo.autoConfig) ? combo.autoConfig : null,
    context_cache_protection:
      typeof combo.context_cache_protection === "boolean" ||
      typeof combo.context_cache_protection === "number"
        ? combo.context_cache_protection
        : undefined,
    system_message: typeof combo.system_message === "string" ? combo.system_message : null,
  };
}

export function getCombosArray(allCombos: ComboCollectionLike): ComboLike[] {
  const combos = Array.isArray(allCombos) ? allCombos : allCombos?.combos || [];
  return combos.map((combo) => toComboLike(combo));
}

/**
 * Validate that a successful (HTTP 200) non-streaming response actually contains
 * meaningful content. Returns { valid: true } or { valid: false, reason }.
 *
 * Only inspects non-streaming JSON responses — streaming responses are passed through
 * because buffering the full stream would defeat the purpose of streaming.
 *
 * Checks:
 * 1. Body is valid JSON
 * 2. Has at least one choice with non-empty content or tool_calls
 */
export async function validateResponseQuality(
  response: Response,
  isStreaming: boolean,
  log: { warn?: (...args: unknown[]) => void }
): Promise<{ valid: boolean; reason?: string; clonedResponse?: Response }> {
  if (isStreaming) return { valid: true };

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json") && !contentType.includes("text/")) {
    return { valid: true };
  }

  let cloned: Response;
  try {
    cloned = response.clone();
  } catch {
    return { valid: true };
  }

  let text: string;
  try {
    text = await cloned.text();
  } catch {
    return { valid: true };
  }

  if (!text || text.trim().length === 0) {
    return { valid: false, reason: "empty response body" };
  }

  let json: Record<string, unknown>;
  try {
    json = JSON.parse(text);
  } catch {
    if (text.startsWith("data:") || text.startsWith("event:")) return { valid: true };
    return { valid: false, reason: "response is not valid JSON" };
  }

  const choices = json?.choices;
  if (!Array.isArray(choices) || choices.length === 0) {
    if (json?.output || json?.result || json?.data || json?.response) return { valid: true };
    if (json?.error) {
      const err = json.error as Record<string, unknown>;
      return {
        valid: false,
        reason: `upstream error in 200 body: ${err?.message || JSON.stringify(json.error).substring(0, 200)}`,
      };
    }
    return { valid: true };
  }

  const firstChoice = choices[0];
  const message = firstChoice?.message || firstChoice?.delta;
  if (!message) {
    return { valid: false, reason: "choice has no message object" };
  }

  const content = message.content;
  const toolCalls = message.tool_calls;
  // Issue #2341: Reasoning models (Kimi-K2.5-TEE, GLM-5-TEE, etc.) emit their
  // output in `reasoning_content` (or `reasoning`) with `content: null`. The
  // validator used to flag those as empty and trigger a false-positive 502
  // fallback. Count a non-empty reasoning_content as valid output too.
  const reasoningContent = message.reasoning_content ?? message.reasoning;
  const hasReasoningContent =
    typeof reasoningContent === "string" && reasoningContent.trim().length > 0;
  const hasContent =
    (content !== null && content !== undefined && content !== "") || hasReasoningContent;
  const hasToolCalls = Array.isArray(toolCalls) && toolCalls.length > 0;

  if (!hasContent && !hasToolCalls) {
    return { valid: false, reason: "empty content and no tool_calls in response" };
  }

  // Issue #3587: Reasoning models (deepseek-v4-flash, nemotron, etc.) may consume
  // ALL max_tokens for reasoning_tokens, leaving content empty. When content is
  // empty but reasoning_content exists, and usage shows reasoning consumed nearly
  // all completion tokens, treat as invalid so the combo loop retries with more
  // tokens or falls back to a non-reasoning model.
  const contentIsEmpty = content === null || content === undefined || content === "";
  if (contentIsEmpty && hasReasoningContent && !hasToolCalls) {
    const usage = json?.usage as Record<string, unknown> | undefined;
    if (usage) {
      const completionTokens = Number(usage.completion_tokens) || 0;
      const reasoningTokens = getReasoningTokens(usage);
      // If reasoning consumed 90%+ of completion tokens, the model ran out of
      // budget before producing any content output.
      if (completionTokens > 0 && reasoningTokens >= completionTokens * 0.9) {
        return {
          valid: false,
          reason: `reasoning consumed ${reasoningTokens}/${completionTokens} tokens — no content output`,
        };
      }
    }
  }

  return {
    valid: true,
    clonedResponse: new Response(text, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    }),
  };
}

/**
 * Normalize a model entry to { model, weight }
 * Supports both legacy string format and new object format
 */
export function normalizeModelEntry(entry: unknown): { model: string; weight: number } {
  return {
    model: getComboStepTarget(entry) || "",
    weight: getComboStepWeight(entry),
  };
}

export function getTargetProvider(modelStr: string, providerId?: string | null): string {
  const parsed = parseModel(modelStr);
  return providerId || parsed.provider || parsed.providerAlias || "unknown";
}

export function isStreamReadinessFailureErrorBody(errorBody: unknown): boolean {
  if (!errorBody || typeof errorBody !== "object") return false;
  const error = (errorBody as Record<string, unknown>).error;
  if (!error || typeof error !== "object") return false;
  const code = (error as Record<string, unknown>).code;
  return code === "STREAM_READINESS_TIMEOUT" || code === "STREAM_EARLY_EOF";
}

/**
 * A local per-API-key token-limit breach surfaces as a 429 tagged with
 * errorCode "TOKEN_LIMIT_EXCEEDED" (see chatCore.ts Tier 2 early return). This
 * is NOT an upstream rate limit, so the combo loop must not cool the shared
 * account/provider, must not add it to transientRateLimitedProviders, and must
 * not retry it transiently — it propagates to the client as a terminal 429.
 */
export function isTokenLimitBreachErrorBody(errorBody: unknown): boolean {
  if (!errorBody || typeof errorBody !== "object") return false;
  const error = (errorBody as Record<string, unknown>).error;
  if (!error || typeof error !== "object") return false;
  return (error as Record<string, unknown>).code === "TOKEN_LIMIT_EXCEEDED";
}

export function toRecordedTarget(target: ResolvedComboTarget) {
  return {
    executionKey: target.executionKey,
    stepId: target.stepId,
    provider: target.provider,
    providerId: target.providerId,
    connectionId: target.connectionId,
    label: target.label,
  };
}

export function finiteNumberOrNull(value: unknown): number | null {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
}

export function toTextContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .map((part) => {
      if (!isRecord(part)) return "";
      if (typeof part.text === "string") return part.text;
      return "";
    })
    .join("\n");
}

export function toStringArray(input: unknown): string[] {
  if (Array.isArray(input)) {
    return input.map((v) => (typeof v === "string" ? v.trim() : "")).filter(Boolean);
  }
  if (typeof input === "string") {
    return input
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
  }
  return [];
}
