import { NextResponse } from "next/server";
import {
  isClaudeCodeCompatibleProvider,
  isAnthropicCompatibleProvider,
  isOpenAICompatibleProvider,
} from "@/shared/constants/providers";
import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import {
  SAFE_OUTBOUND_FETCH_PRESETS,
  getSafeOutboundFetchErrorStatus,
  safeOutboundFetch,
} from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuard";
import {
  getProviderBaseUrl,
  isLocalOpenAIStyleProvider,
  isNamedOpenAIStyleProvider,
  buildOptionalBearerHeaders,
  buildNamedOpenAiStyleHeaders,
  asRecord,
  toNonEmptyString,
} from "../helpers";
import { normalizeOpenAiLikeModelsResponse } from "../normalizers";
import type { HandlerContext } from "./types";

// ── OpenAI-compatible / Named OpenAI-style ──────────────────────────────────

export async function handleOpenAiCompatible(
  ctx: HandlerContext
): Promise<NextResponse | null> {
  const cachedResponse = ctx.maybeReturnCachedDiscovery();
  if (cachedResponse) return cachedResponse;

  const autoFetchDisabledResponse = ctx.maybeReturnAutoFetchDisabled();
  if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

  const registryEntry =
    isLocalOpenAIStyleProvider(ctx.provider) || isNamedOpenAIStyleProvider(ctx.provider)
      ? getRegistryEntry(ctx.provider)
      : null;
  const rawBaseUrl =
    getProviderBaseUrl(ctx.connection.providerSpecificData) ||
    (typeof registryEntry?.baseUrl === "string" ? registryEntry.baseUrl : null);
  const baseUrl = rawBaseUrl;
  if (!baseUrl) {
    const fallback = ctx.buildDiscoveryFallbackResponse({
      cacheWarning: "Base URL unavailable — using cached catalog",
      localWarning: "Base URL unavailable — using local catalog",
    });
    if (fallback) return fallback;
    return NextResponse.json(
      {
        error: isOpenAICompatibleProvider(ctx.provider)
          ? "No base URL configured for OpenAI compatible provider"
          : isLocalOpenAIStyleProvider(ctx.provider)
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
  } else if (base.endsWith("/v1")) {
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
  let models: unknown[] | null = null;
  let lastErrorStatus: number | null = null;
  const token = ctx.apiKey || ctx.accessToken;

  for (const modelsUrl of uniqueEndpoints) {
    try {
      const response = await safeOutboundFetch(modelsUrl, {
        ...SAFE_OUTBOUND_FETCH_PRESETS.modelsProbe,
        guard: getProviderOutboundGuard(),
        proxyConfig: ctx.proxy,
        method: "GET",
        headers: isNamedOpenAIStyleProvider(ctx.provider)
          ? buildNamedOpenAiStyleHeaders(ctx.provider, token)
          : buildOptionalBearerHeaders(token),
      });

      if (response.ok) {
        const data = (await response.json()) as Record<string, unknown>;
        models = isNamedOpenAIStyleProvider(ctx.provider)
          ? normalizeOpenAiLikeModelsResponse(data, ctx.provider)
          : (data.data as unknown[]) || (data.models as unknown[]) || [];
        break; // Success!
      }

      if (response.status === 401 || response.status === 403) {
        lastErrorStatus = response.status;
        throw new Error("auth_failed");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (msg === "auth_failed") break; // Don't try other endpoints if auth failed
      const status = getSafeOutboundFetchErrorStatus(err);
      if (status) {
        throw err;
      }
    }
  }

  // If all endpoints failed (but not because of auth), fallback to local catalog
  if (!models) {
    const fallback = ctx.buildDiscoveryFallbackResponse({
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

    console.warn(`[models] All endpoints failed for ${ctx.provider}, using local catalog`);
    models = ctx.toLocalCatalogModels();
    return ctx.buildResponse({
      provider: ctx.provider,
      connectionId: ctx.connectionId,
      models,
      source: "local_catalog",
      warning: "API unavailable — using local catalog",
    });
  }
  return ctx.buildApiDiscoveryResponse(models);
}

// ── Anthropic-compatible ────────────────────────────────────────────────────

export async function handleAnthropicCompatible(
  ctx: HandlerContext
): Promise<NextResponse | null> {
  const cachedResponse = ctx.maybeReturnCachedDiscovery();
  if (cachedResponse) return cachedResponse;

  const autoFetchDisabledResponse = ctx.maybeReturnAutoFetchDisabled();
  if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

  if (isClaudeCodeCompatibleProvider(ctx.provider)) {
    return NextResponse.json(
      { error: `Provider ${ctx.provider} does not support models listing` },
      { status: 400 }
    );
  }

  let baseUrl = getProviderBaseUrl(ctx.connection.providerSpecificData);
  if (!baseUrl) {
    const fallback = ctx.buildDiscoveryFallbackResponse({
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
  const psd = asRecord(ctx.connection.providerSpecificData);
  const modelsPath = toNonEmptyString(psd.modelsPath) || "/models";
  const url = `${baseUrl}${modelsPath}`;
  const token = ctx.accessToken || ctx.apiKey;
  let response: Response;
  try {
    response = await safeOutboundFetch(url, {
      ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
      guard: getProviderOutboundGuard(),
      proxyConfig: ctx.proxy,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(ctx.apiKey ? { "x-api-key": ctx.apiKey } : {}),
        "anthropic-version": "2023-06-01",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
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
  const models = (data.data as unknown[]) || (data.models as unknown[]) || [];

  return ctx.buildApiDiscoveryResponse(models);
}
