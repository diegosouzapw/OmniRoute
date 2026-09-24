/**
 * Build-local capability/context/override resolution snapshot (#9199).
 *
 * Catalog preparation bulk-loads the capability and custom-model tables once into a
 * build-local view for pure in-memory resolution. This must not flip models.dev's
 * module-global all-row cache, and ordinary runtime callers keep on-demand DB reads.
 *
 * Override maps are nested by provider then model so provider/model pairs cannot
 * collide via delimiter composition.
 */
import { listModelCapabilityOverrides } from "@/lib/db/modelCapabilityOverrides";
import type { ReasoningEffortOverrideValue } from "@/shared/reasoning/reasoningEffortsOverride";
import { listModelContextOverrides } from "@/lib/db/modelContextOverrides";
import {
  listCustomModelVisionOverrides,
  type CustomModelVisionOverrideMap,
  type CustomModelVisionOverrideReadOptions,
  listSyncedAvailableModelVision,
  type SyncedAvailableModelVisionMap,
} from "@/lib/db/models";
import {
  loadAllSyncedCapabilitiesUncached,
  type CapabilitiesByProvider,
} from "@/lib/modelsDevSync";

/** Nested provider → model → numeric override map (collision-free). */
export type NestedOverrideMap = ReadonlyMap<string, ReadonlyMap<string, number>>;
export type NestedReasoningEffortsOverrideMap = ReadonlyMap<
  string,
  ReadonlyMap<string, readonly ReasoningEffortOverrideValue[]>
>;

export interface ModelCapabilityResolutionSnapshot {
  readonly synced: CapabilitiesByProvider;
  readonly maxTokenOverrides: NestedOverrideMap;
  readonly maxInputTokenOverrides: NestedOverrideMap;
  readonly reasoningEffortsOverrides: NestedReasoningEffortsOverrideMap;
  readonly contextOverrides: NestedOverrideMap;
  readonly customVisionOverrides: CustomModelVisionOverrideMap;
  /** #14081: positive-only vision verdicts from synced custom-node model rows. */
  readonly syncedAvailableModelVision: SyncedAvailableModelVisionMap;
}

export interface ModelCapabilityResolutionSnapshotOptions {
  customModelVision?: CustomModelVisionOverrideReadOptions;
}

function setNestedOverride(
  map: Map<string, Map<string, number>>,
  provider: string,
  modelId: string,
  value: number
): void {
  let byModel = map.get(provider);
  if (!byModel) {
    byModel = new Map();
    map.set(provider, byModel);
  }
  byModel.set(modelId, value);
}

/**
 * Load all capability/custom-model tables in one uninterrupted JS turn.
 * Callers must not yield between the bulk reads if they need a coherent view;
 * existing catalog generation guards remain authoritative across later yields.
 */
export function createModelCapabilityResolutionSnapshot(
  options: ModelCapabilityResolutionSnapshotOptions = {}
): ModelCapabilityResolutionSnapshot {
  const synced = loadAllSyncedCapabilitiesUncached();

  const maxTokenOverrides = new Map<string, Map<string, number>>();
  const maxInputTokenOverrides = new Map<string, Map<string, number>>();
  const reasoningEffortsOverrides = new Map<
    string,
    Map<string, readonly ReasoningEffortOverrideValue[]>
  >();
  for (const entry of listModelCapabilityOverrides()) {
    if (entry.key === "max_output_tokens") {
      setNestedOverride(maxTokenOverrides, entry.provider, entry.modelId, entry.value);
    } else if (entry.key === "max_input_tokens") {
      setNestedOverride(maxInputTokenOverrides, entry.provider, entry.modelId, entry.value);
    } else if (entry.key === "reasoning_efforts") {
      let byModel = reasoningEffortsOverrides.get(entry.provider);
      if (!byModel) {
        byModel = new Map();
        reasoningEffortsOverrides.set(entry.provider, byModel);
      }
      byModel.set(entry.modelId, entry.value);
    }
  }

  const contextOverrides = new Map<string, Map<string, number>>();
  for (const entry of listModelContextOverrides()) {
    setNestedOverride(contextOverrides, entry.provider, entry.modelId, entry.realContext);
  }

  return {
    synced,
    maxTokenOverrides,
    maxInputTokenOverrides,
    reasoningEffortsOverrides,
    contextOverrides,
    customVisionOverrides: listCustomModelVisionOverrides(options.customModelVision),
    syncedAvailableModelVision: listSyncedAvailableModelVision(),
  };
}
