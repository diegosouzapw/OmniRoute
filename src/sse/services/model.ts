// Re-export from open-sse with localDb integration
import { getModelAliases, getCustomModels } from "@/lib/db/models";
import { getComboByName, getComboById, getComboByNameInsensitive } from "@/lib/db/combos";
import { getCachedProviderNodes, getCachedSettings } from "@/lib/db/readCache";

import { getSyncedAutoAliases } from "@/lib/providerModels/syncedAutoAliases.ts";
import { getActiveSyncedCatalog } from "@/lib/db/models/activeSyncedCatalog";
import { getModelCompatOverrides } from "@/lib/db/models/compat";
import { getNoAuthHydrationProviderIds } from "./noAuthProviderSiblings";
import {
  parseModel,
  getModelInfoCore,
  splitSyncedEffortSuffix,
  stripContextWindowSuffix,
} from "@omniroute/open-sse/services/model.ts";
import { getLearnedReasoningEffortForModel } from "@omniroute/open-sse/services/learnedReasoningEffortCaps.ts";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";
import { getRegisteredProviderEffortBaseModelId } from "@omniroute/open-sse/utils/registeredEffortVariants.ts";
import { getReservedProviderPrefixes } from "@/shared/constants/reservedProviderPrefixes";
import {
  assertMicrosoftDesignerWebProviderAvailable,
  isMicrosoftDesignerWebProviderRetiredError,
} from "@/shared/constants/designerWebRetirement";
import {
  assertRuntimeProviderAvailable,
  isRuntimeProviderRetirementError,
} from "@/shared/constants/providerRetirement";
import {
  assertCommonChatGptWebModelAvailable,
  assertCommonChatGptWebProviderAvailable,
  isCommonChatGptWebRetirementError,
} from "@/shared/constants/chatgptWebRetirement";
import { commonChatGptWebRetirementResponse } from "@/lib/providers/chatgptWebRetirementResponse";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";

export { parseModel, stripContextWindowSuffix };

/**
 * Fold `settings.wildcardAliases` ({pattern,target}[]) — the store the Settings
 * UI's "Wildcard Pattern" mode writes to (ModelAliasesUnified.tsx::addWildcardAlias
 * -> PATCH /api/settings) — into `pattern -> target` map entries so the T13
 * wildcard step in getModelInfoCore() (which treats every key of the merged alias
 * map as a candidate glob pattern) can see them (#7693). Without this the
 * feature persists but is never consulted at request time.
 */
function buildWildcardAliasMap(settings: Record<string, unknown>): Record<string, unknown> {
  const wildcardEntries = Array.isArray(settings.wildcardAliases)
    ? (settings.wildcardAliases as Array<{ pattern?: unknown; target?: unknown }>)
    : [];
  const wildcardMap: Record<string, unknown> = {};
  for (const entry of wildcardEntries) {
    if (entry && typeof entry.pattern === "string" && typeof entry.target === "string") {
      wildcardMap[entry.pattern] = entry.target;
    }
  }
  return wildcardMap;
}

/**
 * Build a combined model alias map that merges all alias stores:
 * 0. Auto-aliases derived from synced Antigravity-family discovery (lowest
 *    precedence — bare base name → default tier; see syncedAutoAliases.ts).
 * 1. DB-namespace aliases (key_value WHERE namespace='modelAliases') — set via
 *    /api/models/alias/ and seeded at startup.
 * 2. Settings-based exact aliases (settings.modelAliases) — set via the Settings UI and
 *    /api/settings/model-aliases/ (stored as a JSON blob in namespace='settings').
 * 3. Settings-based wildcard aliases (settings.wildcardAliases) — set via the Settings
 *    UI's "Wildcard Pattern" mode, PATCH /api/settings (#7693).
 *
 * Settings-based exact aliases take priority over DB-namespace aliases so that UI
 * configuration always wins. Without this merge, aliases configured via the Settings
 * UI were never consulted during provider routing, causing provider inference (e.g.
 * /^gpt-/ → openai) to silently override them (issue #2618 / #2208). Wildcard entries
 * are folded in last: they are keyed by pattern string (containing `*`/`?`), which
 * cannot collide with a real model id, so ordering never affects exact-alias lookups.
 */
