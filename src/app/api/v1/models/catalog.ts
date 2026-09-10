import { PROVIDER_MODELS, PROVIDER_ID_TO_ALIAS } from "@/shared/constants/models";
import { NOAUTH_PROVIDERS } from "@/shared/constants/providers";
import { getCombos } from "@/lib/db/combos";
import { getSettings } from "@/lib/db/settings";
import { getUserDatabaseSettings } from "@/lib/db/databaseSettings";
import { createLazyConnectionView } from "@/lib/db/providers/lazyConnectionView";
import { extractAliasBackedModels } from "./aliasBackedModels";
import {
  buildSyncedModelIdsByCanonicalProvider,
  shouldSuppressStaticModelForExclusiveListing,
} from "./catalogSyncedCoverage";
import { buildSyncedCapabilities, mergeSyncedCapabilities } from "./syncedCapabilities";
import { getAllEmbeddingModels } from "@omniroute/open-sse/config/embeddingRegistry";
import {
  getAllImageModels,
  isRegisteredImageModel,
} from "@omniroute/open-sse/config/imageRegistry";
import { aiHordeImageCatalog } from "@omniroute/open-sse/services/aihordeImageCatalog";
import { getAllRerankModels } from "@omniroute/open-sse/config/rerankRegistry";
import { getAllAudioModels } from "@omniroute/open-sse/config/audioRegistry";
import { getAllModerationModels } from "@omniroute/open-sse/config/moderationRegistry";
import { getAllVideoModels } from "@omniroute/open-sse/config/videoRegistry";
import { getAllMusicModels } from "@omniroute/open-sse/config/musicRegistry";
import {
  getRegistryModelThinkingEfforts,
  getRegistryThinkingEfforts,
  providerUsesAuthoritativeLiveCatalog,
  REGISTRY,
} from "@omniroute/open-sse/config/providerRegistry";
import { CODEX_NATIVE_UNPREFIXED_MODELS } from "@omniroute/open-sse/services/model";
import { isModelSelectable } from "@omniroute/open-sse/services/modelLifecycle";
import { resolveNestedComboTargets } from "@omniroute/open-sse/services/combo";
import {
  AUTO_TEMPLATE_VARIANTS,
  AUTO_SUFFIX_VARIANTS,
  AUTO_FAMILY_IDS,
  createBuiltinAutoCombo,
  prepareBuiltinAutoComboInputs,
  isPaidTierAutoId,
} from "@omniroute/open-sse/services/autoCombo/builtinCatalog";
import {
  getSyncedAvailableModelsByConnection,
  SYNCED_AVAILABLE_MODELS_MALFORMED,
  type SyncedAvailableModel,
  getAllCustomModels,
  getModelAliases,
  getHiddenModelsByProvider,
} from "@/lib/db/models";
import { getAllActiveSyncedModels } from "@/lib/db/models/activeSyncedCatalog";
import {
  getModelCatalogCacheVersion,
  getCachedRawProviderConnections,
  getCachedProviderNodes,
} from "@/lib/db/readCache";
import { getCompatibleFallbackModels } from "@/lib/providers/managedAvailableModels";
import {
  providerUsesCuratedModelsOnly,
  providerUsesExclusiveSyncedListing,
} from "@/lib/providers/modelListingCapability";
import { ensureCursorAutoCatalogEntry } from "@/lib/providerModels/cursorAutoCatalog";
import { mergeCustomModelMetadata } from "@/lib/providers/modelMetadataPrecedence";
import { getOpenRouterCatalog } from "@/lib/catalog/openrouterCatalog";
import { hasEligibleConnectionForModel } from "@/domain/connectionModelRules";
import {
  INTERNAL_PROXY_ERROR,
  getCanonicalModelMetadata,
  getCatalogDiagnosticsHeaders,
  type CatalogEnrichmentSnapshot,
} from "@/lib/modelMetadataRegistry";
import { createModelCapabilityResolutionSnapshot } from "@/lib/modelCapabilityResolutionSnapshot";
import { getModelsDevPricing, getSyncedCapability } from "@/lib/modelsDevSync";
import { getModelSpec } from "@/shared/constants/modelSpecs";
import { classifyModelSupportedEndpoints } from "@/shared/constants/modelSupportedEndpoints";
import { getModelsCatalogPrefixMode } from "@/shared/utils/featureFlags";
import {
  isProviderNodePrefixReserved,
  selectCompatibleNodeForPrefix,
} from "@/lib/providerNodePrefixes";
import { applyCatalogPostFilters, finalizeCatalogResponse } from "./catalogResponse";
import {
  isNoAuthProviderBlocked,
  isNoAuthProviderKey,
  isNoAuthRawProviderPrefix,
  normalizeBlockedProviderSet,
} from "@/shared/utils/noAuthProviders";
import { getSourcedTokenLimit, getTokenLimit } from "@omniroute/open-sse/services/contextManager";
import { extractApiKey } from "@/sse/services/auth";
import type { ComboModelStep } from "@/lib/combos/steps";
import {
  type CustomModelEntry,
  type ComboCatalogTarget,
  type ComboTargetCatalogMetadata,
  isPositiveFiniteNumber,
  parseJsonStringArray,
  intersectStringArrays,
  minKnownNumber,
  maybeOmitCatalogModelName,
  getThinkingCapabilityFields,
  mergeComboCapabilities,
  getConnectionScopedEffortTiers,
  type ConnectionScopedReasoningCatalog,
} from "./catalogHelpers";
import {
  qualifyOpenRouterModelId,
  normalizeOpenRouterModalities,
  getOpenRouterModelType,
  isOpenRouterFreeModel,
  getOpenRouterDisplayName,
} from "./catalogOpenrouter";
import { getVisionCapabilityFields, getCustomVisionCapabilityFields } from "./catalogVision";
import {
  buildAliasMaps,
  prefixRoutesToProvider,
  resolveCanonicalProviderId as resolveCanonicalProviderIdFromMaps,
  getProviderPrefixes as getProviderPrefixesFromMaps,
  getComboTargetModelId as getComboTargetModelIdFromMaps,
} from "./catalogProviderMaps";
import {
  getModelCatalogAuthRejection,
  isCodexModelCatalogClient,
  isCcDiscoveryModelCatalogClient,
} from "./catalogRequest";
import { incrementCcDiscoveryHitCount } from "@/lib/db/ccDiscoveryMetrics";
import { isUnifiedChatSourceModelSelectable } from "./catalogModelPolicy";
import { isFreeModel } from "@/shared/utils/freeModels";
import { isModelExposureAllowed } from "@/shared/utils/modelExposureList";
import { isCodexDiscoveryModelExcluded } from "@/shared/services/codexDiscoveryPolicy";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";

// Public API of this module is preserved after the catalog helper extraction:
// `isVisionModelId` (vision-detection-consistency.test.ts) and
// `getCustomVisionCapabilityFields` (llm-selector-custom-vision-models.test.ts)
// are still importable from here.
export { isVisionModelId } from "@/shared/constants/visionModels";
export { getCustomVisionCapabilityFields };

// The response cache (coalescing, short-TTL memoization and stale-while-revalidate)
// lives in ./catalogCache. Re-exported here because the existing tests import the
// hooks from this module, and CATALOG_STALE_WHILE_REVALIDATE_MS is part of the
// documented behavior of this endpoint.
import {
  CATALOG_CACHE_TTL_MS_DEFAULT,
  resolveCachedCatalogResponse,
  type BackgroundRefreshScheduler,
} from "./catalogCache";

export {
  CATALOG_STALE_WHILE_REVALIDATE_MS,
  __resetCatalogBuilderRunsForTest,
  __getCatalogBuilderRunsForTest,
  __expireCatalogCacheForTest,
  __setCatalogCacheEntryForTest,
  __flushCatalogBackgroundRefreshForTest,
  __forceCatalogInFlightRejectionForTest,
} from "./catalogCache";
export type { CachedCatalog, BackgroundRefreshScheduler } from "./catalogCache";

/**
 * Per-call options for {@link getUnifiedModelsResponse}.
 *
 * Restored in #11551: `/v1/models` passes Next's `after()` so the stale-while-
 * revalidate rebuild is deferred until after the response flush. #9199 had removed
 * the injection point while the route kept passing it, so the argument was silently
 * dropped and the refresh ran on a plain `setTimeout`.
 */
export type CatalogResponseOptions = {
  scheduleBackgroundRefresh?: BackgroundRefreshScheduler;
};

const BUILTIN_AUTO_YIELD_INTERVAL = 2;

function yieldCatalogBuildTurn(): Promise<void> {
  return new Promise((resolve) => setImmediate(resolve));
}

/**
 * Build unified OpenAI-compatible model catalog response.
 * Reused by `/api/v1/models` and `/api/v1` to avoid semantic drift (T09).
 *
 * `options.scheduleBackgroundRefresh` is the App Router's injection point for the
 * stale-while-revalidate rebuild (#8728): the route passes Next's `after()` so the
 * rebuild starts only once the stale body has been flushed. Omitted by non-route
 * callers, which fall back to the cache module's own default.
 */
export async function getUnifiedModelsResponse(
  request: Request,
  corsHeaders: Record<string, string> = {},
  options: { scheduleBackgroundRefresh?: BackgroundRefreshScheduler } = {}
) {
  const diagnosticHeaders = getCatalogDiagnosticsHeaders({ request });

  // #6408 fast path: reject unauthorized callers first (auth state is per-request
  // and MUST NOT be cached), then coalesce identical concurrent requests + short-
  // TTL memoize the serialized JSON body.
  let settingsForAuth: Record<string, any> = {};
  try {
    try {
      settingsForAuth = await getSettings();
    } catch {}
    // #9147: yield before auth check to allow event loop tick
    await yieldCatalogBuildTurn();
    const authRejection = await getModelCatalogAuthRejection(request, settingsForAuth, {
      ...corsHeaders,
      ...diagnosticHeaders,
    });
    if (authRejection) return authRejection;
  } catch {
    // Fall through to full builder on auth-check failure; core handles errors.
  }

  // Best-effort cc-discovery usage metric — count every authorized GET /v1/models
  // hit from a Claude Code client, cache hit or not. Never blocks/slows the
  // request (incrementCcDiscoveryHitCount already swallows its own errors).
  if (isCcDiscoveryModelCatalogClient(request)) {
    incrementCcDiscoveryHitCount();
  }

  try {
    return await resolveCachedCatalogResponse(
      request,
      { corsHeaders, diagnosticHeaders },
      buildCatalogPayload,
      {
        // #10831: a disabled router hides auto/* just as hideAutoCombos does, so
        // the two collapse into one cache dimension — the resulting catalogs are
        // identical and do not need separate entries.
        hideAutoCombos:
          settingsForAuth?.hideAutoCombos === true || settingsForAuth?.autoRoutingEnabled === false,
        hideNoThinkVariants: settingsForAuth?.hideNoThinkVariants === true,
        scheduleBackgroundRefresh: options.scheduleBackgroundRefresh,
      }
    );
  } catch (err) {
    // Hard rule #12: never put a raw err.message/err.stack in a response body.
    // Route it through the shared sanitizer instead — same status/type/code as
    // before, minus the stack-trace/path leak.
    const message = err instanceof Error ? err.message : String(err);
    return Response.json(
      buildErrorBody(500, message, undefined, {
        type: "server_error",
        code: INTERNAL_PROXY_ERROR,
      }),
      { status: 500, headers: { ...corsHeaders, ...diagnosticHeaders } }
    );
  }
}

