/**
 * Combo structure resolution extracted from combo.ts.
 *
 * Runtime-step normalization, nested-combo / DAG expansion, weighted/direct
 * target resolution, and request-compatibility filtering moved out of the
 * combo.ts god-file (Quality Gate v2 / Fase 9). Logic unchanged; the public
 * entry points (resolveComboTargets, resolveNestedComboTargets, getComboFromData,
 * getComboModelsFromData, validateComboDAG, resolveNestedComboModels,
 * filterTargetsByRequestCompatibility) are re-exported from combo.ts for the
 * ~20 external consumers (chatCore.ts, the /api/combos routes, embeddings, etc.).
 * Context-window metadata is advisory: known-fitting targets are ordered first,
 * while catalog-too-small targets remain available for runtime fallback.
 * No barrel import — depends only on sibling leaves.
 */

import { getModelContextLimit } from "../../../src/lib/modelCapabilities";
import { getHiddenModelsByProvider } from "../../../src/lib/db/models";
import { getComboModelString, normalizeComboStep } from "../../../src/lib/combos/steps.ts";
import { getProviderByAlias, getProviderById } from "../../../src/shared/constants/providers.ts";
import { estimateTokens } from "../contextManager.ts";
import { containsMediaKind } from "../../utils/mediaParts.ts";
import { getResolvedModelCapabilities } from "../modelCapabilities.ts";
import { parseModel, stripContextWindowSuffix } from "../model.ts";
import { dedupeTargetsByExecutionKey, isRecord } from "./comboData.ts";
import { isComboModelVisible } from "./comboVisibility.ts";
import { getTargetProvider, MAX_COMBO_DEPTH } from "./comboPredicates.ts";
import { evaluateContextLimit } from "./contextOverrideGate.ts";
import {
  normalizeModelEntry,
  orderTargetsForWeightedFallback,
  selectWeightedTarget,
} from "./targetSorters.ts";
import type {
  ComboCollectionLike,
  ComboInput,
  ComboLike,
  ComboLogger,
  ComboRuntimeStep,
  HiddenModelsByProvider,
  NestedComboMode,
  ResolvedComboTarget,
  ResolvedComboUnit,
} from "./types.ts";

/**
 * #8488 / #5240: web-cookie (and similar) providers honestly advertise
 * registry toolCalling:false but still run the prompt-emulated tool shim.
 * Combo tools filters must keep those targets eligible so fail-closed does
 * not regress emulation-only web-provider combos.
 */
export function providerSupportsEmulatedToolCalling(
  providerIdOrAlias: string | null | undefined
): boolean {
  if (!providerIdOrAlias) return false;
  const provider =
    getProviderById(providerIdOrAlias) || getProviderByAlias(providerIdOrAlias) || null;
  if (!provider || typeof provider !== "object") return false;
  return (provider as { toolCalling?: unknown }).toolCalling === "emulated";
}

function toTrimmedString(value: unknown): string | null {
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

function getCombosArray(allCombos: ComboCollectionLike): ComboLike[] {
  const combos = Array.isArray(allCombos) ? allCombos : allCombos?.combos || [];
  return combos.map((combo) => toComboLike(combo));
}

function buildExecutionKey(path: string[], stepId: string): string {
  return [...path, stepId].join(">");
}

function normalizeRuntimeStep(
  entry: unknown,
  comboName: string,
  index: number,
  allCombos: ComboCollectionLike,
  path: string[] = []
): ComboRuntimeStep | null {
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
      ...(step.fallbackOnlyOnQuotaExhaustion ? { fallbackOnlyOnQuotaExhaustion: true } : {}),
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
    // #3266: a per-step account allowlist scopes round-robin/weighted selection
    // to a subset of the provider's connections. This is the second writer of
    // `allowedConnectionIds` (tag routing is the first); both feed the existing
    // credential-selection filter in auth.ts.
    ...(Array.isArray(step.allowedConnectionIds) && step.allowedConnectionIds.length > 0
      ? { allowedConnectionIds: step.allowedConnectionIds }
      : {}),
    weight,
    label,
    // `prompt` is a per-step pipeline input and only exists on a model step —
    // #8894 widened the union with ComboProviderWildcardStep, which has no prompt.
    prompt: (step.kind === "model" ? step.prompt : null) || null,
    ...(step.kind === "model" && step.fallbackOnlyOnQuotaExhaustion
      ? { fallbackOnlyOnQuotaExhaustion: true }
      : {}),
  } satisfies ResolvedComboTarget;
}