async function getCombinedModelAliases(): Promise<Record<string, unknown>> {
  const [dbAliases, settings, autoAliases] = await Promise.all([
    getModelAliases().catch(() => ({})),
    getCachedSettings().catch(() => ({}) as Record<string, unknown>),
    getSyncedAutoAliases().catch(() => ({}) as Record<string, string>),
  ]);

  const settingsAliases =
    settings.modelAliases &&
    typeof settings.modelAliases === "object" &&
    !Array.isArray(settings.modelAliases)
      ? (settings.modelAliases as Record<string, unknown>)
      : {};

  const wildcardMap = buildWildcardAliasMap(settings);

  // Auto-aliases (derived from synced discovery) merge first — lowest
  // precedence: any explicit DB/settings/wildcard alias always wins.
  return { ...autoAliases, ...dbAliases, ...settingsAliases, ...wildcardMap };
}

/**
 * Look up per-model metadata from custom and API-synced catalogs:
 *  - apiFormat: "responses" when the model is configured for the Responses API.
 *  - targetFormat: the optional per-model wire format override (#2905).
 */
type RuntimeModelMeta = {
  apiFormat?: string;
  targetFormat?: string;
  supportsThinking?: boolean;
  alwaysThinking?: boolean;
  supportedThinkingEfforts?: string[];
  defaultThinkingEffort?: string;
  // #7694: set when `modelId` carried a `-{effort}` suffix resolved against a synced
  // model's own `supportedThinkingEfforts` (see `resolveSyncedModelIdAndEffort` below).
  // Threaded through to `handleChatCore` -> `applyDefaultReasoningEffort` so the suffix
  // becomes `reasoning_effort` only when the request itself carries no reasoning field.
  resolvedThinkingEffort?: string;
};

// Providers that already own a native `-{effort}` suffix mechanism — never
// double-resolve the generic synced suffix on top of theirs (#7694, mirrors the
// catalog-side skip list in `open-sse/utils/syncedEffortVariants.ts`).
const SYNCED_EFFORT_SKIP_PROVIDER_PREFIXES = ["kimi"];

function isSyncedEffortSkippedProvider(providerId: string): boolean {
  return SYNCED_EFFORT_SKIP_PROVIDER_PREFIXES.some((prefix) => providerId.startsWith(prefix));
}

/**
 * C1: effective tier set for suffix validation = learned ?? sync. The catalog
 * advertises variants from the learned set; validating the suffix against raw
 * synced metadata would strand learned-only tiers (dead-on-arrival ids).
 */
function effectiveKnownEfforts(
  modelId: string,
  syncedEfforts: readonly string[] | null | undefined
): string[] {
  const learned = getLearnedReasoningEffortForModel(modelId);
  if (learned) return [...learned];
  return Array.isArray(syncedEfforts) ? [...syncedEfforts] : [];
}

/** Resolve a suffix against an explicitly tiered static registry model. */
function resolveRegistryModelIdAndEffort(
  providerId: string,
  modelId: string
): { modelId: string; effort: string | null } {
  if (isSyncedEffortSkippedProvider(providerId)) return { modelId, effort: null };

  const registryModels = REGISTRY[providerId]?.models;
  if (!Array.isArray(registryModels)) return { modelId, effort: null };
  if (registryModels.some((candidate) => candidate?.id === modelId)) {
    return { modelId, effort: null };
  }

  for (const candidate of registryModels) {
    if (!Array.isArray(candidate?.supportedThinkingEfforts)) continue;
    const attempt = splitSyncedEffortSuffix(
      modelId,
      effectiveKnownEfforts(candidate.id, candidate.supportedThinkingEfforts)
    );
    if (attempt.effort && attempt.baseModel === candidate.id) {
      return { modelId: attempt.baseModel, effort: attempt.effort };
    }
  }

  return { modelId, effort: null };
}