async function buildCatalogPayload(
  request: Request
): Promise<{ body: string; headers: Record<string, string>; status: number; cacheTTL: number }> {
  const built = await buildUnifiedModelsResponseCore(request);
  const body = await built.text();
  const headers: Record<string, string> = {};
  built.headers.forEach((value, key) => {
    headers[key] = value;
  });
  // Read the configurable cache TTL from database settings.
  // Falls back to the hardcoded default if not set or on error.
  let cacheTTL = CATALOG_CACHE_TTL_MS_DEFAULT;
  try {
    // Only the persisted cache section is needed here. The full database-settings
    // view also calculates dbstat, WAL, schema and integrity diagnostics, which are
    // synchronous and can pin the event loop after an otherwise cooperative build.
    const dbSettings = getUserDatabaseSettings();
    cacheTTL = dbSettings.cache?.modelCatalogCacheTtlMs ?? CATALOG_CACHE_TTL_MS_DEFAULT;
  } catch {
    // Swallow — use default TTL on DB error
  }
  return { body, headers, status: built.status, cacheTTL };
}

/**
 * Original catalog builder. Runs once per unique cache key per TTL window.
 */
async function buildUnifiedModelsResponseCore(
  request: Request,
  corsHeaders: Record<string, string> = {}
) {
  const diagnosticHeaders = getCatalogDiagnosticsHeaders({ request });
  // #9147: this builder walks connections + model registries at catalog scale with no
  // event-loop yield, so a large deployment pins the single Node.js thread for the
  // whole build (reporter: 183 connections / 2000+ models → 10.1s stall that blocks the
  // dashboard WS heartbeat). Yield every `catYIELD_EVERY` items across the hot loops.
  const catYIELD_EVERY = 5;
  let catYieldCount = 0;
  const maybeYieldCatalogBuild = async (): Promise<void> => {
    catYieldCount++;
    if (catYieldCount % catYIELD_EVERY === 0) {
      await yieldCatalogBuildTurn();
    }
  };
  try {
    // #9147: `getModelIsHidden()` is a SQLite read per call (custom row + compat list)
    // and the build consults it ~16× per entry. Bulk-load the hidden-model map once
    // (one query — `getHiddenModelsByProvider`) and resolve from memory for the whole
    // build. A provider absent from the map has no hidden models at all — `false`,
    // no on-demand fallback (that would reintroduce the per-call SQLite reads).
    // Deliberately kept INSIDE this try block (not hoisted above it): the builder's
    // own catch below is what converts a build-time failure into a sanitized 500
    // Response instead of a rejected promise — hoisting this bulk read above the
    // try would let a crash here propagate as an unhandled rejection instead
    // (catalogCache.ts's in-flight coalescing does not fully consume rejections).
    const hiddenModelsByProvider = getHiddenModelsByProvider();
    let settings: Record<string, any> = {};
    try {
      settings = await getSettings();
    } catch {}

    const authRejection = await getModelCatalogAuthRejection(request, settings, {
      ...corsHeaders,
      ...diagnosticHeaders,
    });
    if (authRejection) return authRejection;

    // #9147: yield after auth check before DB initialization prologue
    await yieldCatalogBuildTurn();

    const capabilityResolutionSnapshot = createModelCapabilityResolutionSnapshot();
    const { aliasToProviderId, providerIdToAlias } = buildAliasMaps();
    const _qp = new URL(request.url).searchParams.get("prefix");
    const prefixMode =
      _qp === "alias" || _qp === "canonical" || _qp === "dual" ? _qp : getModelsCatalogPrefixMode();
    const includeAlias = prefixMode !== "canonical";
    const includeCanonical = prefixMode !== "alias";
    const resolveCanonicalProviderId = (aliasOrProviderId: string, fallbackProviderId?: string) =>
      resolveCanonicalProviderIdFromMaps(aliasToProviderId, aliasOrProviderId, fallbackProviderId);
    const aliasMaps = { aliasToProviderId, providerIdToAlias };
    // Issue #96: Allow blocking specific providers from the models list
    const blockedProviders = normalizeBlockedProviderSet(settings.blockedProviders);
    // #6316: Opt-in filter — hide paid-only models via `isFreeModel()`. Only applied to
    // PROVIDER_MODELS + OpenRouter loops (where pricing metadata / :free suffix / catalog
    // membership is available). Modality registries (embedding/image/rerank/audio/
    // moderation/video/music) represent local capabilities without pricing, so they are
    // exempt. Combos + auto/* + synced/custom/alias-backed rows also stay unfiltered —
    // extending v1 scope to those requires per-entry pricing lookup not available today.
    const hidePaid = settings.hidePaidModels === true;
    // #9418: Opt-in filter — skip the entire auto/* synthesis loop when the operator
    // does not want built-in virtual combos advertised in the catalog. User-defined
    // combos are unaffected; routing still works for ids sent explicitly.
    // #10831: also drop them when auto routing is switched off. Unlike
    // hideAutoCombos — which only unadvertises ids that still route when sent
    // explicitly — a disabled router rejects every auto/* id with a 400, so
    // listing them offers the client a choice that cannot succeed.
    const hideAuto = settings.hideAutoCombos === true || settings.autoRoutingEnabled === false;
    const shouldHidePaid = (
      providerKey: string,
      modelId: string,
      pricing?: unknown,
      isFree?: boolean
    ): boolean => {
      if (!hidePaid) return false;
      const provider = aliasToProviderId[providerKey] || providerKey;
      // isFree:true is the first door — custom row kept even when its provider is outside FREE_MODEL_BUDGETS.
      if (isFreeModel(provider, { id: modelId, pricing: pricing as any, isFree })) return false;
      // hidePaid is on and model is non-free → hidden. No need to consult FREE_MODEL_BUDGETS
      // separately: paid on a free-capable provider stays hidden, free on a non-budget provider
      // already returned above.
      return true;
    };
    // #11481: opt-in explicit model exposure allow/deny list — same call sites
    // as shouldHidePaid above (mirrored into the auto/* combo candidate pool
    // via open-sse/services/autoCombo/modelExposureFilter.ts, per #6512's
    // catalog-only-filter-leaks-into-combo-routing lesson). Independent of
    // hidePaidModels — operator curation, not a cost signal.
    const shouldHideByExposure = (providerKey: string, modelId: string): boolean =>
      !isModelExposureAllowed(aliasToProviderId[providerKey] || providerKey, modelId, settings);

    // Get active provider connections
    let connections = [];
    let totalConnectionCount = 0; // Track if DB has ANY connections (even disabled)
    try {
      connections = (await getCachedRawProviderConnections()).map(createLazyConnectionView);
      totalConnectionCount = connections.length;
      // Filter to only active connections
      connections = connections.filter((c) => c.isActive !== false);
    } catch (e) {
      // If database not available, show no provider models (safe default)
      console.log("[catalog] Could not fetch providers:", e);
    }

    // Get provider nodes (for compatible providers with custom prefixes)
    let providerNodes = [];
    try {
      providerNodes = await getCachedProviderNodes();
    } catch (e) {
      console.log("Could not fetch provider nodes");
    }

    // Build map of provider node ID to prefix and type for compatible providers
    const providerIdToPrefix: Record<string, string> = {};
    const providerNodeIdByPrefix: Record<string, string> = {};
    const nodeIdToProviderType: Record<string, string> = {};
    for (const node of providerNodes) {
      const resolvedPrefix =
        node.prefix?.trim() ||
        node.name
          ?.trim()
          ?.toLowerCase()
          ?.replace(/\s+/g, "-")
          ?.replace(/[^a-z0-9-]/g, "") ||
        null;
      if (resolvedPrefix) {
        providerIdToPrefix[node.id] = resolvedPrefix;
      }
      if (node.type) {
        nodeIdToProviderType[node.id] = node.type;
      }
    }
    for (const prefix of new Set(Object.values(providerIdToPrefix))) {
      if (isProviderNodePrefixReserved(prefix)) continue;
      const winner = selectCompatibleNodeForPrefix(providerNodes, prefix);
      if (winner?.id) providerNodeIdByPrefix[prefix] = winner.id;
    }

    // #8327: `resolveCanonicalProviderId`/`canonicalProviderId` only know the static
    // AI_PROVIDERS/PROVIDER_MODELS alias maps, so a compatible-provider node (whose raw
    // `id` is an internal UUID, never present in those static maps) falls through every
    // lookup and returns the raw UUID verbatim. That UUID is still required for the
    // internal registry/connection/hidden-model lookups that key off `canonicalProviderId`
    // (getConnectionsForProvider, getModelIsHidden, etc. are keyed by the raw node id, not
    // the prefix) — so `canonicalProviderId` itself must stay untouched. What must NOT leak
    // is the raw UUID in the *public* `owned_by` field: resolve it to the operator's
    // configured prefix there, and only there.
    const resolvePublicOwnerId = (providerId: string, canonicalProviderId: string): string =>
      providerIdToPrefix[providerId] || canonicalProviderId;

    // #11300: the visibility toggle on a provider's dashboard page persists the
    // hidden-model row under whatever key the route's `[id]` param happened to be
    // (a node UUID, an alias like `cc`/`gh`/`cx`, or a canonical provider id) —
    // see `PATCH /api/provider-models`. The catalog loops below each key their own
    // lookup differently (raw connection provider, canonical id, or alias), so a
    // single-key lookup missed the override whenever the write key and the read key
    // diverged. Check every key a model could plausibly have been hidden under:
    // the raw key passed in, its resolved canonical provider id, that canonical id's
    // alias, and the compatible-provider-node prefix for either.
    const isModelHiddenBulk = (
      providerKey: string | null | undefined,
      modelId: string,
      canonicalProviderId?: string | null
    ): boolean => {
      if (!providerKey || !modelId) return false;
      const canonical = canonicalProviderId || resolveCanonicalProviderId(providerKey);
      const alias = providerIdToAlias[canonical] || providerIdToAlias[providerKey] || undefined;
      const nodePrefix = providerIdToPrefix[providerKey] || providerIdToPrefix[canonical];
      const keysToCheck = [providerKey, canonical, alias, nodePrefix].filter((k): k is string =>
        Boolean(k)
      );
      for (const key of keysToCheck) {
        const hiddenSet = hiddenModelsByProvider.get(key);
        if (hiddenSet?.has(modelId)) return true;
      }
      return false;
    };

    // Get combos
    let combos = [];
    await yieldCatalogBuildTurn();
    try {
      combos = await getCombos();
    } catch (e) {
      console.log("Could not fetch combos");
    }

    // Build set of active provider aliases
    const activeAliases = new Set();
    const connectionsByProvider = new Map<string, typeof connections>();
    const registerConnectionKey = (
      key: string | null | undefined,
      connection: (typeof connections)[number]
    ) => {
      if (!key) return;
      const existing = connectionsByProvider.get(key) || [];
      existing.push(connection);
      connectionsByProvider.set(key, existing);
    };
    for (const conn of connections) {
      const alias = providerIdToAlias[conn.provider] || conn.provider;
      activeAliases.add(alias);
      activeAliases.add(conn.provider);
      registerConnectionKey(alias, conn);
      registerConnectionKey(conn.provider, conn);
    }

    // noAuth providers have no DB rows; settings.blockedProviders disables them.
    for (const p of Object.values(NOAUTH_PROVIDERS)) {
      if (isNoAuthProviderBlocked(blockedProviders, p.id, "alias" in p ? p.alias : null)) continue;
      activeAliases.add(p.id);
      if ("alias" in p && typeof p.alias === "string") activeAliases.add(p.alias);
    }

    // #9147 follow-up: this is called ~1-3x per model at catalog scale (providerSupportsModel,
    // isExcludedByProviderConnections). Connections do not change mid-build, so memoize per
    // unique (unordered) key-set instead of rescanning connectionsByProvider on every call —
    // otherwise the O(models) hot loop regains an O(connections) cost per model and blows the
    // single-stretch event-loop budget this file's own yield mechanism is meant to protect.
    const connectionsForProviderCache = new Map<string, typeof connections>();
    const getConnectionsForProvider = (...keys: Array<string | null | undefined>) => {
      const cacheKey = keys
        .filter((k): k is string => Boolean(k))
        .sort()
        .join("\u0000");
      const cached = connectionsForProviderCache.get(cacheKey);
      if (cached) return cached;
      const seen = new Set<string>();
      const collected: typeof connections = [];
      for (const key of keys) {
        if (!key) continue;
        for (const connection of connectionsByProvider.get(key) || []) {
          if (!connection?.id || seen.has(connection.id)) continue;
          seen.add(connection.id);
          collected.push(connection);
        }
      }
      connectionsForProviderCache.set(cacheKey, collected);
      return collected;
    };

    // Health-check exclusions (provider_specific_data.excludedModels) are enforced
    // at request time in getProviderCredentials(); mirror the same rule in the
    // catalog so ghost models do not appear as available. A model is hidden when
    // the provider HAS connections but NONE of them is eligible for it.
    const isExcludedByProviderConnections = (providerKey: string, modelId: string) => {
      const providerId = aliasToProviderId[providerKey] || providerKey;
      const alias = providerIdToAlias[providerId] || providerKey;
      const providerConnections = getConnectionsForProvider(providerId, alias, providerKey);
      if (providerConnections.length === 0) return false; // noAuth / no DB row: keep
      return !hasEligibleConnectionForModel(providerConnections, modelId);
    };

    const providerSupportsModel = (providerKey: string, modelId: string) => {
      const providerId = aliasToProviderId[providerKey] || providerKey;
      const alias = providerIdToAlias[providerId] || providerKey;
      // noAuth providers have no connection rows — treat every model as eligible. (#2798)
      const isNoAuth = isNoAuthProviderKey(providerId, providerKey, alias);
      if (isNoAuth && !isNoAuthProviderBlocked(blockedProviders, providerId, providerKey, alias))
        return true;
      return hasEligibleConnectionForModel(
        getConnectionsForProvider(providerKey, providerId, alias),
        modelId
      );
    };

    const getRegistryModel = (providerId: string, modelId: string) => {
      const alias = providerIdToAlias[providerId] || PROVIDER_ID_TO_ALIAS[providerId] || providerId;
      const providerModels = PROVIDER_MODELS[alias] || PROVIDER_MODELS[providerId] || [];
      return providerModels.find((model) => model?.id === modelId) || null;
    };

    // prefixRoutesToProvider is imported directly from catalogProviderMaps.ts (no
    // map dependency — pure parseModel() probe), used both here and at the two
    // includeCanonical prefix-collision checks below.
    const getProviderPrefixes = (providerId: string, rawProvider: string) =>
      getProviderPrefixesFromMaps(aliasMaps, providerId, rawProvider);

    const getComboTargetModelId = (target: ComboCatalogTarget) => {
      const resolved = getComboTargetModelIdFromMaps(aliasMaps, target);
      if (!resolved) return null;
      const nodeId = providerNodeIdByPrefix[resolved.providerId];
      return nodeId ? { ...resolved, providerId: nodeId } : resolved;
    };

    const resolvedComboTargets = combos.flatMap(
      (combo) =>
        resolveNestedComboTargets(
          combo as Parameters<typeof resolveNestedComboTargets>[0],
          combos as Parameters<typeof resolveNestedComboTargets>[1]
        ) as ComboCatalogTarget[]
    );
    const comboProviderIds = new Set(
      resolvedComboTargets.flatMap((target) => {
        const resolved = getComboTargetModelId(target);
        return resolved ? [resolved.providerId] : [];
      })
    );
    const comboSyncedModelsByProvider = new Map<string, ConnectionScopedReasoningCatalog | null>();
    await Promise.all(
      [...comboProviderIds].map(async (providerId) => {
        try {
          const byConnection = await getSyncedAvailableModelsByConnection(providerId);
          comboSyncedModelsByProvider.set(
            providerId,
            byConnection[SYNCED_AVAILABLE_MODELS_MALFORMED] ? null : byConnection
          );
        } catch {
          // Unknown connection-scoped capability evidence must never broaden a combo.
          comboSyncedModelsByProvider.set(providerId, null);
        }
      })
    );

    const getComboTargetCatalogMetadata = (
      target: ComboCatalogTarget
    ): ComboTargetCatalogMetadata | null => {
      const targetModel = getComboTargetModelId(target);
      if (!targetModel) return null;

      const canonical = getCanonicalModelMetadata({
        provider: targetModel.providerId,
        model: targetModel.modelId,
        snapshot: capabilityResolutionSnapshot,
      });
      if (!canonical) return null;

      const providerId = canonical.provider || targetModel.providerId;
      const modelId = canonical.model || targetModel.modelId;
      const providerAlias = providerIdToAlias[providerId] || PROVIDER_ID_TO_ALIAS[providerId];
      const allProviderConnections = getConnectionsForProvider(
        providerId,
        providerAlias,
        targetModel.providerId
      );
      const providerConnections = allProviderConnections.filter((connection) =>
        hasEligibleConnectionForModel([connection], modelId)
      );
      const hasExplicitConnectionScope =
        Boolean(target.connectionId) || Boolean(target.allowedConnectionIds?.length);
      const eligibleConnectionIds =
        allProviderConnections.length > 0 || hasExplicitConnectionScope
          ? providerConnections.map((connection) => connection.id)
          : undefined;
      const source = canonical.metadata.source;
      const connectionCatalog = comboSyncedModelsByProvider.get(providerId);
      // A `reasoning_efforts` model-capability override is operator-declared,
      // provider-scoped authoritative evidence — it must win over (and never be
      // silently dropped by) the per-connection synced-catalog fail-closed scan
      // below, or the override would apply in the direct catalog but vanish from
      // combo `effort_tiers`.
      const connectionEfforts = source.reasoningEffortsOverride
        ? canonical.capabilities.supportedThinkingEfforts
          ? [...canonical.capabilities.supportedThinkingEfforts]
          : []
        : connectionCatalog === null
          ? []
          : getConnectionScopedEffortTiers(
              modelId,
              target,
              eligibleConnectionIds,
              connectionCatalog || {},
              getRegistryModelThinkingEfforts(providerId, modelId),
              getRegistryThinkingEfforts(providerId, modelId)
            );
      if (
        connectionEfforts === undefined &&
        !source.providerRegistry &&
        !source.staticSpec &&
        !source.syncedCapability &&
        !source.reasoningEffortsOverride
      ) {
        return null;
      }

      const synced = getSyncedCapability(providerId, modelId);
      const spec = getModelSpec(modelId);
      const registryModel = getRegistryModel(providerId, modelId);
      const syncedInputModalities = parseJsonStringArray(synced?.modalities_input);
      const syncedOutputModalities = parseJsonStringArray(synced?.modalities_output);

      const contextLength = getSourcedTokenLimit(
        providerId,
        modelId,
        canonical.limits.contextWindow
      );
      const maxInputTokens = isPositiveFiniteNumber(canonical.limits.maxInputTokens)
        ? canonical.limits.maxInputTokens
        : contextLength;
      const maxOutputTokens = isPositiveFiniteNumber(synced?.limit_output)
        ? synced.limit_output
        : isPositiveFiniteNumber(spec?.maxOutputTokens)
          ? spec.maxOutputTokens
          : undefined;

      const syncedVision =
        typeof synced?.attachment === "boolean"
          ? synced.attachment
          : syncedInputModalities.length > 0 || syncedOutputModalities.length > 0
            ? [...syncedInputModalities, ...syncedOutputModalities].some((entry) =>
                // eslint-disable-next-line no-restricted-syntax -- teknik string kontrolü, kullanıcı metni araması değil
                entry.toLowerCase().includes("image")
              )
            : undefined;
      const registryVision =
        typeof registryModel?.supportsVision === "boolean"
          ? registryModel.supportsVision
          : undefined;
      const specVision =
        typeof spec?.supportsVision === "boolean" ? spec.supportsVision : undefined;
      const knownVision = syncedVision ?? registryVision ?? specVision;

      const inputModalities =
        syncedInputModalities.length > 0
          ? syncedInputModalities
          : knownVision === true
            ? ["text", "image"]
            : undefined;
      const outputModalities =
        syncedOutputModalities.length > 0
          ? syncedOutputModalities
          : knownVision === true
            ? ["text"]
            : undefined;

      const capabilities: Record<string, boolean | string[]> = {};
      capabilities.tool_calling = canonical.capabilities.toolCalling;
      capabilities.reasoning = canonical.capabilities.reasoning;
      if (typeof canonical.capabilities.vision === "boolean") {
        capabilities.vision = canonical.capabilities.vision;
      }
      if (typeof canonical.capabilities.attachment === "boolean") {
        capabilities.attachment = canonical.capabilities.attachment;
      }
      if (typeof canonical.capabilities.structuredOutput === "boolean") {
        capabilities.structured_output = canonical.capabilities.structuredOutput;
      }
      if (typeof canonical.capabilities.temperature === "boolean") {
        capabilities.temperature = canonical.capabilities.temperature;
      }
      Object.assign(
        capabilities,
        connectionEfforts === undefined
          ? getThinkingCapabilityFields(
              providerId,
              modelId,
              canonical.capabilities.supportsThinking,
              getRegistryThinkingEfforts(providerId, modelId),
              true
            )
          : getThinkingCapabilityFields(
              providerId,
              modelId,
              connectionEfforts.length > 0 ? true : canonical.capabilities.supportsThinking,
              connectionEfforts,
              true
            )
      );

      return {
        ...(contextLength ? { contextLength } : {}),
        ...(maxInputTokens ? { maxInputTokens } : {}),
        ...(maxOutputTokens ? { maxOutputTokens } : {}),
        ...(inputModalities && inputModalities.length > 0 ? { inputModalities } : {}),
        ...(outputModalities && outputModalities.length > 0 ? { outputModalities } : {}),
        capabilities,
      };
    };

    const buildComboCatalogMetadata = (
      combo: Parameters<typeof resolveNestedComboTargets>[0],
      targets: ComboCatalogTarget[]
    ) => {
      const explicitContextLength = isPositiveFiniteNumber(combo.context_length)
        ? combo.context_length
        : undefined;

      const baseMetadata = explicitContextLength ? { context_length: explicitContextLength } : {};
      if (targets.length === 0) return baseMetadata;

      const targetMetadata = targets.map((target) => getComboTargetCatalogMetadata(target));

      const knownMetadata = targetMetadata.filter(
        (metadata): metadata is ComboTargetCatalogMetadata => metadata !== null
      );
      if (knownMetadata.length === 0) return baseMetadata;
      const contextLength =
        explicitContextLength ??
        minKnownNumber(knownMetadata.map((metadata) => metadata.contextLength));
      const maxInputTokens = minKnownNumber(
        knownMetadata.map((metadata) => metadata.maxInputTokens)
      );
      const maxOutputTokens = minKnownNumber(
        knownMetadata.map((metadata) => metadata.maxOutputTokens)
      );

      const inputModalities = knownMetadata.every(
        (metadata) => Array.isArray(metadata.inputModalities) && metadata.inputModalities.length > 0
      )
        ? intersectStringArrays(knownMetadata.map((metadata) => metadata.inputModalities || []))
        : [];
      const outputModalities = knownMetadata.every(
        (metadata) =>
          Array.isArray(metadata.outputModalities) && metadata.outputModalities.length > 0
      )
        ? intersectStringArrays(knownMetadata.map((metadata) => metadata.outputModalities || []))
        : [];

      const capabilities = mergeComboCapabilities(knownMetadata);
      if (targetMetadata.some((metadata) => metadata === null)) {
        delete capabilities.effort_tiers;
      }

      return {
        ...baseMetadata,
        ...(contextLength ? { context_length: contextLength } : {}),
        ...(maxInputTokens ? { max_input_tokens: maxInputTokens } : {}),
        ...(maxOutputTokens ? { max_output_tokens: maxOutputTokens } : {}),
        ...(inputModalities.length > 0 ? { input_modalities: inputModalities } : {}),
        ...(outputModalities.length > 0 ? { output_modalities: outputModalities } : {}),
        ...(Object.keys(capabilities).length > 0 ? { capabilities } : {}),
      };
    };

    // Collect models from active providers (or all if none active)
    const models = [];
    const timestamp = Math.floor(Date.now() / 1000);
    const listedIds = new Set<string>();

    // #8770 follow-up: a quota-exclusive key (allowedQuotas non-empty) only ever
    // receives the pool's `qtSd/*` combos — the key-permission step further down
    // discards the entire catalog for it. Building that catalog first costs ~1.2s
    // of CPU on a 1 vCPU host (measured), enough for Claude Code's 3s gateway model
    // discovery to time out under contention, and every byte of it is thrown away.
    // Everything the quota path needs (`combos`, `timestamp`,
    // `buildComboCatalogMetadata`) already exists here, so return before the
    // provider/auto-combo/registry loops start.
    const earlyApiKey = extractApiKey(request);
    if (earlyApiKey) {
      const { getApiKeyMetadata } = await import("@/lib/db/apiKeys");
      const earlyKeyMeta = await getApiKeyMetadata(earlyApiKey);
      if (earlyKeyMeta?.allowedQuotas && earlyKeyMeta.allowedQuotas.length > 0) {
        const { buildQuotaExclusiveModels } = await import("@/lib/quota/quotaCombos");
        const quotaModels = await buildQuotaExclusiveModels(
          earlyKeyMeta.allowedQuotas,
          combos,
          timestamp,
          (c) => buildComboCatalogMetadata(c, combos)
        );
        const quotaFinal = await applyCatalogPostFilters(request, quotaModels, {
          connections,
          prefixMode,
          aliasToProviderId,
          hideNoThinkVariants: settings.hideNoThinkVariants === true,
        });
        return finalizeCatalogResponse(request, quotaFinal, () => undefined, {
          ...corsHeaders,
          ...diagnosticHeaders,
        });
      }
    }

    // #4164: advertise the built-in zero-setup `auto/*` combos at the very top.
    // #4189: enrich each with the combo's advertised context/output limits (computed
    // by createBuiltinAutoCombo from its candidate pool) + baseline capabilities, so
    // OpenAI-compatible clients that build their picker from /v1/models (e.g. Hermes)
    // receive token metadata before the first request instead of a bare entry. If the
    // combo cannot be materialized (e.g. no eligible connections yet) the minimal
    // #4164 entry is emitted instead, so the id is never dropped.
    // #4235 Phase B: also advertise the curated `auto/<category>[:<tier>]` combos.
    // #6453: also advertise the `auto/<family>` combos (auto/glm, auto/minimax, ...).
    // #9199: prepare the shared connection/settings/registry candidate snapshot once for this
    // catalog build. Runtime auto routing still prepares fresh request-scoped inputs.
    let preparedAutoInputs: Awaited<ReturnType<typeof prepareBuiltinAutoComboInputs>> | undefined;
    let materializedAutoCount = 0;
    for (const autoId of [
      ...Object.keys(AUTO_TEMPLATE_VARIANTS),
      ...AUTO_SUFFIX_VARIANTS,
      ...AUTO_FAMILY_IDS,
    ]) {
      // #9418: skip the entire loop when hideAutoCombos is on — the ids are still
      // routable when sent explicitly, just not advertised in the catalog.
      if (hideAuto) break;
      if (blockedProviders.has("auto") || listedIds.has(autoId)) continue; // #5192
      // #6328 (follow-up to #6495 / #6512): REMOVE — not just hide — paid-tier
      // auto/* ids (auto/pro-* + auto/*:pro) from the advertised catalog when the
      // operator opts into hidePaidModels. The candidate-pool filter in
      // virtualFactory (#6512) still gates request-time routing for the rest.
      if (hidePaid && isPaidTierAutoId(autoId)) continue;
      listedIds.add(autoId);
      const baseAutoEntry = {
        id: autoId,
        object: "model",
        created: timestamp,
        owned_by: "combo",
        permission: [],
        root: autoId,
        parent: null,
      };
      try {
        const suffix = autoId.replace(/^auto\/?/, "");
        if (!preparedAutoInputs) {
          preparedAutoInputs = await prepareBuiltinAutoComboInputs(capabilityResolutionSnapshot);
          await yieldCatalogBuildTurn();
        }
        const virtualCombo = await createBuiltinAutoCombo(autoId, suffix, preparedAutoInputs);
        const contextLength = virtualCombo.advertisedContextLength || 128000;
        const maxOutputTokens = virtualCombo.advertisedMaxOutputTokens || 8192;

        // #11947: derive modalities and vision from the effective target pool so
        // OpenAI-compatible clients can detect vision support for auto/* combos.
        const autoTargets: ComboCatalogTarget[] = virtualCombo.models.map((m) => ({
          modelStr: m.model,
          providerId: m.providerId,
          connectionId: m.connectionId,
          ...(m.allowedConnectionIds ? { allowedConnectionIds: m.allowedConnectionIds } : {}),
        }));
        const autoTargetMetadata = autoTargets.map((t) => getComboTargetCatalogMetadata(t));
        const knownAutoMeta = autoTargetMetadata.filter(
          (m): m is ComboTargetCatalogMetadata => m !== null
        );
        const autoInputModalities =
          knownAutoMeta.length > 0 &&
          knownAutoMeta.every(
            (m) => Array.isArray(m.inputModalities) && m.inputModalities.length > 0
          )
            ? intersectStringArrays(knownAutoMeta.map((m) => m.inputModalities || []))
            : [];
        const autoOutputModalities =
          knownAutoMeta.length > 0 &&
          knownAutoMeta.every(
            (m) => Array.isArray(m.outputModalities) && m.outputModalities.length > 0
          )
            ? intersectStringArrays(knownAutoMeta.map((m) => m.outputModalities || []))
            : [];
        const autoCapabilities: Record<string, boolean | string[]> = {
          tool_calling: true,
          reasoning: true,
          thinking: true,
          temperature: true,
        };
        if (knownAutoMeta.length > 0) {
          const allVision = knownAutoMeta.every((m) => m.capabilities.vision === true);
          if (allVision) autoCapabilities.vision = true;
        }

        models.push({
          ...baseAutoEntry,
          context_length: contextLength,
          max_input_tokens: contextLength,
          max_output_tokens: maxOutputTokens,
          ...(autoInputModalities.length > 0 ? { input_modalities: autoInputModalities } : {}),
          ...(autoOutputModalities.length > 0 ? { output_modalities: autoOutputModalities } : {}),
          capabilities: autoCapabilities,
        });
      } catch (err) {
        console.log(`[catalog] Could not materialize built-in auto model ${autoId}:`, err);
        models.push(baseAutoEntry);
      }

      materializedAutoCount++;
      if (materializedAutoCount % BUILTIN_AUTO_YIELD_INTERVAL === 0) {
        await yieldCatalogBuildTurn();
      }
    }

    // Add combos first (they appear at the top) — only active ones
    for (const combo of combos) {
      if (combo.isActive === false || combo.isHidden === true) continue;
      if (typeof combo.name !== "string" || combo.name.length === 0) continue;
      if (listedIds.has(combo.name)) continue; // #4164: don't shadow a built-in auto/* id

      // Skip combos whose any underlying target model is hidden
      const comboTargets = resolveNestedComboTargets(
        combo as Parameters<typeof resolveNestedComboTargets>[0],
        combos as Parameters<typeof resolveNestedComboTargets>[1]
      ) as ComboCatalogTarget[];
      const visibleTargets = comboTargets.filter((target) => {
        const resolved = getComboTargetModelId(target);
        return resolved ? !isModelHiddenBulk(resolved.providerId, resolved.modelId) : true;
      });
      if (visibleTargets.length === 0) continue;

      const comboMetadata = buildComboCatalogMetadata(combo, visibleTargets);

      listedIds.add(combo.name);
      models.push({
        id: combo.name,
        object: "model",
        created: timestamp,
        owned_by: "combo",
        permission: [],
        root: combo.name,
        parent: null,
        ...comboMetadata,
      });

      // #9147: combos can number hundreds at catalog scale — yield periodically.
      await maybeYieldCatalogBuild();
    }

    let syncedModelsByProvider: Record<string, SyncedAvailableModel[]> = {};
    try {
      await yieldCatalogBuildTurn();
      syncedModelsByProvider = await getAllActiveSyncedModels();
      await yieldCatalogBuildTurn();
    } catch (e) {
      // DB unavailable — log and fall through; static models remain as defaults.
      console.log("[catalog] Could not fetch synced available models:", e);
    }
    const providersWithSyncedModels = new Set(
      Object.keys(syncedModelsByProvider).filter((pid) => {
        if (providerUsesCuratedModelsOnly(pid)) return false;
        const models = syncedModelsByProvider[pid];
        return (
          Array.isArray(models) &&
          models.some((model) => isUnifiedChatSourceModelSelectable(pid, model))
        );
      })
    );
    const isRegisteredEffortVariant = (
      providerModels: Array<{ id: string }>,
      modelId: string
    ): boolean => {
      for (const suffix of ["none", "low", "medium", "high", "max", "xhigh"]) {
        const suffixWithSeparator = `-${suffix}`;
        if (!modelId.endsWith(suffixWithSeparator)) continue;
        const baseModelId = modelId.slice(0, -suffixWithSeparator.length);
        return providerModels.some((candidate) => candidate.id === baseModelId);
      }
      return false;
    };

    // Map canonical provider id -> set of synced display-model ids, so the static
    // loop below can decide which static models a provider's synced discovery list
    // actually covers (and which static models it must preserve).
    const syncedModelIdsByCanonicalProvider = buildSyncedModelIdsByCanonicalProvider(
      syncedModelsByProvider,
      resolveCanonicalProviderId,
      providerIdToPrefix,
      providerIdToAlias
    );

    // Add provider models (chat)
    for (const [alias, providerModels] of Object.entries(PROVIDER_MODELS)) {
      const providerId = aliasToProviderId[alias] || alias;
      const canonicalProviderId = resolveCanonicalProviderId(alias, providerId);

      if (
        isNoAuthProviderBlocked(blockedProviders, canonicalProviderId, alias) ||
        blockedProviders.has(alias) ||
        blockedProviders.has(canonicalProviderId)
      )
        continue;
      if (isNoAuthRawProviderPrefix(canonicalProviderId, alias)) continue;

      if (!activeAliases.has(alias) && !activeAliases.has(canonicalProviderId)) {
        continue;
      }

      for (const model of providerModels) {
        // Synced models replace static base entries they COVER, but they do not
        // carry aliases registered for provider-specific reasoning variants, and
        // static models the synced list does NOT cover must be preserved (the
        // gateway still routes them — e.g. command-code's static
        // `deepseek/deepseek-v4-flash` which its discovery never lists). Before
        // the fix, a provider with any synced model silently dropped ALL its
        // static models.
        //
        // An authoritative active synced catalog replaces the static registry.
        // Partial discovery providers still use exact-id coverage suppression so
        // their intentionally omitted static routes remain available.
        const syncedForProvider = syncedModelIdsByCanonicalProvider.get(canonicalProviderId);
        const exclusiveListing =
          providerUsesExclusiveSyncedListing(canonicalProviderId) ||
          providerUsesAuthoritativeLiveCatalog(canonicalProviderId);
        const providerHasSynced = syncedForProvider !== undefined && syncedForProvider.size > 0;
        const coveredBySynced = shouldSuppressStaticModelForExclusiveListing({
          exclusiveListing,
          providerHasSynced,
          staticModelId: model.id,
          syncedModelIds: syncedForProvider ? [...syncedForProvider] : [],
        });
        const hasDeclaredEffortTiers =
          Array.isArray(model.supportedThinkingEfforts) &&
          model.supportedThinkingEfforts.length > 0;
        if (
          coveredBySynced &&
          (exclusiveListing ||
            (!isRegisteredEffortVariant(providerModels, model.id) && !hasDeclaredEffortTiers))
        )
          continue;
        if (!isModelSelectable(canonicalProviderId, model.id)) continue;
        if (!providerSupportsModel(canonicalProviderId, model.id)) continue;
        const aliasId = `${alias}/${model.id}`;
        if (isModelHiddenBulk(alias, model.id, canonicalProviderId)) continue;
        if (isExcludedByProviderConnections(canonicalProviderId, model.id)) continue;
        if (shouldHidePaid(canonicalProviderId, model.id, (model as { pricing?: unknown }).pricing))
          continue;
        if (shouldHideByExposure(canonicalProviderId, model.id)) continue;

        const visionFields =
          getVisionCapabilityFields(aliasId) || getVisionCapabilityFields(model.id);
        const thinkingFields = getThinkingCapabilityFields(
          canonicalProviderId,
          model.id,
          model.supportsReasoning,
          model.supportedThinkingEfforts,
          // Skip the canonical fallback for static models without declared tiers —
          // otherwise the catalog synthesizes unresolvable `<prefix>/<model>-{tier}`
          // ids for every static reasoning model across all providers (#9485 review).
          !hasDeclaredEffortTiers
        );
        const thinkingCapabilities =
          Object.keys(thinkingFields).length > 0 ? { capabilities: thinkingFields } : {};
        // #12058: a self-aliased provider (registry `alias` undefined or equal to its
        // own id — antigravity, agy, most built-ins) has a single id form, so its
        // alias row IS its canonical row. Emit it in canonical mode too; the
        // canonical branch below still skips it (`canonicalProviderId !== alias`),
        // so dual mode cannot double up. Same class as #11832 (custom nodes,
        // PR #11918), which only widened the synced/custom/alias-backed loops.
        const selfAliased = canonicalProviderId === alias;
        if (includeAlias || selfAliased) {
          models.push({
            id: aliasId,
            object: "model",
            created: timestamp,
            owned_by: canonicalProviderId,
            permission: [],
            root: model.id,
            parent: null,
            ...(visionFields || {}),
            ...thinkingFields,
            ...thinkingCapabilities,
          });
        }
        if (
          includeCanonical &&
          canonicalProviderId !== alias &&
          !isNoAuthProviderKey(canonicalProviderId) &&
          prefixRoutesToProvider(canonicalProviderId, canonicalProviderId)
        ) {
          const providerIdModel = `${canonicalProviderId}/${model.id}`;
          const providerVisionFields =
            getVisionCapabilityFields(providerIdModel) || getVisionCapabilityFields(model.id);
          models.push({
            id: providerIdModel,
            object: "model",
            created: timestamp,
            owned_by: canonicalProviderId,
            permission: [],
            root: model.id,
            parent: includeAlias ? aliasId : null,
            ...(providerVisionFields || {}),
            ...thinkingFields,
            ...thinkingCapabilities,
          });
        }

        // #9147: static model walk is the densest loop — yield periodically.
        await maybeYieldCatalogBuild();
      }
    }

    for (const modelId of CODEX_NATIVE_UNPREFIXED_MODELS) {
      if (!providerSupportsModel("codex", modelId)) continue;
      // #11300: a codex-native unprefixed model can also be hidden via the
      // `openai` provider page (codex runs on the openai-compatible connection)
      // or via the `cx` alias — check all three so a hide from any of them
      // suppresses the bare model id here.
      if (isModelHiddenBulk("codex", modelId) || isModelHiddenBulk("openai", modelId)) continue;

      const alias = providerIdToAlias.codex || "cx";
      const aliasId = `${alias}/${modelId}`;
      const providerIdModel = `codex/${modelId}`;
      // #11632: honour the prefix-mode gates resolved at :303-307, like every
      // other emission loop (static :1022/:1036, synced :1203/:1236, custom
      // :1628/:1654, alias-backed :1746/:1758). Re-root the canonical row when
      // the alias row is suppressed, using the same `includeAlias ? aliasId :
      // null` idiom (:1052, :1246, :1667, :1776), so no surviving row points at
      // a suppressed predecessor. The bare id is the tail of the alias ->
      // canonical -> bare chain and only exists when both halves are emitted.
      const entries: Array<{ id: string; parent: string | null }> = [
        ...(includeAlias ? [{ id: aliasId, parent: null }] : []),
        ...(includeCanonical
          ? [{ id: providerIdModel, parent: includeAlias ? aliasId : null }]
          : []),
        ...(includeAlias && includeCanonical ? [{ id: modelId, parent: providerIdModel }] : []),
      ];

      for (const entry of entries) {
        if (models.some((existingModel) => existingModel.id === entry.id)) continue;
        models.push({
          id: entry.id,
          object: "model",
          created: timestamp,
          owned_by: "codex",
          permission: [],
          root: modelId,
          parent: entry.parent,
        });
      }
    }

    try {
      for (const [providerId, syncedModels] of Object.entries(syncedModelsByProvider)) {
        if (providerUsesCuratedModelsOnly(providerId)) continue;
        if (!Array.isArray(syncedModels) || syncedModels.length === 0) continue;
        if (blockedProviders.has(providerId)) continue;
        if (providerId === "reka") continue;

        const prefix = providerIdToPrefix[providerId];
        const alias = prefix || providerIdToAlias[providerId] || providerId;
        const canonicalProviderId = resolveCanonicalProviderId(alias, providerId);
        // #12058: see the static loop — the alias row is the only row here.
        const selfAliased = canonicalProviderId === alias;
        const parentProviderType = nodeIdToProviderType[providerId];

        if (
          !activeAliases.has(alias) &&
          !activeAliases.has(canonicalProviderId) &&
          !activeAliases.has(providerId) &&
          !(parentProviderType && activeAliases.has(parentProviderType))
        ) {
          continue;
        }

        for (const sm of providerUsesExclusiveSyncedListing(providerId)
          ? ensureCursorAutoCatalogEntry(
              syncedModels.map((row) => ({
                ...row,
                id: row.id,
                name: row.name || row.id,
                owned_by: "cursor",
              }))
            )
          : syncedModels) {
          if (!isUnifiedChatSourceModelSelectable(canonicalProviderId, sm)) continue;
          if (!providerSupportsModel(canonicalProviderId, sm.id)) continue;
          if (canonicalProviderId === "codex" && isCodexDiscoveryModelExcluded(sm)) {
            continue;
          }
          if (isModelHiddenBulk(providerId, sm.id, canonicalProviderId)) continue;
          if (isExcludedByProviderConnections(canonicalProviderId, sm.id)) continue;
          // #6457: some upstream discovery catalogs (e.g. HuggingFace's live
          // `/v1/models`) return image/diffusion models with no modality info,
          // so `endpoints` below would default to ["chat"] and misrepresent
          // them as chat-capable. Skip a registered image model only when its
          // synced metadata does not explicitly advertise a chat endpoint.
          // Multi-capability models may intentionally share an id between the
          // chat and image catalogs; getAllImageModels() adds the image entry.
          const explicitlySupportsChat = sm.supportedEndpoints?.some(
            (endpoint) => endpoint === "chat" || endpoint === "responses"
          );
          if (
            !explicitlySupportsChat &&
            (isRegisteredImageModel(canonicalProviderId, sm.id) ||
              isRegisteredImageModel(providerId, sm.id))
          ) {
            continue;
          }
          // #6328: apply hidePaidModels to synced provider rows too. Synced rows
          // rarely carry pricing metadata, so shouldHidePaid() keeps only
          // free-tier rows (catalog + isFree). Custom rows with isFree:true are
          // already exempt via the isFreeModel gate; other non-free synced rows
          // are hidden when hidePaid is on.
          if (shouldHidePaid(canonicalProviderId, sm.id, (sm as { pricing?: unknown }).pricing))
            continue;
          if (shouldHideByExposure(canonicalProviderId, sm.id)) continue;

          const registryEntry = REGISTRY[providerId];
          const displayModelId =
            registryEntry?.modelIdPrefix && sm.id.startsWith(registryEntry.modelIdPrefix)
              ? sm.id.slice(registryEntry.modelIdPrefix.length)
              : sm.id;

          const aliasId = `${alias}/${displayModelId}`;
          const endpoints = Array.isArray(sm.supportedEndpoints) ? sm.supportedEndpoints : ["chat"];
          const apiFormat = typeof sm.apiFormat === "string" ? sm.apiFormat : "chat-completions";
          const classification = classifyModelSupportedEndpoints(endpoints);
          const modelType = classification.type;
          // Same owned_by the alias/canonical entries below will carry — computed once
          // so the effort_tiers exclusion (codex/glm/kimi) and the entries agree.
          const syncedOwnedBy = resolvePublicOwnerId(providerId, canonicalProviderId);
          const syncedFields = {
            ...(modelType ? { type: modelType } : {}),
            ...(apiFormat !== "chat-completions" ? { api_format: apiFormat } : {}),
            ...(classification.subtype ? { subtype: classification.subtype } : {}),
            ...(sm.inputTokenLimit ? { context_length: sm.inputTokenLimit } : {}),
            ...(typeof sm.outputTokenLimit === "number"
              ? { max_output_tokens: sm.outputTokenLimit }
              : {}),
            ...(endpoints.length > 1 || !endpoints.includes("chat")
              ? { supported_endpoints: endpoints }
              : {}),
            // #4264/#7694: vision + reasoning-effort-tier flags captured at sync time,
            // merged into a single capabilities object (see ./syncedCapabilities.ts).
            // ownedBy gates effort_tiers off for codex/glm/kimi (own suffix mechanism).
            ...(buildSyncedCapabilities(sm, syncedOwnedBy)
              ? { capabilities: buildSyncedCapabilities(sm, syncedOwnedBy) }
              : {}),
          };

          const existingAliasModel = models.find((model) => model.id === aliasId);
          if (existingAliasModel) {
            const mergedCapabilities = mergeSyncedCapabilities(
              existingAliasModel.capabilities,
              sm,
              syncedOwnedBy
            );
            Object.assign(existingAliasModel, syncedFields);
            if (mergedCapabilities) existingAliasModel.capabilities = mergedCapabilities;
            continue;
          }

          if (includeAlias || Boolean(prefix) || selfAliased) {
            models.push({
              id: aliasId,
              object: "model",
              created: timestamp,
              owned_by: resolvePublicOwnerId(providerId, canonicalProviderId),
              permission: [],
              root: sm.id,
              parent: null,
              ...syncedFields,
            });
          }
          if ((includeAlias || Boolean(prefix)) && modelType === "audio") {
            models.push({
              id: aliasId,
              object: "model",
              created: timestamp,
              owned_by: resolvePublicOwnerId(providerId, canonicalProviderId),
              permission: [],
              root: sm.id,
              parent: null,
              type: "audio",
              subtype: "speech",
              ...(sm.inputTokenLimit ? { context_length: sm.inputTokenLimit } : {}),
              ...(typeof sm.outputTokenLimit === "number"
                ? { max_output_tokens: sm.outputTokenLimit }
                : {}),
              ...(endpoints.length > 1 || !endpoints.includes("chat")
                ? { supported_endpoints: endpoints }
                : {}),
            });
          }

          if (includeCanonical && canonicalProviderId !== alias && !prefix) {
            const providerPrefixedId = `${canonicalProviderId}/${displayModelId}`;
            if (!models.some((model) => model.id === providerPrefixedId)) {
              models.push({
                id: providerPrefixedId,
                object: "model",
                created: timestamp,
                owned_by: resolvePublicOwnerId(providerId, canonicalProviderId),
                permission: [],
                root: sm.id,
                parent: includeAlias ? aliasId : null,
                ...syncedFields,
              });
            }
          }

          // #9147: synced-model union is usually the largest walk — yield periodically.
          await maybeYieldCatalogBuild();
        }
      }
    } catch (err) {
      console.error("[catalog] Error fetching synced provider models:", err);
    }

    if (
      activeAliases.has("openrouter") &&
      !blockedProviders.has("openrouter") &&
      !providersWithSyncedModels.has("openrouter")
    ) {
      try {
        const openRouterCatalog = await getOpenRouterCatalog();
        for (const openRouterModel of openRouterCatalog.data || []) {
          if (!openRouterModel?.id || typeof openRouterModel.id !== "string") continue;
          const qualifiedId = qualifyOpenRouterModelId(openRouterModel.id);
          if (models.some((existingModel: any) => existingModel?.id === qualifiedId)) continue;

          const inputModalities = normalizeOpenRouterModalities(
            openRouterModel.architecture?.input_modalities
          );
          const outputModalities = normalizeOpenRouterModalities(
            openRouterModel.architecture?.output_modalities
          );
          const modelType = getOpenRouterModelType(inputModalities, outputModalities);
          const isFree = isOpenRouterFreeModel(openRouterModel);
          if (hidePaid && !isFree) continue;
          // #9293: respect per-model hidden flags (e.g. operator hid google/chirp-3
          // from the OpenRouter provider, so it should not appear in the live catalog).
          if (isModelHiddenBulk("openrouter", openRouterModel.id)) continue;
          const supportedParameters = Array.isArray(openRouterModel.supported_parameters)
            ? openRouterModel.supported_parameters
            : [];
          const capabilities: Record<string, boolean> = {};
          if (inputModalities.includes("image")) capabilities.vision = true;
          if (
            supportedParameters.includes("reasoning") ||
            supportedParameters.includes("include_reasoning")
          ) {
            capabilities.reasoning = true;
          }
          if (supportedParameters.includes("tools")) capabilities.tool_calling = true;
          if (
            supportedParameters.includes("structured_outputs") ||
            supportedParameters.includes("response_format")
          ) {
            capabilities.structured_output = true;
          }

          models.push({
            id: qualifiedId,
            object: "model",
            created: openRouterModel.created || timestamp,
            owned_by: "openrouter",
            permission: [],
            root: openRouterModel.id,
            parent: null,
            name: getOpenRouterDisplayName(openRouterModel),
            type: modelType,
            ...(isFree ? { free: true } : {}),
            ...(typeof openRouterModel.context_length === "number"
              ? { context_length: openRouterModel.context_length }
              : {}),
            ...(typeof openRouterModel.top_provider?.max_completion_tokens === "number"
              ? { max_output_tokens: openRouterModel.top_provider.max_completion_tokens }
              : {}),
            ...(inputModalities.length > 0 ? { input_modalities: inputModalities } : {}),
            ...(outputModalities.length > 0 ? { output_modalities: outputModalities } : {}),
            ...(Object.keys(capabilities).length > 0 ? { capabilities } : {}),
          });

          // #9147: OpenRouter catalog can be large — yield periodically.
          await maybeYieldCatalogBuild();
        }
      } catch (err) {
        console.error("[catalog] Error loading OpenRouter catalog:", err);
      }
    }

    // Helper: check if a provider is active (by provider id or alias)
    const isProviderActive = (provider: string) => {
      if (activeAliases.size === 0) return false; // No active connections = show nothing
      const alias = providerIdToAlias[provider] || provider;
      const canonicalProviderId = resolveCanonicalProviderId(alias, provider);

      // FIX #1752: Ensure blocked providers are not returned for non-chat models
      if (
        blockedProviders.has(alias) ||
        blockedProviders.has(canonicalProviderId) ||
        blockedProviders.has(provider)
      ) {
        return false;
      }

      return activeAliases.has(alias) || activeAliases.has(provider);
    };

    const findEquivalentSpecialtyModel = (
      providerId: string,
      rawModelId: string,
      type: string,
      scopedModelId: string
    ) =>
      models.find((model: any) => {
        if (model?.id === scopedModelId) return true;
        if (model?.owned_by !== providerId || model?.type !== type) return false;
        const existingRoot =
          typeof model?.root === "string"
            ? model.root
            : typeof model?.id === "string"
              ? model.id.split("/").pop()
              : null;
        return existingRoot === rawModelId;
      });

    const hasEquivalentSpecialtyModel = (
      providerId: string,
      rawModelId: string,
      type: string,
      scopedModelId: string
    ) => findEquivalentSpecialtyModel(providerId, rawModelId, type, scopedModelId) !== undefined;

    // Helper: strip the provider prefix from a specialty model ID to get the
    // provider-relative path (e.g. "openrouter/google/chirp-3" -> "google/chirp-3").
    // This is the correct key used by the hidden-model lookup — using .split("/").pop()
    // here would discard all but the last segment and miss stored flags for
    // providers whose model IDs carry a sub-path (e.g. OpenRouter scoped models).
    const getSpecialtyModelRelativeId = (modelId: string, provider: string): string =>
      modelId.startsWith(`${provider}/`) ? modelId.slice(provider.length + 1) : modelId;

    // Add embedding models (filtered by active providers)
    for (const embModel of getAllEmbeddingModels()) {
      if (!isProviderActive(embModel.provider)) continue;
      const rawModelId = getSpecialtyModelRelativeId(embModel.id, embModel.provider);
      if (!providerSupportsModel(embModel.provider, rawModelId)) continue;
      if (isModelHiddenBulk(embModel.provider, rawModelId)) continue;
      const existingEmbedding = findEquivalentSpecialtyModel(
        embModel.provider,
        rawModelId,
        "embedding",
        embModel.id
      );
      if (existingEmbedding) {
        // Discovery publishes no vector width, so the registry is the authority.
        if (embModel.dimensions !== undefined) {
          existingEmbedding.dimensions = embModel.dimensions;
        }
        // A provider that does not report its endpoints leaves the model unclassified. Being in
        // the embedding registry is that statement, so make it rather than leave it untyped.
        if (!existingEmbedding.type) {
          existingEmbedding.type = "embedding";
        }
        continue;
      }
      models.push({
        id: embModel.id,
        object: "model",
        created: timestamp,
        owned_by: embModel.provider,
        root: rawModelId,
        type: "embedding",
        dimensions: embModel.dimensions,
      });
    }

    // Add image models (filtered by active providers).
    // AI Horde image workers come and go — refresh the live detector first.
    if (isProviderActive("aihorde")) {
      try {
        await aiHordeImageCatalog.ensureFresh();
      } catch {
        // Keep the last good snapshot (or none) if Horde is unreachable.
      }
    }
    for (const imgModel of getAllImageModels()) {
      if (!isProviderActive(imgModel.provider)) continue;
      const rawModelId = getSpecialtyModelRelativeId(imgModel.id, imgModel.provider);
      if (!providerSupportsModel(imgModel.provider, rawModelId)) continue;
      if (isModelHiddenBulk(imgModel.provider, rawModelId)) continue;
      models.push({
        id: imgModel.id,
        object: "model",
        created: timestamp,
        owned_by: imgModel.provider,
        type: "image",
        supported_sizes: imgModel.supportedSizes,
        input_modalities: imgModel.inputModalities || ["text"],
        output_modalities: ["image"],
        ...(imgModel.description ? { description: imgModel.description } : {}),
        ...(imgModel.mediaCapabilities ? { media_capabilities: imgModel.mediaCapabilities } : {}),
      });
    }

    // Add rerank models (filtered by active providers)
    for (const rerankModel of getAllRerankModels()) {
      if (!isProviderActive(rerankModel.provider)) continue;
      const rawModelId = getSpecialtyModelRelativeId(rerankModel.id, rerankModel.provider);
      if (!providerSupportsModel(rerankModel.provider, rawModelId)) continue;
      if (isModelHiddenBulk(rerankModel.provider, rawModelId)) continue;
      if (hasEquivalentSpecialtyModel(rerankModel.provider, rawModelId, "rerank", rerankModel.id)) {
        continue;
      }
      models.push({
        id: rerankModel.id,
        object: "model",
        created: timestamp,
        owned_by: rerankModel.provider,
        root: rawModelId,
        type: "rerank",
      });
    }

    // Add audio models (filtered by active providers)
    for (const audioModel of getAllAudioModels()) {
      if (!isProviderActive(audioModel.provider)) continue;
      const rawModelId = getSpecialtyModelRelativeId(audioModel.id, audioModel.provider);
      if (!providerSupportsModel(audioModel.provider, rawModelId)) continue;
      if (isModelHiddenBulk(audioModel.provider, rawModelId)) continue;
      models.push({
        id: audioModel.id,
        object: "model",
        created: timestamp,
        owned_by: audioModel.provider,
        type: "audio",
        subtype: audioModel.subtype,
      });
    }

    // Add moderation models (filtered by active providers)
    for (const modModel of getAllModerationModels()) {
      if (!isProviderActive(modModel.provider)) continue;
      const rawModelId = getSpecialtyModelRelativeId(modModel.id, modModel.provider);
      if (!providerSupportsModel(modModel.provider, rawModelId)) continue;
      if (isModelHiddenBulk(modModel.provider, rawModelId)) continue;
      models.push({
        id: modModel.id,
        object: "model",
        created: timestamp,
        owned_by: modModel.provider,
        type: "moderation",
      });
    }

    // Add video models (filtered by active providers)
    for (const videoModel of getAllVideoModels()) {
      if (!isProviderActive(videoModel.provider)) continue;
      const rawModelId = getSpecialtyModelRelativeId(videoModel.id, videoModel.provider);
      if (!providerSupportsModel(videoModel.provider, rawModelId)) continue;
      if (isModelHiddenBulk(videoModel.provider, rawModelId)) continue;
      models.push({
        id: videoModel.id,
        object: "model",
        created: timestamp,
        owned_by: videoModel.provider,
        type: "video",
        supported_sizes: videoModel.supportedSizes,
        input_modalities: ["text"],
        output_modalities: ["video"],
        ...(videoModel.mediaCapabilities
          ? { media_capabilities: videoModel.mediaCapabilities }
          : {}),
      });
    }

    // Add music models (filtered by active providers)
    for (const musicModel of getAllMusicModels()) {
      if (!isProviderActive(musicModel.provider)) continue;
      const rawModelId = getSpecialtyModelRelativeId(musicModel.id, musicModel.provider);
      if (!providerSupportsModel(musicModel.provider, rawModelId)) continue;
      if (isModelHiddenBulk(musicModel.provider, rawModelId)) continue;
      models.push({
        id: musicModel.id,
        object: "model",
        created: timestamp,
        owned_by: musicModel.provider,
        type: "music",
      });
    }

    // Add custom models (user-defined)
    try {
      const customModelsMap = (await getAllCustomModels()) as Record<string, unknown>;
      for (const [providerId, rawProviderCustomModels] of Object.entries(customModelsMap)) {
        if (providerUsesCuratedModelsOnly(providerId)) continue;
        // Skip Gemini — handled by syncedAvailableModels above
        if (providerId === "gemini") continue;
        if (providerId === "reka") continue;
        const providerCustomModels: CustomModelEntry[] = Array.isArray(rawProviderCustomModels)
          ? rawProviderCustomModels.filter(
              (model): model is CustomModelEntry =>
                !!model && typeof model === "object" && !Array.isArray(model)
            )
          : [];
        // For compatible providers, use the prefix from provider nodes
        const prefix = providerIdToPrefix[providerId];
        const alias = prefix || providerIdToAlias[providerId] || providerId;
        const canonicalProviderId = resolveCanonicalProviderId(alias, providerId);
        // #12058: see the static loop — the alias row is the only row here.
        const selfAliased = canonicalProviderId === alias;

        // Only include if provider is active — check alias, canonical ID, raw providerId,
        // or the parent provider type (for compatible providers whose node ID is a UUID)
        const parentProviderType = nodeIdToProviderType[providerId];
        if (
          !activeAliases.has(alias) &&
          !activeAliases.has(canonicalProviderId) &&
          !activeAliases.has(providerId) &&
          !(parentProviderType && activeAliases.has(parentProviderType))
        )
          continue;

        for (const model of providerCustomModels) {
          const modelId = typeof model.id === "string" ? model.id : null;
          if (!modelId) continue;
          if (!isUnifiedChatSourceModelSelectable(canonicalProviderId, { ...model, id: modelId }))
            continue;
          if (model.isHidden === true) continue;
          if (isModelHiddenBulk(providerId, modelId, canonicalProviderId)) continue;
          if (isExcludedByProviderConnections(canonicalProviderId, modelId)) continue;
          // #6328: apply hidePaidModels to user-defined custom rows too.
          // Custom entries do not carry pricing, so shouldHidePaid() decides
          // via FREE_MODEL_IDS_BY_PROVIDER — matches synced/PROVIDER_MODELS.
          if (
            shouldHidePaid(
              canonicalProviderId,
              modelId,
              (model as { pricing?: unknown }).pricing,
              (model as any).isFree
            )
          )
            continue;
          if (shouldHideByExposure(canonicalProviderId, modelId)) continue;
          // noAuth providers have no connection rows; keep auth providers gated. (#2798/#3200)
          const isNoAuthProvider = isNoAuthProviderKey(canonicalProviderId, providerId, alias);
          if (
            (!isNoAuthProvider ||
              isNoAuthProviderBlocked(blockedProviders, canonicalProviderId, providerId, alias)) &&
            !hasEligibleConnectionForModel(
              getConnectionsForProvider(alias, canonicalProviderId, providerId, parentProviderType),
              modelId
            )
          ) {
            continue;
          }

          // A custom row is the operator-owned overlay for the same provider/model.
          // Preserve catalog identity and discovered metadata, but let every field
          // explicitly stored on the custom row determine the effective metadata.
          const aliasId = `${alias}/${modelId}`;
          const existingIndex = models.findIndex((m) => m.id === aliasId);
          if (existingIndex !== -1) {
            const existing = models[existingIndex] as Record<string, unknown> & { id: string };
            const endpoints = Array.isArray(model.supportedEndpoints)
              ? model.supportedEndpoints
              : undefined;
            const apiFormat = typeof model.apiFormat === "string" ? model.apiFormat : undefined;
            const visionFields =
              typeof model.supportsVision === "boolean"
                ? model.supportsVision
                  ? getCustomVisionCapabilityFields(model, aliasId, modelId)
                  : {
                      capabilities: {
                        ...((existing.capabilities as Record<string, unknown>) || {}),
                        vision: false,
                      },
                      input_modalities: ["text"],
                      output_modalities: ["text"],
                    }
                : null;
            models[existingIndex] = mergeCustomModelMetadata(existing, {
              id: aliasId,
              ...(typeof model.name === "string" ? { name: model.name } : {}),
              ...(apiFormat ? { api_format: apiFormat } : {}),
              ...(endpoints ? { supported_endpoints: endpoints } : {}),
              ...(typeof model.inputTokenLimit === "number"
                ? { context_length: model.inputTokenLimit }
                : {}),
              ...(typeof model.outputTokenLimit === "number"
                ? { max_output_tokens: model.outputTokenLimit }
                : {}),
              ...(visionFields || {}),
              custom: true,
            });
            continue;
          }

          // Determine type from supportedEndpoints
          const endpoints = Array.isArray(model.supportedEndpoints)
            ? model.supportedEndpoints
            : ["chat"];
          const apiFormat =
            typeof model.apiFormat === "string" ? model.apiFormat : "chat-completions";
          const classification = classifyModelSupportedEndpoints(endpoints);
          const modelType = classification.type;
          if (
            modelType &&
            hasEquivalentSpecialtyModel(canonicalProviderId, modelId, modelType, aliasId)
          ) {
            continue;
          }
          const visionFields = !modelType
            ? getCustomVisionCapabilityFields(model, aliasId, modelId)
            : null;

          if (includeAlias || Boolean(prefix) || selfAliased) {
            models.push({
              id: aliasId,
              object: "model",
              created: timestamp,
              owned_by: resolvePublicOwnerId(providerId, canonicalProviderId),
              permission: [],
              root: modelId,
              parent: null,
              custom: true,
              ...(modelType ? { type: modelType } : {}),
              ...(classification.subtype ? { subtype: classification.subtype } : {}),
              ...(apiFormat !== "chat-completions" ? { api_format: apiFormat } : {}),
              ...(endpoints.length > 1 || !endpoints.includes("chat")
                ? { supported_endpoints: endpoints }
                : {}),
              ...(typeof model.inputTokenLimit === "number"
                ? { context_length: model.inputTokenLimit }
                : {}),
              ...(typeof (model as any).outputTokenLimit === "number"
                ? { max_output_tokens: (model as any).outputTokenLimit }
                : {}),
              ...(visionFields || {}),
            });
          }

          if (includeCanonical && canonicalProviderId !== alias && !prefix && !isNoAuthProvider) {
            const providerPrefixedId = `${canonicalProviderId}/${modelId}`;
            if (models.some((m) => m.id === providerPrefixedId)) continue;
            const providerVisionFields = !modelType
              ? getCustomVisionCapabilityFields(model, providerPrefixedId, modelId)
              : null;
            models.push({
              id: providerPrefixedId,
              object: "model",
              created: timestamp,
              owned_by: resolvePublicOwnerId(providerId, canonicalProviderId),
              permission: [],
              root: modelId,
              parent: includeAlias ? aliasId : null,
              custom: true,
              ...(modelType ? { type: modelType } : {}),
              ...(typeof model.inputTokenLimit === "number"
                ? { context_length: model.inputTokenLimit }
                : {}),
              ...(typeof (model as any).outputTokenLimit === "number"
                ? { max_output_tokens: (model as any).outputTokenLimit }
                : {}),
              ...(providerVisionFields || {}),
            });
          }

          // #9147: custom-model walk — yield periodically.
          await maybeYieldCatalogBuild();
        }
      }
    } catch (e) {
      console.log("Could not fetch custom models");
    }

    // Port of decolua/9router#730 — surface models registered ONLY through a model
    // alias (`key_value` namespace `modelAliases`, value `"<providerKey>/<modelId>"`).
    // Without this walk, a compatible-provider entry like `setModelAlias("kimi-k2.6",
    // "custom/kimi-k2.6")` resolves at request time but never shows up in `/v1/models`.
    // We respect the same gating as the static/custom listing path: provider must be
    // active (or noAuth+unblocked), model must not be hidden, and the canonical alias
    // entry must not already exist (so we don't shadow combo / synced / custom rows).
    try {
      const modelAliases = await getModelAliases();
      const aliasBacked = extractAliasBackedModels(modelAliases);
      for (const { providerKey, modelId } of aliasBacked) {
        const canonicalProviderId = resolveCanonicalProviderId(providerKey);
        if (!canonicalProviderId) continue;
        if (
          blockedProviders.has(providerKey) ||
          blockedProviders.has(canonicalProviderId) ||
          isNoAuthProviderBlocked(blockedProviders, canonicalProviderId, providerKey)
        ) {
          continue;
        }

        // #8958/#9034: honor the compatible-provider node prefix (as the synced/custom
        // loops do) so an alias-backed entry publishes `prefix/model` instead of the
        // raw provider-node UUID. Without the providerIdToPrefix lookup, `alias` fell
        // through to `providerKey` (the UUID) and the dedupe below — which only checks
        // `alias/model` and `providerKey/model`, both UUID-prefixed — never matched the
        // correct `prefix/model` row already emitted, leaking a duplicate UUID entry
        // even under MODELS_CATALOG_PREFIX_MODE=alias.
        const nodePrefix =
          providerIdToPrefix[providerKey] || providerIdToPrefix[canonicalProviderId];
        const alias = nodePrefix || providerIdToAlias[canonicalProviderId] || providerKey;
        if (
          !activeAliases.has(alias) &&
          !activeAliases.has(canonicalProviderId) &&
          !activeAliases.has(providerKey)
        ) {
          continue;
        }

        if (isModelHiddenBulk(providerKey, modelId, canonicalProviderId)) continue;
        if (isExcludedByProviderConnections(canonicalProviderId, modelId)) continue;
        // #6328: apply hidePaidModels to alias-backed rows too. Alias mappings
        // point at providerKey/modelId with no pricing, so shouldHidePaid()
        // decides via the FREE_MODEL_IDS_BY_PROVIDER catalog tier.
        if (shouldHidePaid(canonicalProviderId, modelId)) continue;
        if (shouldHideByExposure(canonicalProviderId, modelId)) continue;

        const aliasId = `${alias}/${modelId}`;
        const rawPrefixedId = `${providerKey}/${modelId}`;
        if (
          models.some((m: any) => m?.id === aliasId) ||
          models.some((m: any) => m?.id === rawPrefixedId)
        ) {
          continue;
        }

        const visionFields =
          getVisionCapabilityFields(aliasId) || getVisionCapabilityFields(modelId);

        // #12058: see the static loop — the alias row is the only row here.
        const selfAliased = canonicalProviderId === alias;
        if (includeAlias || Boolean(nodePrefix) || selfAliased) {
          models.push({
            id: aliasId,
            object: "model",
            created: timestamp,
            owned_by: resolvePublicOwnerId(providerKey, canonicalProviderId),
            permission: [],
            root: modelId,
            parent: null,
            ...(visionFields || {}),
          });
        }
        if (
          includeCanonical &&
          canonicalProviderId !== alias &&
          !nodePrefix &&
          !isNoAuthProviderKey(canonicalProviderId) &&
          prefixRoutesToProvider(canonicalProviderId, canonicalProviderId)
        ) {
          const providerPrefixedId = `${canonicalProviderId}/${modelId}`;
          if (models.some((m: any) => m?.id === providerPrefixedId)) continue;
          const providerVisionFields =
            getVisionCapabilityFields(providerPrefixedId) || getVisionCapabilityFields(modelId);
          models.push({
            id: providerPrefixedId,
            object: "model",
            created: timestamp,
            owned_by: resolvePublicOwnerId(providerKey, canonicalProviderId),
            permission: [],
            root: modelId,
            parent: includeAlias ? aliasId : null,
            ...(providerVisionFields || {}),
          });
        }
      }
    } catch (e) {
      console.log("Could not fetch model aliases");
    }

    // Add managed fallback models for compatible providers that don't import a model list.
    for (const conn of connections) {
      const providerId = typeof conn.provider === "string" ? conn.provider : null;
      if (!providerId) continue;
      if (blockedProviders.has(providerId)) continue;

      const fallbackModels = getCompatibleFallbackModels(providerId);
      if (!Array.isArray(fallbackModels) || fallbackModels.length === 0) continue;

      const prefix = providerIdToPrefix[providerId];
      const alias = prefix || providerIdToAlias[providerId] || providerId;
      const canonicalProviderId = resolveCanonicalProviderId(alias, providerId);

      for (const model of fallbackModels) {
        const modelId = typeof model.id === "string" ? model.id : null;
        if (!modelId) continue;
        if (isModelHiddenBulk(providerId, modelId, canonicalProviderId)) continue;
        if (isExcludedByProviderConnections(canonicalProviderId, modelId)) continue;
        // #6328: apply hidePaidModels to managed-fallback rows too. Compatible
        // provider fallbacks lack pricing; shouldHidePaid() decides via the
        // FREE_MODEL_IDS_BY_PROVIDER catalog tier.
        if (shouldHidePaid(canonicalProviderId, modelId, (model as { pricing?: unknown }).pricing))
          continue;
        if (shouldHideByExposure(canonicalProviderId, modelId)) continue;
        if (!hasEligibleConnectionForModel([conn], modelId)) continue;

        const aliasId = `${alias}/${modelId}`;
        if (models.some((m) => m.id === aliasId)) continue;

        const visionFields =
          getVisionCapabilityFields(aliasId) || getVisionCapabilityFields(modelId);
        const contextLength =
          typeof model.contextLength === "number" ? model.contextLength : undefined;

        models.push({
          id: aliasId,
          object: "model",
          created: timestamp,
          owned_by: resolvePublicOwnerId(providerId, canonicalProviderId),
          permission: [],
          root: modelId,
          parent: null,
          ...(contextLength ? { context_length: contextLength } : {}),
          ...(visionFields || {}),
        });

        // #9147: per-connection fallback walk — yield periodically.
        await maybeYieldCatalogBuild();
      }
    }

    // Filter by API key permissions if requested
    const apiKey = extractApiKey(request);
    let finalModels = models;
    if (apiKey) {
      const { isModelAllowedForKey, getApiKeyMetadata } = await import("@/lib/db/apiKeys");

      // Quota-exclusive keys (allowedQuotas non-empty): list ONLY the pool's qtSd/*
      // virtual models. #4806: build from the hidden qtSd/* combos directly — the base
      // `models` list drops hidden combos, so filtering it returned nothing (0 models).
      const keyMeta = await getApiKeyMetadata(apiKey);
      if (keyMeta && keyMeta.allowedQuotas && keyMeta.allowedQuotas.length > 0) {
        const { buildQuotaExclusiveModels } = await import("@/lib/quota/quotaCombos");
        finalModels = await buildQuotaExclusiveModels(
          keyMeta.allowedQuotas,
          combos,
          timestamp,
          (c) => buildComboCatalogMetadata(c, combos)
        );
      } else if (!keyMeta) {
        // #6406: A valid apiKey without a DB metadata row is an env-var master key
        // (OMNIROUTE_API_KEY / ROUTER_API_KEY per isValidApiKey). Those keys have no
        // per-key allow/deny/quota restrictions — they authenticate the request but
        // do NOT scope the catalog. Skipping the per-model filter matches the intent:
        // auth GATES access; env-var master keys see everything the unauth path sees.
        // Without this branch, isModelAllowedForKey returns false for every model
        // (metadata missing → deny), collapsing /v1/models to 0 entries.
      } else {
        const filtered = [];
        for (const m of models) {
          // m.id is the full identifier (e.g. openai/gpt-4o), m.root is the raw model string
          // check either one as the config could use either patterns
          if (
            (await isModelAllowedForKey(apiKey, m.id)) ||
            (await isModelAllowedForKey(apiKey, m.root))
          ) {
            filtered.push(m);
          }
        }
        finalModels = filtered;
      }
    }
    // ?configuredOnly — hide models that have no eligible DB connection.
    finalModels = await applyCatalogPostFilters(request, finalModels, {
      connections,
      prefixMode,
      aliasToProviderId,
      hideNoThinkVariants: settings.hideNoThinkVariants === true,
    });

    const getDefaultContextFallback = (model: any): number | undefined => {
      if (typeof model.context_length === "number") return undefined;
      if (model.owned_by === "combo") return undefined;
      if (model.type && model.type !== "chat") return undefined;

      const provider = typeof model.owned_by === "string" ? model.owned_by : null;
      if (!provider) return undefined;
      const canonicalId = aliasToProviderId[provider] || provider;

      const registryFallback = REGISTRY[canonicalId]?.defaultContextLength;
      if (registryFallback) return registryFallback;

      const modelId =
        model.root || (typeof model.id === "string" ? model.id.split("/").pop() : undefined);
      return modelId
        ? getTokenLimit(canonicalId, modelId, capabilityResolutionSnapshot)
        : getTokenLimit(canonicalId, null, capabilityResolutionSnapshot);
    };

    let enrichmentSnapshot: CatalogEnrichmentSnapshot | undefined;
    if (finalModels.some((model) => model.owned_by !== "combo")) {
      let modelsDevPricing: ReturnType<typeof getModelsDevPricing> | null = null;
      try {
        modelsDevPricing = getModelsDevPricing();
      } catch {
        // Pricing lookup is optional; hardcoded defaults still enrich the response.
      }
      enrichmentSnapshot = {
        modelsDevPricing,
        capabilityResolutionSnapshot,
        providerNodeIdsByPrefix: providerNodeIdByPrefix,
      };
      // The production profile identified pricing snapshot construction as the last
      // dominant synchronous stage. Let already-queued health checks run before the
      // remaining in-memory enrichment and JSON serialization.
      await yieldCatalogBuildTurn();
    }

    return finalizeCatalogResponse(
      request,
      finalModels,
      getDefaultContextFallback,
      {
        ...corsHeaders,
        ...diagnosticHeaders,
      },
      enrichmentSnapshot
    );
  } catch (error) {
    console.log("Error fetching models:", error);
    // Hard rule #12 — this is the realistically reachable 500 for the endpoint
    // (the wrapper's catch only fires on an in-flight rejection), so it must go
    // through the shared sanitizer too. Same status/type/code as before.
    return Response.json(
      buildErrorBody(500, error instanceof Error ? error.message : String(error), undefined, {
        type: "server_error",
        code: INTERNAL_PROXY_ERROR,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          ...diagnosticHeaders,
        },
      }
    );
  }
}
