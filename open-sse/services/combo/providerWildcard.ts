/**
 * Provider-wildcard expansion for combo targets (#2562).
 *
 * Allows a combo step to be written as `provider/*` (or `provider/prefix*`)
 * instead of enumerating every model explicitly. At request time the pattern
 * is expanded into concrete `provider/modelId` entries sourced from:
 *   1. The synced-available-models DB store (for API-key / OAuth providers whose
 *      model list changes at runtime, e.g. custom OpenAI-compatible providers).
 *   2. The static providerRegistry (for built-in providers whose catalog is
 *      bundled with the release).
 *
 * This keeps combos always in sync with the live model catalog without any
 * manual maintenance.
 *
 * ### Wildcard syntax
 *
 *   `<providerAlias>/*`          – all models for the provider
 *   `<providerAlias>/prefix*`    – models whose id starts with `prefix`
 *
 * Examples:
 *   `fta/*`           → all FreeTheAI synced models
 *   `openai/*`        → all OpenAI registry models
 *   `opc/deepseek*`   → FreeTheAI models whose id starts with "deepseek"
 *
 * ### Step preservation
 *
 * The original wildcard entry's `weight`, `label`, `connectionId`, and
 * `allowedConnectionIds` are copied onto every expanded model step so that
 * per-step routing policy is inherited.
 */

import { wildcardMatch } from "../wildcardRouter.ts";
import { getProviderModels } from "../../config/providerModels.ts";
import { getSyncedAvailableModels } from "../../../src/lib/db/models.ts";
import type { ComboLike } from "./types.ts";

/** Sentinel pattern used for "all models of a provider". */
const PROVIDER_WILDCARD_SENTINEL = "*";

/**
 * Return true if `entry` is a provider-wildcard step.
 * Accepts both string notation (`"fta/*"`, `"opc/deep*"`) and the structured
 * object form `{ kind: "provider-wildcard", providerId, modelPattern }`.
 */
export function isProviderWildcardEntry(entry: unknown): boolean {
  if (typeof entry === "string") {
    const trimmed = entry.trim();
    const slash = trimmed.indexOf("/");
    if (slash <= 0) return false;
    const model = trimmed.slice(slash + 1);
    return model.includes("*");
  }
  if (entry && typeof entry === "object" && !Array.isArray(entry)) {
    const rec = entry as Record<string, unknown>;
    return rec.kind === "provider-wildcard" && typeof rec.providerId === "string";
  }
  return false;
}

type ProviderWildcardSpec = {
  providerId: string;
  modelPattern: string;
  weight: number;
  label: string | null;
  connectionId: string | null;
  allowedConnectionIds: string[] | null;
};

function parseWildcardEntry(entry: unknown): ProviderWildcardSpec | null {
  if (typeof entry === "string") {
    const trimmed = entry.trim();
    const slash = trimmed.indexOf("/");
    if (slash <= 0) return null;
    const providerId = trimmed.slice(0, slash);
    const modelPattern = trimmed.slice(slash + 1);
    if (!modelPattern.includes("*")) return null;
    return {
      providerId,
      modelPattern,
      weight: 0,
      label: null,
      connectionId: null,
      allowedConnectionIds: null,
    };
  }

  if (entry && typeof entry === "object" && !Array.isArray(entry)) {
    const rec = entry as Record<string, unknown>;
    if (rec.kind !== "provider-wildcard") return null;
    const providerId = typeof rec.providerId === "string" ? rec.providerId.trim() : "";
    if (!providerId) return null;
    const modelPattern =
      typeof rec.modelPattern === "string" ? rec.modelPattern.trim() : PROVIDER_WILDCARD_SENTINEL;
    const weight = typeof rec.weight === "number" && Number.isFinite(rec.weight) ? rec.weight : 0;
    const label = typeof rec.label === "string" && rec.label.trim() ? rec.label.trim() : null;
    const connectionId =
      typeof rec.connectionId === "string" && rec.connectionId.trim()
        ? rec.connectionId.trim()
        : null;
    const allowedConnectionIds = Array.isArray(rec.allowedConnectionIds)
      ? (rec.allowedConnectionIds as unknown[])
          .map((c) => (typeof c === "string" ? c.trim() : ""))
          .filter(Boolean)
      : null;
    return {
      providerId,
      modelPattern,
      weight,
      label,
      connectionId,
      allowedConnectionIds: allowedConnectionIds?.length ? allowedConnectionIds : null,
    };
  }

  return null;
}

