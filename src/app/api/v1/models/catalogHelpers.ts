// Pure, dependency-free helpers + shared types for the unified model catalog
// (`getUnifiedModelsResponse` in ./catalog.ts). Extracted as a cohesive leaf so the
// catalog host shrinks toward the file-size cap without changing behavior — every
// function body here is byte-identical to its previous in-catalog definition.

import {
  CANONICAL_EFFORT_VALUES,
  extendCodexGpt56EffortValues,
  extendDeepSeekEffortValues,
} from "@/shared/reasoning/effortStandardization";

export interface CustomModelEntry {
  id?: string;
  name?: string;
  source?: string;
  apiFormat?: string;
  supportedEndpoints?: string[];
  inputTokenLimit?: number;
  outputTokenLimit?: number;
  isHidden?: boolean;
  // User-set "vision-capable" flag (persisted by addCustomModel / replaceCustomModels
  // in src/lib/db/models.ts). Surfaced into `/v1/models` via
  // getCustomVisionCapabilityFields so user-added vision models appear with
  // `capabilities.vision: true` even when their id does not match the
  // conservative isVisionModelId heuristic.
  supportsVision?: boolean;
  isFree?: boolean;
}

export type ComboCatalogTarget = {
  modelStr?: string;
  provider?: string | null;
  providerId?: string | null;
  connectionId?: string | null;
  allowedConnectionIds?: string[] | null;
};

type ConnectionScopedReasoningModel = {
  id: string;
  supportsThinking?: boolean;
  supportedThinkingEfforts?: string[];
};

export type ConnectionScopedReasoningCatalog = Record<
  string,
  readonly ConnectionScopedReasoningModel[]
>;

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

/**
 * Resolve the adjustable reasoning efforts shared by every connection a combo target can select.
 * `undefined` means there is no connection-scoped evidence, so authoritative static metadata may
 * still apply. An empty array means at least one selectable connection advertised this model but
 * the complete selectable set did not prove any common adjustable tier, so callers must fail
 * closed instead of falling back to broader model-family metadata.
 */
export function getConnectionScopedEffortTiers(
  modelId: string,
  target: Pick<ComboCatalogTarget, "connectionId" | "allowedConnectionIds">,
  eligibleConnectionIds: readonly string[] | undefined,
  modelsByConnection: ConnectionScopedReasoningCatalog,
  explicitThinkingEfforts?: readonly string[],
  fallbackThinkingEfforts?: readonly string[]
): string[] | undefined {
  const eligible = eligibleConnectionIds ? new Set(eligibleConnectionIds) : undefined;
  if (target.connectionId && eligible && !eligible.has(target.connectionId)) return [];
  if (
    target.allowedConnectionIds?.length &&
    eligible &&
    !target.allowedConnectionIds.some((id) => eligible.has(id))
  ) {
    return [];
  }
  if (!target.connectionId && !target.allowedConnectionIds?.length && eligible?.size === 0) {
    return [];
  }

  const catalogConnectionIds = Object.keys(modelsByConnection);
  if (catalogConnectionIds.length === 0) return undefined;

  let connectionIds: string[];
  if (target.connectionId) {
    connectionIds = !eligible || eligible.has(target.connectionId) ? [target.connectionId] : [];
  } else if (target.allowedConnectionIds?.length) {
    connectionIds = target.allowedConnectionIds.filter((id) => !eligible || eligible.has(id));
  } else {
    connectionIds = eligible ? [...eligible] : Object.keys(modelsByConnection);
  }
  if (connectionIds.length === 0) return [];

  const matching = connectionIds.map((connectionId) =>
    (modelsByConnection[connectionId] || []).find((model) => model.id === modelId)
  );
  if (matching.some((model) => model === undefined)) return [];

  const efforts = matching.map((model) => {
    const resolved = model?.supportedThinkingEfforts?.length
      ? model.supportedThinkingEfforts
      : model?.supportsThinking === true && fallbackThinkingEfforts
        ? [...fallbackThinkingEfforts]
        : [];
    return explicitThinkingEfforts
      ? explicitThinkingEfforts.filter((effort) => resolved.includes(effort))
      : resolved;
  });
  return intersectStringArrays(efforts);
}

export function getThinkingCapabilityFields(
  providerId: string,
  modelId: string,
  resolvedThinking?: boolean | null,
  supportedThinkingEfforts?: readonly string[],
  /** When true, skip the canonical effort-tier fallback — used for static registry
   * models that declare `supportsReasoning` but no explicit tier list, so the
   * catalog does not synthesize unresolvable `<prefix>/<model>-{tier}` ids. */
  skipCanonicalEffortFallback = false
): Record<string, boolean | string[]> {
  const supportsThinking = resolvedThinking;
  if (typeof supportsThinking !== "boolean") return {};
  const hasDeclaredTiers = supportedThinkingEfforts && supportedThinkingEfforts.length > 0;
  return {
    thinking: supportsThinking,
    supportsThinking,
    ...(supportsThinking && (hasDeclaredTiers || !skipCanonicalEffortFallback)
      ? {
          effort_tiers: hasDeclaredTiers
            ? [...supportedThinkingEfforts!]
            : extendDeepSeekEffortValues(
                providerId,
                modelId,
                extendCodexGpt56EffortValues(providerId, modelId, CANONICAL_EFFORT_VALUES)
              ),
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

/**
 * #12798: a combo can advertise `capabilities.vision: true` while emitting no
 * `input_modalities` / `output_modalities`. The merged vision verdict flows
 * from the targets canonical capabilities - which honour the #9195 operator
 * "Vision capable" override - while the combo-level modality intersection in
 * buildComboCatalogMetadata only fills when EVERY known target carries synced
 * modality data. An operator-flagged vision head with no synced modalities
 * therefore listed `vision: true` next to an empty modality set, so
 * models.dev-shaped clients that key off `input_modalities` (not the boolean)
 * still saw a text-only entry. Derives the modalities from the already
 * advertised vision verdict: mergeComboCapabilities only emits `vision: true`
 * when every known target is vision-capable, so this makes no new claim.
 * Synced intersections keep precedence; nothing is derived for unknown or
 * text-only verdicts.
 */
export function visionDerivedModalities(
  capabilities: Record<string, boolean | string[]>,
  syncedInput: string[],
  syncedOutput: string[]
): { input_modalities?: string[]; output_modalities?: string[] } {
  return {
    ...(syncedInput.length > 0
      ? { input_modalities: syncedInput }
      : capabilities.vision === true
        ? { input_modalities: ["text", "image"] }
        : {}),
    ...(syncedOutput.length > 0
      ? { output_modalities: syncedOutput }
      : capabilities.vision === true
        ? { output_modalities: ["text"] }
        : {}),
  };
}
