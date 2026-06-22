import { NextResponse } from "next/server";
import {
  isClaudeCodeCompatibleProvider,
  isAnthropicCompatibleProvider,
  isOpenAICompatibleProvider,
  NOAUTH_PROVIDERS,
} from "@/shared/constants/providers";
import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import { getModelsByProviderId } from "@/shared/constants/models";
import { getStaticModelsForProvider, type LocalCatalogModel } from "@/lib/providers/staticModels";
import {
  getProviderConnectionById,
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
import {
  getCachedDiscoveredModels,
  isAutoFetchModelsEnabled,
  persistDiscoveredModels,
} from "@/lib/providerModels/modelDiscovery";
import { parseGeminiModelsList, type GeminiDiscoveryModel } from "@/lib/providerModels/geminiModelsParser";
import { getSyncedAvailableModels } from "@/lib/db/models";

import type { HttpProxyConfig, ModelsRequestContext } from "./types.ts";
import {
  asRecord,
  toNonEmptyString,
  getProviderBaseUrl,
  isLocalOpenAIStyleProvider,
  isNamedOpenAIStyleProvider,
  mergeLocalCatalogModels,
} from "./utils.ts";
import { PROVIDER_MODELS_CONFIG } from "./config.ts";

import { handleRekaModels } from "./handlers/reka.ts";
import { handleBedrockModels } from "./handlers/bedrock.ts";
import { handleDatarobotModels } from "./handlers/datarobot.ts";
import { handleAzureAiModels } from "./handlers/azure_ai.ts";
import { handleAzureOpenaiModels } from "./handlers/azure_openai.ts";
import { handleWatsonxModels } from "./handlers/watsonx.ts";
import { handleOciModels } from "./handlers/oci.ts";
import { handleSapModels } from "./handlers/sap.ts";
import { handleClaudeModels } from "./handlers/claude.ts";
import { handleCursorModels } from "./handlers/cursor.ts";
import { handleInnerAiModels } from "./handlers/inner_ai.ts";
import { handleGlmModels } from "./handlers/glm.ts";
import { handleGeminiCliModels } from "./handlers/gemini_cli.ts";
import { handleAntigravityModels } from "./handlers/antigravity.ts";
import { handleGithubModels } from "./handlers/github.ts";
import { handleAnthropicCompatibleModels } from "./handlers/anthropicCompatible.ts";
import { handleCloudflare_aiModels } from "./handlers/cloudflare_ai.ts";

// ── Named provider → handler map ────────────────────────────────────────────

const NAMED_HANDLERS: Record<string, (ctx: ModelsRequestContext) => Promise<NextResponse>> = {
  reka: handleRekaModels,
  bedrock: handleBedrockModels,
  datarobot: handleDatarobotModels,
  "azure-ai": handleAzureAiModels,
  "azure-openai": handleAzureOpenaiModels,
  watsonx: handleWatsonxModels,
  oci: handleOciModels,
  sap: handleSapModels,
  claude: handleClaudeModels,
  cursor: handleCursorModels,
  "inner-ai": handleInnerAiModels,
  glm: handleGlmModels,
  "glm-cn": handleGlmModels,
  glmt: handleGlmModels,
  "gemini-cli": handleGeminiCliModels,
  antigravity: handleAntigravityModels,
  github: handleGithubModels,
  "cloudflare-ai": handleCloudflare_aiModels,
};

// ── GET handler ─────────────────────────────────────────────────────────────

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> | { id: string } },
): Promise<NextResponse> {
  try {
    const params = await context.params;
    const { id } = params;

    const { searchParams } = new URL(request.url);
    const excludeHidden = searchParams.get("excludeHidden") === "true";
    const refresh = searchParams.get("refresh") === "true";

    const connection = await getProviderConnectionById(id);

    if (!connection) {
      const isNoAuthProvider =
        (NOAUTH_PROVIDERS as Record<string, { noAuth?: boolean }>)[id]?.noAuth === true;
      if (isNoAuthProvider) {
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
                  const itemId =
                    typeof item.id === "string" ? item.id.trim() : "";
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
            // Live fetch failed — fall through to local_catalog
          }
        }

        const catalog = mergeLocalCatalogModels(
          getModelsByProviderId(id) || [],
          getStaticModelsForProvider(id) || [],
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

    const provider =
      typeof connection.provider === "string" && connection.provider.trim().length > 0
        ? connection.provider
        : null;
    if (!provider) {
      return NextResponse.json({ error: "Invalid connection provider" }, { status: 400 });
    }

    const proxy: HttpProxyConfig | undefined = await resolveProxyForProvider(provider);

    // ── Closures that form the ModelsRequestContext ────────────────────────────

    const buildResponse = (payload: Record<string, unknown>, statusConfig?: ResponseInit): NextResponse => {
      if (excludeHidden && payload.models && Array.isArray(payload.models)) {
        payload.models = payload.models.filter(
          (m: Record<string, unknown>) => !getModelIsHidden(provider, m.id as string),
        );
      }
      return NextResponse.json(payload, statusConfig);
    };

    const connectionId: string = typeof connection.id === "string" ? connection.id : id;
    const apiKey: string = typeof connection.apiKey === "string" ? connection.apiKey : "";
    const accessToken: string = typeof connection.accessToken === "string" ? connection.accessToken : "";
    const autoFetchModels = isAutoFetchModelsEnabled(connection.providerSpecificData);
    const cachedDiscoveryModels = await getCachedDiscoveredModels(provider, connectionId);

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
    const specialtyCatalogModels = providerSyncedModels ? [] : (getStaticModelsForProvider(provider) || []);

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
                | string[]
                | undefined,
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

    const buildLocalCatalogResponse = (warning?: string): NextResponse | null => {
      const localModels = toLocalCatalogModels();
      if (localModels.length === 0) return null;
      return buildResponse({
        provider,
        connectionId,
        models: localModels,
        source: "local_catalog",
        ...(warning ? { warning } : {}),
      });
    };

    const buildDiscoveryFallbackResponse = ({
      cacheWarning = "API unavailable — using cached catalog",
      localWarning = "API unavailable — using local catalog",
    }: {
      cacheWarning?: string;
      localWarning?: string;
    } = {}): NextResponse | null => {
      if (cachedDiscoveryModels.length > 0) {
        return buildCachedDiscoveryResponse(cacheWarning);
      }
      return buildLocalCatalogResponse(localWarning);
    };

    const buildDiscoveryErrorFallbackResponse = (
      error: unknown,
      warnings?: { cacheWarning?: string; localWarning?: string },
    ): NextResponse | null => {
      const status = getSafeOutboundFetchErrorStatus(error);
      if (status === 400 || status === 503 || status === 504) return null;
      return buildDiscoveryFallbackResponse(warnings);
    };

    const maybeReturnCachedDiscovery = (): NextResponse | null => {
      if (!refresh && cachedDiscoveryModels.length > 0) {
        return buildCachedDiscoveryResponse();
      }
      return null;
    };

    const maybeReturnAutoFetchDisabled = (): NextResponse | null => {
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

    const buildApiDiscoveryResponse = async (
      models: unknown[],
      warning?: string,
    ): Promise<NextResponse> => {
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
                | string[]
                | undefined,
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

    const ctx: ModelsRequestContext = {
      provider,
      connectionId,
      connection,
      apiKey,
      accessToken,
      proxy,
      id,
      maybeReturnCachedDiscovery,
      maybeReturnAutoFetchDisabled,
      buildDiscoveryFallbackResponse,
      buildDiscoveryErrorFallbackResponse,
      buildApiDiscoveryResponse,
      buildResponse,
      buildLocalCatalogResponse,
    };

    // ── Dispatch to named handlers ────────────────────────────────────────────

    const namedHandler = NAMED_HANDLERS[provider];
    if (namedHandler) return namedHandler(ctx);

    // ── OpenAI-compatible / local / named-style providers ──────────────────────

    if (
      isOpenAICompatibleProvider(provider) ||
      isLocalOpenAIStyleProvider(provider) ||
      isNamedOpenAIStyleProvider(provider)
    ) {
      return handleAnthropicCompatibleModels(ctx);
    }

    // ── Vertex AI model discovery ─────────────────────────────────────────────

    if (provider === "vertex" || provider === "vertex-partner") {
      const credential = (apiKey || "").trim();
      let queryKey: string | null = null;
      let bearerToken: string | null = null;
      try {
        const { parseSAFromApiKey, getAccessToken } = await import(
          "@omniroute/open-sse/executors/vertex.ts"
        );
        if (accessToken) {
          bearerToken = accessToken;
        } else if (credential) {
          let isServiceAccountJson = false;
          try {
            const parsed = JSON.parse(credential);
            isServiceAccountJson =
              !!parsed && typeof parsed === "object" && !Array.isArray(parsed);
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
          { status: 400 },
        );
      }

      const vertexBaseUrl = "https://generativelanguage.googleapis.com/v1beta/models?pageSize=1000";
      const vertexHeaders: Record<string, string> = { "Content-Type": "application/json" };
      if (bearerToken) vertexHeaders["Authorization"] = `Bearer ${bearerToken}`;

      const allModels: GeminiDiscoveryModel[] = [];
      let pageUrl = queryKey
        ? `${vertexBaseUrl}&key=${encodeURIComponent(queryKey)}`
        : vertexBaseUrl;
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
            headers: vertexHeaders,
          });

          if (!response.ok) {
            console.log("[models] Vertex model discovery failed", {
              provider,
              status: response.status,
            });
            const fallback = buildDiscoveryFallbackResponse();
            if (fallback) return fallback;
            return NextResponse.json(
              { error: `Failed to fetch Vertex models: ${response.status}` },
              { status: response.status },
            );
          }

          const data = await response.json();
          allModels.push(...parseGeminiModelsList(data));

          const nextPageToken = data.nextPageToken;
          if (!nextPageToken || seenTokens.has(nextPageToken)) break;
          seenTokens.add(nextPageToken);
          pageUrl = `${vertexBaseUrl}&pageToken=${encodeURIComponent(nextPageToken)}`;
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

    // ── Anthropic-compatible providers ────────────────────────────────────────

    if (isAnthropicCompatibleProvider(provider)) {
      if (isClaudeCodeCompatibleProvider(provider)) {
        return NextResponse.json(
          { error: `Provider ${provider} does not support models listing` },
          { status: 400 },
        );
      }

      let anthropicBaseUrl = getProviderBaseUrl(connection.providerSpecificData);
      if (!anthropicBaseUrl) {
        const fallback = buildDiscoveryFallbackResponse({
          cacheWarning: "Base URL unavailable — using cached catalog",
          localWarning: "Base URL unavailable — using local catalog",
        });
        if (fallback) return fallback;
        return NextResponse.json(
          { error: "No base URL configured for Anthropic compatible provider" },
          { status: 400 },
        );
      }

      anthropicBaseUrl = anthropicBaseUrl.replace(/\/$/, "");
      if (anthropicBaseUrl.endsWith("/messages")) {
        anthropicBaseUrl = anthropicBaseUrl.slice(0, -9);
      }

      const psd = asRecord(connection.providerSpecificData);
      const modelsPath = toNonEmptyString(psd.modelsPath) || "/models";
      const anthropicUrl = `${anthropicBaseUrl}${modelsPath}`;
      const anthropicToken = accessToken || apiKey;
      let anthropicResponse: Response;
      try {
        anthropicResponse = await safeOutboundFetch(anthropicUrl, {
          ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
          guard: getProviderOutboundGuard(),
          proxyConfig: proxy,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(apiKey ? { "x-api-key": apiKey } : {}),
            "anthropic-version": "2023-06-01",
            ...(anthropicToken ? { Authorization: `Bearer ${anthropicToken}` } : {}),
          },
        });
      } catch (error) {
        const fallback = buildDiscoveryErrorFallbackResponse(error);
        if (fallback) return fallback;
        throw error;
      }

      if (!anthropicResponse.ok) {
        const errorText = await anthropicResponse.text();
        console.log("Error fetching models from provider", { provider, errorText });
        const fallback = buildDiscoveryFallbackResponse();
        if (fallback) return fallback;
        return NextResponse.json(
          { error: `Failed to fetch models: ${anthropicResponse.status}` },
          { status: anthropicResponse.status },
        );
      }

      const anthropicData = await anthropicResponse.json();
      const anthropicModels = anthropicData.data || anthropicData.models || [];
      return buildApiDiscoveryResponse(anthropicModels);
    }

    // ── Generic config-based providers ────────────────────────────────────────

    const config =
      provider in PROVIDER_MODELS_CONFIG
        ? PROVIDER_MODELS_CONFIG[provider as keyof typeof PROVIDER_MODELS_CONFIG]
        : undefined;

    // Qwen OAuth fallback: Dashscope /models API rejects OAuth tokens with 401
    if (provider === "qwen" && connection.authType === "oauth") {
      const qwenModels = getModelsByProviderId("qwen");
      return buildResponse({
        provider,
        connectionId,
        models: qwenModels.map((m) => ({
          id: m.id,
          name: m.name || m.id,
          owned_by: "qwen",
        })),
        source: "local_catalog",
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
                  | string[]
                  | undefined,
              }
            : {}),
          ...(registryCatalogModels.length > 0 ? { owned_by: provider } : {}),
        })),
        source: "local_catalog",
        warning: "API unavailable — using local catalog",
      });
    }
    if (!config) {
      return NextResponse.json(
        { error: `Provider ${provider} does not support models listing` },
        { status: 400 },
      );
    }

    const cachedResp = maybeReturnCachedDiscovery();
    if (cachedResp) return cachedResp;

    const autoFetchDisabledResp = maybeReturnAutoFetchDisabled();
    if (autoFetchDisabledResp) return autoFetchDisabledResp;

    const configToken = accessToken || apiKey;
    if (!configToken) {
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
        { status: 400 },
      );
    }

    let configUrl = config.url;
    if (provider === "cloudflare-ai") {
      const pData = asRecord(connection.providerSpecificData);
      const accountId =
        (typeof pData.accountId === "string" && pData.accountId) ||
        process.env.CLOUDFLARE_ACCOUNT_ID;
      if (!accountId) {
        return NextResponse.json(
          { error: "Cloudflare Workers AI requires an Account ID in provider settings." },
          { status: 400 },
        );
      }
      configUrl = configUrl.replace("{accountId}", accountId);
    }
    if (config.authQuery) {
      configUrl += `${configUrl.includes("?") ? "&" : "?"}${config.authQuery}=${configToken}`;
    }

    const configHeaders: Record<string, string> = { ...config.headers };
    if (config.authHeader && !config.authQuery) {
      configHeaders[config.authHeader] = (config.authPrefix || "") + configToken;
    }

    const fetchOptions: { method: string; headers: Record<string, string>; body?: string } = {
      method: config.method,
      headers: configHeaders,
    };
    if (config.body && config.method === "POST") {
      fetchOptions.body = JSON.stringify(config.body);
    }

    let allPageModels: unknown[] = [];
    let pageTokenUrl = configUrl;
    let configPageCount = 0;
    const CONFIG_MAX_PAGES = 20;
    const configSeenTokens = new Set<string>();

    while (pageTokenUrl && configPageCount < CONFIG_MAX_PAGES) {
      configPageCount++;
      let pageResponse: Response;
      try {
        pageResponse = await safeOutboundFetch(pageTokenUrl, {
          ...SAFE_OUTBOUND_FETCH_PRESETS.modelsPagination,
          guard: getProviderOutboundGuard(),
          proxyConfig: proxy,
          ...(provider === "ollama-cloud" ? { allowRedirect: true } : {}),
          ...fetchOptions,
        });
      } catch (error) {
        const fallback = buildDiscoveryErrorFallbackResponse(error);
        if (fallback) return fallback;
        throw error;
      }

      if (!pageResponse.ok) {
        const errorText = await pageResponse.text();
        console.log("Error fetching models from provider", { provider, errorText });
        const fallback = buildDiscoveryFallbackResponse();
        if (fallback) return fallback;
        return NextResponse.json(
          { error: `Failed to fetch models: ${pageResponse.status}` },
          { status: pageResponse.status },
        );
      }

      const pageData = await pageResponse.json();
      const pageModels = config.parseResponse(pageData);
      allPageModels = allPageModels.concat(pageModels);

      const nextConfigPageToken = pageData.nextPageToken;
      if (!nextConfigPageToken) break;
      if (configSeenTokens.has(nextConfigPageToken)) {
        console.warn(
          `[models] ${provider}: duplicate nextPageToken detected, stopping pagination`,
        );
        break;
      }
      configSeenTokens.add(nextConfigPageToken);
      pageTokenUrl = `${config.url}${config.url.includes("?") ? "&" : "?"}pageToken=${encodeURIComponent(nextConfigPageToken)}`;
      if (config.authQuery) {
        pageTokenUrl += `&${config.authQuery}=${configToken}`;
      }
    }

    if (configPageCount > 1) {
      console.log(
        `[models] ${provider}: fetched ${allPageModels.length} models across ${configPageCount} pages`,
      );
    }

    return buildApiDiscoveryResponse(allPageModels);
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