/**
 * Collect candidate model IDs for a provider from two sources:
 *  1. Synced available models in the DB (runtime-dynamic; custom/OAuth providers)
 *  2. Static provider registry (built-in providers bundled with the release)
 *
 * The union is deduped by model id.
 */
async function collectProviderModelIds(providerId: string): Promise<string[]> {
  const seen = new Set<string>();
  const ids: string[] = [];

  // 1. Synced DB models (highest priority — reflects the live catalog)
  try {
    const synced = await getSyncedAvailableModels(providerId);
    for (const m of synced) {
      if (m.id && !seen.has(m.id)) {
        seen.add(m.id);
        ids.push(m.id);
      }
    }
  } catch {
    // Non-fatal — DB may be offline in tests or at early init.
  }

  // 2. Static registry models (fallback / built-in providers)
  const registryModels = getProviderModels(providerId);
  for (const m of registryModels) {
    if (m.id && !seen.has(m.id)) {
      seen.add(m.id);
      ids.push(m.id);
    }
  }

  return ids;
}

/**
 * Expand a single provider-wildcard spec into concrete model entry objects
 * that `normalizeComboStep` can process as normal model steps.
 *
 * Returns `null` if no matching models are found (caller keeps the original
 * entry so the combo does not silently lose a step).
 */
async function expandWildcardSpec(
  spec: ProviderWildcardSpec,
  comboName: string
): Promise<unknown[] | null> {
  const modelIds = await collectProviderModelIds(spec.providerId);
  if (modelIds.length === 0) return null;

  const pattern = spec.modelPattern;
  const matchingIds =
    pattern === PROVIDER_WILDCARD_SENTINEL
      ? modelIds
      : modelIds.filter((id) => wildcardMatch(id, pattern));

  if (matchingIds.length === 0) return null;

  return matchingIds.map((modelId) => {
    const fullModelStr = `${spec.providerId}/${modelId}`;
    const step: Record<string, unknown> = {
      kind: "model",
      model: fullModelStr,
      providerId: spec.providerId,
      weight: spec.weight,
      // Tag so downstream can identify the origin of this expanded step.
      _expandedFromWildcard: `${spec.providerId}/${pattern}`,
      _parentCombo: comboName,
    };
    if (spec.label !== null) step.label = spec.label;
    if (spec.connectionId !== null) step.connectionId = spec.connectionId;
    if (spec.allowedConnectionIds !== null) step.allowedConnectionIds = spec.allowedConnectionIds;
    return step;
  });
}

/**
 * Expand all provider-wildcard entries in a combo's `models` array in-place,
 * returning a new ComboLike with concrete model entries in place of wildcards.
 *
 * Non-wildcard entries are passed through unchanged.
 *
 * @param combo  The combo whose `models` may contain wildcard entries.
 * @returns      A shallow copy of `combo` with wildcards expanded, or the
 *               original if no wildcards were found.
 */
export async function expandProviderWildcardsInCombo(combo: ComboLike): Promise<ComboLike> {
  const models = combo.models;
  if (!Array.isArray(models) || models.length === 0) return combo;

  let hasWildcard = false;
  for (const entry of models) {
    if (isProviderWildcardEntry(entry)) {
      hasWildcard = true;
      break;
    }
  }
  if (!hasWildcard) return combo;

  const expanded: unknown[] = [];
  for (const entry of models) {
    if (!isProviderWildcardEntry(entry)) {
      expanded.push(entry);
      continue;
    }

    const spec = parseWildcardEntry(entry);
    if (!spec) {
      // Malformed wildcard entry — keep as-is; normalizeComboStep will handle.
      expanded.push(entry);
      continue;
    }

    const resolved = await expandWildcardSpec(spec, combo.name);
    if (resolved && resolved.length > 0) {
      expanded.push(...resolved);
    } else {
      // No models found: keep the original entry rather than silently dropping
      // the step, so the operator sees the error from the upstream provider.
      expanded.push(entry);
    }
  }

  return { ...combo, models: expanded };
}

/**
 * Expand provider wildcards across a whole collection of combos.
 * Used when pre-processing `allCombos` before nested-combo resolution so that
 * wildcard entries in referenced sub-combos are also materialized.
 */
export async function expandProviderWildcardsInCollection(
  combos: ComboLike[]
): Promise<ComboLike[]> {
  return Promise.all(combos.map((c) => expandProviderWildcardsInCombo(c)));
}
