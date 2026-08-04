import { PROVIDER_MODELS, PROVIDER_ID_TO_ALIAS } from "@/shared/constants/models";
import { NOAUTH_PROVIDERS } from "@/shared/constants/providers";
import {
  getCachedRawProviderConnections,
  getCombos,
  getAllCustomModels,
  getSettings,
  getCachedProviderNodes,
  getModelIsHidden,
  getModelAliases,
  getDatabaseSettings,
} from "@/lib/localDb";
import { createLazyConnectionView } from "@/lib/db/providers/lazyConnectionView";
import { extractAliasBackedModels } from "./aliasBackedModels";
import {
  buildSyncedModelIdsByCanonicalProvider,
  shouldSuppressStaticModelBySyncedCoverage,
} from "./catalogSyncedCoverage";
import { buildSyncedCapabilities, mergeSyncedCapabilities } from "./syncedCapabilities";
import { getAllEmbeddingModels } from "@omniroute/open-sse/config/embeddingRegistry";
import {
  getAllImageModels,
  isRegisteredImageModel,
} from "@omniroute/open-sse/config/imageRegistry";
import { getAllRerankModels } from "@omniroute/open-sse/config/rerankRegistry";
import { getAllAudioModels } from "@omniroute/open-sse/config/audioRegistry";
import { getAllModerationModels } from "@omniroute/open-sse/config/moderationRegistry";
import { getAllVideoModels } from "@omniroute/open-sse/config/videoRegistry";
import { getAllMusicModels } from "@omniroute/open-sse/config/musicRegistry";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry";
import { CODEX_NATIVE_UNPREFIXED_MODELS } from "@omniroute/open-sse/services/model";
import { resolveNestedComboTargets } from "@omniroute/open-sse/services/combo";
import {
  AUTO_TEMPLATE_VARIANTS,
  AUTO_SUFFIX_VARIANTS,
  AUTO_FAMILY_IDS,
  createBuiltinAutoCombo,
  isPaidTierAutoId,
} from "@omniroute/open-sse/services/autoCombo/builtinCatalog";
import { getAllSyncedAvailableModels, type SyncedAvailableModel } from "@/lib/db/models";
import { getModelCatalogCacheVersion } from "@/lib/db/readCache";
import { getCompatibleFallbackModels } from "@/lib/providers/managedAvailableModels";
import { providerUsesCuratedModelsOnly } from "@/lib/providers/modelListingCapability";
import { getOpenRouterCatalog } from "@/lib/catalog/openrouterCatalog";
import { hasEligibleConnectionForModel } from "@/domain/connectionModelRules";
import {
  INTERNAL_PROXY_ERROR,
  getCanonicalModelMetadata,
  getCatalogDiagnosticsHeaders,
} from "@/lib/modelMetadataRegistry";
import { getSyncedCapability } from "@/lib/modelsDevSync";
import { getModelSpec } from "@/shared/constants/modelSpecs";
import { getModelsCatalogPrefixMode } from "@/shared/utils/featureFlags";
import { applyCatalogPostFilters, finalizeCatalogResponse } from "./catalogResponse";
import {
  isNoAuthProviderBlocked,
  isNoAuthProviderKey,
  isNoAuthRawProviderPrefix,
  normalizeBlockedProviderSet,
} from "@/shared/utils/noAuthProviders";
import { getTokenLimit } from "@omniroute/open-sse/services/contextManager";
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
import { isFreeModel, providerHasFreeModels } from "@/shared/utils/freeModels";
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
import { CATALOG_CACHE_TTL_MS_DEFAULT, resolveCachedCatalogResponse } from "./catalogCache";

export {
  CATALOG_STALE_WHILE_REVALIDATE_MS,
  __resetCatalogBuilderRunsForTest,
  __getCatalogBuilderRunsForTest,
  __expireCatalogCacheForTest,
  __setCatalogCacheEntryForTest,
  __flushCatalogBackgroundRefreshForTest,
  __forceCatalogInFlightRejectionForTest,
} from "./catalogCache";
export type { CachedCatalog } from "./catalogCache";

/**
 * Build unified OpenAI-compatible model catalog response.
 * Reused by `/api/v1/models` and `/api/v1` to avoid semantic drift (T09).
 */
