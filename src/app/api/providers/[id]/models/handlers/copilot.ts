import { NextResponse } from "next/server";
import { fetchGitHubCopilotModels } from "@omniroute/open-sse/services/githubCopilotModels.ts";
import { fetchKiroAvailableModels } from "@omniroute/open-sse/services/kiroModels.ts";
import {
  SAFE_OUTBOUND_FETCH_PRESETS,
  safeOutboundFetch,
} from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuard";
import { asRecord, toNonEmptyString } from "../helpers";
import type { HandlerContext } from "./types";

// ── GitHub Copilot ──────────────────────────────────────────────────────────

export async function handleGithub(ctx: HandlerContext): Promise<NextResponse | null> {
  // #3120/#3121 — GitHub Copilot's catalog is per-account and dynamic.
  const cachedResponse = ctx.maybeReturnCachedDiscovery();
  if (cachedResponse) return cachedResponse;

  const autoFetchDisabledResponse = ctx.maybeReturnAutoFetchDisabled();
  if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

  const psd = asRecord(ctx.connection.providerSpecificData);
  const copilotToken =
    toNonEmptyString(psd.copilotToken) || toNonEmptyString(ctx.accessToken) || null;

  const discovery = await fetchGitHubCopilotModels({
    token: copilotToken,
    fetchImpl: (url: string, init: RequestInit) =>
      safeOutboundFetch(url, {
        ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
        guard: getProviderOutboundGuard(),
        proxyConfig: ctx.proxy,
        ...init,
      }),
    fallbackModels: ctx.toLocalCatalogModels(),
  });

  if (discovery.source === "api") {
    return ctx.buildApiDiscoveryResponse(discovery.models);
  }

  // Live discovery unavailable — preserve cached/static catalog behavior.
  const fallback = ctx.buildDiscoveryFallbackResponse({
    cacheWarning: "Copilot models API unavailable — using cached catalog",
    localWarning: "Copilot models API unavailable — using local catalog",
  });
  if (fallback) return fallback;
  return ctx.buildResponse({
    provider: ctx.provider,
    connectionId: ctx.connectionId,
    models: discovery.models,
    source: "local_catalog",
    warning: "Copilot models API unavailable — using local catalog",
  });
}

// ── Kiro ────────────────────────────────────────────────────────────────────

export async function handleKiro(ctx: HandlerContext): Promise<NextResponse | null> {
  const cachedResponse = ctx.maybeReturnCachedDiscovery();
  if (cachedResponse) return cachedResponse;

  const autoFetchDisabledResponse = ctx.maybeReturnAutoFetchDisabled();
  if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

  if (!ctx.accessToken) {
    const fallback = ctx.buildDiscoveryFallbackResponse({
      cacheWarning: "OAuth token unavailable — using cached catalog",
      localWarning: "OAuth token unavailable — using local catalog",
    });
    if (fallback) return fallback;
    return ctx.buildResponse({
      provider: ctx.provider,
      connectionId: ctx.connectionId,
      models: ctx.toLocalCatalogModels(),
      source: "local_catalog",
      warning: "OAuth token unavailable — using local catalog",
    });
  }

  const discovery = await fetchKiroAvailableModels({
    accessToken: ctx.accessToken,
    providerSpecificData: ctx.connection.providerSpecificData,
    fetchImpl: (url: string, init: RequestInit) =>
      safeOutboundFetch(url, {
        ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
        guard: getProviderOutboundGuard(),
        proxyConfig: ctx.proxy,
        ...init,
      }),
    fallbackModels: ctx.toLocalCatalogModels(),
  });

  if (discovery.source === "api" && discovery.models.length > 0) {
    return ctx.buildApiDiscoveryResponse(discovery.models);
  }

  const fallback = ctx.buildDiscoveryFallbackResponse({
    cacheWarning: "Kiro models API unavailable — using cached catalog",
    localWarning: "Kiro models API unavailable — using local catalog",
  });
  if (fallback) return fallback;
  return ctx.buildResponse({
    provider: ctx.provider,
    connectionId: ctx.connectionId,
    models: discovery.models,
    source: "local_catalog",
    warning: "Kiro models API unavailable — using local catalog",
  });
}