function isComboTargetVisible(
  target: ResolvedComboTarget,
  hiddenModelsByProvider: HiddenModelsByProvider
): boolean {
  return isComboModelVisible(
    target.modelStr,
    target.providerId || target.provider,
    hiddenModelsByProvider
  );
}

export function filterVisibleComboTargets(
  targets: ResolvedComboTarget[],
  hiddenModelsByProvider: HiddenModelsByProvider = getHiddenModelsByProvider()
): ResolvedComboTarget[] {
  return targets.filter((target) => isComboTargetVisible(target, hiddenModelsByProvider));
}

function getTopLevelRuntimeSteps(
  combo: ComboLike,
  allCombos: ComboCollectionLike,
  path: string[] = []
): ComboRuntimeStep[] {
  return (combo.models || [])
    .map((entry, index) => normalizeRuntimeStep(entry, combo.name, index, allCombos, path))
    .filter((entry): entry is ComboRuntimeStep => entry !== null);
}

function getCompositeTierStepOrder(combo: ComboLike): string[] {
  const compositeTiers = isRecord(combo?.config) ? combo.config.compositeTiers : null;
  if (!isRecord(compositeTiers)) return [];

  const defaultTier = toTrimmedString(compositeTiers.defaultTier);
  const tiers = isRecord(compositeTiers.tiers) ? compositeTiers.tiers : null;
  if (!defaultTier || !tiers) return [];

  const orderedStepIds: string[] = [];
  const visitedTiers = new Set<string>();
  const seenStepIds = new Set<string>();
  type CompositeTierEntry = readonly [
    string,
    { readonly stepId: string; readonly fallbackTier: string | null },
  ];
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
      .filter((entry): entry is CompositeTierEntry => entry !== null)
  );

  let currentTier: string | null = defaultTier;
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

function hasCompositeTierRuntimeOrder(combo: ComboLike): boolean {
  return getCompositeTierStepOrder(combo).length > 0;
}