function findRegistryModel(providerId: string, modelId: string): any {
  const registryModels = REGISTRY[providerId]?.models;
  return Array.isArray(registryModels)
    ? registryModels.find((candidate) => candidate?.id === modelId)
    : undefined;
}

/**
 * #7694: when `modelId` has no direct synced-model match, try stripping a trailing
 * `-{effort}` token by testing it against each candidate synced model's OWN declared
 * `supportedThinkingEfforts` (`splitSyncedEffortSuffix`) — never a blind/global effort
 * list, so a model id that legitimately ends in an effort-like token is left untouched
 * unless some synced model's real tier list says otherwise. Returns the original
 * `modelId` with `effort: null` when nothing matches or the provider already owns its
 * own suffix mechanism.
 */
function resolveSyncedModelIdAndEffort(
  providerId: string,
  modelId: string,
  syncedModels: unknown
): { modelId: string; effort: string | null } {
  if (providerId === "codex" && findRegistryModel(providerId, modelId)) {
    return { modelId, effort: null };
  }
  if (isSyncedEffortSkippedProvider(providerId) || !Array.isArray(syncedModels)) {
    return { modelId, effort: null };
  }
  if (findSyncedModelMeta(syncedModels, modelId)) return { modelId, effort: null };

  for (const candidate of syncedModels as Array<{
    id?: unknown;
    supportedThinkingEfforts?: unknown;
  }>) {
    if (typeof candidate?.id !== "string" || !Array.isArray(candidate.supportedThinkingEfforts)) {
      continue;
    }
    const attempt = splitSyncedEffortSuffix(
      modelId,
      effectiveKnownEfforts(candidate.id, candidate.supportedThinkingEfforts as string[])
    );
    if (attempt.effort && attempt.baseModel === candidate.id) {
      return { modelId: attempt.baseModel, effort: attempt.effort };
    }
  }
  return { modelId, effort: null };
}

function findCustomModelMeta(models: unknown, modelId: string): any {
  if (!Array.isArray(models)) return undefined;
  return (
    models.find((model: any) => model.id === modelId) ??
    models.find(
      (model: any) =>
        typeof model.id === "string" && model.id.toLowerCase() === modelId.toLowerCase()
    )
  );
}

function findSyncedModelMeta(models: unknown, modelId: string): any {
  return Array.isArray(models) ? models.find((model: any) => model.id === modelId) : undefined;
}

function findLiveCatalogModelMeta(
  providerId: string,
  requestedModelId: string,
  resolvedModelId: string,
  syncedModels: unknown
): any {
  const directMatch = findSyncedModelMeta(syncedModels, resolvedModelId);
  if (directMatch || !Array.isArray(syncedModels)) return directMatch;

  const registryModel = findRegistryModel(providerId, requestedModelId);
  const liveCatalogIds = registryModel?.liveCatalogIds;
  if (!Array.isArray(liveCatalogIds) || liveCatalogIds.length === 0) return undefined;

  return syncedModels.find(
    (model: any) => typeof model?.id === "string" && liveCatalogIds.includes(model.id)
  );
}

function resolveRuntimeFormats(
  customMatch: any,
  syncedMatch: any,
  compatOverrideMatch: any
): RuntimeModelMeta {
  const apiFormat =
    (typeof customMatch?.apiFormat === "string" ? customMatch.apiFormat : undefined) ||
    (typeof compatOverrideMatch?.apiFormat === "string"
      ? compatOverrideMatch.apiFormat
      : undefined) ||
    (syncedMatch?.apiFormat === "responses" ? "responses" : undefined);
  const targetFormat =
    typeof customMatch?.targetFormat === "string"
      ? customMatch.targetFormat
      : typeof compatOverrideMatch?.targetFormat === "string"
        ? compatOverrideMatch.targetFormat
        : typeof syncedMatch?.targetFormat === "string"
          ? syncedMatch.targetFormat
          : undefined;
  const supportsVision =
    typeof customMatch?.supportsVision === "boolean"
      ? customMatch.supportsVision
      : typeof compatOverrideMatch?.supportsVision === "boolean"
        ? compatOverrideMatch.supportsVision
        : typeof syncedMatch?.supportsVision === "boolean"
          ? syncedMatch.supportsVision
          : undefined;
  return {
    ...(apiFormat ? { apiFormat } : {}),
    ...(targetFormat ? { targetFormat } : {}),
    ...(supportsVision !== undefined ? { supportsVision } : {}),
  };
}

