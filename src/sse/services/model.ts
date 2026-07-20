// Re-export from open-sse with localDb integration
import {
  getModelAliases,
  getComboByName,
  getComboById,
  getComboByNameInsensitive,
  getCachedProviderNodes,
  getCustomModels,
} from "@/lib/localDb";
import { getCachedSettings } from "@/lib/localDb";
import { getSyncedAvailableModels } from "@/lib/db/models";
import {
  parseModel,
  getModelInfoCore,
  splitSyncedEffortSuffix,
} from "@omniroute/open-sse/services/model.ts";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";

export { parseModel };

/**
 * Reserved provider prefixes — built-in provider ids + aliases. User-defined
 * compatible-node prefixes must not be allowed to shadow these, otherwise a
 * node with prefix="cf" would hijack cloudflare-ai requests (and similar for
 * every built-in provider). Ported from upstream 9router 047fdc89.
 *
 * Built lazily so the registry is only walked once per process.
 */
let _reservedProviderPrefixes: Set<string> | null = null;
function getReservedProviderPrefixes(): Set<string> {
  if (_reservedProviderPrefixes) return _reservedProviderPrefixes;
  const reserved = new Set<string>();
  for (const entry of Object.values(REGISTRY)) {
    if (entry?.id) reserved.add(entry.id);
    if (entry?.alias) reserved.add(entry.alias);
  }
  _reservedProviderPrefixes = reserved;
  return reserved;
}

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
  const [dbAliases, settings] = await Promise.all([
    getModelAliases().catch(() => ({})),
    getCachedSettings().catch(() => ({}) as Record<string, unknown>),
  ]);

  const settingsAliases =
    settings.modelAliases &&
    typeof settings.modelAliases === "object" &&
    !Array.isArray(settings.modelAliases)
      ? (settings.modelAliases as Record<string, unknown>)
      : {};

  const wildcardMap = buildWildcardAliasMap(settings);

  return { ...dbAliases, ...settingsAliases, ...wildcardMap };
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
const SYNCED_EFFORT_SKIP_PROVIDER_PREFIXES = ["codex", "kimi"];

