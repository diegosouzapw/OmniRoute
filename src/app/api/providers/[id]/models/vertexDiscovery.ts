import { NextResponse } from "next/server";
import { getModelsByProviderId } from "@/shared/constants/models";
import { getStaticModelsForProvider } from "@/lib/providers/staticModels";
import { updateProviderConnection } from "@/lib/db/providers";
import { SAFE_OUTBOUND_FETCH_PRESETS, safeOutboundFetch } from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuardPolicy";
import type { VertexMetadataModel } from "@/lib/providerModels/vertexModelMetadata";
import { asRecord, mergeLocalCatalogModels, toNonEmptyString } from "./discovery/helpers";

interface DiscoveryWarnings {
  cacheWarning?: string;
  localWarning?: string;
}

interface VertexDiscoveryRouteOptions {
  provider: string;
  connectionId: string;
  connection: { projectId?: unknown; providerSpecificData?: unknown };
  apiKey: unknown;
  accessToken: unknown;
  proxy: unknown;
  cachedDiscoveryModels: VertexMetadataModel[];
  maybeReturnCachedDiscovery: () => Response | null;
  maybeReturnAutoFetchDisabled: () => Response | null;
  buildDiscoveryFallbackResponse: (warnings?: DiscoveryWarnings) => Response | null;
  buildDiscoveryErrorFallbackResponse: (
    error: unknown,
    warnings?: DiscoveryWarnings
  ) => Response | null;
  buildResponse: (payload: Record<string, unknown>) => Response;
  buildApiDiscoveryResponse: (
    models: unknown[],
    warning?: string,
    extraPayload?: Record<string, unknown>
  ) => Promise<Response>;
}

type CuratedVertexModel = { id: string; name: string; owned_by: string };

function asNamedModels(models: unknown[]): Array<{ id: string; name?: string }> {
  return models.flatMap((model) =>
    model && typeof model === "object" && "id" in model && typeof model.id === "string"
      ? [model as { id: string; name?: string }]
      : []
  );
}

function vertexFetch(proxy: unknown): (url: string, init: RequestInit) => Promise<Response> {
  return (url, init) =>
    safeOutboundFetch(url, {
      ...SAFE_OUTBOUND_FETCH_PRESETS.modelsPagination,
      guard: getProviderOutboundGuard(),
      proxyConfig: proxy,
      ...init,
    });
}

function vertexMetadataFetch(
  proxy: unknown
): (url: string, init: RequestInit) => Promise<Response> {
  return (url, init) =>
    safeOutboundFetch(url, {
      ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
      guard: "public-only",
      proxyConfig: proxy,
      ...init,
    });
}

function curatedVertexCatalog(provider: string): CuratedVertexModel[] {
  return mergeLocalCatalogModels(
    getModelsByProviderId(provider) || [],
    getStaticModelsForProvider(provider) || []
  ).map((model) => ({
    ...model,
    name: model.name || model.id,
    owned_by: provider,
  }));
}

async function resolveVertexDiscoveryAuth(options: {
  apiKey: unknown;
  accessToken: unknown;
}): Promise<{ queryKey: string | null; bearerToken: string | null }> {
  const { parseSAFromApiKey, getAccessToken, looksLikeServiceAccountJson } =
    await import("@omniroute/open-sse/executors/vertex.ts");
  const credential = (typeof options.apiKey === "string" ? options.apiKey : "").trim();
  if (typeof options.accessToken === "string" && options.accessToken) {
    return { queryKey: null, bearerToken: options.accessToken };
  }
  if (!credential) return { queryKey: null, bearerToken: null };
  if (looksLikeServiceAccountJson(credential)) {
    return {
      queryKey: null,
      bearerToken: await getAccessToken(parseSAFromApiKey(credential)),
    };
  }
  return { queryKey: credential, bearerToken: null };
}