function copySyncedThinkingMetadata(metadata: RuntimeModelMeta, syncedMatch: any): void {
  if (typeof syncedMatch?.supportsThinking === "boolean") {
    metadata.supportsThinking = syncedMatch.supportsThinking;
  }
  if (syncedMatch?.alwaysThinking === true) metadata.alwaysThinking = true;
  // Only let a non-empty synced effort list override the static registry fallback;
  // an empty array from an incomplete synced discovery must not erase registry-declared
  // tiers (#9485 review).
  if (
    Array.isArray(syncedMatch?.supportedThinkingEfforts) &&
    syncedMatch.supportedThinkingEfforts.length > 0
  ) {
    metadata.supportedThinkingEfforts = syncedMatch.supportedThinkingEfforts;
  }
  if (typeof syncedMatch?.defaultThinkingEffort === "string") {
    metadata.defaultThinkingEffort = syncedMatch.defaultThinkingEffort;
  }
}

function copyRegistryThinkingMetadata(metadata: RuntimeModelMeta, registryMatch: any): void {
  if (typeof registryMatch?.supportsReasoning === "boolean") {
    metadata.supportsThinking = registryMatch.supportsReasoning;
  }
  if (Array.isArray(registryMatch?.supportedThinkingEfforts)) {
    metadata.supportedThinkingEfforts = [...registryMatch.supportedThinkingEfforts];
  }
}

function buildRuntimeModelMeta(
  customMatch: any,
  syncedMatch: any,
  registryMatch: any,
  compatOverrideMatch: any
): RuntimeModelMeta {
  const metadata = resolveRuntimeFormats(customMatch, syncedMatch, compatOverrideMatch);
  copyRegistryThinkingMetadata(metadata, registryMatch);
  copySyncedThinkingMetadata(metadata, syncedMatch);
  return metadata;
}

async function lookupModelMeta(
  providerId: string,
  modelId: string
): Promise<{
  modelId: string;
  metadata: RuntimeModelMeta;
  available: boolean;
}> {
  try {
    const [customModels, liveCatalog, compatOverrides] = await Promise.all([
      getCustomModels(providerId),
      getActiveSyncedCatalog(providerId),
      // #10898 / #7620: model-compat overrides (apiFormat/targetFormat/
      // supportsVision, isHidden, ...) are stored keyed on the id the operator
      // wrote them under. For a no-auth alias the model prefix resolves to the
      // APIKEY gateway id (e.g. "opencode/x" -> providerId "opencode-zen") but
      // the override was written on the sibling "opencode" row. Merge overrides
      // across the provider AND its no-auth sibling ids (requested id first)
      // instead of canonicalizing the low-level compat key, which would break
      // paths that legitimately key on the raw id (e.g. getHiddenModelsByProvider).
      Promise.resolve(
        getNoAuthHydrationProviderIds(providerId).flatMap((id) => getModelCompatOverrides(id))
      ),
    ]);
    const syncedModels = liveCatalog.models;

    // #7694: no direct match on the raw modelId? try a synced-declared `-{effort}`
    // suffix before falling back to the literal id, so `<prefix>/<model>-<tier>`
    // resolves to the real base model + a resolved effort.
    // #7694: no direct match on the raw modelId? try a synced-declared `-{effort}`
    // suffix before falling back to the literal id, so `<prefix>/<model>-<tier>`
    // resolves to the real base model + a resolved effort.
    let { modelId: resolvedModelId, effort } = resolveSyncedModelIdAndEffort(
      providerId,
      modelId,
      syncedModels
    );
    // Short-circuit registry suffix resolution when the raw id is already a direct
    // custom or synced model — otherwise a model literally named
    // `deepseek-v4-flash-low` gets rewritten to `deepseek-v4-flash` + effort `low`
    // and its custom/synced metadata (apiFormat/targetFormat) is dropped (#9485 review).
    if (
      !effort &&
      resolvedModelId === modelId &&
      !findCustomModelMeta(customModels, modelId) &&
      !findSyncedModelMeta(syncedModels, modelId)
    ) {
      const registryResolution = resolveRegistryModelIdAndEffort(providerId, modelId);
      resolvedModelId = registryResolution.modelId;
      effort = registryResolution.effort;
    }
    // Custom models remain explicit operator overrides even when live discovery
    // is authoritative for the provider.
    const customMatch = findCustomModelMeta(customModels, resolvedModelId);
    const syncedMatch = findLiveCatalogModelMeta(
      providerId,
      modelId,
      resolvedModelId,
      syncedModels
    );
    const registryMatch = findRegistryModel(providerId, resolvedModelId);
    const compatOverrideMatch = Array.isArray(compatOverrides)
      ? compatOverrides.find((m) => m.id === resolvedModelId || m.id === modelId)
      : undefined;
    const effortBaseModelId = getRegisteredProviderEffortBaseModelId(providerId, modelId);

    const liveBackedEffortVariant =
      effortBaseModelId !== null && syncedModels.some((model) => model.id === effortBaseModelId);

    const available =
      !liveCatalog.authoritative || Boolean(customMatch || syncedMatch || liveBackedEffortVariant);

    const metadata = buildRuntimeModelMeta(
      customMatch,
      syncedMatch,
      registryMatch,
      compatOverrideMatch
    );
    if (effort) metadata.resolvedThinkingEffort = effort;

    return { modelId: resolvedModelId, metadata, available };
  } catch {
    return { modelId, metadata: {}, available: true };
  }
}

