import { NextResponse } from "next/server";
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
import {
  SAFE_OUTBOUND_FETCH_PRESETS,
  getSafeOutboundFetchErrorStatus,
  safeOutboundFetch,
} from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuard";
import {
  asRecord,
  getProviderBaseUrl,
  normalizeAzureOpenAIBaseUrl,
  getAzureOpenAIApiVersion,
  buildOptionalBearerHeaders,
} from "../helpers";
import {
  normalizeDataRobotCatalogResponse,
  normalizeOpenAiLikeModelsResponse,
  normalizeSapModelsResponse,
} from "../normalizers";
import type { HandlerContext } from "./types";

// ── Azure AI ────────────────────────────────────────────────────────────────

export async function handleAzureAi(ctx: HandlerContext): Promise<NextResponse | null> {
  const cachedResponse = ctx.maybeReturnCachedDiscovery();
  if (cachedResponse) return cachedResponse;

  const autoFetchDisabledResponse = ctx.maybeReturnAutoFetchDisabled();
  if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

  const token = ctx.accessToken || ctx.apiKey;
  if (!token) {
    const fallback = ctx.buildDiscoveryFallbackResponse({
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
    getProviderBaseUrl(ctx.connection.providerSpecificData) || AZURE_AI_DEFAULT_BASE_URL;
  const modelsUrl = buildAzureAiModelsUrl(baseUrl);

  let response: Response;
  try {
    response = await safeOutboundFetch(modelsUrl, {
      ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
      guard: getProviderOutboundGuard(),
      proxyConfig: ctx.proxy,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api-key": token,
      },
    });
  } catch (error) {
    const fallback = ctx.buildDiscoveryErrorFallbackResponse(error, {
      cacheWarning: "Azure AI models API unavailable — using cached catalog",
      localWarning: "Azure AI models API unavailable — using local catalog",
    });
    if (fallback) return fallback;
    throw error;
  }

  if (!response.ok) {
    const fallback = ctx.buildDiscoveryFallbackResponse({
      cacheWarning: `Models probe failed (${response.status}) — using cached catalog`,
      localWarning: `Models probe failed (${response.status}) — using local catalog`,
    });
    if (fallback) return fallback;
    return NextResponse.json(
      { error: `Failed to fetch models: ${response.status}` },
      { status: response.status }
    );
  }

  const data = (await response.json()) as Record<string, unknown>;
  const rawModels = (data.data || data.models || []) as Array<Record<string, unknown>>;
  const models = rawModels.map((model) => ({
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

  return ctx.buildApiDiscoveryResponse(models.filter((model) => model.id));
}

// ── Azure OpenAI ────────────────────────────────────────────────────────────

export async function handleAzureOpenAi(ctx: HandlerContext): Promise<NextResponse | null> {
  const cachedResponse = ctx.maybeReturnCachedDiscovery();
  if (cachedResponse) return cachedResponse;

  const autoFetchDisabledResponse = ctx.maybeReturnAutoFetchDisabled();
  if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

  const token = ctx.accessToken || ctx.apiKey;
  if (!token) {
    return NextResponse.json(
      {
        error:
          "No API key configured for this provider. Please add an API key in the provider settings.",
      },
      { status: 400 }
    );
  }

  const rawBaseUrl = getProviderBaseUrl(ctx.connection.providerSpecificData);
  if (!rawBaseUrl) {
    return NextResponse.json(
      { error: "No Azure OpenAI resource endpoint configured" },
      { status: 400 }
    );
  }

  const baseUrl = normalizeAzureOpenAIBaseUrl(rawBaseUrl);
  const apiVersion = encodeURIComponent(
    getAzureOpenAIApiVersion(ctx.connection.providerSpecificData)
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
        proxyConfig: ctx.proxy,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api-key": token,
        },
      });
    } catch (error) {
      const fallback = ctx.buildDiscoveryErrorFallbackResponse(error, {
        cacheWarning: "Azure OpenAI models API unavailable — using cached catalog",
        localWarning: "Azure OpenAI models API unavailable — using local catalog",
      });
      if (fallback) return fallback;
      throw error;
    }

    if (response.ok) {
      return ctx.buildApiDiscoveryResponse(
        normalizeOpenAiLikeModelsResponse(await response.json(), "azure-openai")
      );
    }

    lastStatus = response.status;
    if (response.status === 401 || response.status === 403) break;
  }

  const fallback = ctx.buildDiscoveryFallbackResponse({
    cacheWarning: `Azure OpenAI models probe failed (${lastStatus}) — using cached catalog`,
    localWarning: `Azure OpenAI models probe failed (${lastStatus}) — using local catalog`,
  });
  if (fallback) return fallback;
  return NextResponse.json(
    { error: `Failed to fetch models: ${lastStatus || "unknown"}` },
    { status: lastStatus || 502 }
  );
}

// ── WatsonX ─────────────────────────────────────────────────────────────────

export async function handleWatsonx(ctx: HandlerContext): Promise<NextResponse | null> {
  const cachedResponse = ctx.maybeReturnCachedDiscovery();
  if (cachedResponse) return cachedResponse;

  const autoFetchDisabledResponse = ctx.maybeReturnAutoFetchDisabled();
  if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

  const token = ctx.accessToken || ctx.apiKey;
  if (!token) {
    const fallback = ctx.buildDiscoveryFallbackResponse({
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
    getProviderBaseUrl(ctx.connection.providerSpecificData) || WATSONX_DEFAULT_BASE_URL;

  let response: Response;
  try {
    response = await safeOutboundFetch(buildWatsonxModelsUrl(baseUrl), {
      ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
      guard: getProviderOutboundGuard(),
      proxyConfig: ctx.proxy,
      method: "GET",
      headers: buildOptionalBearerHeaders(token),
    });
  } catch (error) {
    const fallback = ctx.buildDiscoveryErrorFallbackResponse(error, {
      cacheWarning: "watsonx models API unavailable — using cached catalog",
      localWarning: "watsonx models API unavailable — using local catalog",
    });
    if (fallback) return fallback;
    throw error;
  }

  if (!response.ok) {
    const fallback = ctx.buildDiscoveryFallbackResponse({
      cacheWarning: `Models probe failed (${response.status}) — using cached catalog`,
      localWarning: `Models probe failed (${response.status}) — using local catalog`,
    });
    if (fallback) return fallback;
    return NextResponse.json(
      { error: `Failed to fetch models: ${response.status}` },
      { status: response.status }
    );
  }

  return ctx.buildApiDiscoveryResponse(
    normalizeOpenAiLikeModelsResponse(await response.json(), "watsonx")
  );
}

// ── OCI ─────────────────────────────────────────────────────────────────────

export async function handleOci(ctx: HandlerContext): Promise<NextResponse | null> {
  const cachedResponse = ctx.maybeReturnCachedDiscovery();
  if (cachedResponse) return cachedResponse;

  const autoFetchDisabledResponse = ctx.maybeReturnAutoFetchDisabled();
  if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

  const token = ctx.accessToken || ctx.apiKey;
  if (!token) {
    const fallback = ctx.buildDiscoveryFallbackResponse({
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

  const psd = asRecord(ctx.connection.providerSpecificData);
  const baseUrl = getProviderBaseUrl(psd) || OCI_DEFAULT_BASE_URL;
  const projectId =
    ctx.connection.projectId ||
    (typeof psd.projectId === "string" ? psd.projectId : null) ||
    (typeof psd.project === "string" ? psd.project : null);

  let response: Response;
  try {
    response = await safeOutboundFetch(buildOciModelsUrl(baseUrl), {
      ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
      guard: getProviderOutboundGuard(),
      proxyConfig: ctx.proxy,
      method: "GET",
      headers: {
        ...buildOptionalBearerHeaders(token),
        ...(projectId ? { "OpenAI-Project": projectId as string } : {}),
      },
    });
  } catch (error) {
    const fallback = ctx.buildDiscoveryErrorFallbackResponse(error, {
      cacheWarning: "OCI models API unavailable — using cached catalog",
      localWarning: "OCI models API unavailable — using local catalog",
    });
    if (fallback) return fallback;
    throw error;
  }

  if (!response.ok) {
    const fallback = ctx.buildDiscoveryFallbackResponse({
      cacheWarning: `Models probe failed (${response.status}) — using cached catalog`,
      localWarning: `Models probe failed (${response.status}) — using local catalog`,
    });
    if (fallback) return fallback;
    return NextResponse.json(
      { error: `Failed to fetch models: ${response.status}` },
      { status: response.status }
    );
  }

  return ctx.buildApiDiscoveryResponse(
    normalizeOpenAiLikeModelsResponse(await response.json(), "oci")
  );
}

// ── SAP ─────────────────────────────────────────────────────────────────────

export async function handleSap(ctx: HandlerContext): Promise<NextResponse | null> {
  const cachedResponse = ctx.maybeReturnCachedDiscovery();
  if (cachedResponse) return cachedResponse;

  const autoFetchDisabledResponse = ctx.maybeReturnAutoFetchDisabled();
  if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

  const token = ctx.accessToken || ctx.apiKey;
  if (!token) {
    const fallback = ctx.buildDiscoveryFallbackResponse({
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

  const psd = asRecord(ctx.connection.providerSpecificData);
  const baseUrl = getProviderBaseUrl(psd) || SAP_DEFAULT_BASE_URL;
  const resourceGroup = getSapResourceGroup(psd);

  let response: Response;
  try {
    response = await safeOutboundFetch(buildSapModelsUrl(baseUrl), {
      ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
      guard: getProviderOutboundGuard(),
      proxyConfig: ctx.proxy,
      method: "GET",
      headers: {
        ...buildOptionalBearerHeaders(token),
        "AI-Resource-Group": resourceGroup,
      },
    });
  } catch (error) {
    const fallback = ctx.buildDiscoveryErrorFallbackResponse(error, {
      cacheWarning: "SAP models API unavailable — using cached catalog",
      localWarning: "SAP models API unavailable — using local catalog",
    });
    if (fallback) return fallback;
    throw error;
  }

  if (!response.ok) {
    const fallback = ctx.buildDiscoveryFallbackResponse({
      cacheWarning: `Models probe failed (${response.status}) — using cached catalog`,
      localWarning: `Models probe failed (${response.status}) — using local catalog`,
    });
    if (fallback) return fallback;
    return NextResponse.json(
      { error: `Failed to fetch models: ${response.status}` },
      { status: response.status }
    );
  }

  return ctx.buildApiDiscoveryResponse(normalizeSapModelsResponse(await response.json()));
}

// ── DataRobot ───────────────────────────────────────────────────────────────

export async function handleDataRobot(ctx: HandlerContext): Promise<NextResponse | null> {
  const cachedResponse = ctx.maybeReturnCachedDiscovery();
  if (cachedResponse) return cachedResponse;

  const autoFetchDisabledResponse = ctx.maybeReturnAutoFetchDisabled();
  if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

  const token = ctx.accessToken || ctx.apiKey;
  if (!token) {
    const fallback = ctx.buildDiscoveryFallbackResponse({
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
    getProviderBaseUrl(ctx.connection.providerSpecificData) || DATAROBOT_DEFAULT_BASE_URL;

  if (isDataRobotDeploymentUrl(configuredBaseUrl)) {
    const fallback = ctx.buildDiscoveryFallbackResponse({
      cacheWarning: "Deployment URL does not expose catalog — using cached catalog",
      localWarning: "Deployment URL does not expose catalog — using local catalog",
    });
    if (fallback) return fallback;
    return ctx.buildResponse({
      provider: ctx.provider,
      connectionId: ctx.connectionId,
      models: ctx.toLocalCatalogModels(),
      source: "local_catalog",
      warning: "Deployment URL does not expose catalog — using local catalog",
    });
  }

  const catalogUrl = buildDataRobotCatalogUrl(configuredBaseUrl);
  if (!catalogUrl) {
    const fallback = ctx.buildDiscoveryFallbackResponse({
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
      proxyConfig: ctx.proxy,
      method: "GET",
      headers: buildOptionalBearerHeaders(token),
    });
  } catch (error) {
    const fallback = ctx.buildDiscoveryErrorFallbackResponse(error, {
      cacheWarning: "DataRobot catalog unavailable — using cached catalog",
      localWarning: "DataRobot catalog unavailable — using local catalog",
    });
    if (fallback) return fallback;
    throw error;
  }

  if (!response.ok) {
    const fallback = ctx.buildDiscoveryFallbackResponse({
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
  return ctx.buildApiDiscoveryResponse(
    models.map((model) => ({
      ...model,
      owned_by: "datarobot",
    }))
  );
}