function orderRuntimeStepsByCompositeTiers(
  steps: ComboRuntimeStep[],
  combo: ComboLike
): ComboRuntimeStep[] {
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

function getOrderedTopLevelRuntimeSteps(
  combo: ComboLike,
  allCombos: ComboCollectionLike,
  path: string[] = []
): ComboRuntimeStep[] {
  return orderRuntimeStepsByCompositeTiers(getTopLevelRuntimeSteps(combo, allCombos, path), combo);
}

function expandRuntimeStep(
  step: ComboRuntimeStep,
  allCombos: ComboCollectionLike,
  visited = new Set<string>(),
  depth = 0,
  path: string[] = [],
  maxDepth: number = MAX_COMBO_DEPTH
): ResolvedComboTarget[] {
  if (step.kind === "model") return [step];
  if (depth > maxDepth) return [];

  const combos = getCombosArray(allCombos);
  const nestedCombo = combos.find((combo) => combo.name === step.comboName);
  if (!nestedCombo || visited.has(step.comboName)) return [];

  return resolveNestedComboTargets(
    nestedCombo,
    combos,
    new Set(visited),
    depth + 1,
    [...path, step.stepId],
    maxDepth
  );
}

export function resolveNestedComboTargets(
  combo: ComboLike,
  allCombos: ComboCollectionLike,
  visited = new Set<string>(),
  depth = 0,
  path: string[] = [],
  maxDepth: number = MAX_COMBO_DEPTH
): ResolvedComboTarget[] {
  const directTargets = (combo.models || [])
    .map((entry, index) => normalizeRuntimeStep(entry, combo.name, index, null, path))
    .filter((entry): entry is ResolvedComboTarget => entry?.kind === "model");

  if (depth > maxDepth) return directTargets;
  if (visited.has(combo.name)) return [];
  visited.add(combo.name);

  const runtimeSteps = getOrderedTopLevelRuntimeSteps(combo, allCombos, path);
  const resolved: ResolvedComboTarget[] = [];

  for (const step of runtimeSteps) {
    if (step.kind === "combo-ref") {
      resolved.push(...expandRuntimeStep(step, allCombos, new Set(visited), depth, path, maxDepth));
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
export function getComboFromData(
  modelStr: string,
  combosData: ComboCollectionLike
): ComboLike | null {
  const combos = getCombosArray(combosData);
  const combo = combos.find((c) => c.name === modelStr);
  if (combo?.models && combo.models.length > 0) {
    return combo;
  }
  return null;
}

/**
 * Legacy: Get combo models as string array (backward compat)
 */
export function getComboModelsFromData(
  modelStr: string,
  combosData: ComboCollectionLike
): string[] | null {
  const baseModelStr = stripContextWindowSuffix(modelStr);
  const combo = getComboFromData(baseModelStr || modelStr, combosData);
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
export function validateComboDAG(
  comboName: string,
  allCombos: ComboCollectionLike,
  visited = new Set<string>(),
  depth = 0,
  maxDepth: number = MAX_COMBO_DEPTH
): void {
  if (depth > maxDepth) {
    throw new Error(`Max combo nesting depth (${maxDepth}) exceeded at "${comboName}"`);
  }
  if (visited.has(comboName)) {
    throw new Error(`Circular combo reference detected: ${comboName}`);
  }
  visited.add(comboName);

  const combos = getCombosArray(allCombos);
  const combo = combos.find((c) => c.name === comboName);
  if (!combo?.models) return;

  for (const entry of combo.models) {
    const modelName = normalizeModelEntry(entry).model;
    // Check if this model name is itself a combo (not a provider/model pattern)
    const nestedCombo = combos.find((c) => c.name === modelName);
    if (nestedCombo) {
      validateComboDAG(modelName, combos, new Set(visited), depth + 1, maxDepth);
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
export function resolveNestedComboModels(
  combo: ComboLike,
  allCombos: ComboCollectionLike,
  visited = new Set<string>(),
  depth = 0,
  maxDepth: number = MAX_COMBO_DEPTH
): string[] {
  if (depth > maxDepth) return combo.models.map((m) => normalizeModelEntry(m).model);
  if (visited.has(combo.name)) return []; // cycle safety
  visited.add(combo.name);

  const combos = getCombosArray(allCombos);
  const resolved: string[] = [];

  for (const entry of combo.models || []) {
    const modelName = normalizeModelEntry(entry).model;
    const nestedCombo = combos.find((c) => c.name === modelName);

    if (nestedCombo) {
      // Recursively expand the nested combo
      const nested = resolveNestedComboModels(
        nestedCombo,
        combos,
        new Set(visited),
        depth + 1,
        maxDepth
      );
      resolved.push(...nested);
    } else {
      resolved.push(modelName);
    }
  }

  return resolved;
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

export type RequestCompatibilityRequirements = {
  requiresTools: boolean;
  requiresVision: boolean;
  requiresStructuredOutput: boolean;
  estimatedInputTokens: number;
  requestedOutputTokens: number;
  requiredContextTokens: number;
};

function getPositiveTokenCount(value: unknown): number {
  const count = Number(value);
  return Number.isFinite(count) && count > 0 ? Math.ceil(count) : 0;
}

function requestRequiresTools(body: Record<string, unknown>): boolean {
  if (Array.isArray(body.tools) && body.tools.length > 0) return true;
  if (Array.isArray(body.functions) && body.functions.length > 0) return true;
  return false;
}

function requestRequiresStructuredOutput(body: Record<string, unknown>): boolean {
  const responseFormat = isRecord(body.response_format) ? body.response_format : null;
  const type = typeof responseFormat?.type === "string" ? responseFormat.type : null;
  return type === "json_object" || type === "json_schema";
}

export function hasEstimableContent(value: unknown): boolean {
  if (value === undefined || value === null) return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.keys(value).length > 0;
  return true;
}

function estimateRequestInputTokens(body: Record<string, unknown>): number {
  const estimatePayload: Record<string, unknown> = {};
  for (const key of ["messages", "input", "tools", "functions", "response_format"]) {
    if (hasEstimableContent(body[key])) estimatePayload[key] = body[key];
  }
  return Object.keys(estimatePayload).length > 0 ? estimateTokens(estimatePayload) : 0;
}

function valueContainsImagePart(value: unknown): boolean {
  return containsMediaKind([{ content: [value] }], "image");
}

export function deriveRequestCompatibilityRequirements(
  body: Record<string, unknown>
): RequestCompatibilityRequirements {
  const estimatedInputTokens = estimateRequestInputTokens(body);
  const requestedOutputTokens = Math.max(
    getPositiveTokenCount(body.max_tokens),
    getPositiveTokenCount(body.max_completion_tokens)
  );
  return {
    requiresTools: requestRequiresTools(body),
    requiresVision: valueContainsImagePart(body.messages) || valueContainsImagePart(body.input),
    requiresStructuredOutput: requestRequiresStructuredOutput(body),
    estimatedInputTokens,
    requestedOutputTokens,
    requiredContextTokens: estimatedInputTokens + requestedOutputTokens,
  };
}

function exceedsKnownOutputLimit(
  requestedOutputTokens: number,
  maxOutputTokens: number | null
): boolean {
  if (requestedOutputTokens <= 0 || maxOutputTokens === null) return false;
  return maxOutputTokens < requestedOutputTokens;
}

function hasKnownCompatibleContextLimit(
  target: ResolvedComboTarget,
  requirements: RequestCompatibilityRequirements
): boolean {
  if (requirements.requiredContextTokens <= 0) return false;
  const capabilities = getResolvedModelCapabilities({
    provider: target.providerId || target.provider || null,
    model: target.modelStr,
  });
  return evaluateContextLimit(capabilities, requirements, target.modelStr) === true;
}

const HARD_COMPAT_REASONS = new Set(["tools", "vision", "structured_output", "output_tokens"]);

/**
 * #8332: vision is a hard requirement, not a soft preference — a target whose vision
 * support is not confirmed can never succeed on an image_url request. Callers
 * reconsidering compat-rejected targets (fallback tiers, degrade-to-unfiltered) MUST
 * exclude these via this predicate.
 */
export function isVisionIncompatibleTarget(
  target: ResolvedComboTarget,
  requirements: RequestCompatibilityRequirements
): boolean {
  if (!requirements.requiresVision) return false;
  const capabilities = getResolvedModelCapabilities({
    provider: target.providerId || target.provider || null,
    model: target.modelStr,
  });
  return capabilities.supportsVision !== true;
}

/**
 * Builds the #6238 last-resort fallback candidate set: ranked targets the compat
 * pre-filter rejected, minus anything rejected for vision (#8332 — see
 * isVisionIncompatibleTarget).
 */
export function computeCompatRejectedTargets(
  rankedTargets: ResolvedComboTarget[],
  compatKeptTargets: ResolvedComboTarget[],
  body: Record<string, unknown>
): ResolvedComboTarget[] {
  const requirements = deriveRequestCompatibilityRequirements(body);
  const keptSet = new Set(compatKeptTargets);
  return rankedTargets.filter(
    (target) => !keptSet.has(target) && !isVisionIncompatibleTarget(target, requirements)
  );
}

function getTargetCompatibilityFailures(
  target: ResolvedComboTarget,
  requirements: RequestCompatibilityRequirements
): string[] {
  const capabilities = getResolvedModelCapabilities({
    provider: target.providerId || target.provider || null,
    model: target.modelStr,
  });
  const failures: string[] = [];

  if (
    requirements.requiresTools &&
    (capabilities.supportsTools === false || !capabilities.toolCalling) &&
    // #5240: prompt-emulated tool providers remain eligible under fail-closed.
    !providerSupportsEmulatedToolCalling(target.provider)
  ) {
    failures.push("tools");
  }

  // For a request that carries an image, only route to a target whose vision
  // support is *confirmed* (`=== true`). Treat `false` AND `null` (unknown) as
  // incompatible: an unknown-capability model receiving the image is exactly how
  // a text-only model (e.g. ministral) ended up answering "image not provided".
  // #8488: when none qualify the filter fails closed (empty list) unless the
  // operator opts into compatFilterFailOpen.
  if (requirements.requiresVision && capabilities.supportsVision !== true) {
    failures.push("vision");
  }

  if (requirements.requiresStructuredOutput && capabilities.structuredOutput === false) {
    failures.push("structured_output");
  }

  if (exceedsKnownOutputLimit(requirements.requestedOutputTokens, capabilities.maxOutputTokens)) {
    failures.push("output_tokens");
  }

  const contextVerdict = evaluateContextLimit(capabilities, requirements, target.modelStr);
  if (requirements.requiredContextTokens > 0 && contextVerdict === false) {
    failures.push("context_window");
  }

  return failures;
}

export type CompatFilterOptions = {
  /**
   * Opt-in legacy behavior (#8488): when every target fails a hard capability
   * requirement (tools / vision / structured_output), restore the full pool
   * instead of returning an empty list. Default is fail-closed.
   */
  failOpen?: boolean;
};

function highestKnownOutputLimit(targets: ResolvedComboTarget[]): number {
  let ceiling = 0;
  for (const target of targets) {
    const limit = getResolvedModelCapabilities({
      provider: target.providerId || target.provider || null,
      model: target.modelStr,
    }).maxOutputTokens;
    if (typeof limit === "number" && limit > ceiling) ceiling = limit;
  }
  return ceiling;
}

export function hasHardCapabilityFailure(reasons: string[]): boolean {
  return reasons.some((reason) => HARD_COMPAT_REASONS.has(reason));
}

/**
 * Summarize a capability-filter exhaustion for a 400-class combo error (#8488).
 * Returns null when the empty pool is not attributable to hard requirements.
 */
export function describeCapabilityFilterExhaustion(
  targets: ResolvedComboTarget[],
  body: Record<string, unknown>,
  comboName?: string
): {
  unmet: string[];
  excluded: Array<{ provider: string; model: string; reason: string }>;
  message: string;
  terminalReason: string;
} | null {
  if (targets.length === 0) return null;
  const requirements = deriveRequestCompatibilityRequirements(body);
  const rejected = targets.map((target) => ({
    target,
    reasons: getTargetCompatibilityFailures(target, requirements),
  }));
  const unmet = Array.from(
    new Set(rejected.flatMap((entry) => entry.reasons.filter((r) => HARD_COMPAT_REASONS.has(r))))
  );
  if (unmet.length === 0) return null;

  const primary = unmet.includes("tools")
    ? "tools"
    : unmet.includes("vision")
      ? "vision"
      : unmet[0];
  const toolCount = Array.isArray(body.tools) ? body.tools.length : 0;
  const name = comboName && comboName.trim().length > 0 ? comboName : "this combo";
  let message: string;
  if (primary === "tools") {
    message = `No target in combo ${name} supports tool calling; request carried ${toolCount} tools`;
  } else if (primary === "vision") {
    message = `No target in combo ${name} has confirmed vision support for this image request`;
  } else if (primary === "output_tokens") {
    // #12229: name the real reason. Collapsing this into the structured-output
    // message sent operators chasing response_format when the request's
    // max_tokens simply exceeded every target's known output ceiling.
    const ceiling = highestKnownOutputLimit(
      rejected.filter((entry) => entry.reasons.includes("output_tokens")).map((e) => e.target)
    );
    message =
      `No target in combo ${name} can produce the requested max_tokens=${requirements.requestedOutputTokens}; ` +
      `the highest known output limit in the pool is ${ceiling}`;
  } else {
    message = `No target in combo ${name} supports structured output for this request`;
  }

  return {
    unmet,
    excluded: rejected.map((entry) => ({
      provider: entry.target.provider,
      model: entry.target.modelStr,
      reason: entry.reasons.join("+") || primary,
    })),
    message,
    terminalReason: "capability_mismatch",
  };
}

export function filterTargetsByRequestCompatibility(
  targets: ResolvedComboTarget[],
  body: Record<string, unknown>,
  log: ComboLogger,
  label = "Context-aware fallback",
  options?: CompatFilterOptions
): ResolvedComboTarget[] {
  if (targets.length === 0) return targets;
  const requirements = deriveRequestCompatibilityRequirements(body);
  const needsFiltering =
    requirements.requiresTools ||
    requirements.requiresVision ||
    requirements.requiresStructuredOutput ||
    requirements.requiredContextTokens > 0;
  if (!needsFiltering) return targets;

  const rejected: Array<{ target: ResolvedComboTarget; reasons: string[] }> = [];
  const targetReasons = new Map<ResolvedComboTarget, string[]>();
  for (const target of targets) {
    const reasons = getTargetCompatibilityFailures(target, requirements);
    targetReasons.set(target, reasons);
    if (reasons.length > 0) rejected.push({ target, reasons });
  }

  // Context metadata is advisory. Keep every target that has no hard capability
  // mismatch, but prefer targets whose known limit fits. A stale catalog entry must
  // never remove the only target that could accept the request at runtime.
  const compatible = targets.filter((target) => {
    const reasons = targetReasons.get(target) || [];
    return !reasons.some((reason) => HARD_COMPAT_REASONS.has(reason));
  });
  const hadKnownTooSmallContextTarget = rejected.some((entry) =>
    entry.reasons.includes("context_window")
  );
  if (
    requirements.requiredContextTokens > 0 &&
    hadKnownTooSmallContextTarget &&
    compatible.length > 1
  ) {
    const knownContextCompatible = compatible.filter((target) =>
      hasKnownCompatibleContextLimit(target, requirements)
    );
    if (knownContextCompatible.length > 0 && knownContextCompatible.length < compatible.length) {
      const knownSet = new Set(knownContextCompatible);
      return [...knownContextCompatible, ...compatible.filter((target) => !knownSet.has(target))];
    }
  }

  if (compatible.length === targets.length) return targets;
  if (compatible.length === 0) {
    const hardRejected = rejected.some((entry) => hasHardCapabilityFailure(entry.reasons));
    const failOpen = options?.failOpen === true;

    log.debug?.(
      "COMBO",
      `${label}: rejected targets ${rejected
        .map((entry) => `${entry.target.modelStr}(${entry.reasons.join("+")})`)
        .join(", ")}`
    );

    // #8332: vision is never safe to guess — never resurrect vision-rejected targets.
    if (requirements.requiresVision) {
      const visionSafe = targets.filter(
        (target) => !isVisionIncompatibleTarget(target, requirements)
      );
      if (visionSafe.length === 0) {
        log.warn(
          "COMBO",
          `${label}: all ${targets.length} targets lack confirmed vision; failing closed (#8488)`
        );
        return [];
      }
      if (failOpen) {
        log.warn(
          "COMBO",
          `${label}: all targets filtered; compatFilterFailOpen restoring non-vision-rejected pool`
        );
        return visionSafe;
      }
      return visionSafe;
    }

    // Context/output-only exhaustion keeps the legacy fail-open path — the honest
    // answer is the existing context_length_exceeded gate, not a capability error.
    if (!hardRejected || failOpen) {
      log.warn(
        "COMBO",
        `${label}: all ${targets.length} targets were filtered by request requirements; preserving strategy order`
      );
      return targets;
    }

    // #8488: tools / structured_output — fail closed instead of dispatching to a
    // target already known to be incompatible.
    log.warn(
      "COMBO",
      `${label}: all ${targets.length} targets were filtered by hard request requirements; failing closed`
    );
    return [];
  }

  // #12273: a sole survivor whose catalog window is known-too-small is a
  // guaranteed context_length_exceeded. Restore the remaining pool so combo.ts
  // can still try larger-context targets. Unknown context (`null`) is advisory
  // and must not resurrect hard-rejected targets (vision / output / tools).
  if (
    compatible.length === 1 &&
    (targetReasons.get(compatible[0]) || []).includes("context_window")
  ) {
    // #8332: never restore a confirmed-non-vision target onto an image request.
    const restored = requirements.requiresVision
      ? targets.filter((target) => !isVisionIncompatibleTarget(target, requirements))
      : targets;
    if (restored.length > compatible.length) {
      log.warn(
        "COMBO",
        `${label}: single compatible target ${compatible[0].modelStr} has known context too small for ${requirements.requiredContextTokens} token request; falling back to full pool (#12273)`
      );
      return restored;
    }
  }

  log.info(
    "COMBO",
    `${label}: kept ${compatible.length}/${targets.length} targets for request requirements`
  );
  // #12273: When pool collapses significantly, log rejection reasons at info
  // level so the cause is diagnosable without enabling debug logging.
  if (compatible.length <= 2 && targets.length > 4) {
    log.info(
      "COMBO",
      `${label}: rejected targets ${rejected
        .map((entry) => `${entry.target.modelStr}(${entry.reasons.join("+")})`)
        .join(", ")}`
    );
  } else {
    log.debug?.(
      "COMBO",
      `${label}: rejected targets ${rejected
        .map((entry) => `${entry.target.modelStr}(${entry.reasons.join("+")})`)
        .join(", ")}`
    );
  }
  return compatible;
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

export function resolveComboTargets(
  combo: ComboLike,
  allCombos: ComboCollectionLike,
  maxDepth: number = MAX_COMBO_DEPTH,
  hiddenModelsByProvider: HiddenModelsByProvider = getHiddenModelsByProvider()
): ResolvedComboTarget[] {
  return filterVisibleComboTargets(
    allCombos
      ? resolveNestedComboTargets(combo, allCombos, new Set<string>(), 0, [], maxDepth)
      : getOrderedTopLevelRuntimeSteps(combo, null).filter(
          (entry): entry is ResolvedComboTarget => entry?.kind === "model"
        ),
    hiddenModelsByProvider
  );
}

export function resolveComboRuntimeUnits(
  combo: ComboLike,
  allCombos: ComboCollectionLike,
  mode: NestedComboMode,
  maxDepth: number = MAX_COMBO_DEPTH,
  hiddenModelsByProvider: HiddenModelsByProvider = getHiddenModelsByProvider()
): ResolvedComboUnit[] {
  if (mode === "flatten" || !allCombos)
    return resolveComboTargets(combo, allCombos, maxDepth, hiddenModelsByProvider);
  validateComboDAG(combo.name, allCombos, new Set<string>(), 0, maxDepth);
  return getOrderedTopLevelRuntimeSteps(combo, allCombos).filter(
    (unit) => unit.kind === "combo-ref" || isComboTargetVisible(unit, hiddenModelsByProvider)
  );
}

export function resolveWeightedStepGroups(
  combo: ComboLike,
  allCombos: ComboCollectionLike,
  hiddenModelsByProvider: HiddenModelsByProvider = getHiddenModelsByProvider()
): Array<{ step: ComboRuntimeStep; targets: ResolvedComboTarget[] }> {
  return getOrderedTopLevelRuntimeSteps(combo, allCombos)
    .map((step) => ({
      step,
      targets: filterVisibleComboTargets(
        !allCombos
          ? step.kind === "model"
            ? [step]
            : []
          : expandRuntimeStep(step, allCombos, new Set([combo.name])),
        hiddenModelsByProvider
      ),
    }))
    .filter((group) => group.targets.length > 0);
}

export function resolveWeightedTargets(
  combo: ComboLike,
  allCombos: ComboCollectionLike,
  preferredExecutionKey: string | null = null,
  eligibleExecutionKeys: ReadonlySet<string> | null = null,
  stepGroups?: Array<{ step: ComboRuntimeStep; targets: ResolvedComboTarget[] }>
): {
  orderedTargets: ResolvedComboTarget[];
  selectedStep: ComboRuntimeStep | null;
  orderedSteps: ComboRuntimeStep[];
} {
  const topLevelSteps = getOrderedTopLevelRuntimeSteps(combo, allCombos).filter((step) =>
    eligibleExecutionKeys ? eligibleExecutionKeys.has(step.executionKey) : true
  );
  if (topLevelSteps.length === 0) {
    return { orderedTargets: [], selectedStep: null, orderedSteps: [] };
  }

  const preferredStep = preferredExecutionKey
    ? topLevelSteps.find((step) => step.executionKey === preferredExecutionKey) || null
    : null;
  const selectedStep = preferredStep || selectWeightedTarget(topLevelSteps);
  if (!selectedStep) {
    return { orderedTargets: [], selectedStep: null, orderedSteps: [] };
  }

  const orderedSteps = orderTargetsForWeightedFallback(
    topLevelSteps,
    selectedStep.executionKey,
    hasCompositeTierRuntimeOrder(combo)
  );
  const targetsByStep = new Map(
    (stepGroups || resolveWeightedStepGroups(combo, allCombos)).map((group) => [
      group.step.executionKey,
      group.targets,
    ])
  );
  const expandedTargets = orderedSteps.flatMap(
    (step) => targetsByStep.get(step.executionKey) || []
  );

  return {
    orderedTargets: dedupeTargetsByExecutionKey(expandedTargets),
    selectedStep,
    orderedSteps,
  };
}