/**
 * When a custom provider node is matched by its raw internal `node.id` (e.g. a combo
 * step addressing `<connId>/...` — see #2778), `parsed.model` was never split on the
 * node's own identifiers, unlike the alias-addressing path where `parseModel` already
 * strips the prefix. If the caller naively concatenates routing segments with the raw
 * model id, the resulting model string carries redundant leading segments that the
 * upstream provider does not recognize, causing deterministic 404s (retried).
 *
 * Observed in production traffic: `<connId>/<connId>/<model>` — requests addressed
 * by the node's internal id (#2778) left a second `<connId>/` segment in parsed.model
 * that the historical strip (prefix alone, #6772) never saw, and the composite went
 * upstream verbatim. We now shed ANY of the matched node's routing identifiers (prefix AND internal id), repeatedly, until stable.
 * A legitimate namespace different from these identifiers is untouched (#493);
 * an operator naming their prefix identically to one of their catalog namespaces
 * sees that namespace shed — accepted limitation, precedent #6772.
 */
function stripRedundantNodeRoutingSegments(model: string, routingIds: unknown[]): string {
  let out = model;
  let changed = true;
  while (changed) {
    changed = false;
    for (const seg of routingIds) {
      if (typeof seg !== "string" || !seg) continue;
      const redundant = `${seg}/`;
      if (out.startsWith(redundant)) {
        out = out.slice(redundant.length);
        changed = true;
      }
    }
  }
  return out;
}

/**
 * Get full model info (parse or resolve)
 */