async function handleVertexApiKeyCatalog(
  options: VertexDiscoveryRouteOptions,
  queryKey: string,
  catalog: CuratedVertexModel[]
): Promise<Response> {
  const { discoverVertexModelsWithApiKey } =
    await import("@/lib/providerModels/vertexModelDiscovery");
  const discovery = await discoverVertexModelsWithApiKey({
    apiKey: queryKey,
    fetchImpl: vertexFetch(options.proxy),
  });

  const providerData = asRecord(options.connection.providerSpecificData);
  const configuredProjectId =
    toNonEmptyString(options.connection.projectId) ||
    toNonEmptyString(providerData.projectId) ||
    toNonEmptyString(providerData.project);
  const projectId = configuredProjectId || discovery.projectId || null;
  const projectIdAutoDetected = !configuredProjectId && !!discovery.projectId;
  if (projectIdAutoDetected && projectId) {
    await updateProviderConnection(options.connectionId, { projectId });
  }

  const { isVertexExpressModel } = await import("@omniroute/open-sse/config/vertexModels.ts");
  if (projectId) {
    const liveGeminiModels = asNamedModels(discovery.models);
    const projectCatalog = mergeLocalCatalogModels(liveGeminiModels, catalog);
    if (liveGeminiModels.length > 0) {
      return options.buildApiDiscoveryResponse(projectCatalog, undefined, {
        projectIdAutoDetected,
        catalogMode: "live_gemini_curated_project",
      });
    }
    return options.buildResponse({
      provider: options.provider,
      connectionId: options.connectionId,
      models: projectCatalog,
      source: "local_catalog",
      intentional: true,
      projectIdAutoDetected,
      catalogMode: "curated_project",
    });
  }

  if (discovery.models.length > 0) {
    return options.buildApiDiscoveryResponse(discovery.models, discovery.warning);
  }

  return options.buildResponse({
    provider: options.provider,
    connectionId: options.connectionId,
    models: catalog.filter((model) => isVertexExpressModel(model.id)),
    source: "local_catalog",
    intentional: true,
    warning: "No live catalog available for this API key — using curated Express catalog",
  });
}

export async function maybeHandleVertexModelDiscovery(
  options: VertexDiscoveryRouteOptions
): Promise<Response | null> {
  if (options.provider !== "vertex" && options.provider !== "vertex-partner") return null;

  const cachedResponse = options.maybeReturnCachedDiscovery();
  if (cachedResponse) return cachedResponse;

  const autoFetchDisabledResponse = options.maybeReturnAutoFetchDisabled();
  if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

  let queryKey: string | null = null;
  let bearerToken: string | null = null;
  try {
    const resolved = await resolveVertexDiscoveryAuth({
      apiKey: options.apiKey,
      accessToken: options.accessToken,
    });
    queryKey = resolved.queryKey;
    bearerToken = resolved.bearerToken;
  } catch (error) {
    const fallback = options.buildDiscoveryErrorFallbackResponse(error, {
      cacheWarning: "Vertex credential unavailable — using cached catalog",
      localWarning: "Vertex credential unavailable — using local catalog",
    });
    if (fallback) return fallback;
  }

  if (!queryKey && !bearerToken) {
    const fallback = options.buildDiscoveryFallbackResponse({
      cacheWarning: "No usable Vertex credential — using cached catalog",
      localWarning: "No usable Vertex credential — using local catalog",
    });
    if (fallback) return fallback;
    return NextResponse.json(
      { error: "No usable Vertex AI credential configured for model discovery." },
      { status: 400 }
    );
  }

  const catalog = curatedVertexCatalog(options.provider);
  if (queryKey) return handleVertexApiKeyCatalog(options, queryKey, catalog);

  const { discoverVertexModelsWithBearer } =
    await import("@/lib/providerModels/vertexModelDiscovery");
  const discovery = await discoverVertexModelsWithBearer({
    bearerToken: bearerToken as string,
    fetchImpl: vertexFetch(options.proxy),
  });

  if (discovery.models.length > 0) {
    const liveModels = asNamedModels(discovery.models);
    let enrichedLiveModels = liveModels;
    try {
      const { enrichVertexModelsWithMetadata } =
        await import("@/lib/providerModels/vertexModelMetadata");
      enrichedLiveModels = await enrichVertexModelsWithMetadata({
        models: liveModels,
        staleModels: options.cachedDiscoveryModels,
        fetchImpl: vertexMetadataFetch(options.proxy),
      });
    } catch {
      // Metadata is optional. A documentation or parser failure must never turn an authenticated
      // live Vertex catalog into a failed model sync.
    }
    return options.buildApiDiscoveryResponse(enrichedLiveModels, discovery.warning, {
      catalogMode: "live_vertex_catalog",
    });
  }

  const fallback = options.buildDiscoveryFallbackResponse({
    cacheWarning: "Vertex model catalogs unavailable — using cached catalog",
    localWarning: "Vertex model catalogs unavailable — using local catalog",
  });
  if (fallback) return fallback;
  return options.buildResponse({
    provider: options.provider,
    connectionId: options.connectionId,
    models: [],
    source: "api",
  });
}
