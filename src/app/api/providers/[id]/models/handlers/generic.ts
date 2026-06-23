import { NextResponse } from "next/server";
import {
  SAFE_OUTBOUND_FETCH_PRESETS,
  getSafeOutboundFetchErrorStatus,
  safeOutboundFetch,
} from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuard";
import { getProviderBaseUrl, asRecord } from "../helpers";
import { PROVIDER_MODELS_CONFIG } from "../config";
import type { HandlerContext } from "./types";

/**
 * Generic handler for providers with a config entry in PROVIDER_MODELS_CONFIG.
 * Supports paginated responses (e.g. Gemini's nextPageToken).
 */
export async function handleGenericConfig(
  ctx: HandlerContext
): Promise<NextResponse | null> {
  const config =
    ctx.provider in PROVIDER_MODELS_CONFIG
      ? PROVIDER_MODELS_CONFIG[ctx.provider as keyof typeof PROVIDER_MODELS_CONFIG]
      : undefined;

  const localCatalog = ctx.toLocalCatalogModels();
  if (!config && localCatalog.length > 0) {
    return ctx.buildResponse({
      provider: ctx.provider,
      connectionId: ctx.connectionId,
      models: localCatalog,
      source: "local_catalog",
      warning: "API unavailable — using local catalog",
    });
  }
  if (!config) {
    return NextResponse.json(
      { error: `Provider ${ctx.provider} does not support models listing` },
      { status: 400 }
    );
  }

  const cachedResponse = ctx.maybeReturnCachedDiscovery();
  if (cachedResponse) return cachedResponse;

  const autoFetchDisabledResponse = ctx.maybeReturnAutoFetchDisabled();
  if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

  // Get auth token
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

  // Build request URL
  let url = config.url;
  // VibeProxy: honor a user-configured custom base URL for the built-in
  // `openai` provider (e.g. an OpenAI-compatible gateway / proxy).
  if (ctx.provider === "openai") {
    const customBaseUrl = getProviderBaseUrl(ctx.connection.providerSpecificData);
    if (customBaseUrl) {
      let base = customBaseUrl.replace(/\/$/, "");
      if (base.endsWith("/chat/completions")) {
        base = base.slice(0, -"/chat/completions".length);
      } else if (base.endsWith("/completions")) {
        base = base.slice(0, -"/completions".length);
      } else if (base.endsWith("/v1")) {
        base = base.slice(0, -"/v1".length);
      }
      url = `${base}/v1/models`;
    }
  }
  if (ctx.provider === "cloudflare-ai") {
    const pData = asRecord(ctx.connection.providerSpecificData);
    const accountId =
      (typeof pData.accountId === "string" && pData.accountId) ||
      process.env.CLOUDFLARE_ACCOUNT_ID;
    if (!accountId) {
      return NextResponse.json(
        {
          error:
            "Cloudflare Workers AI requires an Account ID in provider settings.",
        },
        { status: 400 }
      );
    }
    url = url.replace("{accountId}", accountId);
  }
  if (config.authQuery) {
    url += `${url.includes("?") ? "&" : "?"}${config.authQuery}=${token}`;
  }

  // Build headers
  const headers: Record<string, string> = { ...config.headers };
  if (config.authHeader && !config.authQuery) {
    headers[config.authHeader] = (config.authPrefix || "") + token;
  }

  // Make request (with pagination for providers that use nextPageToken, e.g. Gemini)
  const fetchOptions: { method: string; headers: Record<string, string>; body?: string } = {
    method: config.method,
    headers,
  };

  if (config.body && config.method === "POST") {
    fetchOptions.body = JSON.stringify(config.body);
  }

  let allModels: unknown[] = [];
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
        proxyConfig: ctx.proxy,
        // Ollama Cloud /v1/models returns 301 redirects (#1381)
        ...(ctx.provider === "ollama-cloud" ? { allowRedirect: true } : {}),
        ...fetchOptions,
      });
    } catch (error) {
      const fallback = ctx.buildDiscoveryErrorFallbackResponse(error);
      if (fallback) return fallback;
      throw error;
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error fetching models from provider", {
        provider: ctx.provider,
        errorText,
      });
      const fallback = ctx.buildDiscoveryFallbackResponse();
      if (fallback) return fallback;
      return NextResponse.json(
        { error: `Failed to fetch models: ${response.status}` },
        { status: response.status }
      );
    }

    const data = (await response.json()) as Record<string, unknown>;
    const pageModels = config.parseResponse(data);
    allModels = allModels.concat(pageModels);

    const nextPageToken = data.nextPageToken as string | undefined;
    if (!nextPageToken) break;
    if (seenTokens.has(nextPageToken)) {
      console.warn(
        `[models] ${ctx.provider}: duplicate nextPageToken detected, stopping pagination`
      );
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
      `[models] ${ctx.provider}: fetched ${allModels.length} models across ${pageCount} pages`
    );
  }

  return ctx.buildApiDiscoveryResponse(allModels);
}
