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
 * No barrel import — depends only on sibling leaves.
 */

import { getModelContextLimit } from "../../../src/lib/modelCapabilities";
import { getComboModelString, normalizeComboStep } from "../../../src/lib/combos/steps.ts";
import { estimateTokens } from "../contextManager.ts";
import { getResolvedModelCapabilities } from "../modelCapabilities.ts";
import { parseModel } from "../model.ts";
import { dedupeTargetsByExecutionKey, isRecord } from "./comboData.ts";
import { getTargetProvider, MAX_COMBO_DEPTH } from "./comboPredicates.ts";
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
  ResolvedComboTarget,
} from "./types.ts";

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

function getDirectComboTargets(combo: ComboLike): ResolvedComboTarget[] {
  return getOrderedTopLevelRuntimeSteps(combo, null).filter(
    (entry): entry is ResolvedComboTarget => entry?.kind === "model"
  );
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

type RequestCompatibilityRequirements = {
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

function estimateRequestInputTokens(body: Record<string, unknown>): number {
  const estimatePayload: Record<string, unknown> = {};
  for (const key of ["messages", "input", "tools", "functions", "response_format"]) {
    if (body[key] !== undefined) estimatePayload[key] = body[key];
  }
  return Object.keys(estimatePayload).length > 0 ? estimateTokens(estimatePayload) : 0;
}

function valueContainsImagePart(value: unknown, depth = 0): boolean {
  if (depth > 8 || value === null || value === undefined) return false;
  if (typeof value === "string") return value.startsWith("data:image/");
  if (Array.isArray(value)) return value.some((entry) => valueContainsImagePart(entry, depth + 1));
  if (!isRecord(value)) return false;

  const type = typeof value.type === "string" ? value.type.toLowerCase() : null;
  if (type === "image" || type === "image_url" || type === "input_image") return true;
  if ("image_url" in value || "input_image" in value) return true;

  const source = isRecord(value.source) ? value.source : null;
  const mediaType = typeof source?.media_type === "string" ? source.media_type.toLowerCase() : "";
  if (mediaType.startsWith("image/")) return true;

  return Object.values(value).some((entry) => valueContainsImagePart(entry, depth + 1));
}

function deriveRequestCompatibilityRequirements(
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

function getTargetCompatibilityFailures(
  target: ResolvedComboTarget,
  requirements: RequestCompatibilityRequirements
): string[] {
  const capabilities = getResolvedModelCapabilities(target.modelStr);
  const failures: string[] = [];

  if (
    requirements.requiresTools &&
    (capabilities.supportsTools === false || !capabilities.toolCalling)
  ) {
    failures.push("tools");
  }

  // For a request that carries an image, only route to a target whose vision
  // support is *confirmed* (`=== true`). Treat `false` AND `null` (unknown) as
  // incompatible: an unknown-capability model receiving the image is exactly how
  // a text-only model (e.g. ministral) ended up answering "image not provided".
  // The caller keeps all targets when none qualify, so combos with no
  // confirmed-vision member still behave as before.
  if (requirements.requiresVision && capabilities.supportsVision !== true) {
    failures.push("vision");
  }

  if (requirements.requiresStructuredOutput && capabilities.structuredOutput === false) {
    failures.push("structured_output");
  }

  if (
    requirements.requestedOutputTokens > 0 &&
    Number.isFinite(capabilities.maxOutputTokens) &&
    capabilities.maxOutputTokens < requirements.requestedOutputTokens
  ) {
    failures.push("output_tokens");
  }

  const contextLimit = capabilities.maxInputTokens ?? capabilities.contextWindow ?? null;
  if (
    requirements.requiredContextTokens > 0 &&
    contextLimit !== null &&
    contextLimit !== undefined &&
    contextLimit < requirements.requiredContextTokens
  ) {
    failures.push("context_window");
  }

  return failures;
}

export function filterTargetsByRequestCompatibility(
  targets: ResolvedComboTarget[],
  body: Record<string, unknown>,
  log: ComboLogger,
  label = "Context-aware fallback"
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
  const compatible = targets.filter((target) => {
    const reasons = getTargetCompatibilityFailures(target, requirements);
    if (reasons.length === 0) return true;
    rejected.push({ target, reasons });
    return false;
  });

  if (compatible.length === targets.length) return targets;
  if (compatible.length === 0) {
    log.warn(
      "COMBO",
      `${label}: all ${targets.length} targets were filtered by request requirements; preserving strategy order`
    );
    log.debug?.(
      "COMBO",
      `${label}: rejected targets ${rejected
        .map((entry) => `${entry.target.modelStr}(${entry.reasons.join("+")})`)
        .join(", ")}`
    );
    return targets;
  }

  log.info(
    "COMBO",
    `${label}: kept ${compatible.length}/${targets.length} targets for request requirements`
  );
  log.debug?.(
    "COMBO",
    `${label}: rejected targets ${rejected
      .map((entry) => `${entry.target.modelStr}(${entry.reasons.join("+")})`)
      .join(", ")}`
  );
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
  maxDepth: number = MAX_COMBO_DEPTH
): ResolvedComboTarget[] {
  return allCombos
    ? resolveNestedComboTargets(combo, allCombos, new Set<string>(), 0, [], maxDepth)
    : getDirectComboTargets(combo);
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