export async function getUnifiedModelsResponse(
  request: Request,
  corsHeaders: Record<string, string> = {}
) {
  const diagnosticHeaders = getCatalogDiagnosticsHeaders({ request });

  // #6408 fast path: reject unauthorized callers first (auth state is per-request
  // and MUST NOT be cached), then coalesce identical concurrent requests + short-
  // TTL memoize the serialized JSON body.
  try {
    let settingsForAuth: Record<string, any> = {};
    try {
      settingsForAuth = await getSettings();
    } catch {}
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
      buildCatalogPayload
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
    const dbSettings = await getDatabaseSettings();
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
  try {
    let settings: Record<string, any> = {};
    try {
      settings = await getSettings();
    } catch {}

    const authRejection = await getModelCatalogAuthRejection(request, settings, {
      ...corsHeaders,
      ...diagnosticHeaders,
    });
    if (authRejection) return authRejection;
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
    const shouldHidePaid = (providerKey: string, modelId: string, pricing?: unknown): boolean => {
      if (!hidePaid) return false;
      const provider = aliasToProviderId[providerKey] || providerKey;
      if (!providerHasFreeModels(provider)) return true;
      return !isFreeModel(provider, { id: modelId, pricing: pricing as any });
    };

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
    const nodeIdToProviderType: Record<string, string> = {};
    for (const node of providerNodes) {
      if (node.prefix) {
        providerIdToPrefix[node.id] = node.prefix;
      }
      if (node.type) {
        nodeIdToProviderType[node.id] = node.type;
      }
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

    // Get combos
    let combos = [];
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

    const getConnectionsForProvider = (...keys: Array<string | null | undefined>) => {
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
      return collected;
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

    const getComboTargetModelId = (target: ComboCatalogTarget) =>
      getComboTargetModelIdFromMaps(aliasMaps, target);

    const getComboTargetCatalogMetadata = (
      target: ComboCatalogTarget
    ): ComboTargetCatalogMetadata | null => {
      const targetModel = getComboTargetModelId(target);
      if (!targetModel) return null;

      const canonical = getCanonicalModelMetadata({
        provider: targetModel.providerId,
        model: targetModel.modelId,
      });
      if (!canonical) return null;

      const source = canonical.metadata.source;
      if (!source.providerRegistry && !source.staticSpec && !source.syncedCapability) return null;

      const providerId = canonical.provider || targetModel.providerId;
      const modelId = canonical.model || targetModel.modelId;
      const synced = getSyncedCapability(providerId, modelId);
      const spec = getModelSpec(modelId);
      const registryModel = getRegistryModel(providerId, modelId);
      const syncedInputModalities = parseJsonStringArray(synced?.modalities_input);
      const syncedOutputModalities = parseJsonStringArray(synced?.modalities_output);

      const syncedContext = isPositiveFiniteNumber(synced?.limit_context)
        ? synced.limit_context
        : undefined;
      const registryContext = isPositiveFiniteNumber(registryModel?.contextLength)
        ? registryModel.contextLength
        : undefined;
      const specContext = isPositiveFiniteNumber(spec?.contextWindow)
        ? spec.contextWindow
        : undefined;
      const contextLength =
        syncedContext ??
        registryContext ??
        specContext ??
        (getTokenLimit(providerId, modelId) || undefined);
      const registryInputLimit = isPositiveFiniteNumber(registryModel?.maxInputTokens)
        ? registryModel.maxInputTokens
        : undefined;
      const syncedInputLimit = isPositiveFiniteNumber(synced?.limit_input)
        ? synced.limit_input
        : undefined;
      const maxInputTokens = registryInputLimit ?? syncedInputLimit ?? contextLength;
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
        getThinkingCapabilityFields(providerId, modelId, canonical.capabilities.supportsThinking)
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
      allCombos: Parameters<typeof resolveNestedComboTargets>[1]
    ) => {
      const explicitContextLength = isPositiveFiniteNumber(combo.context_length)
        ? combo.context_length
        : undefined;

      const baseMetadata = explicitContextLength ? { context_length: explicitContextLength } : {};
      const targets = resolveNestedComboTargets(combo, allCombos) as ComboCatalogTarget[];
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
        const quotaFinal = applyCatalogPostFilters(request, quotaModels, {
          connections,
          prefixMode,
          aliasToProviderId,
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
    for (const autoId of [
      ...Object.keys(AUTO_TEMPLATE_VARIANTS),
      ...AUTO_SUFFIX_VARIANTS,
      ...AUTO_FAMILY_IDS,
    ]) {
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
        const virtualCombo = await createBuiltinAutoCombo(autoId, suffix);
        const contextLength = virtualCombo.advertisedContextLength || 128000;
        const maxOutputTokens = virtualCombo.advertisedMaxOutputTokens || 8192;
        models.push({
          ...baseAutoEntry,
          context_length: contextLength,
          max_input_tokens: contextLength,
          max_output_tokens: maxOutputTokens,
          capabilities: {
            tool_calling: true,
            reasoning: true,
            thinking: true,
            temperature: true,
          },
        });
      } catch (err) {
        console.log(`[catalog] Could not materialize built-in auto model ${autoId}:`, err);
        models.push(baseAutoEntry);
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
      if (
        comboTargets.some((target) => {
          const resolved = getComboTargetModelId(target);
          return resolved ? getModelIsHidden(resolved.providerId, resolved.modelId) : false;
        })
      ) {
        continue;
      }

      const comboMetadata = buildComboCatalogMetadata(combo, combos);

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
    }

    let syncedModelsByProvider: Record<string, SyncedAvailableModel[]> = {};
    try {
      syncedModelsByProvider = await getAllSyncedAvailableModels();
    } catch (e) {
      // DB unavailable — log and fall through; static models remain as defaults.
      console.log("[catalog] Could not fetch synced available models:", e);
    }
    const providersWithSyncedModels = new Set(
      Object.keys(syncedModelsByProvider).filter((pid) => {
        if (providerUsesCuratedModelsOnly(pid)) return false;
        const models = syncedModelsByProvider[pid];
        return Array.isArray(models) && models.length > 0;
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
        const syncedForProvider = syncedModelIdsByCanonicalProvider.get(canonicalProviderId);
        if (
          shouldSuppressStaticModelBySyncedCoverage({
            providerHasSynced: syncedForProvider !== undefined && syncedForProvider.size > 0,
            staticModelId: model.id,
            syncedModelIds: syncedForProvider ? [...syncedForProvider] : [],
          }) &&
          !isRegisteredEffortVariant(providerModels, model.id)
        )
          continue;
        if (!providerSupportsModel(canonicalProviderId, model.id)) continue;
        const aliasId = `${alias}/${model.id}`;
        if (getModelIsHidden(canonicalProviderId, model.id)) continue;
        if (shouldHidePaid(canonicalProviderId, model.id, (model as { pricing?: unknown }).pricing))
          continue;

        const visionFields =
          getVisionCapabilityFields(aliasId) || getVisionCapabilityFields(model.id);
        if (includeAlias) {
          models.push({
            id: aliasId,
            object: "model",
            created: timestamp,
            owned_by: canonicalProviderId,
            permission: [],
            root: model.id,
            parent: null,
            ...(visionFields || {}),
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
          });
        }
      }
    }

    for (const modelId of CODEX_NATIVE_UNPREFIXED_MODELS) {
      if (!providerSupportsModel("codex", modelId)) continue;
      if (getModelIsHidden("codex", modelId)) continue;

      const alias = providerIdToAlias.codex || "cx";
      const aliasId = `${alias}/${modelId}`;
      const providerIdModel = `codex/${modelId}`;
      const entries = [
        { id: aliasId, parent: null },
        { id: providerIdModel, parent: aliasId },
        { id: modelId, parent: providerIdModel },
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
        const parentProviderType = nodeIdToProviderType[providerId];

        if (
          !activeAliases.has(alias) &&
          !activeAliases.has(canonicalProviderId) &&
          !activeAliases.has(providerId) &&
          !(parentProviderType && activeAliases.has(parentProviderType))
        ) {
          continue;
        }

        for (const sm of syncedModels) {
          if (!providerSupportsModel(canonicalProviderId, sm.id)) continue;
          if (canonicalProviderId === "codex" && isCodexDiscoveryModelExcluded(sm)) {
            continue;
          }
          if (getModelIsHidden(providerId, sm.id)) continue;
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
          // rarely carry pricing metadata, so shouldHidePaid() falls through to
          // the FREE_MODEL_IDS_BY_PROVIDER catalog — providers with a curated
          // free roster show only those; providers with none fall through to
          // hide-all via providerHasFreeModels() === false.
          if (shouldHidePaid(canonicalProviderId, sm.id, (sm as { pricing?: unknown }).pricing))
            continue;

          const registryEntry = REGISTRY[providerId];
          const displayModelId =
            registryEntry?.modelIdPrefix && sm.id.startsWith(registryEntry.modelIdPrefix)
              ? sm.id.slice(registryEntry.modelIdPrefix.length)
              : sm.id;

          const aliasId = `${alias}/${displayModelId}`;
          const endpoints = Array.isArray(sm.supportedEndpoints) ? sm.supportedEndpoints : ["chat"];
          const apiFormat = typeof sm.apiFormat === "string" ? sm.apiFormat : "chat-completions";
          let modelType: string | undefined;
          if (endpoints.includes("embeddings")) modelType = "embedding";
          else if (endpoints.includes("rerank")) modelType = "rerank";
          else if (endpoints.includes("images")) modelType = "image";
          else if (endpoints.includes("audio")) modelType = "audio";
          const syncedFields = {
            ...(modelType ? { type: modelType } : {}),
            ...(apiFormat !== "chat-completions" ? { api_format: apiFormat } : {}),
            ...(modelType === "audio" ? { subtype: "transcription" } : {}),
            ...(sm.inputTokenLimit ? { context_length: sm.inputTokenLimit } : {}),
            ...(typeof sm.outputTokenLimit === "number"
              ? { max_output_tokens: sm.outputTokenLimit }
              : {}),
            ...(endpoints.length > 1 || !endpoints.includes("chat")
              ? { supported_endpoints: endpoints }
              : {}),
            // #4264/#7694: vision + reasoning-effort-tier flags captured at sync time,
            // merged into a single capabilities object (see ./syncedCapabilities.ts).
            ...(buildSyncedCapabilities(sm) ? { capabilities: buildSyncedCapabilities(sm) } : {}),
          };

          const existingAliasModel = models.find((model) => model.id === aliasId);
          if (existingAliasModel) {
            const mergedCapabilities = mergeSyncedCapabilities(existingAliasModel.capabilities, sm);
            Object.assign(existingAliasModel, syncedFields);
            if (mergedCapabilities) existingAliasModel.capabilities = mergedCapabilities;
            continue;
          }

          if (includeAlias) {
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
          if (includeAlias && modelType === "audio") {
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

    const hasEquivalentSpecialtyModel = (
      providerId: string,
      rawModelId: string,
      type: string,
      scopedModelId: string
    ) =>
      models.some((model: any) => {
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

    // Add embedding models (filtered by active providers)
    for (const embModel of getAllEmbeddingModels()) {
      if (!isProviderActive(embModel.provider)) continue;
      const rawModelId = embModel.id.startsWith(`${embModel.provider}/`)
        ? embModel.id.slice(embModel.provider.length + 1)
        : embModel.id;
      if (!providerSupportsModel(embModel.provider, rawModelId)) continue;
      if (getModelIsHidden(embModel.provider, rawModelId)) continue;
      if (hasEquivalentSpecialtyModel(embModel.provider, rawModelId, "embedding", embModel.id)) {
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

    // Add image models (filtered by active providers)
    for (const imgModel of getAllImageModels()) {
      if (!isProviderActive(imgModel.provider)) continue;
      const rawModelId = imgModel.id.split("/").pop() || imgModel.id;
      if (!providerSupportsModel(imgModel.provider, rawModelId)) continue;
      if (getModelIsHidden(imgModel.provider, rawModelId)) continue;
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
      });
    }

    // Add rerank models (filtered by active providers)
    for (const rerankModel of getAllRerankModels()) {
      if (!isProviderActive(rerankModel.provider)) continue;
      const rawModelId = rerankModel.id.split("/").pop() || rerankModel.id;
      if (!providerSupportsModel(rerankModel.provider, rawModelId)) continue;
      if (getModelIsHidden(rerankModel.provider, rawModelId)) continue;
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
      const rawModelId = audioModel.id.split("/").pop() || audioModel.id;
      if (!providerSupportsModel(audioModel.provider, rawModelId)) continue;
      if (getModelIsHidden(audioModel.provider, rawModelId)) continue;
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
      const rawModelId = modModel.id.split("/").pop() || modModel.id;
      if (!providerSupportsModel(modModel.provider, rawModelId)) continue;
      if (getModelIsHidden(modModel.provider, rawModelId)) continue;
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
      const rawModelId = videoModel.id.split("/").pop() || videoModel.id;
      if (!providerSupportsModel(videoModel.provider, rawModelId)) continue;
      if (getModelIsHidden(videoModel.provider, rawModelId)) continue;
      models.push({
        id: videoModel.id,
        object: "model",
        created: timestamp,
        owned_by: videoModel.provider,
        type: "video",
      });
    }

    // Add music models (filtered by active providers)
    for (const musicModel of getAllMusicModels()) {
      if (!isProviderActive(musicModel.provider)) continue;
      const rawModelId = musicModel.id.split("/").pop() || musicModel.id;
      if (!providerSupportsModel(musicModel.provider, rawModelId)) continue;
      if (getModelIsHidden(musicModel.provider, rawModelId)) continue;
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
          if (model.isHidden === true) continue;
          if (getModelIsHidden(canonicalProviderId, modelId)) continue;
          // #6328: apply hidePaidModels to user-defined custom rows too.
          // Custom entries do not carry pricing, so shouldHidePaid() decides
          // via FREE_MODEL_IDS_BY_PROVIDER — matches synced/PROVIDER_MODELS.
          if (
            shouldHidePaid(canonicalProviderId, modelId, (model as { pricing?: unknown }).pricing)
          )
            continue;
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

          // Skip if already added as built-in
          const aliasId = `${alias}/${modelId}`;
          if (models.some((m) => m.id === aliasId)) continue;

          // Determine type from supportedEndpoints
          const endpoints = Array.isArray(model.supportedEndpoints)
            ? model.supportedEndpoints
            : ["chat"];
          const apiFormat =
            typeof model.apiFormat === "string" ? model.apiFormat : "chat-completions";
          let modelType: string | undefined;
          if (endpoints.includes("embeddings")) modelType = "embedding";
          else if (endpoints.includes("rerank")) modelType = "rerank";
          else if (endpoints.includes("images")) modelType = "image";
          else if (endpoints.includes("audio")) modelType = "audio";
          if (
            modelType &&
            hasEquivalentSpecialtyModel(canonicalProviderId, modelId, modelType, aliasId)
          ) {
            continue;
          }
          const visionFields =
            modelType === "chat" ? getCustomVisionCapabilityFields(model, aliasId, modelId) : null;

          if (includeAlias) {
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
            const providerVisionFields =
              modelType === "chat"
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

        const alias = providerIdToAlias[canonicalProviderId] || providerKey;
        if (
          !activeAliases.has(alias) &&
          !activeAliases.has(canonicalProviderId) &&
          !activeAliases.has(providerKey)
        ) {
          continue;
        }

        if (getModelIsHidden(canonicalProviderId, modelId)) continue;
        // #6328: apply hidePaidModels to alias-backed rows too. Alias mappings
        // point at providerKey/modelId with no pricing, so shouldHidePaid()
        // decides via the FREE_MODEL_IDS_BY_PROVIDER catalog tier.
        if (shouldHidePaid(canonicalProviderId, modelId)) continue;

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

        if (includeAlias) {
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
        if (getModelIsHidden(canonicalProviderId, modelId)) continue;
        // #6328: apply hidePaidModels to managed-fallback rows too. Compatible
        // provider fallbacks lack pricing; shouldHidePaid() decides via the
        // FREE_MODEL_IDS_BY_PROVIDER catalog tier.
        if (shouldHidePaid(canonicalProviderId, modelId, (model as { pricing?: unknown }).pricing))
          continue;
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
    finalModels = applyCatalogPostFilters(request, finalModels, {
      connections,
      prefixMode,
      aliasToProviderId,
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
      return modelId ? getTokenLimit(canonicalId, modelId) : getTokenLimit(canonicalId);
    };

    return finalizeCatalogResponse(request, finalModels, getDefaultContextFallback, {
      ...corsHeaders,
      ...diagnosticHeaders,
    });
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