export async function getModelInfo(modelStr) {
  // Reject the raw common-provider identity before compatible-node lookup or
  // stripModelPrefix can erase/remap it. Ordinary bare model aliases remain
  // operator-owned; the two retired bare ids are intentionally blocked.
  assertCommonChatGptWebModelAvailable(modelStr);
  const parsed = parseModel(modelStr);
  // Fail before compatible-node lookup and stripModelPrefix can erase or remap
  // a retired provider identity. Executor/auth tombstones are later defenses;
  // they cannot see the original prefix after either remapping path.
  assertRuntimeProviderAvailable(parsed.providerAlias);
  assertRuntimeProviderAvailable(parsed.provider);
  const { extendedContext } = parsed;

  // Fail closed before a custom compatible node or stripModelPrefix can reinterpret
  // an exact retired provider id/alias as an unrelated live provider.
  assertMicrosoftDesignerWebProviderAvailable(parsed.providerAlias || parsed.provider);

  const assertResolvedModelAvailable = (info: any) => {
    assertCommonChatGptWebProviderAvailable(info?.provider);
    return info;
  };

  const attachRuntimeModelMeta = async (info: any) => {
    assertResolvedModelAvailable(info);
    if (!info?.provider || !info?.model) return info;

    const providerId = String(info.provider);
    const requestedModelId = String(info.model);
    const { modelId, metadata, available } = await lookupModelMeta(providerId, requestedModelId);

    if (!available) {
      return {
        provider: null,
        model: requestedModelId,
        extendedContext: info.extendedContext,
        errorType: "model_not_found",
        errorMessage: `Model '${requestedModelId}' is not available in the active live catalog for provider '${providerId}'.`,
      };
    }

    const resolvedInfo = modelId !== info.model ? { ...info, model: modelId } : info;

    return Object.keys(metadata).length > 0 ? { ...resolvedInfo, ...metadata } : resolvedInfo;
  };

  // Check custom provider nodes first (for both alias and non-alias formats)
  if (parsed.providerAlias || parsed.provider) {
    // Ensure prefixToCheck is always a concise identifier, not a full model string
    const prefixToCheck = parsed.providerAlias || parsed.provider;

    // Compatible-node prefixes are user-defined. They must not be allowed to
    // shadow built-in provider ids/aliases (e.g. `cf` → cloudflare-ai). When
    // prefixToCheck matches a built-in registry id/alias, skip the compatible-
    // node prefix lookup so the request still routes to the built-in provider.
    // Internal UUID-prefixed node ids (e.g. "openai-compatible-responses-...")
    // are never in the reserved set, so the #2778 combo path still works.
    // Ported from upstream 9router 047fdc89. Set shared with the write-path
    // validation guard (src/shared/constants/reservedProviderPrefixes.ts) so
    // both sides can never drift apart.
    const isReservedPrefix =
      typeof prefixToCheck === "string" && getReservedProviderPrefixes().has(prefixToCheck);

    if (!isReservedPrefix) {
      // Check OpenAI Compatible nodes
      // Match by node.prefix (user-defined alias) OR node.id (internal UUID id stored by
      // combo steps), so that combo targets using the internal node id still resolve
      // correctly (#2778).
      const openaiNodes = await getCachedProviderNodes({ type: "openai-compatible" });
      const matchedOpenAI = openaiNodes.find(
        (node) => node.prefix === prefixToCheck || node.id === prefixToCheck
      );
      if (matchedOpenAI) {
        const normalizedModel = stripRedundantNodeRoutingSegments(parsed.model as string, [
          matchedOpenAI.prefix,
          matchedOpenAI.id,
        ]);
        const { modelId, metadata } = await lookupModelMeta(
          matchedOpenAI.id as string,
          normalizedModel
        );
        return assertResolvedModelAvailable({
          provider: matchedOpenAI.id,
          model: modelId,
          extendedContext,
          ...metadata,
        });
      }

      // Check Anthropic Compatible nodes
      const anthropicNodes = await getCachedProviderNodes({ type: "anthropic-compatible" });
      const matchedAnthropic = anthropicNodes.find(
        (node) => node.prefix === prefixToCheck || node.id === prefixToCheck
      );
      if (matchedAnthropic) {
        const normalizedModel = stripRedundantNodeRoutingSegments(parsed.model as string, [
          matchedAnthropic.prefix,
          matchedAnthropic.id,
        ]);
        const { modelId, metadata } = await lookupModelMeta(
          matchedAnthropic.id as string,
          normalizedModel
        );
        return assertResolvedModelAvailable({
          provider: matchedAnthropic.id,
          model: modelId,
          extendedContext,
          ...metadata,
        });
      }
    }

    // stripModelPrefix: if enabled, strip provider prefix and re-resolve
    // the bare model name using existing heuristics (claude-* → anthropic, etc.)
    try {
      const settings = await getCachedSettings();
      if (settings.stripModelPrefix === true) {
        const strippedResult = await getModelInfoCore(parsed.model, getCombinedModelAliases);
        return assertResolvedModelAvailable({ ...strippedResult, extendedContext });
      }
    } catch {
      // If settings read fails, fall through to normal resolution
    }
  }

  if (!parsed.isAlias) {
    return await attachRuntimeModelMeta(await getModelInfoCore(modelStr, null));
  }

  return await attachRuntimeModelMeta(await getModelInfoCore(modelStr, getCombinedModelAliases));
}

