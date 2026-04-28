/**
 * Shared combo (model combo) handling with fallback support
 * Supports: priority, weighted, round-robin, random, least-used, cost-optimized,
 * strict-random, auto, fill-first, p2c, lkgp, context-optimized, and context-relay strategies
 */

import {
  checkFallbackError,
  formatRetryAfter,
  getRuntimeProviderProfile,
} from "./accountFallback.ts";
import { errorResponse, unavailableResponse } from "../utils/error.ts";
import { recordComboIntent, recordComboRequest, getComboMetrics } from "./comboMetrics.ts";
import { resolveComboConfig, getDefaultComboConfig } from "./comboConfig.ts";
import { maybeGenerateHandoff, resolveContextRelayConfig } from "./contextHandoff.ts";
import { fetchCodexQuota } from "./codexQuotaFetcher.ts";
import * as semaphore from "./rateLimitSemaphore.ts";
import { getCircuitBreaker } from "../../src/shared/utils/circuitBreaker";
import { fisherYatesShuffle, getNextFromDeck } from "../../src/shared/utils/shuffleDeck";
import { parseModel } from "./model.ts";
import { applyComboAgentMiddleware, injectModelTag } from "./comboAgentMiddleware.ts";
import { classifyWithConfig, DEFAULT_INTENT_CONFIG } from "./intentClassifier.ts";
import { selectProvider as selectAutoProvider } from "./autoCombo/engine.ts";
import { selectWithStrategy } from "./autoCombo/routerStrategy.ts";
import { getTaskFitness } from "./autoCombo/taskFitness.ts";
import {
  calculateFactors,
  calculateScore,
  DEFAULT_WEIGHTS,
  type ProviderCandidate,
  type ScoringWeights,
} from "./autoCombo/scoring.ts";
import { supportsToolCalling } from "./modelCapabilities.ts";
import { getSessionConnection } from "./sessionManager.ts";
import { getModelContextLimit } from "../../src/lib/modelCapabilities";
import { getProviderConnections } from "../../src/lib/db/providers";
import {
  getComboModelString,
  getComboStepTarget,
  getComboStepWeight,
  normalizeComboStep,
} from "../../src/lib/combos/steps.ts";

function isProviderBreakerOpenResponse(
  result: Response,
  errorBody?: { error?: { code?: string | null } } | null
) {
  return (
    result.headers.get("x-omniroute-provider-breaker") === "open" ||
    errorBody?.error?.code === "provider_circuit_open"
  );
}
import {
  getConnectionRoutingTags,
  matchesRoutingTags,
  resolveRequestRoutingTags,
  type RoutingTagMatchMode,
} from "../../src/domain/tagRouter.ts";

// Status codes that should mark round-robin target semaphores as cooling down.
const TRANSIENT_FOR_SEMAPHORE = [429, 502, 503, 504];
const COMBO_BAD_REQUEST_FALLBACK_PATTERNS = [
  /\bprohibited_content\b/i,
  /request blocked by .*api/i,
  /provided message roles? is not valid/i,
  /unsupported .*message role/i,
  /no such tool available/i,
  /unsupported content part type/i,
  /tool(?:_call|_use)? .* not (?:available|found)/i,
  /third-party apps/i,
  // Context overflow — model-specific, may succeed on a model with larger context window
  /context overflow/i,
  /context length exceeded/i,
  /prompt too large/i,
  /token limit/i,
  /too many tokens/i,
  /exceeds? context/i,
  /maximum context/i,
  /input too long/i,
  /messages? exceed/i,
  // Model not supported/found — permanent model-level error, try next combo target
  /no provider supported/i,
  /model not found/i,
  /model not available/i,
  /unsupported model/i,
  /model.*has no provider/i,
  // Function calling format error — model doesn't support this capability
  /function\.?arguments.*(must be|should be|必须).*(json|JSON)/i,
  /tool.*arguments.*invalid/i,
  /function.*parameter.*(invalid|format)/i,
  // Input length range error — model-specific context limit
  /range of input length/i,
  /input length should be/i,
  // Transient 400 errors from upstream — should fallback to next combo target
  /服务遇到了一点小状况/i, // ModelScope/Qwen transient error
  /抱歉.*?敏感内容.*?请检查/i, // ModelScope/Qwen content moderation with context
  /内容.*?敏感.*?(?:无法|过滤)/i, // Content sensitivity block
  /无法响应.*?请求/i, // "unable to respond to request"
  /稍后重试/i, // "retry later" in Chinese
  /temporary.*error/i,
  /transient.*error/i,
  /service.*unavailable/i,
  /please.*try.*again/i,
  // Rate limit errors — some providers return 400 instead of 429
  /\brate.?-?limit.?(?:exceeded|reached|hit)/i,
  /too many requests/i,
  /请求过于频繁/i, // Chinese rate limit message
  // Tool call function name errors — model-specific, try next combo target
  /\bfunction'?s? name (?:can't|can not|is|has) (?:blank|empty|missing)/i,
  /function.*name.*(?:blank|empty|missing)/i,
  /tool_call.*name.*(?:blank|empty|missing)/i,
];

// Patterns that signal all accounts for a provider are rate-limited / exhausted.
// Used to detect 503 responses from handleNoCredentials so combo can fallback.
const ALL_ACCOUNTS_RATE_LIMITED_PATTERNS = [/unavailable/i, /service temporarily unavailable/i];

function isAllAccountsRateLimitedResponse(
  status: number,
  contentType: string | null,
  errorText: string
): boolean {
  if (status !== 503) return false;
  if (!contentType?.includes("application/json")) return false;
  return ALL_ACCOUNTS_RATE_LIMITED_PATTERNS.some((p) => p.test(errorText));
}

const MAX_COMBO_DEPTH = 3;
const MAX_FALLBACK_WAIT_MS = 5000;
const MAX_GLOBAL_ATTEMPTS = 30;

function comboModelNotFoundResponse(message: string) {
  return errorResponse(404, message);
}

