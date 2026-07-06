import { NextResponse } from "next/server";
import {
  isClaudeCodeCompatibleProvider,
  isAnthropicCompatibleProvider,
  isOpenAICompatibleProvider,
  NOAUTH_PROVIDERS,
} from "@/shared/constants/providers";
import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import { getModelsByProviderId } from "@/shared/constants/models";
import { getStaticModelsForProvider } from "@/lib/providers/staticModels";
import { isProviderBlockedByIdOrAlias } from "@/shared/utils/noAuthProviders";
import {
  getProviderConnectionById,
  getSettings,
  getModelIsHidden,
  resolveProxyForProvider,
} from "@/lib/localDb";
import {
  SAFE_OUTBOUND_FETCH_PRESETS,
  SafeOutboundFetchError,
  getSafeOutboundFetchErrorStatus,
  safeOutboundFetch,
} from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuard";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { getStaticQoderModels } from "@omniroute/open-sse/services/qoderCli.ts";
import { deriveConfigFromRegistryModelsUrl } from "./discoveryConfig";
import { fetchGitHubCopilotModels } from "@omniroute/open-sse/services/githubCopilotModels.ts";
import { fetchKiroAvailableModels } from "@omniroute/open-sse/services/kiroModels.ts";
import {
  buildGlmCodingHeaders,
  buildGlmModelsUrl,
} from "@omniroute/open-sse/config/glmProvider.ts";
import { getImageProvider } from "@omniroute/open-sse/config/imageRegistry.ts";
import { getVideoProvider } from "@omniroute/open-sse/config/videoRegistry.ts";
import {
  discoverBedrockNativeModels,
  isBedrockNativeApiError,
} from "@omniroute/open-sse/services/bedrock.ts";
import {
  AZURE_AI_DEFAULT_BASE_URL,
  buildAzureAiModelsUrl,
} from "@omniroute/open-sse/config/azureAi.ts";
import {
  DATAROBOT_DEFAULT_BASE_URL,
  buildDataRobotCatalogUrl,
  isDataRobotDeploymentUrl,
} from "@omniroute/open-sse/config/datarobot.ts";
import { OCI_DEFAULT_BASE_URL, buildOciModelsUrl } from "@omniroute/open-sse/config/oci.ts";
import {
  SAP_DEFAULT_BASE_URL,
  buildSapModelsUrl,
  getSapResourceGroup,
} from "@omniroute/open-sse/config/sap.ts";
import {
  WATSONX_DEFAULT_BASE_URL,
  buildWatsonxModelsUrl,
} from "@omniroute/open-sse/config/watsonx.ts";
import { getEmbeddingProvider } from "@omniroute/open-sse/config/embeddingRegistry.ts";
import { getRerankProvider } from "@omniroute/open-sse/config/rerankRegistry.ts";
import {
  getSpeechProvider,
  getTranscriptionProvider,
} from "@omniroute/open-sse/config/audioRegistry.ts";
import {
  getCachedDiscoveredModels,
  isAutoFetchModelsEnabled,
  persistDiscoveredModels,
} from "@/lib/providerModels/modelDiscovery";
import {
  parseGeminiModelsList,
  type GeminiDiscoveryModel,
} from "@/lib/providerModels/geminiModelsParser";
import { getSyncedAvailableModels, getCustomModels } from "@/lib/db/models";
import { fetchCursorAgentModels } from "@/lib/providerModels/cursorAgent";
import {
  type JsonRecord,
  asRecord,
  toNonEmptyString,
  getProviderBaseUrl,
  normalizeAzureOpenAIBaseUrl,
  getAzureOpenAIApiVersion,
  isLocalOpenAIStyleProvider,
  mergeLocalCatalogModels,
  buildOptionalBearerHeaders,
  buildNamedOpenAiStyleHeaders,
} from "./discovery/helpers";
import {
  fetchAntigravityDiscoveryModelsCached,
  normalizeDataRobotCatalogResponse,
  normalizeOpenAiLikeModelsResponse,
  normalizeSapModelsResponse,
} from "./discovery/normalizers";
import { isNamedOpenAIStyleProvider } from "./discovery/providerSets";
import { buildStaleEncryptionKeyResponse } from "./staleEncryptionGuard";
import {
  type ProviderModelsConfigEntry,
  PROVIDER_MODELS_CONFIG,
} from "./discovery/providerModelsConfig";

