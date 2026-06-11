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

import { clamp01 } from "../../utils/number.ts";

import { parseModel } from "../model.ts";

import { getProviderModels } from "../../config/providerModels.ts";

import {
  getComboModelString,
  getComboStepTarget,
  getComboStepWeight,
  normalizeComboStep,
} from "../../../src/lib/combos/steps.ts";

import { ComboCollectionLike, ComboRuntimeStep, ResolvedComboTarget, ComboLike } from "./types.ts";
import { getTargetProvider, isRecord, toTrimmedString, getCombosArray, normalizeModelEntry } from "./utils.ts";
import { MAX_COMBO_DEPTH } from "./constants.ts";



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



export function getDirectComboTargets(combo: ComboLike): ResolvedComboTarget[] {
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



export function hasCompositeTierRuntimeOrder(combo: ComboLike): boolean {
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



export function getOrderedTopLevelRuntimeSteps(
  combo: ComboLike,
  allCombos: ComboCollectionLike,
  path: string[] = []
): ComboRuntimeStep[] {
  return orderRuntimeStepsByCompositeTiers(getTopLevelRuntimeSteps(combo, allCombos, path), combo);
}



export function expandRuntimeStep(
  step: ComboRuntimeStep,
  allCombos: ComboCollectionLike,
  visited = new Set<string>(),
  depth = 0,
  path: string[] = []
): ResolvedComboTarget[] {
  if (step.kind === "model") return [step];
  if (depth > MAX_COMBO_DEPTH) return [];

  const combos = getCombosArray(allCombos);
  const nestedCombo = combos.find((combo) => combo.name === step.comboName);
  if (!nestedCombo || visited.has(step.comboName)) return [];

  return resolveNestedComboTargets(nestedCombo, combos, new Set(visited), depth + 1, [
    ...path,
    step.stepId,
  ]);
}



export function resolveNestedComboTargets(
  combo: ComboLike,
  allCombos: ComboCollectionLike,
  visited = new Set<string>(),
  depth = 0,
  path: string[] = []
): ResolvedComboTarget[] {
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
  depth = 0
): void {
  if (depth > MAX_COMBO_DEPTH) {
    throw new Error(`Max combo nesting depth (${MAX_COMBO_DEPTH}) exceeded at "${comboName}"`);
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
export function resolveNestedComboModels(
  combo: ComboLike,
  allCombos: ComboCollectionLike,
  visited = new Set<string>(),
  depth = 0
): string[] {
  if (depth > MAX_COMBO_DEPTH) return combo.models.map((m) => normalizeModelEntry(m).model);
  if (visited.has(combo.name)) return []; // cycle safety
  visited.add(combo.name);

  const combos = getCombosArray(allCombos);
  const resolved: string[] = [];

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



export function dedupeTargetsByExecutionKey(targets: ResolvedComboTarget[]) {
  const seen = new Set<string>();
  return targets.filter((target) => {
    if (seen.has(target.executionKey)) return false;
    seen.add(target.executionKey);
    return true;
  });
}