// Bootstrap defaults from ClawRouter benchmark (used when no local latency history exists yet)
const DEFAULT_MODEL_P95_MS = {
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

type ResolvedComboTarget = {
  kind: "model";
  stepId: string;
  executionKey: string;
  modelStr: string;
  provider: string;
  providerId: string | null;
  connectionId: string | null;
  allowedConnectionIds?: string[] | null;
  weight: number;
  label: string | null;
};

type ComboRuntimeStep =
  | ResolvedComboTarget
  | {
      kind: "combo-ref";
      stepId: string;
      executionKey: string;
      comboName: string;
      weight: number;
      label: string | null;
    };

function isRecord(value): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function toTrimmedString(value): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
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
async function validateResponseQuality(
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
    if (text.startsWith("data:")) return { valid: true };
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
  const hasContent = content !== null && content !== undefined && content !== "";
  const hasToolCalls = Array.isArray(toolCalls) && toolCalls.length > 0;

  if (!hasContent && !hasToolCalls) {
    return { valid: false, reason: "empty content and no tool_calls in response" };
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

// In-memory atomic counter per combo for round-robin distribution
// Resets on server restart (by design — no stale state)
const rrCounters = new Map();

/**
 * Normalize a model entry to { model, weight }
 * Supports both legacy string format and new object format
 */
function normalizeModelEntry(entry) {
  return {
    model: getComboStepTarget(entry) || "",
    weight: getComboStepWeight(entry),
  };
}

function getTargetProvider(modelStr: string, providerId?: string | null): string {
  const parsed = parseModel(modelStr);
  return providerId || parsed.provider || parsed.providerAlias || "unknown";
}

function isStreamReadinessTimeoutErrorBody(errorBody: unknown): boolean {
  if (!errorBody || typeof errorBody !== "object") return false;
  const error = (errorBody as Record<string, unknown>).error;
  if (!error || typeof error !== "object") return false;
  return (error as Record<string, unknown>).code === "STREAM_READINESS_TIMEOUT";
}

function toRecordedTarget(target: ResolvedComboTarget) {
  return {
    executionKey: target.executionKey,
    stepId: target.stepId,
    provider: target.provider,
    providerId: target.providerId,
    connectionId: target.connectionId,
    label: target.label,
  };
}

function buildExecutionKey(path: string[], stepId: string): string {
  return [...path, stepId].join(">");
}

function normalizeRuntimeStep(entry, comboName, index, allCombos, path = []) {
  const step = normalizeComboStep(entry, {
    comboName,
    index,
    allCombos,
  });
  if (!step) return null;

  const executionKey = buildExecutionKey(path, step.id);
  const label = typeof step.label === "string" ? step.label : null;
  const weight = step.weight || 0;

  if (step.kind === "combo-ref") {
    return {
      kind: "combo-ref",
      stepId: step.id,
      executionKey,
      comboName: step.comboName,
      weight,
      label,
    };
  }

  const modelStr = getComboModelString(step);
  if (!modelStr) return null;

  return {
    kind: "model",
    stepId: step.id,
    executionKey,
    modelStr,
    provider: getTargetProvider(modelStr, step.providerId),
    providerId: step.providerId || null,
    connectionId: step.connectionId || null,
    weight,
    label,
  } satisfies ResolvedComboTarget;
}

function getDirectComboTargets(combo) {
  return getOrderedTopLevelRuntimeSteps(combo, null).filter(
    (entry): entry is ResolvedComboTarget => entry?.kind === "model"
  );
}

function getTopLevelRuntimeSteps(combo, allCombos, path = []) {
  return (combo.models || [])
    .map((entry, index) => normalizeRuntimeStep(entry, combo.name, index, allCombos, path))
    .filter((entry): entry is ComboRuntimeStep => entry !== null);
}

function getCompositeTierStepOrder(combo): string[] {
  const compositeTiers = isRecord(combo?.config) ? combo.config.compositeTiers : null;
  if (!isRecord(compositeTiers)) return [];

  const defaultTier = toTrimmedString(compositeTiers.defaultTier);
  const tiers = isRecord(compositeTiers.tiers) ? compositeTiers.tiers : null;
  if (!defaultTier || !tiers) return [];

  const orderedStepIds: string[] = [];
  const visitedTiers = new Set<string>();
  const seenStepIds = new Set<string>();
  const tierEntries = new Map(
    Object.entries(tiers)
      .map(([tierName, rawTier]) => {
        if (!isRecord(rawTier)) return null;
        const normalizedTierName = toTrimmedString(tierName);
        const stepId = toTrimmedString(rawTier.stepId);
        const fallbackTier = toTrimmedString(rawTier.fallbackTier);
        if (!normalizedTierName || !stepId) return null;
        return [normalizedTierName, { stepId, fallbackTier }] as const;
      })
      .filter(Boolean)
  );

  let currentTier = defaultTier;
  while (currentTier && tierEntries.has(currentTier) && !visitedTiers.has(currentTier)) {
    visitedTiers.add(currentTier);
    const entry = tierEntries.get(currentTier);
    if (!entry) break;
    if (!seenStepIds.has(entry.stepId)) {
      orderedStepIds.push(entry.stepId);
      seenStepIds.add(entry.stepId);
    }
    currentTier = entry.fallbackTier;
  }

  for (const entry of tierEntries.values()) {
    if (!seenStepIds.has(entry.stepId)) {
      orderedStepIds.push(entry.stepId);
      seenStepIds.add(entry.stepId);
    }
  }

  return orderedStepIds;
}

function hasCompositeTierRuntimeOrder(combo): boolean {
  return getCompositeTierStepOrder(combo).length > 0;
}

function orderRuntimeStepsByCompositeTiers(steps: ComboRuntimeStep[], combo): ComboRuntimeStep[] {
  const orderedStepIds = getCompositeTierStepOrder(combo);
  if (orderedStepIds.length === 0) return steps;

  const byStepId = new Map(steps.map((step) => [step.stepId, step]));
  const seen = new Set<string>();
  const ordered: ComboRuntimeStep[] = [];

  for (const stepId of orderedStepIds) {
    const step = byStepId.get(stepId);
    if (!step || seen.has(step.stepId)) continue;
    ordered.push(step);
    seen.add(step.stepId);
  }

  for (const step of steps) {
    if (seen.has(step.stepId)) continue;
    ordered.push(step);
    seen.add(step.stepId);
  }

  return ordered;
}

function getOrderedTopLevelRuntimeSteps(combo, allCombos, path = []) {
  return orderRuntimeStepsByCompositeTiers(getTopLevelRuntimeSteps(combo, allCombos, path), combo);
}

function expandRuntimeStep(step, allCombos, visited = new Set(), depth = 0, path = []) {
  if (step.kind === "model") return [step];
  if (depth > MAX_COMBO_DEPTH) return [];

  const combos = Array.isArray(allCombos) ? allCombos : allCombos?.combos || [];
  const nestedCombo = combos.find((combo) => combo.name === step.comboName);
  if (!nestedCombo || visited.has(step.comboName)) return [];

  return resolveNestedComboTargets(nestedCombo, combos, new Set(visited), depth + 1, [
    ...path,
    step.stepId,
  ]);
}

export function resolveNestedComboTargets(
  combo,
  allCombos,
  visited = new Set(),
  depth = 0,
  path = []
) {
  const directTargets = (combo.models || [])
    .map((entry, index) => normalizeRuntimeStep(entry, combo.name, index, null, path))
    .filter((entry): entry is ResolvedComboTarget => entry?.kind === "model");

  if (depth > MAX_COMBO_DEPTH) return directTargets;
  if (visited.has(combo.name)) return [];
  visited.add(combo.name);

  const runtimeSteps = getOrderedTopLevelRuntimeSteps(combo, allCombos, path);
  const resolved: ResolvedComboTarget[] = [];

  for (const step of runtimeSteps) {
    if (step.kind === "combo-ref") {
      resolved.push(...expandRuntimeStep(step, allCombos, new Set(visited), depth, path));
      continue;
    }
    resolved.push(step);
  }

  return resolved;
}

/**
 * Get combo models from combos data (for open-sse standalone use)
 * @param {string} modelStr - Model string to check
 * @param {Array|Object} combosData - Array of combos or object with combos
 * @returns {Object|null} Full combo object or null if not a combo
 */
export function getComboFromData(modelStr, combosData) {
  const combos = Array.isArray(combosData) ? combosData : combosData?.combos || [];
  const combo = combos.find((c) => c.name === modelStr);
  if (combo && combo.models && combo.models.length > 0) {
    return combo;
  }
  return null;
}

/**
 * Legacy: Get combo models as string array (backward compat)
 */
export function getComboModelsFromData(modelStr, combosData) {
  const combo = getComboFromData(modelStr, combosData);
  if (!combo) return null;
  return combo.models.map((m) => normalizeModelEntry(m).model);
}

/**
 * Validate combo DAG — detect circular references and enforce max depth
 * @param {string} comboName - Name of the combo to validate
 * @param {Array} allCombos - All combos in the system
 * @param {Set} [visited] - Set of already visited combo names (for cycle detection)
 * @param {number} [depth] - Current depth level
 * @throws {Error} If circular reference or max depth exceeded
 */
export function validateComboDAG(comboName, allCombos, visited = new Set(), depth = 0) {
  if (depth > MAX_COMBO_DEPTH) {
    throw new Error(`Max combo nesting depth (${MAX_COMBO_DEPTH}) exceeded at "${comboName}"`);
  }
  if (visited.has(comboName)) {
    throw new Error(`Circular combo reference detected: ${comboName}`);
  }
  visited.add(comboName);

  const combos = Array.isArray(allCombos) ? allCombos : allCombos?.combos || [];
  const combo = combos.find((c) => c.name === comboName);
  if (!combo || !combo.models) return;

  for (const entry of combo.models) {
    const modelName = normalizeModelEntry(entry).model;
    // Check if this model name is itself a combo (not a provider/model pattern)
    const nestedCombo = combos.find((c) => c.name === modelName);
    if (nestedCombo) {
      validateComboDAG(modelName, combos, new Set(visited), depth + 1);
    }
  }
}

/**
 * Resolve nested combos by expanding inline to a flat model list
 * Respects max depth and detects cycles
 * @param {Object} combo - The combo object
 * @param {Array} allCombos - All combos in the system
 * @param {Set} [visited] - For cycle detection
 * @param {number} [depth] - Current depth
 * @returns {Array} Flat array of model strings
 */
export function resolveNestedComboModels(combo, allCombos, visited = new Set(), depth = 0) {
  if (depth > MAX_COMBO_DEPTH) return combo.models.map((m) => normalizeModelEntry(m).model);
  if (visited.has(combo.name)) return []; // cycle safety
  visited.add(combo.name);

  const combos = Array.isArray(allCombos) ? allCombos : allCombos?.combos || [];
  const resolved = [];

  for (const entry of combo.models || []) {
    const modelName = normalizeModelEntry(entry).model;
    const nestedCombo = combos.find((c) => c.name === modelName);

    if (nestedCombo) {
      // Recursively expand the nested combo
      const nested = resolveNestedComboModels(nestedCombo, combos, new Set(visited), depth + 1);
      resolved.push(...nested);
    } else {
      resolved.push(modelName);
    }
  }

  return resolved;
}

function selectWeightedTarget<T extends { weight?: number }>(targets: T[]) {
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

function orderTargetsForWeightedFallback<T extends { executionKey: string; weight: number }>(
  targets: T[],
  selectedExecutionKey: string,
  preserveExistingOrder = false
) {
  const selected = targets.find((target) => target.executionKey === selectedExecutionKey);
  const rest = targets.filter((target) => target.executionKey !== selectedExecutionKey);
  if (!preserveExistingOrder) {
    rest.sort((a, b) => b.weight - a.weight);
  }
  return [selected, ...rest].filter(Boolean) as T[];
}

// shuffleArray and getNextModelFromDeck moved to src/shared/utils/shuffleDeck.ts
// combo.ts now uses the shared, mutex-protected getNextFromDeck with "combo:" namespace.

/**
 * Sort models by pricing (cheapest first) for cost-optimized strategy
 * @param {Array<string>} models - Model strings in "provider/model" format
 * @returns {Promise<Array<string>>} Sorted model strings
 */
async function sortModelsByCost(models) {
  try {
    const { getPricingForModel } = await import("../../src/lib/localDb");
    const withCost = await Promise.all(
      models.map(async (modelStr) => {
        const parsed = parseModel(modelStr);
        const provider = parsed.provider || parsed.providerAlias || "unknown";
        const model = parsed.model || modelStr;
        try {
          const pricing = await getPricingForModel(provider, model);
          return { modelStr, cost: pricing?.input ?? Infinity };
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

async function sortTargetsByCost(targets: ResolvedComboTarget[]) {
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
function sortModelsByUsage(models, comboName) {
  const metrics = getComboMetrics(comboName);
  if (!metrics || !metrics.byModel) return models;

  const withUsage = models.map((modelStr) => ({
    modelStr,
    requests: metrics.byModel[modelStr]?.requests ?? 0,
  }));
  withUsage.sort((a, b) => a.requests - b.requests);
  return withUsage.map((e) => e.modelStr);
}

function sortTargetsByUsage(targets: ResolvedComboTarget[], comboName: string) {
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
function sortModelsByContextSize(models) {
  const withContext = models.map((modelStr) => {
    const parsed = parseModel(modelStr);
    const provider = parsed.provider || parsed.providerAlias || "unknown";
    const model = parsed.model || modelStr;
    const limit = getModelContextLimit(provider, model);
    return { modelStr, context: limit ?? 0 };
  });
  withContext.sort((a, b) => b.context - a.context);
  return withContext.map((e) => e.modelStr);
}

function sortTargetsByContextSize(targets: ResolvedComboTarget[]) {
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

function toTextContent(content) {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .map((part) => {
      if (!part || typeof part !== "object") return "";
      if (typeof part.text === "string") return part.text;
      return "";
    })
    .join("\n");
}

function extractPromptForIntent(body) {
  if (!body || typeof body !== "object") return "";

  const fromMessages = Array.isArray(body.messages)
    ? [...body.messages].reverse().find((m) => m && typeof m === "object" && m.role === "user")
    : null;
  if (fromMessages) return toTextContent(fromMessages.content);

  if (typeof body.input === "string") return body.input;
  if (Array.isArray(body.input)) {
    const text = body.input
      .map((item) => {
        if (!item || typeof item !== "object") return "";
        if (typeof item.content === "string") return item.content;
        if (typeof item.text === "string") return item.text;
        return "";
      })
      .filter(Boolean)
      .join("\n");
    if (text) return text;
  }

  if (typeof body.prompt === "string") return body.prompt;
  return "";
}

export function shouldFallbackComboBadRequest(status, errorText) {
  if (status !== 400 || !errorText) return false;
  const message = String(errorText);
  return COMBO_BAD_REQUEST_FALLBACK_PATTERNS.some((pattern) => pattern.test(message));
}

function mapIntentToTaskType(intent) {
  switch (intent) {
    case "code":
      return "coding";
    case "reasoning":
      return "analysis";
    case "simple":
      return "default";
    case "medium":
    default:
      return "default";
  }
}

function toStringArray(input) {
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

function getIntentConfig(settings, combo) {
  const comboIntentConfig =
    combo?.autoConfig?.intentConfig ||
    combo?.config?.auto?.intentConfig ||
    combo?.config?.intentConfig ||
    {};

  return {
    ...DEFAULT_INTENT_CONFIG,
    ...comboIntentConfig,
    ...(typeof settings?.intentDetectionEnabled === "boolean"
      ? { enabled: settings.intentDetectionEnabled }
      : {}),
    ...(Number.isFinite(Number(settings?.intentSimpleMaxWords))
      ? { simpleMaxWords: Number(settings.intentSimpleMaxWords) }
      : {}),
    ...(toStringArray(settings?.intentExtraCodeKeywords).length > 0
      ? { extraCodeKeywords: toStringArray(settings.intentExtraCodeKeywords) }
      : {}),
    ...(toStringArray(settings?.intentExtraReasoningKeywords).length > 0
      ? { extraReasoningKeywords: toStringArray(settings.intentExtraReasoningKeywords) }
      : {}),
    ...(toStringArray(settings?.intentExtraSimpleKeywords).length > 0
      ? { extraSimpleKeywords: toStringArray(settings.intentExtraSimpleKeywords) }
      : {}),
  };
}

function getBootstrapLatencyMs(modelId) {
  const normalized = String(modelId || "").toLowerCase();
  return DEFAULT_MODEL_P95_MS[normalized] ?? 1500;
}

async function buildAutoCandidates(targets, comboName) {
  const metrics = getComboMetrics(comboName);
  const { getPricingForModel } = await import("../../src/lib/localDb");
  let historicalLatencyStats = {};
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

  const candidates = await Promise.all(
    targets.map(async (target) => {
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
        if (Number.isFinite(inputPrice) && inputPrice >= 0) {
          costPer1MTokens = inputPrice;
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
      const circuitBreakerState =
        breakerStateRaw === "OPEN" || breakerStateRaw === "HALF_OPEN" ? breakerStateRaw : "CLOSED";

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
        accountTier: "standard",
        quotaResetIntervalSecs: 86400,
      };
    })
  );

  return candidates;
}

function dedupeTargetsByExecutionKey(targets: ResolvedComboTarget[]) {
  const seen = new Set<string>();
  return targets.filter((target) => {
    if (seen.has(target.executionKey)) return false;
    seen.add(target.executionKey);
    return true;
  });
}

async function applyRequestTagRouting(
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
          matchMode as RoutingTagMatchMode
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

export function resolveComboTargets(combo, allCombos) {
  return allCombos ? resolveNestedComboTargets(combo, allCombos) : getDirectComboTargets(combo);
}

function resolveWeightedTargets(combo, allCombos) {
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

function scoreAutoTargets(
  targets: ResolvedComboTarget[],
  candidates: ProviderCandidate[],
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
        taskType,
        getTaskFitness
      );
      return {
        target,
        score: calculateScore(factors, weights),
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);
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
}) {
  const strategy = combo.strategy || "priority";
  const relayConfig =
    strategy === "context-relay" ? resolveContextRelayConfig(relayOptions?.config || null) : null;

  // ── Combo Agent Middleware (#399 + #401) ────────────────────────────────
  // Apply system_message override, tool_filter_regex, and extract pinned model
  // from context caching tag. These are all opt-in per combo config.
  const { body: agentBody, pinnedModel } = applyComboAgentMiddleware(
    body,
    combo,
    "" // provider/model not yet known — resolved per-model in loop
  );
  body = agentBody;
  if (pinnedModel) {
    log.info("COMBO", `[#401] Context caching: pinned model=${pinnedModel}`);
  }
  const clientRequestedStream = body?.stream === true;
  // Wrap handleSingleModel to inject context caching tag on response (#401)
  const handleSingleModelWrapped = combo.context_cache_protection
    ? async (b, modelStr, target) => {
        const res = await handleSingleModel(b, modelStr, target);
        if (!res.ok) return res;

        // Non-streaming: inject tag into JSON response
        // Fix #721: Use OpenAI choices format (json.choices[0].message) not json.messages
        if (!b.stream) {
          try {
            const json = await res.clone().json();
            const choice = json?.choices?.[0];
            if (choice?.message) {
              // Wrap single message in array for injectModelTag, then unwrap
              const tagged = injectModelTag([choice.message], modelStr);
              // If the message had tool_calls but no string content, injectModelTag
              // appends a synthetic assistant message — use the last one
              const taggedMsg = tagged[tagged.length - 1];
              const updatedJson = {
                ...json,
                choices: [{ ...choice, message: taggedMsg }, ...(json.choices?.slice(1) || [])],
              };
              return new Response(JSON.stringify(updatedJson), {
                status: res.status,
                headers: res.headers,
              });
            }
          } catch {
            /* non-JSON — skip tagging */
          }
          return res;
        }

        // Streaming (Fix #490 + #511): prepend omniModel tag into the first
        // non-empty content chunk so it arrives BEFORE finish_reason:stop.
        // SDKs close the connection on finish_reason, so anything sent after
        // that marker is silently dropped.
        if (!res.body) return res;
        const tagContent = `<omniModel>${modelStr}</omniModel>`;
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        let tagInjected = false;

        const transform = new TransformStream({
          transform(chunk, controller) {
            if (tagInjected) {
              // Already injected — passthrough
              controller.enqueue(chunk);
              return;
            }

            const text = decoder.decode(chunk, { stream: true });

            // Fix #721: Look for either non-empty content OR tool_calls in the
            // SSE data. Tool-call-only responses have content:null, so we inject
            // the tag when we see a finish_reason approaching, or on first content.
            const contentMatch = text.match(/"content":"([^"]+)/);
            if (contentMatch) {
              // Inject tag at the beginning of the first content value
              const injected = text.replace(
                /"content":"([^"]+)/,
                `"content":"${tagContent.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}$1`
              );
              tagInjected = true;
              controller.enqueue(encoder.encode(injected));
              return;
            }

            // Fix #721: For tool-call-only streams, inject the tag when we see
            // the finish_reason chunk (before it reaches the client SDK which
            // would close the connection). This ensures the tag roundtrips
            // through the conversation history even when there's no text content.
            if (text.includes('"finish_reason"') && !text.includes('"finish_reason":null')) {
              // Inject a content chunk with the tag just before this finish chunk
              const tagChunk = `data: ${JSON.stringify({
                choices: [
                  {
                    delta: { content: tagContent },
                    index: 0,
                    finish_reason: null,
                  },
                ],
              })}\n\n`;
              tagInjected = true;
              controller.enqueue(encoder.encode(tagChunk));
              controller.enqueue(chunk);
              return;
            }

            // No content yet — passthrough
            controller.enqueue(chunk);
          },
          flush(controller) {
            // If stream ends without ever finding content (edge case),
            // inject tag as a standalone chunk before the stream closes
            if (!tagInjected) {
              const tagChunk = `data: ${JSON.stringify({
                choices: [
                  {
                    delta: { content: tagContent },
                    index: 0,
                    finish_reason: null,
                  },
                ],
              })}\n\n`;
              controller.enqueue(encoder.encode(tagChunk));
            }
          },
        });

        // FIX #585: Sanitize outbound stream — strip <omniModel> tags from
        // visible content so they don't leak to the user. The tag is still
        // present in the full response for round-trip context pinning, but
        // we clean it from each SSE chunk's content field before delivery.
        //
        // IMPORTANT: Use a SEPARATE TextDecoder from the transform stream above.
        // The transform stream's decoder accumulates UTF-8 state; reusing it here
        // would corrupt multi-byte characters split across chunk boundaries.
        const sanitizeDecoder = new TextDecoder();
        const sanitize = new TransformStream({
          transform(chunk, controller) {
            const text = sanitizeDecoder.decode(chunk, { stream: true });
            if (text) {
              if (text.includes("<omniModel>")) {
                const cleaned = text.replace(
                  /(?:\\n|\n|\r)*<omniModel>[^<]+<\/omniModel>(?:\\n|\n|\r)*/g,
                  ""
                );
                if (cleaned) controller.enqueue(encoder.encode(cleaned));
              } else {
                controller.enqueue(encoder.encode(text));
              }
            }
          },
          flush(controller) {
            const tail = sanitizeDecoder.decode();
            if (tail) {
              if (tail.includes("<omniModel>")) {
                const cleaned = tail.replace(
                  /(?:\\n|\n|\r)*<omniModel>[^<]+<\/omniModel>(?:\\n|\n|\r)*/g,
                  ""
                );
                if (cleaned) controller.enqueue(encoder.encode(cleaned));
              } else {
                controller.enqueue(encoder.encode(tail));
              }
            }
          },
        });

        const transformedStream = res.body.pipeThrough(transform).pipeThrough(sanitize);
        // Add model info as response header for clients that support it
        const headers = new Headers(res.headers);
        headers.set("X-OmniRoute-Model", modelStr);
        return new Response(transformedStream, {
          status: res.status,
          headers,
        });
      }
    : handleSingleModel;
  // ─────────────────────────────────────────────────────────────────────────

  // Route to pinned model if context caching specifies one (Fix #679)
  if (pinnedModel) {
    log.info(
      "COMBO",
      `Bypassing strategy — routing directly to pinned context model: ${pinnedModel}`
    );
    return handleSingleModelWrapped(body, pinnedModel);
  }

  // Route to round-robin handler if strategy matches
  if (strategy === "round-robin") {
    return handleRoundRobinCombo({
      body,
      combo,
      handleSingleModel: handleSingleModelWrapped,
      isModelAvailable,
      log,
      settings,
      allCombos,
      signal,
    });
  }

  // Use config cascade if settings provided
  const config = settings
    ? resolveComboConfig(combo, settings)
    : { ...getDefaultComboConfig(), ...(combo.config || {}) };
  const maxRetries = config.maxRetries ?? 1;
  const retryDelayMs = config.retryDelayMs ?? 2000;

  let orderedTargets =
    strategy === "weighted"
      ? resolveWeightedTargets(combo, allCombos)?.orderedTargets || []
      : resolveComboTargets(combo, allCombos);

  orderedTargets = await applyRequestTagRouting(orderedTargets, body, log);

  if (strategy === "weighted") {
    log.info(
      "COMBO",
      `Weighted selection${allCombos ? " with nested resolution" : ""}: ${orderedTargets.length} total targets`
    );
  } else if (allCombos) {
    log.info("COMBO", `${strategy} with nested resolution: ${orderedTargets.length} total targets`);
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

    const prompt = extractPromptForIntent(body);
    const systemPrompt =
      typeof combo?.system_message === "string" ? combo.system_message : undefined;
    const intentConfig = getIntentConfig(settings, combo);
    const intent = classifyWithConfig(prompt, intentConfig, systemPrompt);
    recordComboIntent(combo.name, intent);
    const taskType = mapIntentToTaskType(intent);

    const autoConfigSource = combo?.autoConfig || combo?.config?.auto || combo?.config || {};
    const routingStrategy =
      typeof autoConfigSource.routingStrategy === "string"
        ? autoConfigSource.routingStrategy
        : typeof autoConfigSource.strategyName === "string"
          ? autoConfigSource.strategyName
          : "rules";

    const candidatePool = Array.isArray(autoConfigSource.candidatePool)
      ? autoConfigSource.candidatePool
      : [...new Set(eligibleTargets.map((target) => target.provider))];

    const weights =
      autoConfigSource.weights && typeof autoConfigSource.weights === "object"
        ? autoConfigSource.weights
        : DEFAULT_WEIGHTS;
    const explorationRate = Number.isFinite(Number(autoConfigSource.explorationRate))
      ? Number(autoConfigSource.explorationRate)
      : 0.05;
    const budgetCap = Number.isFinite(Number(autoConfigSource.budgetCap))
      ? Number(autoConfigSource.budgetCap)
      : undefined;
    const modePack =
      typeof autoConfigSource.modePack === "string" ? autoConfigSource.modePack : undefined;

    let lastKnownGoodProvider: string | undefined;
    try {
      const { getLKGP } = await import("../../src/lib/localDb");
      const lkgp = await getLKGP(combo.name, combo.id || combo.name);
      if (lkgp) lastKnownGoodProvider = lkgp;
    } catch (err) {
      log.warn("COMBO", "Failed to retrieve Last Known Good Provider. This is non-fatal.", { err });
    }

    const candidates = await buildAutoCandidates(eligibleTargets, combo.name);
    if (candidates.length > 0) {
      let selectedProvider = null;
      let selectedModel = null;
      let selectionReason = "";

      if (routingStrategy !== "rules") {
        try {
          const decision = selectWithStrategy(
            candidates,
            { taskType, requestHasTools, lastKnownGoodProvider },
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
          candidates,
          taskType
        );
        selectedProvider = selection.provider;
        selectedModel = selection.model;
        selectionReason = `score=${selection.score.toFixed(3)}${selection.isExploration ? " (exploration)" : ""}`;
      }

      const scoredTargets = scoreAutoTargets(eligibleTargets, candidates, taskType, weights);
      const rankedTargets = scoredTargets.map((entry) => entry.target);
      const selectedTarget =
        scoredTargets.find((entry) => {
          const parsed = parseModel(entry.target.modelStr);
          const modelId = parsed.model || entry.target.modelStr;
          return entry.target.provider === selectedProvider && modelId === selectedModel;
        })?.target ||
        rankedTargets[0] ||
        eligibleTargets[0];

      orderedTargets = dedupeTargetsByExecutionKey(
        [selectedTarget, ...rankedTargets, ...eligibleTargets].filter(Boolean)
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
        const lkgpIndex = orderedTargets.findIndex(
          (target) =>
            target.provider === lkgpProvider || target.modelStr.startsWith(`${lkgpProvider}/`)
        );

        if (lkgpIndex > 0) {
          const [lkgpTarget] = orderedTargets.splice(lkgpIndex, 1);
          orderedTargets.unshift(lkgpTarget);
          log.info(
            "COMBO",
            `[LKGP] Prioritizing last known good provider ${lkgpProvider} for combo "${combo.name}"`
          );
        } else if (lkgpIndex === 0) {
          log.debug(
            "COMBO",
            `[LKGP] Last known good provider ${lkgpProvider} already first for combo "${combo.name}"`
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
    const rest = orderedTargets.filter((target) => target.executionKey !== selectedExecutionKey);
    orderedTargets = [selectedTarget, ...rest].filter(Boolean);
    log.info(
      "COMBO",
      `Strict-random deck: ${selectedExecutionKey} selected (${orderedTargets.length} targets)`
    );
  } else if (strategy === "random") {
    orderedTargets = fisherYatesShuffle([...orderedTargets]);
    log.info("COMBO", `Random shuffle: ${orderedTargets.length} targets`);
  } else if (strategy === "least-used") {
    orderedTargets = sortTargetsByUsage(orderedTargets, combo.name);
    log.info("COMBO", `Least-used ordering: ${orderedTargets[0]?.modelStr} has fewest requests`);
  } else if (strategy === "cost-optimized") {
    orderedTargets = await sortTargetsByCost(orderedTargets);
    log.info("COMBO", `Cost-optimized ordering: cheapest first (${orderedTargets[0]?.modelStr})`);
  } else if (strategy === "context-optimized") {
    orderedTargets = sortTargetsByContextSize(orderedTargets);
    log.info("COMBO", `Context-optimized ordering: largest first (${orderedTargets[0]?.modelStr})`);
  }

  if (orderedTargets.length === 0) {
    return comboModelNotFoundResponse("Combo has no executable targets");
  }

  let lastError = null;
  let earliestRetryAfter = null;
  let lastStatus = null;
  const startTime = Date.now();
  let globalAttempts = 0;
  let fallbackCount = 0;
  let recordedAttempts = 0;

  for (let i = 0; i < orderedTargets.length; i++) {
    const target = orderedTargets[i];
    const modelStr = target.modelStr;
    const provider = target.provider;
    const profile = await getRuntimeProviderProfile(provider);

    // Pre-check: skip models where all accounts are in cooldown
    if (isModelAvailable) {
      const available = await isModelAvailable(modelStr, target);
      if (!available) {
        log.info("COMBO", `Skipping ${modelStr} (all accounts in cooldown)`);
        if (i > 0) fallbackCount++;
        continue;
      }
    }

    // Retry loop for transient errors
    for (let retry = 0; retry <= maxRetries; retry++) {
      // Fix #1681: Bail out immediately if the client has disconnected
      if (signal?.aborted) {
        log.info("COMBO", `Client disconnected — aborting combo loop before model ${modelStr}`);
        return errorResponse(499, "Client disconnected");
      }
      globalAttempts++;
      if (globalAttempts > MAX_GLOBAL_ATTEMPTS) {
        log.warn(
          "COMBO",
          `Maximum combo attempts (${MAX_GLOBAL_ATTEMPTS}) exceeded across all targets and fallbacks. Terminating loop to prevent runaway background requests.`
        );
        return errorResponse(503, "Maximum combo retry limit reached");
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
          return errorResponse(499, "Client disconnected");
        }
      }

      log.info(
        "COMBO",
        `Trying model ${i + 1}/${orderedTargets.length}: ${modelStr}${retry > 0 ? ` (retry ${retry})` : ""}`
      );

      const result = await handleSingleModelWrapped(body, modelStr, target);

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
          if (i > 0) fallbackCount++;
          break; // move to next model
        }
        const latencyMs = Date.now() - startTime;
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
              const resetCandidates = [quotaInfo.window5h?.resetAt, quotaInfo.window7d?.resetAt]
                .filter((value): value is string => typeof value === "string" && value.length > 0)
                .sort();
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
                handleSingleModel: handleSingleModelWrapped,
              });
            }
          }
        }

        // Record last known good provider (LKGP) for this combo/model (#919)
        if (provider) {
          try {
            const { setLKGP } = await import("../../src/lib/localDb");
            await Promise.all([
              setLKGP(combo.name, target.executionKey, provider),
              setLKGP(combo.name, combo.id || combo.name, provider),
            ]);
          } catch (err) {
            log.warn("COMBO", "Failed to record Last Known Good Provider. This is non-fatal.", {
              err,
            });
          }
        }

        return quality.clonedResponse ?? result;
      }

      // Extract error info from response
      let errorText = result.statusText || "";
      let errorBody = null;
      let retryAfter = null;
      try {
        const cloned = result.clone();
        try {
          const text = await cloned.text();
          if (text) {
            errorText = text.substring(0, 500);
            errorBody = JSON.parse(text);
            errorText =
              errorBody?.error?.message || errorBody?.error || errorBody?.message || errorText;
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

      const providerBreakerOpen = isProviderBreakerOpenResponse(result, errorBody);
      const isStreamReadinessTimeout =
        result.status === 504 && isStreamReadinessTimeoutErrorBody(errorBody);

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
        return result;
      }

      if (providerBreakerOpen) {
        lastError = errorText || String(result.status);
        if (!lastStatus) lastStatus = result.status;
        if (i > 0) fallbackCount++;
        log.info("COMBO", `Skipping ${modelStr}: provider circuit breaker OPEN for ${provider}`);
        break;
      }

      const { shouldFallback, cooldownMs } = checkFallbackError(
        result.status,
        errorText,
        0,
        null,
        provider,
        result.headers,
        profile
      );
      const comboBadRequestFallback = shouldFallbackComboBadRequest(result.status, errorText);

      if (!shouldFallback && !comboBadRequestFallback) {
        log.warn("COMBO", `Model ${modelStr} failed (no fallback)`, { status: result.status });
        recordComboRequest(combo.name, modelStr, {
          success: false,
          latencyMs: Date.now() - startTime,
          fallbackCount,
          strategy,
          target: toRecordedTarget(target),
        });
        recordedAttempts++;
        return result;
      }

      if (comboBadRequestFallback) {
        log.info(
          "COMBO",
          `Treating provider-scoped 400 from ${modelStr} as model-local failure; trying next combo target`
        );
      }

      // Check if this is a transient error worth retrying on same model
      const isTransient =
        !isStreamReadinessTimeout && [408, 429, 500, 502, 503, 504].includes(result.status);
      if (retry < maxRetries && isTransient) {
        continue; // Retry same model
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
      log.warn("COMBO", `Model ${modelStr} failed, trying next`, { status: result.status });

      const fallbackWaitMs =
        retryDelayMs > 0 && cooldownMs > 0 && cooldownMs <= MAX_FALLBACK_WAIT_MS
          ? Math.min(cooldownMs, retryDelayMs)
          : 0;
      if ([502, 503, 504].includes(result.status) && fallbackWaitMs > 0) {
        log.info("COMBO", `Waiting ${fallbackWaitMs}ms before fallback to next model`);
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
          return errorResponse(499, "Client disconnected");
        }
      }

      break; // Move to next model
    }
  }

  // All models failed
  const latencyMs = Date.now() - startTime;
  if (recordedAttempts === 0) {
    recordComboRequest(combo.name, null, { success: false, latencyMs, fallbackCount, strategy });
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
  const msg = lastError || "All combo models unavailable";

  if (earliestRetryAfter) {
    const retryHuman = formatRetryAfter(earliestRetryAfter);
    log.warn("COMBO", `All models failed | ${msg} (${retryHuman})`);
    return unavailableResponse(status, msg, earliestRetryAfter, retryHuman);
  }

  log.warn("COMBO", `All models failed | ${msg}`);
  return new Response(JSON.stringify({ error: { message: msg } }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
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
}) {
  const config = settings
    ? resolveComboConfig(combo, settings)
    : { ...getDefaultComboConfig(), ...(combo.config || {}) };
  const concurrency = config.concurrencyPerModel ?? 3;
  const queueTimeout = config.queueTimeoutMs ?? 30000;
  const maxRetries = config.maxRetries ?? 1;
  const retryDelayMs = config.retryDelayMs ?? 2000;

  const orderedTargets = resolveComboTargets(combo, allCombos);
  const filteredTargets = await applyRequestTagRouting(orderedTargets, body, log);
  const modelCount = filteredTargets.length;
  if (modelCount === 0) {
    return comboModelNotFoundResponse("Round-robin combo has no executable targets");
  }

  // Get and increment atomic counter
  const counter = rrCounters.get(combo.name) || 0;
  rrCounters.set(combo.name, counter + 1);
  const startIndex = counter % modelCount;

  const clientRequestedStream = body?.stream === true;
  const startTime = Date.now();
  let lastError = null;
  let lastStatus = null;
  let earliestRetryAfter = null;
  let globalAttempts = 0;
  let fallbackCount = 0;
  let recordedAttempts = 0;

  // Try each model starting from the round-robin target
  for (let offset = 0; offset < modelCount; offset++) {
    const modelIndex = (startIndex + offset) % modelCount;
    const target = filteredTargets[modelIndex];
    const modelStr = target.modelStr;
    const provider = target.provider;
    const profile = await getRuntimeProviderProfile(provider);
    const semaphoreKey = `combo:${combo.name}:${target.executionKey}`;

    // Pre-check availability
    if (isModelAvailable) {
      const available = await isModelAvailable(modelStr, target);
      if (!available) {
        log.info("COMBO-RR", `Skipping ${modelStr} (all accounts in cooldown)`);
        if (offset > 0) fallbackCount++;
        continue;
      }
    }

    // Acquire semaphore slot (may wait in queue)
    let release;
    try {
      release = await semaphore.acquire(semaphoreKey, {
        maxConcurrency: concurrency,
        timeoutMs: queueTimeout,
      });
    } catch (err) {
      if (err.code === "SEMAPHORE_TIMEOUT") {
        log.warn("COMBO-RR", `Semaphore timeout for ${modelStr}, trying next model`);
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

        const result = await handleSingleModel(body, modelStr, target);

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
          if (provider) {
            try {
              const { setLKGP } = await import("../../src/lib/localDb");
              await Promise.all([
                setLKGP(combo.name, target.executionKey, provider),
                setLKGP(combo.name, combo.id || combo.name, provider),
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
          }
          return result;
        }

        // Extract error info
        let errorText = result.statusText || "";
        let retryAfter = null;
        let errorBody: {
          error?: { code?: string | null; message?: string | null } | string;
          message?: string | null;
          retryAfter?: number | string | null;
        } | null = null;
        try {
          const cloned = result.clone();
          try {
            const text = await cloned.text();
            if (text) {
              errorText = text.substring(0, 500);
              errorBody = JSON.parse(text);
              errorText =
                errorBody?.error?.message || errorBody?.error || errorBody?.message || errorText;
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

        if (isProviderBreakerOpenResponse(result, errorBody as Record<string, unknown> | null)) {
          lastError = errorText || String(result.status);
          if (!lastStatus) lastStatus = result.status;
          if (offset > 0) fallbackCount++;
          log.info(
            "COMBO-RR",
            `Skipping ${modelStr}: provider circuit breaker OPEN for ${provider}`
          );
          break;
        }
        const isStreamReadinessTimeout =
          result.status === 504 && isStreamReadinessTimeoutErrorBody(errorBody);

        const { shouldFallback, cooldownMs } = checkFallbackError(
          result.status,
          errorText,
          0,
          null,
          provider,
          result.headers,
          profile
        );
        const comboBadRequestFallback = shouldFallbackComboBadRequest(result.status, errorText);

        const isAllAccountsRateLimited = isAllAccountsRateLimitedResponse(
          result.status,
          result.headers?.get("content-type") ?? null,
          errorText
        );

        // Transient errors → mark in semaphore so round-robin stops stampeding this target.
        if (TRANSIENT_FOR_SEMAPHORE.includes(result.status) && cooldownMs > 0) {
          semaphore.markRateLimited(semaphoreKey, cooldownMs);
          log.warn("COMBO-RR", `${modelStr} error ${result.status}, cooldown ${cooldownMs}ms`);
        }

        if (isAllAccountsRateLimited) {
          log.info(
            "COMBO",
            `All accounts rate-limited for ${modelStr}, falling back to next model`
          );
        } else if (!shouldFallback && !comboBadRequestFallback) {
          log.warn("COMBO-RR", `${modelStr} failed (no fallback)`, { status: result.status });
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

        if (comboBadRequestFallback) {
          log.info(
            "COMBO-RR",
            `Treating provider-scoped 400 from ${modelStr} as model-local failure; trying next model`
          );
        }

        // Transient error → retry same model
        const isTransient =
          !isStreamReadinessTimeout && [408, 429, 500, 502, 503, 504].includes(result.status);
        if (retry < maxRetries && isTransient) {
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

        const fallbackWaitMs =
          retryDelayMs > 0 && cooldownMs > 0 && cooldownMs <= MAX_FALLBACK_WAIT_MS
            ? Math.min(cooldownMs, retryDelayMs)
            : 0;
        if ([502, 503, 504].includes(result.status) && fallbackWaitMs > 0) {
          log.info("COMBO-RR", `Waiting ${fallbackWaitMs}ms before fallback to next model`);
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
    const retryHuman = formatRetryAfter(earliestRetryAfter);
    log.warn("COMBO-RR", `All models failed | ${msg} (${retryHuman})`);
    return unavailableResponse(status, msg, earliestRetryAfter, retryHuman);
  }

  log.warn("COMBO-RR", `All models failed | ${msg}`);
  return new Response(JSON.stringify({ error: { message: msg } }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
