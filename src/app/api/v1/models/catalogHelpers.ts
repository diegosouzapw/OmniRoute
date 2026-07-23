// Pure, dependency-free helpers + shared types for the unified model catalog
// (`getUnifiedModelsResponse` in ./catalog.ts). Extracted as a cohesive leaf so the
// catalog host shrinks toward the file-size cap without changing behavior — every
// function body here is byte-identical to its previous in-catalog definition.

import {
  CANONICAL_EFFORT_VALUES,
  extendCodexGpt56EffortValues,
} from "@/shared/reasoning/effortStandardization";

export interface CustomModelEntry {
  id?: string;
  name?: string;
  source?: string;
  apiFormat?: string;
  supportedEndpoints?: string[];
  inputTokenLimit?: number;
  isHidden?: boolean;
  // User-set "vision-capable" flag (persisted by addCustomModel / replaceCustomModels
  // in src/lib/db/models.ts). Surfaced into `/v1/models` via
  // getCustomVisionCapabilityFields so user-added vision models appear with
  // `capabilities.vision: true` even when their id does not match the
  // conservative isVisionModelId heuristic.
  supportsVision?: boolean;
}

export type ComboCatalogTarget = {
  modelStr?: string;
  provider?: string | null;
};

export type ComboTargetCatalogMetadata = {
  contextLength?: number;
  maxInputTokens?: number;
  maxOutputTokens?: number;
  inputModalities?: string[];
  outputModalities?: string[];
  capabilities: Record<string, boolean | string[]>;
};

export function isPositiveFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

export function parseJsonStringArray(value: unknown): string[] {
  if (typeof value !== "string" || value.trim().length === 0) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((entry): entry is string => typeof entry === "string" && entry.length > 0)
      : [];
  } catch {
    return [];
  }
}

export function maybeOmitCatalogModelName<T extends Record<string, unknown>>(
  model: T,
  includeNames: boolean
): T | Omit<T, "name"> {
  if (includeNames || !Object.prototype.hasOwnProperty.call(model, "name")) return model;

  const { name: omittedName, ...nextModel } = model;
  void omittedName;
  return nextModel;
}

export function intersectStringArrays(arrays: string[][]): string[] {
  if (arrays.length === 0 || arrays.some((values) => values.length === 0)) return [];
  const [first, ...rest] = arrays;
  return first.filter((value, index) => {
    if (first.indexOf(value) !== index) return false;
    return rest.every((values) => values.includes(value));
  });
}

export function minKnownNumber(values: Array<number | undefined>): number | undefined {
  const knownValues = values.filter(isPositiveFiniteNumber);
  if (knownValues.length === 0) return undefined;
  return Math.min(...knownValues);
}

export function getThinkingCapabilityFields(
  providerId: string,
  modelId: string,
  resolvedThinking?: boolean | null
): Record<string, boolean | string[]> {
  const supportsThinking = resolvedThinking;
  if (typeof supportsThinking !== "boolean") return {};
  return {
    thinking: supportsThinking,
    supportsThinking,
    ...(supportsThinking
      ? {
          effort_tiers: extendCodexGpt56EffortValues(providerId, modelId, CANONICAL_EFFORT_VALUES),
        }
      : {}),
  };
}

export function mergeComboCapabilities(
  metadata: ComboTargetCatalogMetadata[]
): Record<string, boolean | string[]> {
  const capabilities: Record<string, boolean | string[]> = {};
  for (const key of [
    "tool_calling",
    "reasoning",
    "vision",
    "attachment",
    "structured_output",
    "temperature",
    "thinking",
    "supportsThinking",
  ]) {
    const values = metadata.map((entry) => entry.capabilities[key]);
    if (values.every((value): value is boolean => typeof value === "boolean")) {
      const [first] = values;
      if (values.every((value) => value === first)) capabilities[key] = first;
    }
  }
  const effortTiers = metadata.map((entry) => entry.capabilities.effort_tiers);
  if (
    effortTiers.every(
      (value): value is string[] =>
        Array.isArray(value) && value.every((entry) => typeof entry === "string")
    )
  ) {
    capabilities.effort_tiers = intersectStringArrays(effortTiers);
  }
  return capabilities;
}