export async function getModelInfoOrRetirementResponse(modelId: string) {
  try {
    return await getModelInfo(modelId);
  } catch (error) {
    if (isMicrosoftDesignerWebProviderRetiredError(error)) {
      return { error: errorResponse(HTTP_STATUS.GONE, error.message) };
    }
    if (isRuntimeProviderRetirementError(error)) {
      return {
        error: errorResponse(error.status, error.message, {
          type: "provider_error",
          code: error.code,
        }),
      };
    }
    if (isCommonChatGptWebRetirementError(error)) {
      return { error: commonChatGptWebRetirementResponse() };
    }
    throw error;
  }
}

/**
 * Check if model is a combo and return the full combo object
 * @returns {Promise<Object|null>} Full combo object or null if not a combo
 */
export async function getCombo(modelStr) {
  // Try exact match first (supports combos actually named "combo/ANY")
  let combo = await getComboByName(modelStr);
  if (combo && Array.isArray(combo.models) && combo.models.length > 0) {
    return combo;
  }

  // Fallback: Strip combo/ prefix if present
  if (modelStr.startsWith("combo/")) {
    const nameToSearch = modelStr.substring(6);
    combo = await getComboByName(nameToSearch);
    if (combo && Array.isArray(combo.models) && combo.models.length > 0) {
      return combo;
    }
  }

  // #4446: the opencode-plugin publishes combos as ModelV2 `id: combo.id`, and
  // the OpenCode `--model` dispatch path forwards a lowercased bare slug. The
  // exact, case-sensitive name match above misses both a combo addressed by its
  // stored id (UUID/slug) and a lowercased display name (e.g. "master-light" for
  // a combo named "MASTER-LIGHT"). These two fallbacks only run after the exact
  // match fails, so they never re-route a combo that already resolves today.
  combo = await getComboById(modelStr);
  if (combo && Array.isArray(combo.models) && combo.models.length > 0) {
    return combo;
  }

  combo = await getComboByNameInsensitive(modelStr);
  if (combo && Array.isArray(combo.models) && combo.models.length > 0) {
    return combo;
  }

  return null;
}

/**
 * Check if model matches a combo by name OR by model-combo mapping pattern.
 * This augments getCombo() with glob-based model-to-combo resolution (#563).
 *
 * Resolution order:
 * 1. Exact combo name match (existing behavior)
 * 2. Model-combo mapping pattern match (new — glob patterns by priority)
 * 3. null (no combo — single-model request)
 */
export async function getComboForModel(modelStr) {
  // 1. Existing behavior — exact combo name match
  let combo = await getCombo(modelStr);
  if (combo) return combo;

  // Client context tags are ignored only after exact lookup, preserving literal
  // combo names such as "Claude [1m]" while allowing "Claude[500k]" to use "Claude".
  const baseModelStr = stripContextWindowSuffix(modelStr);
  if (baseModelStr && baseModelStr !== modelStr) {
    combo = await getCombo(baseModelStr);
    if (combo) return combo;
  }

  // 2. NEW — check model-combo mappings table (pattern match)
  try {
    const { resolveComboForModel } = await import("@/lib/db/modelComboMappings");
    const mapped = await resolveComboForModel(baseModelStr || modelStr);
    if (mapped && (mapped as any).models?.length > 0) {
      return mapped;
    }
  } catch {
    // If the mappings table doesn't exist yet (pre-migration), continue gracefully
  }

  return null;
}
