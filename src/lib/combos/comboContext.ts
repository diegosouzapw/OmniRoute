/**
 * Combo context-length computation.
 *
 * Computes the effective context_window for a combo using the same resolution
 * chain as the catalog's `getComboTargetCatalogMetadata`:
 *   synced → registry → spec → getTokenLimit
 *
 * Only models that are registered in at least one data source (provider registry,
 * static specs, or synced capabilities) contribute to the result — matching the
 * catalog's `minKnownNumber` semantics that excludes unsourced models.
 */

import { resolveNestedComboTargets } from "@omniroute/open-sse/services/combo";
import { getCanonicalModelMetadata } from "@/lib/modelMetadataRegistry";
import { getSyncedCapability } from "@/lib/modelsDevSync";
import { getModelSpec } from "@/shared/constants/modelSpecs";
import { PROVIDER_MODELS, PROVIDER_ID_TO_ALIAS } from "@/shared/constants/models";
import { getTokenLimit } from "@omniroute/open-sse/services/contextManager";
import { buildAliasMaps, getComboTargetModelId } from "@/app/api/v1/models/catalogProviderMaps";

/* ─── helpers ───────────────────────────────────────────────── */

function isPositiveFiniteNumber(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v) && v > 0;
}

/** Minimum of known (positively finite) values; undefined when none. */
function minKnownNumber(values: Array<number | undefined>): number | undefined {
  const known = values.filter(isPositiveFiniteNumber);
  return known.length > 0 ? Math.min(...known) : undefined;
}

/** Look up a model in the provider-registry model list. */
function getRegistryModel(
  providerId: string,
  modelId: string
): { contextLength?: number; id?: string; name?: string } | null {
  const alias = PROVIDER_ID_TO_ALIAS[providerId] || providerId;
  const providerModels: Array<{ id?: string; contextLength?: number }> =
    PROVIDER_MODELS[alias] || PROVIDER_MODELS[providerId] || [];
  return providerModels.find((m) => m?.id === modelId) ?? null;
}

/* ─── public API ────────────────────────────────────────────── */

/**
 * Compute the effective context-length for a combo.
 *
 * Resolution order:
 * 1. Explicit `context_length` on the combo record itself.
 * 2. Minimum of member-model context windows — each member resolved via
 *    synced → registry → spec → getTokenLimit, only counting members that
 *    exist in at least one known data source (matching the catalog behavior).
 *
 * Returns `undefined` when no known context window can be determined.
 */
export function computeComboContextLength(
  combo: {
    models?: unknown[];
    context_length?: number;
    name?: string;
  },
  allCombos: Array<{ models?: unknown[]; name?: string }>
): number | undefined {
  // 1. Explicit context_length wins (user can override with a manual value).
  if (isPositiveFiniteNumber(combo.context_length)) {
    return combo.context_length;
  }

  // 2. Resolve nested combo-refs into a flat list of (provider, model) targets.
  const targets = resolveNestedComboTargets(
    combo as Parameters<typeof resolveNestedComboTargets>[0],
    allCombos as Parameters<typeof resolveNestedComboTargets>[1]
  );

  if (!Array.isArray(targets) || targets.length === 0) return undefined;

  // 3. Per-target context resolution — same logic as the catalog's
  //    `getComboTargetCatalogMetadata`.
  const contextValues: number[] = [];
  const aliasMaps = buildAliasMaps();

  for (const target of targets) {
    // 3a. Strip the provider/alias prefix off `modelStr` BEFORE the canonical
    //     lookup. resolveNestedComboTargets() returns modelStr in "provider/model"
    //     form (e.g. "glm/glm-5.2"), but getCanonicalModelMetadata()'s alias
    //     lookup is keyed by the BARE registry id — passing the qualified string
    //     straight through only matched the ~47 models with a curated
    //     "provider/model" MODEL_SPECS alias, silently excluding the other
    //     ~1,650 registry-only models from the min() calc below. Reusing the
    //     catalog's own getComboTargetModelId() (catalogProviderMaps.ts) keeps
    //     this resolution in lockstep with getComboTargetCatalogMetadata().
    const resolvedTarget = getComboTargetModelId(aliasMaps, target);
    if (!resolvedTarget) continue;

    // 3b. Source check — only count models that exist in at least one
    //     known data source (provider registry, static spec, synced capability).
    //     This matches the catalog's filter that excludes unregistered models
    //     from combo calculations.
    const canonicalMeta = getCanonicalModelMetadata({
      provider: resolvedTarget.providerId,
      model: resolvedTarget.modelId,
    });
    if (!canonicalMeta) continue;

    const source = canonicalMeta.metadata?.source;
    if (!source?.providerRegistry && !source?.staticSpec && !source?.syncedCapability) {
      continue;
    }

    const providerId = canonicalMeta.provider || resolvedTarget.providerId;
    const modelId = canonicalMeta.model || resolvedTarget.modelId;

    // 3c. Resolve window: synced → registry → spec → getTokenLimit
    const synced = getSyncedCapability(providerId, modelId);
    const spec = getModelSpec(modelId);
    const registryModel = getRegistryModel(providerId, modelId);

    const syncedCtx = isPositiveFiniteNumber(synced?.limit_context)
      ? (synced.limit_context as number)
      : undefined;
    const registryCtx = isPositiveFiniteNumber(registryModel?.contextLength)
      ? registryModel.contextLength
      : undefined;
    const specCtx = isPositiveFiniteNumber(spec?.contextWindow) ? spec.contextWindow : undefined;

    const targetCtx = syncedCtx ?? registryCtx ?? specCtx ?? getTokenLimit(providerId, modelId);

    if (isPositiveFiniteNumber(targetCtx)) {
      contextValues.push(targetCtx);
    }
  }

  // 4. Minimum of all known context values (matching minKnownNumber semantics).
  return minKnownNumber(contextValues);
}