function isSyncedEffortSkippedProvider(providerId: string): boolean {
  return SYNCED_EFFORT_SKIP_PROVIDER_PREFIXES.some((prefix) => providerId.startsWith(prefix));
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
  if (isSyncedEffortSkippedProvider(providerId) || !Array.isArray(syncedModels)) {
    return { modelId, effort: null };
  }
  if (findSyncedModelMeta(syncedModels, modelId)) return { modelId, effort: null };

  for (const candidate of syncedModels as Array<{ id?: unknown; supportedThinkingEfforts?: unknown }>) {
    if (typeof candidate?.id !== "string" || !Array.isArray(candidate.supportedThinkingEfforts)) {
      continue;
    }
    const attempt = splitSyncedEffortSuffix(
      modelId,
      candidate.supportedThinkingEfforts as string[]
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

function resolveRuntimeFormats(customMatch: any, syncedMatch: any): RuntimeModelMeta {
  const apiFormat =
    customMatch?.apiFormat === "responses" || syncedMatch?.apiFormat === "responses"
      ? "responses"
      : undefined;
  const targetFormat =
    typeof customMatch?.targetFormat === "string"
      ? customMatch.targetFormat
      : typeof syncedMatch?.targetFormat === "string"
        ? syncedMatch.targetFormat
        : undefined;
  return { ...(apiFormat ? { apiFormat } : {}), ...(targetFormat ? { targetFormat } : {}) };
}

function copySyncedThinkingMetadata(metadata: RuntimeModelMeta, syncedMatch: any): void {
  if (typeof syncedMatch?.supportsThinking === "boolean") {
    metadata.supportsThinking = syncedMatch.supportsThinking;
  }
  if (syncedMatch?.alwaysThinking === true) metadata.alwaysThinking = true;
  if (Array.isArray(syncedMatch?.supportedThinkingEfforts)) {
    metadata.supportedThinkingEfforts = syncedMatch.supportedThinkingEfforts;
  }
  if (typeof syncedMatch?.defaultThinkingEffort === "string") {
    metadata.defaultThinkingEffort = syncedMatch.defaultThinkingEffort;
  }
}

function buildRuntimeModelMeta(customMatch: any, syncedMatch: any): RuntimeModelMeta {
  const metadata = resolveRuntimeFormats(customMatch, syncedMatch);
  copySyncedThinkingMetadata(metadata, syncedMatch);
  return metadata;
}

async function lookupModelMeta(
  providerId: string,
  modelId: string
): Promise<{ modelId: string; metadata: RuntimeModelMeta }> {
  try {
    const [customModels, syncedModels] = await Promise.all([
      getCustomModels(providerId),
      getSyncedAvailableModels(providerId),
    ]);
    // #7694: no direct match on the raw modelId? try a synced-declared `-{effort}`
    // suffix before falling back to the literal id, so `<prefix>/<model>-<tier>`
    // resolves to the real base model + a resolved effort.
    const { modelId: resolvedModelId, effort } = resolveSyncedModelIdAndEffort(
      providerId,
      modelId,
      syncedModels
    );
    // #7364: exact match first; retain the case-insensitive custom-model fallback
    // while also consulting the API-synced catalog for Kimi runtime metadata.
    const customMatch = findCustomModelMeta(customModels, resolvedModelId);
    const syncedMatch = findSyncedModelMeta(syncedModels, resolvedModelId);
    const metadata = buildRuntimeModelMeta(customMatch, syncedMatch);
    if (effort) metadata.resolvedThinkingEffort = effort;
    return { modelId: resolvedModelId, metadata };
  } catch {
    return { modelId, metadata: {} };
  }
}

/**
 * When a custom provider node is matched by its raw internal `node.id` (e.g. a combo
 * step addressing `<connId>/...` — see #2778), `parsed.model` was never split on the
 * node's own `prefix`, unlike the alias-addressing path where `parseModel` already
 * strips it. If the caller naively concatenates `owned_by` (the node's prefix, as
 * listed by /api/models) with the raw model id, the resulting model string carries a
 * redundant leading `${node.prefix}/` segment that the upstream provider does not
 * recognize, causing a 400. Strip it so `<connId>/<prefix>/<rawModelId>` normalizes to
 * the same `<rawModelId>` the bare alias form resolves to (#6772).
 */
function stripRedundantNodePrefix(model: string, nodePrefix: unknown): string {
  if (typeof nodePrefix !== "string" || !nodePrefix) return model;
  const redundant = `${nodePrefix}/`;
  return model.startsWith(redundant) ? model.slice(redundant.length) : model;
}

/**
 * Get full model info (parse or resolve)
 */
export async function getModelInfo(modelStr) {
  const parsed = parseModel(modelStr);
  const { extendedContext } = parsed;

  const attachRuntimeModelMeta = async (info: any) => {
    if (!info?.provider || !info?.model) return info;
    const { modelId, metadata } = await lookupModelMeta(String(info.provider), String(info.model));
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
    // Ported from upstream 9router 047fdc89.
    const reserved = getReservedProviderPrefixes();
    const isReservedPrefix = typeof prefixToCheck === "string" && reserved.has(prefixToCheck);

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
        const normalizedModel = stripRedundantNodePrefix(
          parsed.model as string,
          matchedOpenAI.prefix
        );
        const { modelId, metadata } = await lookupModelMeta(
          matchedOpenAI.id as string,
          normalizedModel
        );
        return {
          provider: matchedOpenAI.id,
          model: modelId,
          extendedContext,
          ...metadata,
        };
      }

      // Check Anthropic Compatible nodes
      const anthropicNodes = await getCachedProviderNodes({ type: "anthropic-compatible" });
      const matchedAnthropic = anthropicNodes.find(
        (node) => node.prefix === prefixToCheck || node.id === prefixToCheck
      );
      if (matchedAnthropic) {
        const normalizedModel = stripRedundantNodePrefix(
          parsed.model as string,
          matchedAnthropic.prefix
        );
        const { modelId, metadata } = await lookupModelMeta(
          matchedAnthropic.id as string,
          normalizedModel
        );
        return {
          provider: matchedAnthropic.id,
          model: modelId,
          extendedContext,
          ...metadata,
        };
      }
    }

    // stripModelPrefix: if enabled, strip provider prefix and re-resolve
    // the bare model name using existing heuristics (claude-* → anthropic, etc.)
    try {
      const settings = await getCachedSettings();
      if (settings.stripModelPrefix === true) {
        const strippedResult = await getModelInfoCore(parsed.model, getCombinedModelAliases);
        return { ...strippedResult, extendedContext };
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

/**
 * Check if model is a combo and return the full combo object
 * @returns {Promise<Object|null>} Full combo object or null if not a combo
 */
export async function getCombo(modelStr) {
  // Try exact match first (supports combos actually named "combo/ANY")
  let combo = await getComboByName(modelStr);
  if (combo && combo.models && combo.models.length > 0) {
    return combo;
  }

  // Fallback: Strip combo/ prefix if present
  if (modelStr.startsWith("combo/")) {
    const nameToSearch = modelStr.substring(6);
    combo = await getComboByName(nameToSearch);
    if (combo && combo.models && combo.models.length > 0) {
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
  if (combo && combo.models && combo.models.length > 0) {
    return combo;
  }

  combo = await getComboByNameInsensitive(modelStr);
  if (combo && combo.models && combo.models.length > 0) {
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
  const combo = await getCombo(modelStr);
  if (combo) return combo;

  // 2. NEW — check model-combo mappings table (pattern match)
  try {
    const { resolveComboForModel } = await import("@/lib/localDb");
    const mapped = await resolveComboForModel(modelStr);
    if (mapped && (mapped as any).models?.length > 0) {
      return mapped;
    }
  } catch {
    // If the mappings table doesn't exist yet (pre-migration), continue gracefully
  }

  return null;
}
