import { NextResponse } from "next/server";
import {
  buildGlmCodingHeaders,
  buildGlmModelsUrl,
} from "@omniroute/open-sse/config/glmProvider.ts";
import {
  SAFE_OUTBOUND_FETCH_PRESETS,
  getSafeOutboundFetchErrorStatus,
  safeOutboundFetch,
} from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuard";
import { parseGeminiModelsList } from "@/lib/providerModels/geminiModelsParser";
import { asRecord, getProviderBaseUrl, toGeminiCliProjectId, buildOptionalBearerHeaders } from "../helpers";
import type { HandlerContext } from "./types";

// ── Vertex / Vertex-Partner ─────────────────────────────────────────────────

export async function handleVertex(ctx: HandlerContext): Promise<NextResponse | null> {
  const cachedResponse = ctx.maybeReturnCachedDiscovery();
  if (cachedResponse) return cachedResponse;

  const autoFetchDisabledResponse = ctx.maybeReturnAutoFetchDisabled();
  if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

  const credential = (ctx.apiKey || "").trim();
  let queryKey: string | null = null;
  let bearerToken: string | null = null;
  try {
    const { parseSAFromApiKey, getAccessToken } = await import(
      "@omniroute/open-sse/executors/vertex.ts"
    );
    if (ctx.accessToken) {
      bearerToken = ctx.accessToken;
    } else if (credential) {
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
    const fallback = ctx.buildDiscoveryErrorFallbackResponse(error, {
      cacheWarning: "Vertex credential unavailable — using cached catalog",
      localWarning: "Vertex credential unavailable — using local catalog",
    });
    if (fallback) return fallback;
  }

  if (!queryKey && !bearerToken) {
    const fallback = ctx.buildDiscoveryFallbackResponse({
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

  const allModels: Array<{ id: string; name: string }> = [];
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
        proxyConfig: ctx.proxy,
        method: "GET",
        headers,
      });

      if (!response.ok) {
        console.log("[models] Vertex model discovery failed", {
          provider: ctx.provider,
          status: response.status,
        });
        const fallback = ctx.buildDiscoveryFallbackResponse();
        if (fallback) return fallback;
        return NextResponse.json(
          { error: `Failed to fetch Vertex models: ${response.status}` },
          { status: response.status }
        );
      }

      const data = (await response.json()) as Record<string, unknown>;
      allModels.push(...parseGeminiModelsList(data));

      const nextPageToken = data.nextPageToken as string | undefined;
      if (!nextPageToken || seenTokens.has(nextPageToken)) break;
      seenTokens.add(nextPageToken);
      pageUrl = `${baseUrl}&pageToken=${encodeURIComponent(nextPageToken)}`;
      if (queryKey) pageUrl += `&key=${encodeURIComponent(queryKey)}`;
    }
  } catch (error) {
    const fallback = ctx.buildDiscoveryErrorFallbackResponse(error);
    if (fallback) return fallback;
    throw error;
  }

  if (allModels.length > 0) {
    return ctx.buildApiDiscoveryResponse(allModels);
  }

  const fallback = ctx.buildDiscoveryFallbackResponse();
  if (fallback) return fallback;
  return ctx.buildResponse({
    provider: ctx.provider,
    connectionId: ctx.connectionId,
    models: [],
    source: "api",
  });
}

// ── Gemini CLI ──────────────────────────────────────────────────────────────

export async function handleGeminiCli(ctx: HandlerContext): Promise<NextResponse | null> {
  const cachedResponse = ctx.maybeReturnCachedDiscovery();
  if (cachedResponse) return cachedResponse;

  const autoFetchDisabledResponse = ctx.maybeReturnAutoFetchDisabled();
  if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

  if (!ctx.accessToken) {
    return NextResponse.json(
      { error: "No access token for Gemini CLI. Please reconnect OAuth." },
      { status: 400 }
    );
  }

  const psd = asRecord(ctx.connection.providerSpecificData);
  const projectId =
    toGeminiCliProjectId(psd.projectId) ||
    toGeminiCliProjectId(psd.project) ||
    toGeminiCliProjectId(ctx.connection.projectId);

  if (!projectId) {
    return NextResponse.json(
      { error: "Gemini CLI project ID not available. Please reconnect OAuth." },
      { status: 400 }
    );
  }

  try {
    const quotaRes = await safeOutboundFetch(
      "https://cloudcode-pa.googleapis.com/v1internal:retrieveUserQuota",
      {
        ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
        guard: getProviderOutboundGuard(),
        proxyConfig: ctx.proxy,
        method: "POST",
        headers: {
          Authorization: `Bearer ${ctx.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ project: projectId }),
      }
    );

    if (!quotaRes.ok) {
      const errText = await quotaRes.text();
      console.log("[models] Gemini CLI quota fetch failed", {
        status: quotaRes.status,
        errText,
      });
      const fallback = ctx.buildDiscoveryFallbackResponse();
      if (fallback) return fallback;
      return NextResponse.json(
        { error: `Failed to fetch Gemini CLI models: ${quotaRes.status}` },
        { status: quotaRes.status }
      );
    }

    const quotaData = (await quotaRes.json()) as Record<string, unknown>;
    const buckets = (quotaData.buckets || []) as Array<Record<string, unknown>>;

    const models = buckets
      .filter((b) => b.modelId)
      .map((b) => ({
        id: b.modelId as string,
        name: b.modelId as string,
        owned_by: "google",
      }));

    return ctx.buildApiDiscoveryResponse(models);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.log("[models] Gemini CLI model fetch error:", msg);
    const fallback = ctx.buildDiscoveryFallbackResponse();
    if (fallback) return fallback;
    return NextResponse.json(
      { error: "Failed to fetch Gemini CLI models" },
      { status: 500 }
    );
  }
}

// ── GLM / GLM-CN / GLMT ────────────────────────────────────────────────────

export async function handleGlm(ctx: HandlerContext): Promise<NextResponse | null> {
  const cachedResponse = ctx.maybeReturnCachedDiscovery();
  if (cachedResponse) return cachedResponse;

  const autoFetchDisabledResponse = ctx.maybeReturnAutoFetchDisabled();
  if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

  const token = ctx.apiKey || ctx.accessToken;
  const glmProviderSpecificData = {
    ...asRecord(ctx.connection.providerSpecificData),
    ...(ctx.provider === "glm-cn" ? { apiRegion: "china" } : {}),
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
        proxyConfig: ctx.proxy,
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
    const fallback = ctx.buildDiscoveryErrorFallbackResponse(error);
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
    const fallback = ctx.buildDiscoveryFallbackResponse();
    if (fallback) return fallback;
    return NextResponse.json(
      { error: `Failed to fetch models: ${response?.status || 502}` },
      { status: response?.status || 502 }
    );
  }

  const data = (await response.json()) as Record<string, unknown>;
  const models = (data.data as unknown[]) || (data.models as unknown[]) || [];

  return ctx.buildApiDiscoveryResponse(models);
}