/**
 * GET /api/providers/[id]/models - Get models list from provider
 */
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const params = await context.params;
    const { id } = params;

    // Check if we should exclude hidden models (used by MCP tools to prevent hidden model leaks)
    const { searchParams } = new URL(request.url);
    const excludeHidden = searchParams.get("excludeHidden") === "true";
    const refresh = searchParams.get("refresh") === "true";

    const connection = await getProviderConnectionById(id);

    if (!connection) {
      // #3047 — no-auth providers have no connection rows; serve their catalog by provider id.
      const isNoAuthProvider =
        (NOAUTH_PROVIDERS as Record<string, { noAuth?: boolean }>)[id]?.noAuth === true;
      if (isNoAuthProvider) {
        if (isProviderBlockedByIdOrAlias(id, (await getSettings()).blockedProviders)) {
          return NextResponse.json({ error: "Provider is disabled" }, { status: 403 });
        }

        // #3611 — prefer the live public modelsUrl when present; fall back to local_catalog.
        const noAuthRegistryEntry = getRegistryEntry(id);
        const noAuthModelsUrl =
          typeof noAuthRegistryEntry?.modelsUrl === "string" &&
          noAuthRegistryEntry.modelsUrl.length > 0
            ? noAuthRegistryEntry.modelsUrl
            : null;

        if (noAuthModelsUrl) {
          try {
            const liveResponse = await safeOutboundFetch(noAuthModelsUrl, {
              ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
              guard: getProviderOutboundGuard(),
              method: "GET",
              headers: { "Content-Type": "application/json" },
            });

            if (liveResponse.ok) {
              const data = await liveResponse.json();
              const liveModels: Array<{ id: string; name: string }> = (
                (data.data || data.models || []) as Array<Record<string, unknown>>
              )
                .map((item) => {
                  const itemId = typeof item.id === "string" ? item.id.trim() : "";
                  if (!itemId) return null;
                  const itemName =
                    typeof item.display_name === "string"
                      ? item.display_name
                      : typeof item.name === "string"
                        ? item.name
                        : itemId;
                  return { id: itemId, name: itemName };
                })
                .filter((m): m is { id: string; name: string } => m !== null);

              if (liveModels.length > 0) {
                const visible = excludeHidden
                  ? liveModels.filter((m) => !getModelIsHidden(id, m.id))
                  : liveModels;
                return NextResponse.json({
                  provider: id,
                  connectionId: id,
                  models: visible,
                  source: "upstream",
                });
              }
            }
          } catch {
            // Live fetch failed — fall through to local_catalog below.
          }
        }

        const catalog = mergeLocalCatalogModels(
          getModelsByProviderId(id) || [],
          getStaticModelsForProvider(id) || []
        ).map((model) => ({ id: model.id, name: model.name || model.id }));
        const visible = excludeHidden
          ? catalog.filter((m) => !getModelIsHidden(id, m.id))
          : catalog;
        return NextResponse.json({
          provider: id,
          connectionId: id,
          models: visible,
          source: "local_catalog",
        });
      }
      return NextResponse.json({ error: "Connection not found" }, { status: 404 });
    }

    // #6148 — short-circuit when a stored credential is encrypted but no longer
    // decrypts (STORAGE_ENCRYPTION_KEY changed/unset). Otherwise the null key is
    // coerced to "", an empty-Bearer probe is sent, and the operator sees a
    // misleading "Auth failed: 401" instead of the real cause.
    const staleEncryptionResponse = buildStaleEncryptionKeyResponse(connection);
    if (staleEncryptionResponse) return staleEncryptionResponse;

    const provider =
      typeof connection.provider === "string" && connection.provider.trim().length > 0
        ? connection.provider
        : null;
    if (!provider) {
      return NextResponse.json({ error: "Invalid connection provider" }, { status: 400 });
    }

    // Resolve proxy for this provider (provider-level → global → direct)
    const proxy = await resolveProxyForProvider(provider);

    // #6247 — user-added custom models live in key_value namespace `customModels`
    // (getCustomModels). The live REST /api/v1/models merges them, but this
    // per-connection route (used by MCP list_models_catalog + the dashboard
    // import view) never did, so custom models were dropped on both the
    // discovery-success and local_catalog paths. Read them once here and fold
    // them into every models response via buildResponse below (dedup by id).
    let customModelsForProvider: Array<{ id: string; name?: string }> = [];
    try {
      const custom = await getCustomModels(provider);
      if (Array.isArray(custom)) {
        customModelsForProvider = custom as Array<{ id: string; name?: string }>;
      }
    } catch {
      // DB unavailable — proceed without custom models.
    }

    const mergeCustomModels = (models: any[]) => {
      if (customModelsForProvider.length === 0) return models;
      const base = Array.isArray(models) ? models : [];
      const existing = new Set(
        base.map((m) => (m && typeof m.id === "string" ? m.id : null)).filter(Boolean)
      );
      const extra = customModelsForProvider
        .filter((m) => m && typeof m.id === "string" && m.id.length > 0 && !existing.has(m.id))
        .map((m) => ({ id: m.id, name: m.name || m.id, owned_by: provider }));
      return extra.length > 0 ? [...base, ...extra] : base;
    };

    const buildResponse = (payload: any, statusConfig?: ResponseInit) => {
      if (payload.models && Array.isArray(payload.models)) {
        payload.models = mergeCustomModels(payload.models);
      }
      if (excludeHidden && payload.models && Array.isArray(payload.models)) {
        payload.models = payload.models.filter((m: any) => !getModelIsHidden(provider, m.id));
      }
      return NextResponse.json(payload, statusConfig);
    };

    const connectionId = typeof connection.id === "string" ? connection.id : id;
    const apiKey = typeof connection.apiKey === "string" ? connection.apiKey : "";
    const accessToken = typeof connection.accessToken === "string" ? connection.accessToken : "";
    const autoFetchModels = isAutoFetchModelsEnabled(connection.providerSpecificData);
    const cachedDiscoveryModels = await getCachedDiscoveredModels(provider, connectionId);

    // Check for synced models from ANY connection of this provider.
    // When sync has been performed (even on a different connection),
    // use the synced list as the authoritative source instead of static models.
    let providerSyncedModels: Array<{
      id: string;
      name: string;
      apiFormat?: string;
      supportedEndpoints?: string[];
    }> | null = null;
    try {
      const allSynced = await getSyncedAvailableModels(provider);
      if (Array.isArray(allSynced) && allSynced.length > 0) {
        providerSyncedModels = allSynced.map((m) => ({
          id: m.id,
          name: m.name || m.id,
          ...(m.apiFormat ? { apiFormat: m.apiFormat } : {}),
          ...(m.supportedEndpoints ? { supportedEndpoints: m.supportedEndpoints } : {}),
        }));
      }
    } catch {
      // DB unavailable — fall through to static catalog
    }

    const registryCatalogModels = providerSyncedModels ?? (getModelsByProviderId(provider) || []);
    const specialtyCatalogModels = providerSyncedModels
      ? []
      : getStaticModelsForProvider(provider) || [];

    const toLocalCatalogModels = () => {
      const localCatalog = mergeLocalCatalogModels(registryCatalogModels, specialtyCatalogModels);
      return localCatalog.map((model) => ({
        id: model.id,
        name: model.name || model.id,
        ...((model as Record<string, unknown>).apiFormat
          ? { apiFormat: (model as Record<string, unknown>).apiFormat as string | undefined }
          : {}),
        ...((model as Record<string, unknown>).supportedEndpoints
          ? {
              supportedEndpoints: (model as Record<string, unknown>).supportedEndpoints as
                string[] | undefined,
            }
          : {}),
        ...(registryCatalogModels.length > 0 ? { owned_by: provider } : {}),
      }));
    };

    const buildCachedDiscoveryResponse = (warning?: string) =>
      buildResponse({
        provider,
        connectionId,
        models: cachedDiscoveryModels,
        source: "cache",
        ...(warning ? { warning } : {}),
      });

    const buildLocalCatalogResponse = (warning?: string, intentional = false) => {
      const localModels = toLocalCatalogModels();
      if (localModels.length === 0) return null;
      return buildResponse({
        provider,
        connectionId,
        models: localModels,
        source: "local_catalog",
        // #5460/#5465 — flag catalogs that are the provider's ONLY discovery
        // source (no remote /models endpoint). model-sync imports these instead
        // of treating them as a degraded remote-fetch failure (502).
        ...(intentional ? { intentional: true } : {}),
        ...(warning ? { warning } : {}),
      });
    };

    const buildDiscoveryFallbackResponse = ({
      cacheWarning = "API unavailable — using cached catalog",
      localWarning = "API unavailable — using local catalog",
    }: {
      cacheWarning?: string;
      localWarning?: string;
    } = {}) => {
      if (cachedDiscoveryModels.length > 0) {
        return buildCachedDiscoveryResponse(cacheWarning);
      }
      return buildLocalCatalogResponse(localWarning);
    };

    const buildDiscoveryErrorFallbackResponse = (
      error: unknown,
      warnings?: {
        cacheWarning?: string;
        localWarning?: string;
      }
    ) => {
      // #6267 — a models-endpoint redirect (307/308) is not a fixable-config
      // error. safeOutboundFetch throws REDIRECT_BLOCKED which
      // getSafeOutboundFetchErrorStatus maps to 503, but unlike the other 503
      // cases (URL_GUARD_BLOCKED / INVALID_URL, which are genuinely
      // unrecoverable and stay hard errors) a blocked redirect should degrade to
      // the local/cached catalog OmniRoute ships instead of surfacing a raw 503.
      // General fix — covers any config-driven provider that 307s (e.g. qwen-web).
      if (error instanceof SafeOutboundFetchError && error.code === "REDIRECT_BLOCKED") {
        return buildDiscoveryFallbackResponse(warnings);
      }
      const status = getSafeOutboundFetchErrorStatus(error);
      if (status === 400 || status === 503 || status === 504) return null;
      return buildDiscoveryFallbackResponse(warnings);
    };

    const maybeReturnCachedDiscovery = () => {
      if (!refresh && cachedDiscoveryModels.length > 0) {
        return buildCachedDiscoveryResponse();
      }
      return null;
    };

    const maybeReturnAutoFetchDisabled = () => {
      if (refresh || autoFetchModels) return null;
      const fallback = buildDiscoveryFallbackResponse({
        cacheWarning: "Auto-fetch disabled — using cached catalog",
        localWarning: "Auto-fetch disabled — using local catalog",
      });
      if (fallback) return fallback;
      return buildResponse({
        provider,
        connectionId,
        models: [],
        source: "local_catalog",
        warning: "Auto-fetch disabled — no cached models available",
      });
    };

    const buildApiDiscoveryResponse = async (models: any[], warning?: string) => {
      const discoveredModels = await persistDiscoveredModels(provider, connectionId, models);
      if (discoveredModels.length > 0) {
        return buildResponse({
          provider,
          connectionId,
          models,
          source: "api",
          ...(warning ? { warning } : {}),
        });
      }

      // Empty discovery just cleared THIS connection's synced cache (via
      // persistDiscoveredModels([])). `providerSyncedModels` was read at the top
      // of the handler and is now stale, so it must not leak the just-cleared
      // models back into the response (#3148 made synced authoritative for the
      // normal path; here we re-read the current state instead). Re-derive the
      // local catalog from the provider's remaining synced models (union across
      // its other connections) or the static catalog when none remain.
      let freshSynced: Awaited<ReturnType<typeof getSyncedAvailableModels>> = [];
      try {
        freshSynced = await getSyncedAvailableModels(provider);
      } catch {
        /* DB unavailable — fall through to static catalog */
      }
      const freshRegistry = freshSynced.length
        ? freshSynced.map((m) => ({
            id: m.id,
            name: m.name || m.id,
            ...(m.apiFormat ? { apiFormat: m.apiFormat } : {}),
            ...(m.supportedEndpoints ? { supportedEndpoints: m.supportedEndpoints } : {}),
          }))
        : getModelsByProviderId(provider) || [];
      const freshSpecialty = freshSynced.length ? [] : getStaticModelsForProvider(provider) || [];
      const freshLocal = mergeLocalCatalogModels(freshRegistry, freshSpecialty).map((model) => ({
        id: model.id,
        name: model.name || model.id,
        ...((model as Record<string, unknown>).apiFormat
          ? { apiFormat: (model as Record<string, unknown>).apiFormat as string | undefined }
          : {}),
        ...((model as Record<string, unknown>).supportedEndpoints
          ? {
              supportedEndpoints: (model as Record<string, unknown>).supportedEndpoints as
                string[] | undefined,
            }
          : {}),
        ...(freshRegistry.length > 0 ? { owned_by: provider } : {}),
      }));
      if (freshLocal.length > 0) {
        return buildResponse({
          provider,
          connectionId,
          models: freshLocal,
          source: "local_catalog",
          warning: "No remote models discovered — using local catalog",
        });
      }

      return buildResponse({
        provider,
        connectionId,
        models: [],
        source: "api",
      });
    };

    if (provider === "reka") {
      // reka has no remote model-discovery endpoint — the local catalog is the
      // intended source, not a degraded fallback (#5460).
      const localCatalog = buildLocalCatalogResponse(undefined, true);
      if (localCatalog) return localCatalog;
    }

    if (provider === "bedrock") {
      const cachedResponse = maybeReturnCachedDiscovery();
      if (cachedResponse) return cachedResponse;

      const autoFetchDisabledResponse = maybeReturnAutoFetchDisabled();
      if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

      const token = apiKey || accessToken;
      if (!token) {
        const fallback = buildDiscoveryFallbackResponse({
          cacheWarning: "No token configured — using cached catalog",
          localWarning: "No token configured — using local catalog",
        });
        if (fallback) return fallback;
        return NextResponse.json(
          {
            error:
              "No API key configured for this provider. Please add an API key in the provider settings.",
          },
          { status: 400 }
        );
      }

      try {
        const discovery = await discoverBedrockNativeModels({
          apiKey: token,
          providerSpecificData: connection.providerSpecificData,
          fetcher: (url, init) =>
            safeOutboundFetch(url, {
              ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
              guard: getProviderOutboundGuard(),
              proxyConfig: proxy,
              ...init,
            }),
        });
        const models = discovery.models.map((model) => ({
          id: model.id,
          name: model.name || model.id,
          owned_by: model.provider || "bedrock",
          source: model.source,
          ...(model.supportsStreaming !== undefined
            ? { supportsStreaming: model.supportsStreaming }
            : {}),
          ...(model.supportsVision !== undefined ? { supportsVision: model.supportsVision } : {}),
          ...(typeof model.inputTokenLimit === "number"
            ? { inputTokenLimit: model.inputTokenLimit }
            : {}),
          ...(typeof model.outputTokenLimit === "number"
            ? { outputTokenLimit: model.outputTokenLimit }
            : {}),
        }));
        return buildApiDiscoveryResponse(models, discovery.warnings[0]);
      } catch (error) {
        const status = isBedrockNativeApiError(error)
          ? error.status
          : getSafeOutboundFetchErrorStatus(error);
        if (status === 401 || status === 403) {
          const fallback = buildDiscoveryFallbackResponse({
            cacheWarning: `Auth failed (${status}) — using cached catalog`,
            localWarning: `Auth failed (${status}) — using local catalog`,
          });
          if (fallback) return fallback;
          return NextResponse.json({ error: `Auth failed: ${status}` }, { status });
        }
        if (status === 400) {
          return NextResponse.json(
            { error: "Invalid Bedrock region or models request" },
            { status }
          );
        }
        const fallback = buildDiscoveryFallbackResponse({
          cacheWarning: "Bedrock models API unavailable — using cached catalog",
          localWarning: "Bedrock models API unavailable — using local catalog",
        });
        if (fallback) return fallback;
        if (status) {
          return NextResponse.json({ error: `Bedrock models API failed: ${status}` }, { status });
        }
        throw error;
      }
    }

    if (
      isOpenAICompatibleProvider(provider) ||
      isLocalOpenAIStyleProvider(provider) ||
      isNamedOpenAIStyleProvider(provider)
    ) {
      const cachedResponse = maybeReturnCachedDiscovery();
      if (cachedResponse) return cachedResponse;

      const autoFetchDisabledResponse = maybeReturnAutoFetchDisabled();
      if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

      const registryEntry =
        isLocalOpenAIStyleProvider(provider) || isNamedOpenAIStyleProvider(provider)
          ? getRegistryEntry(provider)
          : null;
      const rawBaseUrl =
        getProviderBaseUrl(connection.providerSpecificData) ||
        (typeof registryEntry?.baseUrl === "string" ? registryEntry.baseUrl : null);
      const baseUrl = rawBaseUrl;
      if (!baseUrl) {
        const fallback = buildDiscoveryFallbackResponse({
          cacheWarning: "Base URL unavailable — using cached catalog",
          localWarning: "Base URL unavailable — using local catalog",
        });
        if (fallback) return fallback;
        return NextResponse.json(
          {
            error: isOpenAICompatibleProvider(provider)
              ? "No base URL configured for OpenAI compatible provider"
              : isLocalOpenAIStyleProvider(provider)
                ? "No base URL configured for local provider"
                : "No base URL configured for provider",
          },
          { status: 400 }
        );
      }

      let base = baseUrl.replace(/\/$/, "");
      if (base.endsWith("/chat/completions")) {
        base = base.slice(0, -17);
      } else if (base.endsWith("/completions")) {
        base = base.slice(0, -12);
      }

      // Strip trailing /v1 unconditionally so the next step re-adds it exactly once.
      // Without this, baseUrls that embed /v1 (e.g. "https://api.airforce/v1/chat/completions")
      // become "…/v1" after stripping "/chat/completions", and then appending "/v1/models"
      // produces "…/v1/v1/models" — a 308 redirect that blocked model fetch (#5899).
      // Guard against a literal "scheme://v1" authority so we never strip the host itself.
      if (base.endsWith("/v1") && !base.endsWith("://v1")) {
        base = base.slice(0, -3);
      }

      // T39: Try multiple endpoint formats
      const endpoints = [
        `${base}/v1/models`,
        `${base}/models`,
        `${baseUrl.replace(/\/$/, "")}/models`, // Original fallback
      ];

      // Remove duplicates
      const uniqueEndpoints = [...new Set(endpoints)];
      let models = null;
      let lastErrorStatus = null;
      const token = apiKey || accessToken;

      for (const modelsUrl of uniqueEndpoints) {
        try {
          const response = await safeOutboundFetch(modelsUrl, {
            ...SAFE_OUTBOUND_FETCH_PRESETS.modelsProbe,
            guard: getProviderOutboundGuard(),
            proxyConfig: proxy,
            method: "GET",
            headers: isNamedOpenAIStyleProvider(provider)
              ? buildNamedOpenAiStyleHeaders(provider, token)
              : buildOptionalBearerHeaders(token),
          });

          if (response.ok) {
            const data = await response.json();
            models = isNamedOpenAIStyleProvider(provider)
              ? normalizeOpenAiLikeModelsResponse(data, provider)
              : data.data || data.models || [];
            break; // Success!
          }

          if (response.status === 401 || response.status === 403) {
            lastErrorStatus = response.status;
            throw new Error("auth_failed");
          }
        } catch (err: any) {
          if (err.message === "auth_failed") break; // Don't try other endpoints if auth failed

          if (err?.code === "REDIRECT_BLOCKED") {
            continue; // Try next endpoint
          }

          const status = getSafeOutboundFetchErrorStatus(err);
          if (status) {
            throw err;
          }
        }
      }

      // If all endpoints failed (but not because of auth), fallback to local catalog
      if (!models) {
        const fallback = buildDiscoveryFallbackResponse({
          cacheWarning:
            lastErrorStatus === 401 || lastErrorStatus === 403
              ? `Auth failed (${lastErrorStatus}) — using cached catalog`
              : "API unavailable — using cached catalog",
          localWarning:
            lastErrorStatus === 401 || lastErrorStatus === 403
              ? `Auth failed (${lastErrorStatus}) — using local catalog`
              : "API unavailable — using local catalog",
        });
        if (fallback) return fallback;

        if (lastErrorStatus === 401 || lastErrorStatus === 403) {
          return NextResponse.json(
            { error: `Auth failed: ${lastErrorStatus}` },
            { status: lastErrorStatus }
          );
        }

        console.warn(`[models] All endpoints failed for ${provider}, using local catalog`);
        models = toLocalCatalogModels();
        return buildResponse({
          provider,
          connectionId,
          models,
          source: "local_catalog",
          warning: "API unavailable — using local catalog",
        });
      }
      return buildApiDiscoveryResponse(models);
    }

    if (provider === "datarobot") {
      const cachedResponse = maybeReturnCachedDiscovery();
      if (cachedResponse) return cachedResponse;

      const autoFetchDisabledResponse = maybeReturnAutoFetchDisabled();
      if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

      const token = accessToken || apiKey;
      if (!token) {
        const fallback = buildDiscoveryFallbackResponse({
          cacheWarning: "No token configured — using cached catalog",
          localWarning: "No token configured — using local catalog",
        });
        if (fallback) return fallback;
        return NextResponse.json(
          {
            error:
              "No API key configured for this provider. Please add an API key in the provider settings.",
          },
          { status: 400 }
        );
      }

      const configuredBaseUrl =
        getProviderBaseUrl(connection.providerSpecificData) || DATAROBOT_DEFAULT_BASE_URL;

      if (isDataRobotDeploymentUrl(configuredBaseUrl)) {
        const fallback = buildDiscoveryFallbackResponse({
          cacheWarning: "Deployment URL does not expose catalog — using cached catalog",
          localWarning: "Deployment URL does not expose catalog — using local catalog",
        });
        if (fallback) return fallback;
        return buildResponse({
          provider,
          connectionId,
          models: toLocalCatalogModels(),
          source: "local_catalog",
          warning: "Deployment URL does not expose catalog — using local catalog",
        });
      }

      const catalogUrl = buildDataRobotCatalogUrl(configuredBaseUrl);
      if (!catalogUrl) {
        const fallback = buildDiscoveryFallbackResponse({
          cacheWarning: "Invalid DataRobot base URL — using cached catalog",
          localWarning: "Invalid DataRobot base URL — using local catalog",
        });
        if (fallback) return fallback;
        return NextResponse.json({ error: "Invalid DataRobot base URL" }, { status: 400 });
      }

      let response: Response;
      try {
        response = await safeOutboundFetch(catalogUrl, {
          ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
          guard: getProviderOutboundGuard(),
          proxyConfig: proxy,
          method: "GET",
          headers: buildOptionalBearerHeaders(token),
        });
      } catch (error) {
        const fallback = buildDiscoveryErrorFallbackResponse(error, {
          cacheWarning: "DataRobot catalog unavailable — using cached catalog",
          localWarning: "DataRobot catalog unavailable — using local catalog",
        });
        if (fallback) return fallback;
        throw error;
      }

      if (!response.ok) {
        const fallback = buildDiscoveryFallbackResponse({
          cacheWarning: `Catalog probe failed (${response.status}) — using cached catalog`,
          localWarning: `Catalog probe failed (${response.status}) — using local catalog`,
        });
        if (fallback) return fallback;
        return NextResponse.json(
          { error: `Failed to fetch models: ${response.status}` },
          { status: response.status }
        );
      }

      const models = normalizeDataRobotCatalogResponse(await response.json());
      return buildApiDiscoveryResponse(
        models.map((model) => ({
          ...model,
          owned_by: "datarobot",
        }))
      );
    }

    if (provider === "azure-ai") {
      const cachedResponse = maybeReturnCachedDiscovery();
      if (cachedResponse) return cachedResponse;

      const autoFetchDisabledResponse = maybeReturnAutoFetchDisabled();
      if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

      const token = accessToken || apiKey;
      if (!token) {
        const fallback = buildDiscoveryFallbackResponse({
          cacheWarning: "No token configured — using cached catalog",
          localWarning: "No token configured — using local catalog",
        });
        if (fallback) return fallback;
        return NextResponse.json(
          {
            error:
              "No API key configured for this provider. Please add an API key in the provider settings.",
          },
          { status: 400 }
        );
      }

      const baseUrl =
        getProviderBaseUrl(connection.providerSpecificData) || AZURE_AI_DEFAULT_BASE_URL;
      const modelsUrl = buildAzureAiModelsUrl(baseUrl);

      let response: Response;
      try {
        response = await safeOutboundFetch(modelsUrl, {
          ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
          guard: getProviderOutboundGuard(),
          proxyConfig: proxy,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "api-key": token,
          },
        });
      } catch (error) {
        const fallback = buildDiscoveryErrorFallbackResponse(error, {
          cacheWarning: "Azure AI models API unavailable — using cached catalog",
          localWarning: "Azure AI models API unavailable — using local catalog",
        });
        if (fallback) return fallback;
        throw error;
      }

      if (!response.ok) {
        const fallback = buildDiscoveryFallbackResponse({
          cacheWarning: `Models probe failed (${response.status}) — using cached catalog`,
          localWarning: `Models probe failed (${response.status}) — using local catalog`,
        });
        if (fallback) return fallback;
        return NextResponse.json(
          { error: `Failed to fetch models: ${response.status}` },
          { status: response.status }
        );
      }

      const data = await response.json();
      const models = (data.data || data.models || []).map((model: Record<string, unknown>) => ({
        id:
          (typeof model.id === "string" && model.id) ||
          (typeof model.name === "string" && model.name) ||
          "",
        name:
          (typeof model.display_name === "string" && model.display_name) ||
          (typeof model.name === "string" && model.name) ||
          (typeof model.id === "string" && model.id) ||
          "",
        owned_by: "azure-ai",
      }));

      return buildApiDiscoveryResponse(models.filter((model) => model.id));
    }

    if (provider === "azure-openai") {
      const cachedResponse = maybeReturnCachedDiscovery();
      if (cachedResponse) return cachedResponse;

      const autoFetchDisabledResponse = maybeReturnAutoFetchDisabled();
      if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

      const token = accessToken || apiKey;
      if (!token) {
        return NextResponse.json(
          {
            error:
              "No API key configured for this provider. Please add an API key in the provider settings.",
          },
          { status: 400 }
        );
      }

      const rawBaseUrl = getProviderBaseUrl(connection.providerSpecificData);
      if (!rawBaseUrl) {
        return NextResponse.json(
          { error: "No Azure OpenAI resource endpoint configured" },
          { status: 400 }
        );
      }

      const baseUrl = normalizeAzureOpenAIBaseUrl(rawBaseUrl);
      const apiVersion = encodeURIComponent(
        getAzureOpenAIApiVersion(connection.providerSpecificData)
      );
      const discoveryUrls = [
        `${baseUrl}/openai/deployments?api-version=${apiVersion}`,
        `${baseUrl}/openai/models?api-version=${apiVersion}`,
      ];

      let lastStatus = 0;
      for (const modelsUrl of discoveryUrls) {
        let response: Response;
        try {
          response = await safeOutboundFetch(modelsUrl, {
            ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
            guard: getProviderOutboundGuard(),
            proxyConfig: proxy,
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "api-key": token,
            },
          });
        } catch (error) {
          const fallback = buildDiscoveryErrorFallbackResponse(error, {
            cacheWarning: "Azure OpenAI models API unavailable — using cached catalog",
            localWarning: "Azure OpenAI models API unavailable — using local catalog",
          });
          if (fallback) return fallback;
          throw error;
        }

        if (response.ok) {
          return buildApiDiscoveryResponse(
            normalizeOpenAiLikeModelsResponse(await response.json(), "azure-openai")
          );
        }

        lastStatus = response.status;
        if (response.status === 401 || response.status === 403) break;
      }

      const fallback = buildDiscoveryFallbackResponse({
        cacheWarning: `Azure OpenAI models probe failed (${lastStatus}) — using cached catalog`,
        localWarning: `Azure OpenAI models probe failed (${lastStatus}) — using local catalog`,
      });
      if (fallback) return fallback;
      return NextResponse.json(
        { error: `Failed to fetch models: ${lastStatus || "unknown"}` },
        { status: lastStatus || 502 }
      );
    }

    if (provider === "watsonx") {
      const cachedResponse = maybeReturnCachedDiscovery();
      if (cachedResponse) return cachedResponse;

      const autoFetchDisabledResponse = maybeReturnAutoFetchDisabled();
      if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

      const token = accessToken || apiKey;
      if (!token) {
        const fallback = buildDiscoveryFallbackResponse({
          cacheWarning: "No token configured — using cached catalog",
          localWarning: "No token configured — using local catalog",
        });
        if (fallback) return fallback;
        return NextResponse.json(
          {
            error:
              "No API key configured for this provider. Please add an API key in the provider settings.",
          },
          { status: 400 }
        );
      }

      const baseUrl =
        getProviderBaseUrl(connection.providerSpecificData) || WATSONX_DEFAULT_BASE_URL;

      let response: Response;
      try {
        response = await safeOutboundFetch(buildWatsonxModelsUrl(baseUrl), {
          ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
          guard: getProviderOutboundGuard(),
          proxyConfig: proxy,
          method: "GET",
          headers: buildOptionalBearerHeaders(token),
        });
      } catch (error) {
        const fallback = buildDiscoveryErrorFallbackResponse(error, {
          cacheWarning: "watsonx models API unavailable — using cached catalog",
          localWarning: "watsonx models API unavailable — using local catalog",
        });
        if (fallback) return fallback;
        throw error;
      }

      if (!response.ok) {
        const fallback = buildDiscoveryFallbackResponse({
          cacheWarning: `Models probe failed (${response.status}) — using cached catalog`,
          localWarning: `Models probe failed (${response.status}) — using local catalog`,
        });
        if (fallback) return fallback;
        return NextResponse.json(
          { error: `Failed to fetch models: ${response.status}` },
          { status: response.status }
        );
      }

      return buildApiDiscoveryResponse(
        normalizeOpenAiLikeModelsResponse(await response.json(), "watsonx")
      );
    }

    if (provider === "oci") {
      const cachedResponse = maybeReturnCachedDiscovery();
      if (cachedResponse) return cachedResponse;

      const autoFetchDisabledResponse = maybeReturnAutoFetchDisabled();
      if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

      const token = accessToken || apiKey;
      if (!token) {
        const fallback = buildDiscoveryFallbackResponse({
          cacheWarning: "No token configured — using cached catalog",
          localWarning: "No token configured — using local catalog",
        });
        if (fallback) return fallback;
        return NextResponse.json(
          {
            error:
              "No API key configured for this provider. Please add an API key in the provider settings.",
          },
          { status: 400 }
        );
      }

      const psd = asRecord(connection.providerSpecificData);
      const baseUrl = getProviderBaseUrl(psd) || OCI_DEFAULT_BASE_URL;
      const projectId =
        connection.projectId || toNonEmptyString(psd.projectId) || toNonEmptyString(psd.project);

      let response: Response;
      try {
        response = await safeOutboundFetch(buildOciModelsUrl(baseUrl), {
          ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
          guard: getProviderOutboundGuard(),
          proxyConfig: proxy,
          method: "GET",
          headers: {
            ...buildOptionalBearerHeaders(token),
            ...(projectId ? { "OpenAI-Project": projectId } : {}),
          },
        });
      } catch (error) {
        const fallback = buildDiscoveryErrorFallbackResponse(error, {
          cacheWarning: "OCI models API unavailable — using cached catalog",
          localWarning: "OCI models API unavailable — using local catalog",
        });
        if (fallback) return fallback;
        throw error;
      }

      if (!response.ok) {
        const fallback = buildDiscoveryFallbackResponse({
          cacheWarning: `Models probe failed (${response.status}) — using cached catalog`,
          localWarning: `Models probe failed (${response.status}) — using local catalog`,
        });
        if (fallback) return fallback;
        return NextResponse.json(
          { error: `Failed to fetch models: ${response.status}` },
          { status: response.status }
        );
      }

      return buildApiDiscoveryResponse(
        normalizeOpenAiLikeModelsResponse(await response.json(), "oci")
      );
    }

    if (provider === "sap") {
      const cachedResponse = maybeReturnCachedDiscovery();
      if (cachedResponse) return cachedResponse;

      const autoFetchDisabledResponse = maybeReturnAutoFetchDisabled();
      if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

      const token = accessToken || apiKey;
      if (!token) {
        const fallback = buildDiscoveryFallbackResponse({
          cacheWarning: "No token configured — using cached catalog",
          localWarning: "No token configured — using local catalog",
        });
        if (fallback) return fallback;
        return NextResponse.json(
          {
            error:
              "No API key configured for this provider. Please add an API key in the provider settings.",
          },
          { status: 400 }
        );
      }

      const psd = asRecord(connection.providerSpecificData);
      const baseUrl = getProviderBaseUrl(psd) || SAP_DEFAULT_BASE_URL;
      const resourceGroup = getSapResourceGroup(psd);

      let response: Response;
      try {
        response = await safeOutboundFetch(buildSapModelsUrl(baseUrl), {
          ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
          guard: getProviderOutboundGuard(),
          proxyConfig: proxy,
          method: "GET",
          headers: {
            ...buildOptionalBearerHeaders(token),
            "AI-Resource-Group": resourceGroup,
          },
        });
      } catch (error) {
        const fallback = buildDiscoveryErrorFallbackResponse(error, {
          cacheWarning: "SAP models API unavailable — using cached catalog",
          localWarning: "SAP models API unavailable — using local catalog",
        });
        if (fallback) return fallback;
        throw error;
      }

      if (!response.ok) {
        const fallback = buildDiscoveryFallbackResponse({
          cacheWarning: `Models probe failed (${response.status}) — using cached catalog`,
          localWarning: `Models probe failed (${response.status}) — using local catalog`,
        });
        if (fallback) return fallback;
        return NextResponse.json(
          { error: `Failed to fetch models: ${response.status}` },
          { status: response.status }
        );
      }

      return buildApiDiscoveryResponse(normalizeSapModelsResponse(await response.json()));
    }

    if (provider === "claude") {
      return buildResponse({
        provider,
        connectionId,
        models: getStaticModelsForProvider("claude") || [],
      });
    }

    if (provider === "cursor") {
      const cachedResponse = maybeReturnCachedDiscovery();
      if (cachedResponse) return cachedResponse;

      const autoFetchDisabledResponse = maybeReturnAutoFetchDisabled();
      if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

      try {
        const models = await fetchCursorAgentModels();
        return buildApiDiscoveryResponse(models);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.log("[models] cursor-agent fetch failed:", message);
        const fallback = buildDiscoveryFallbackResponse({
          cacheWarning: `cursor-agent unavailable (${message}) — using cached catalog`,
          localWarning: `cursor-agent unavailable (${message}) — using local catalog`,
        });
        if (fallback) return fallback;
        return NextResponse.json(
          { error: `Failed to fetch Cursor models: ${message}` },
          { status: 502 }
        );
      }
    }

    if (provider === "inner-ai") {
      const cachedResponse = maybeReturnCachedDiscovery();
      if (cachedResponse) return cachedResponse;

      const autoFetchDisabledResponse = maybeReturnAutoFetchDisabled();
      if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

      try {
        // Parse "TOKEN EMAIL" credential format
        const raw = apiKey.trim();
        const eqIdx = raw.indexOf("=");
        const stripped = eqIdx > 0 && !raw.startsWith("eyJ") ? raw.slice(eqIdx + 1).trim() : raw;
        const lastSpace = stripped.lastIndexOf(" ");
        let innerAiToken = stripped;
        let innerAiEmail = "";
        if (lastSpace > 0) {
          const possibleEmail = stripped.slice(lastSpace + 1).trim();
          if (possibleEmail.includes("@")) {
            innerAiToken = stripped.slice(0, lastSpace).trim();
            innerAiEmail = possibleEmail;
          }
        }

        // Decode device_id from JWT payload
        let innerAiDeviceId = "";
        try {
          const parts = innerAiToken.split(".");
          if (parts.length >= 2) {
            const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
            const payload = JSON.parse(Buffer.from(b64, "base64").toString("utf8"));
            innerAiDeviceId = String(
              payload?.device_id ??
                payload?.deviceId ??
                payload?.["device-id"] ??
                payload?.did ??
                ""
            ).trim();
          }
        } catch {
          /* ignore */
        }

        const innerAiHeaders: Record<string, string> = {
          "USER-TOKEN": innerAiToken,
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
          Origin: "https://app.innerai.com",
          Referer: "https://app.innerai.com/",
        };
        if (innerAiEmail) innerAiHeaders["USER-EMAIL"] = innerAiEmail;
        if (innerAiDeviceId) innerAiHeaders["DEVICE-ID"] = innerAiDeviceId;

        const modelsResp = await safeOutboundFetch(
          "https://platformapi.innerai.com/api/v1/ai_models",
          { headers: innerAiHeaders },
          getProviderOutboundGuard(provider)
        );
        if (!modelsResp.ok) {
          throw new Error(`Inner.ai models API returned HTTP ${modelsResp.status}`);
        }

        const modelsBody = await modelsResp.json().catch(() => null);
        const rawModels: Array<Record<string, unknown>> = Array.isArray(modelsBody?.ai_models)
          ? modelsBody.ai_models
          : Array.isArray(modelsBody)
            ? modelsBody
            : [];

        // Filter: enabled, available, text/chat category only.
        // Use ai_model_categories[].unique_identifier === "text" when available;
        // fall back to llm_model name heuristic for models without categories.
        const nonTextPattern =
          /image|video|audio|img|vid|sound|music|voice|tts|stt|track|clip|avatar|cartoon|flux|stable.diff|recraft|ideogram|leonardo|magnific|bria|seedream|luma|kling|pika|veo|wan-|heygen|did-|vidu|pixverse|sora-|gen-[0-9]|playground|gemini-fal|gamma|lyria|clothes|whisper/i;
        const textModels = rawModels.filter((m) => {
          if (m.enable === false || m.unavailable_api) return false;
          if (typeof m.llm_model !== "string") return false;
          const cats = Array.isArray(m.ai_model_categories) ? m.ai_model_categories : null;
          if (cats && cats.length > 0) {
            return cats.some(
              (c: Record<string, unknown>) =>
                String(c.unique_identifier ?? c.name ?? "").toLowerCase() === "text"
            );
          }
          // No categories field — fall back to name heuristic
          return !nonTextPattern.test(m.llm_model as string);
        });

        const models = textModels.map((m) => ({
          id: String(m.llm_model),
          name: String(m.name || m.llm_model),
        }));

        return buildApiDiscoveryResponse(models);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        const fallback = buildDiscoveryFallbackResponse({
          cacheWarning: `Inner.ai models unavailable (${message}) — using cached catalog`,
          localWarning: `Inner.ai models unavailable (${message}) — using local catalog`,
        });
        if (fallback) return fallback;
        return NextResponse.json(
          { error: `Failed to fetch Inner.ai models: ${message}` },
          { status: 502 }
        );
      }
    }

    if (provider === "glm" || provider === "glm-cn" || provider === "glmt") {
      const cachedResponse = maybeReturnCachedDiscovery();
      if (cachedResponse) return cachedResponse;

      const autoFetchDisabledResponse = maybeReturnAutoFetchDisabled();
      if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

      const token = apiKey || accessToken;
      const glmProviderSpecificData = {
        ...asRecord(connection.providerSpecificData),
        ...(provider === "glm-cn" ? { apiRegion: "china" } : {}),
      };
      const discoveredTargets = [
        {
          transport: "openai" as const,
          url: buildGlmModelsUrl(glmProviderSpecificData, "openai"),
        },
        {
          transport: "anthropic" as const,
          url: buildGlmModelsUrl(glmProviderSpecificData, "anthropic"),
        },
      ];
      const discoveryTargets = discoveredTargets.filter(
        (target, index, all) => all.findIndex((other) => other.url === target.url) === index
      );

      let response: Response | null = null;
      try {
        for (const target of discoveryTargets) {
          response = await safeOutboundFetch(target.url, {
            ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
            guard: getProviderOutboundGuard(),
            proxyConfig: proxy,
            method: "GET",
            headers:
              target.transport === "openai"
                ? token
                  ? buildGlmCodingHeaders(token, false)
                  : { "Content-Type": "application/json", Accept: "application/json" }
                : {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    ...(token ? { "x-api-key": token } : {}),
                    "anthropic-version": "2023-06-01",
                  },
          });
          if (response.ok) break;
          if (response.status === 401 || response.status === 403) break;
        }
      } catch (error) {
        const fallback = buildDiscoveryErrorFallbackResponse(error);
        if (fallback) return fallback;
        throw error;
      }

      if (!response?.ok) {
        if (response?.status === 401 || response?.status === 403) {
          return NextResponse.json(
            { error: `Failed to fetch models: ${response.status}` },
            { status: response.status }
          );
        }
        const fallback = buildDiscoveryFallbackResponse();
        if (fallback) return fallback;
        return NextResponse.json(
          { error: `Failed to fetch models: ${response?.status || 502}` },
          { status: response?.status || 502 }
        );
      }

      const data = await response.json();
      const models = data.data || data.models || [];

      return buildApiDiscoveryResponse(models);
    }

    if (provider === "antigravity") {
      const cachedResponse = maybeReturnCachedDiscovery();
      if (cachedResponse) return cachedResponse;

      const autoFetchDisabledResponse = maybeReturnAutoFetchDisabled();
      if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

      const staticModels = getStaticModelsForProvider("antigravity") || [];

      if (!accessToken) {
        const fallback = buildDiscoveryFallbackResponse({
          cacheWarning: "OAuth token unavailable — using cached catalog",
          localWarning: "OAuth token unavailable — using local catalog",
        });
        if (fallback) return fallback;
        return buildResponse({
          provider,
          connectionId,
          models: staticModels,
          source: "local_catalog",
          warning: "OAuth token unavailable — using local catalog",
        });
      }

      const remoteModels = await fetchAntigravityDiscoveryModelsCached(
        accessToken,
        connectionId,
        proxy,
        connection.providerSpecificData
      );
      if (remoteModels.length > 0) {
        return buildApiDiscoveryResponse(remoteModels);
      }

      const fallback = buildDiscoveryFallbackResponse();
      if (fallback) return fallback;

      return buildResponse({
        provider,
        connectionId,
        models: staticModels,
        source: "local_catalog",
        warning: "API unavailable — using local catalog",
      });
    }

    if (provider === "github") {
      // #3120/#3121 — GitHub Copilot's catalog is per-account and dynamic. The
      // registry static list never refreshes and advertises non-entitled models
      // (e.g. gemini previews) that fail upstream when tested. Discover the live
      // catalog from api.githubcopilot.com/models with the Copilot bearer +
      // Copilot chat headers; fall back to the static registry catalog when the
      // live fetch is unavailable (offline/unauthed/error) so import never breaks.
      const cachedResponse = maybeReturnCachedDiscovery();
      if (cachedResponse) return cachedResponse;

      const autoFetchDisabledResponse = maybeReturnAutoFetchDisabled();
      if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

      const psd = asRecord(connection.providerSpecificData);
      // The /models endpoint requires the short-lived Copilot token (same as the
      // chat executor), not the raw GitHub OAuth access token.
      const copilotToken =
        toNonEmptyString(psd.copilotToken) || toNonEmptyString(accessToken) || null;

      const discovery = await fetchGitHubCopilotModels({
        token: copilotToken,
        fetchImpl: (url, init) =>
          safeOutboundFetch(url as string, {
            ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
            guard: getProviderOutboundGuard(),
            proxyConfig: proxy,
            ...(init as Record<string, unknown>),
          }),
        fallbackModels: toLocalCatalogModels(),
      });

      if (discovery.source === "api") {
        return buildApiDiscoveryResponse(discovery.models);
      }

      // Live discovery unavailable — preserve cached/static catalog behavior.
      const fallback = buildDiscoveryFallbackResponse({
        cacheWarning: "Copilot models API unavailable — using cached catalog",
        localWarning: "Copilot models API unavailable — using local catalog",
      });
      if (fallback) return fallback;
      return buildResponse({
        provider,
        connectionId,
        models: discovery.models,
        source: "local_catalog",
        warning: "Copilot models API unavailable — using local catalog",
      });
    }

    if (provider === "kiro") {
      // Kiro's catalog is per-account / per-tier (free vs Pro vs Power) and, for
      // IAM Identity Center orgs, an admin-curated approved list. The static
      // registry catalog can't reflect that. Discover the live list from the
      // CodeWhisperer ListAvailableModels API with the stored OAuth token
      // (works for Builder ID / social AND IAM Identity Center accounts); fall
      // back to the static registry catalog when the token is missing/expired or
      // the upstream is unavailable so import never breaks.
      const cachedResponse = maybeReturnCachedDiscovery();
      if (cachedResponse) return cachedResponse;

      const autoFetchDisabledResponse = maybeReturnAutoFetchDisabled();
      if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

      if (!accessToken) {
        const fallback = buildDiscoveryFallbackResponse({
          cacheWarning: "OAuth token unavailable — using cached catalog",
          localWarning: "OAuth token unavailable — using local catalog",
        });
        if (fallback) return fallback;
        return buildResponse({
          provider,
          connectionId,
          models: toLocalCatalogModels(),
          source: "local_catalog",
          warning: "OAuth token unavailable — using local catalog",
        });
      }

      const discovery = await fetchKiroAvailableModels({
        accessToken,
        providerSpecificData: connection.providerSpecificData,
        fetchImpl: (url, init) =>
          safeOutboundFetch(url as string, {
            ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
            guard: getProviderOutboundGuard(),
            proxyConfig: proxy,
            ...(init as Record<string, unknown>),
          }),
        fallbackModels: toLocalCatalogModels(),
      });

      if (discovery.source === "api" && discovery.models.length > 0) {
        return buildApiDiscoveryResponse(discovery.models);
      }

      const fallback = buildDiscoveryFallbackResponse({
        cacheWarning: "Kiro models API unavailable — using cached catalog",
        localWarning: "Kiro models API unavailable — using local catalog",
      });
      if (fallback) return fallback;
      return buildResponse({
        provider,
        connectionId,
        models: discovery.models,
        source: "local_catalog",
        warning: "Kiro models API unavailable — using local catalog",
      });
    }

    if (provider === "vertex" || provider === "vertex-partner") {
      const cachedResponse = maybeReturnCachedDiscovery();
      if (cachedResponse) return cachedResponse;

      const autoFetchDisabledResponse = maybeReturnAutoFetchDisabled();
      if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

      // Vertex AI lists models from the Generative Language `v1beta/models` endpoint, which both
      // Express-mode API keys (via ?key=) and Service Account JSON (via a minted OAuth Bearer
      // token) can reach. This surfaces the full live catalog — including image models
      // (imagen-*, gemini-*-image) absent from the static registry list.
      const credential = (apiKey || "").trim();
      let queryKey: string | null = null;
      let bearerToken: string | null = null;
      try {
        const { parseSAFromApiKey, getAccessToken } =
          await import("@omniroute/open-sse/executors/vertex.ts");
        if (accessToken) {
          bearerToken = accessToken;
        } else if (credential) {
          // A Service Account credential is a JSON object; a Vertex AI Express-mode API key is an
          // opaque (non-JSON) string. Detect locally so this branch has no dependency on optional
          // executor helpers.
          let isServiceAccountJson = false;
          try {
            const parsed = JSON.parse(credential);
            isServiceAccountJson = !!parsed && typeof parsed === "object" && !Array.isArray(parsed);
          } catch {
            isServiceAccountJson = false;
          }

          if (isServiceAccountJson) {
            bearerToken = await getAccessToken(parseSAFromApiKey(credential));
          } else {
            queryKey = credential;
          }
        }
      } catch (error) {
        // Couldn't resolve a usable credential (e.g. malformed Service Account JSON).
        const fallback = buildDiscoveryErrorFallbackResponse(error, {
          cacheWarning: "Vertex credential unavailable — using cached catalog",
          localWarning: "Vertex credential unavailable — using local catalog",
        });
        if (fallback) return fallback;
      }

      if (!queryKey && !bearerToken) {
        const fallback = buildDiscoveryFallbackResponse({
          cacheWarning: "No usable Vertex credential — using cached catalog",
          localWarning: "No usable Vertex credential — using local catalog",
        });
        if (fallback) return fallback;
        return NextResponse.json(
          { error: "No usable Vertex AI credential configured for model discovery." },
          { status: 400 }
        );
      }

      const baseUrl = "https://generativelanguage.googleapis.com/v1beta/models?pageSize=1000";
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (bearerToken) headers["Authorization"] = `Bearer ${bearerToken}`;

      const allModels: GeminiDiscoveryModel[] = [];
      let pageUrl = queryKey ? `${baseUrl}&key=${encodeURIComponent(queryKey)}` : baseUrl;
      let pageCount = 0;
      const MAX_PAGES = 20;
      const seenTokens = new Set<string>();

      try {
        while (pageUrl && pageCount < MAX_PAGES) {
          pageCount++;
          const response = await safeOutboundFetch(pageUrl, {
            ...SAFE_OUTBOUND_FETCH_PRESETS.modelsPagination,
            guard: getProviderOutboundGuard(),
            proxyConfig: proxy,
            method: "GET",
            headers,
          });

          if (!response.ok) {
            // Avoid logging the raw upstream body (may contain sensitive data); status is enough.
            console.log("[models] Vertex model discovery failed", {
              provider,
              status: response.status,
            });
            const fallback = buildDiscoveryFallbackResponse();
            if (fallback) return fallback;
            return NextResponse.json(
              { error: `Failed to fetch Vertex models: ${response.status}` },
              { status: response.status }
            );
          }

          const data = await response.json();
          allModels.push(...parseGeminiModelsList(data));

          const nextPageToken = data.nextPageToken;
          if (!nextPageToken || seenTokens.has(nextPageToken)) break;
          seenTokens.add(nextPageToken);
          pageUrl = `${baseUrl}&pageToken=${encodeURIComponent(nextPageToken)}`;
          if (queryKey) pageUrl += `&key=${encodeURIComponent(queryKey)}`;
        }
      } catch (error) {
        const fallback = buildDiscoveryErrorFallbackResponse(error);
        if (fallback) return fallback;
        throw error;
      }

      if (allModels.length > 0) {
        return buildApiDiscoveryResponse(allModels);
      }

      const fallback = buildDiscoveryFallbackResponse();
      if (fallback) return fallback;
      return buildResponse({
        provider,
        connectionId,
        models: [],
        source: "api",
      });
    }

    if (isAnthropicCompatibleProvider(provider)) {
      const cachedResponse = maybeReturnCachedDiscovery();
      if (cachedResponse) return cachedResponse;

      const autoFetchDisabledResponse = maybeReturnAutoFetchDisabled();
      if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

      if (isClaudeCodeCompatibleProvider(provider)) {
        return NextResponse.json(
          { error: `Provider ${provider} does not support models listing` },
          { status: 400 }
        );
      }

      let baseUrl = getProviderBaseUrl(connection.providerSpecificData);
      if (!baseUrl) {
        const fallback = buildDiscoveryFallbackResponse({
          cacheWarning: "Base URL unavailable — using cached catalog",
          localWarning: "Base URL unavailable — using local catalog",
        });
        if (fallback) return fallback;
        return NextResponse.json(
          { error: "No base URL configured for Anthropic compatible provider" },
          { status: 400 }
        );
      }

      baseUrl = baseUrl.replace(/\/$/, "");
      if (baseUrl.endsWith("/messages")) {
        baseUrl = baseUrl.slice(0, -9);
      }

      // Use modelsPath from provider node if available, otherwise default to /models
      const psd = asRecord(connection.providerSpecificData);
      const modelsPath = toNonEmptyString(psd.modelsPath) || "/models";
      const url = `${baseUrl}${modelsPath}`;
      const token = accessToken || apiKey;
      let response: Response;
      try {
        response = await safeOutboundFetch(url, {
          ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
          guard: getProviderOutboundGuard(),
          proxyConfig: proxy,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(apiKey ? { "x-api-key": apiKey } : {}),
            "anthropic-version": "2023-06-01",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
      } catch (error) {
        const fallback = buildDiscoveryErrorFallbackResponse(error);
        if (fallback) return fallback;
        throw error;
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error fetching models from provider", { provider, errorText });
        const fallback = buildDiscoveryFallbackResponse();
        if (fallback) return fallback;
        return NextResponse.json(
          { error: `Failed to fetch models: ${response.status}` },
          { status: response.status }
        );
      }

      const data = await response.json();
      const models = data.data || data.models || [];

      return buildApiDiscoveryResponse(models);
    }

    const config =
      provider in PROVIDER_MODELS_CONFIG
        ? PROVIDER_MODELS_CONFIG[provider as keyof typeof PROVIDER_MODELS_CONFIG]
        : deriveConfigFromRegistryModelsUrl(provider);
    // Static model providers (no remote /models API)
    // Qwen OAuth Fallback: The Dashscope /models API rejects OAuth tokens with 401
    if (provider === "qwen" && connection.authType === "oauth") {
      const qwenModels = getModelsByProviderId("qwen");
      return buildResponse({
        provider,
        connectionId,
        models: qwenModels.map((m: any) => ({
          id: m.id,
          name: m.name || m.id,
          owned_by: "qwen",
        })),
        source: "local_catalog",
        // #5460/#5465 — Qwen OAuth has no OAuth-compatible remote /models list;
        // the static catalog is intentional, so model-sync should import it.
        intentional: true,
      });
    }

    const localCatalog = mergeLocalCatalogModels(registryCatalogModels, specialtyCatalogModels);
    if (!config && localCatalog.length > 0) {
      return buildResponse({
        provider,
        connectionId,
        models: localCatalog.map((m) => ({
          id: m.id,
          name: m.name || m.id,
          ...((m as Record<string, unknown>).apiFormat
            ? { apiFormat: (m as Record<string, unknown>).apiFormat as string | undefined }
            : {}),
          ...((m as Record<string, unknown>).supportedEndpoints
            ? {
                supportedEndpoints: (m as Record<string, unknown>).supportedEndpoints as
                  string[] | undefined,
              }
            : {}),
          ...(registryCatalogModels.length > 0 ? { owned_by: provider } : {}),
        })),
        source: "local_catalog",
        // #5460/#5465 — providers with no discovery config (embedding/rerank/
        // web-cookie providers like voyage-ai, jina-ai, t3-web) are
        // intentionally local-catalog-only; model-sync imports rather than 502s.
        intentional: true,
        warning: "API unavailable — using local catalog",
      });
    }
    if (!config) {
      return NextResponse.json(
        { error: `Provider ${provider} does not support models listing` },
        { status: 400 }
      );
    }

    const cachedResponse = maybeReturnCachedDiscovery();
    if (cachedResponse) return cachedResponse;

    const autoFetchDisabledResponse = maybeReturnAutoFetchDisabled();
    if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

    // Get auth token
    const token = accessToken || apiKey;
    if (!token) {
      const fallback = buildDiscoveryFallbackResponse({
        cacheWarning: "No token configured — using cached catalog",
        localWarning: "No token configured — using local catalog",
      });
      if (fallback) return fallback;
      return NextResponse.json(
        {
          error:
            "No API key configured for this provider. Please add an API key in the provider settings.",
        },
        { status: 400 }
      );
    }

    // Build request URL
    let url = config.url;
    // VibeProxy: honor a user-configured custom base URL for the built-in
    // `openai` provider (e.g. an OpenAI-compatible gateway / proxy). Without
    // this, model discovery always hit the hardcoded api.openai.com and ignored
    // the configured endpoint — returning the wrong catalog (or failing auth)
    // for gateway users, and preventing instant access to gateway-served models.
    // Falls back to config.url (api.openai.com) when no custom base URL is set.
    if (provider === "openai") {
      const customBaseUrl = getProviderBaseUrl(connection.providerSpecificData);
      if (customBaseUrl) {
        let base = customBaseUrl.replace(/\/$/, "");
        if (base.endsWith("/chat/completions")) {
          base = base.slice(0, -"/chat/completions".length);
        } else if (base.endsWith("/completions")) {
          base = base.slice(0, -"/completions".length);
        }
        // Strip a trailing /v1 unconditionally (same #5899 double-prefix guard as the
        // discovery path above): a customBaseUrl like ".../v1/chat/completions" would
        // otherwise leave base as ".../v1" and produce ".../v1/v1/models" below.
        if (base.endsWith("/v1") && !base.endsWith("://v1")) {
          base = base.slice(0, -"/v1".length);
        }
        url = `${base}/v1/models`;
      }
    }
    if (provider === "cloudflare-ai") {
      const pData = asRecord(connection.providerSpecificData);
      const accountId =
        (typeof pData.accountId === "string" && pData.accountId) ||
        process.env.CLOUDFLARE_ACCOUNT_ID;
      if (!accountId) {
        return NextResponse.json(
          { error: "Cloudflare Workers AI requires an Account ID in provider settings." },
          { status: 400 }
        );
      }
      url = url.replace("{accountId}", accountId);
    }
    if (config.authQuery) {
      url += `${url.includes("?") ? "&" : "?"}${config.authQuery}=${token}`;
    }

    // Build headers
    const headers = { ...config.headers };
    if (config.authHeader && !config.authQuery) {
      headers[config.authHeader] = (config.authPrefix || "") + token;
    }

    // Make request (with pagination for providers that use nextPageToken, e.g. Gemini)
    const fetchOptions: any = {
      method: config.method,
      headers,
    };

    if (config.body && config.method === "POST") {
      fetchOptions.body = JSON.stringify(config.body);
    }

    let allModels: any[] = [];
    let pageUrl = url;
    let pageCount = 0;
    const MAX_PAGES = 20; // Safety limit
    const seenTokens = new Set<string>();

    while (pageUrl && pageCount < MAX_PAGES) {
      pageCount++;
      let response: Response;
      try {
        response = await safeOutboundFetch(pageUrl, {
          ...SAFE_OUTBOUND_FETCH_PRESETS.modelsPagination,
          guard: getProviderOutboundGuard(),
          proxyConfig: proxy,
          // Ollama Cloud /v1/models returns 301 redirects (#1381)
          ...(provider === "ollama-cloud" ? { allowRedirect: true } : {}),
          ...fetchOptions,
        });
      } catch (error) {
        const fallback = buildDiscoveryErrorFallbackResponse(error);
        if (fallback) return fallback;
        throw error;
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error fetching models from provider", { provider, errorText });
        const fallback = buildDiscoveryFallbackResponse();
        if (fallback) return fallback;
        return NextResponse.json(
          { error: `Failed to fetch models: ${response.status}` },
          { status: response.status }
        );
      }

      const data = await response.json();
      const pageModels = config.parseResponse(data);
      allModels = allModels.concat(pageModels);

      const nextPageToken = data.nextPageToken;
      if (!nextPageToken) break;
      if (seenTokens.has(nextPageToken)) {
        console.warn(`[models] ${provider}: duplicate nextPageToken detected, stopping pagination`);
        break;
      }
      seenTokens.add(nextPageToken);
      pageUrl = `${config.url}${config.url.includes("?") ? "&" : "?"}pageToken=${encodeURIComponent(nextPageToken)}`;
      if (config.authQuery) {
        pageUrl += `&${config.authQuery}=${token}`;
      }
    }

    if (pageCount > 1) {
      console.log(
        `[models] ${provider}: fetched ${allModels.length} models across ${pageCount} pages`
      );
    }

    return buildApiDiscoveryResponse(allModels);
  } catch (error) {
    if (error instanceof SafeOutboundFetchError && error.code === "URL_GUARD_BLOCKED") {
      return NextResponse.json({ error: sanitizeErrorMessage(error.message) }, { status: 400 });
    }

    const status = getSafeOutboundFetchErrorStatus(error);
    if (status) {
      const message = error instanceof Error ? error.message : "Failed to fetch models";
      return NextResponse.json({ error: message }, { status });
    }
    console.log("Error fetching provider models:", error);
    return NextResponse.json({ error: "Failed to fetch models" }, { status: 500 });
  }
}
