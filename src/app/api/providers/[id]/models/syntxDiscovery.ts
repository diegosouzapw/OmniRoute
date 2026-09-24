import { SAFE_OUTBOUND_FETCH_PRESETS, safeOutboundFetch } from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuardPolicy";
import {
  SYNTX_FALLBACK_MODELS,
  discoverSyntxModels,
  type SyntxCatalogModel,
} from "@omniroute/open-sse/services/syntxModels.ts";
import { looksLikeJwt, resolveSyntxToken } from "@omniroute/open-sse/services/syntxAuth.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

interface DiscoveryWarnings {
  cacheWarning?: string;
  localWarning?: string;
}

interface SyntxDiscoveryRouteOptions {
  provider: string;
  connectionId: string;
  apiKey: unknown;
  accessToken: unknown;
  providerSpecificData: unknown;
  proxy: unknown;
  maybeReturnCachedDiscovery: () => Response | null;
  maybeReturnAutoFetchDisabled: () => Response | null;
  buildDiscoveryFallbackResponse: (warnings: DiscoveryWarnings) => Response | null;
  buildResponse: (payload: Record<string, unknown>) => Response;
  buildApiDiscoveryResponse: (models: SyntxCatalogModel[]) => Promise<Response>;
}

export async function maybeHandleSyntxModelDiscovery(
  options: SyntxDiscoveryRouteOptions
): Promise<Response | null> {
  if (options.provider !== "syntx" && options.provider !== "stx") return null;

  const cachedResponse = options.maybeReturnCachedDiscovery();
  if (cachedResponse) return cachedResponse;

  const autoFetchDisabledResponse = options.maybeReturnAutoFetchDisabled();
  if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

  const seedModels = SYNTX_FALLBACK_MODELS.map((model) => ({
    id: model.id,
    name: model.name,
  }));

  const token = resolveSyntxToken({
    apiKey: options.apiKey,
    accessToken: options.accessToken,
    providerSpecificData: options.providerSpecificData,
  });

  if (!looksLikeJwt(token)) {
    const fallback = options.buildDiscoveryFallbackResponse({
      cacheWarning: "No SYNTX JWT configured — using cached catalog",
      localWarning: "No SYNTX JWT configured — using local catalog",
    });
    if (fallback) return fallback;
    return options.buildResponse({
      provider: options.provider,
      connectionId: options.connectionId,
      models: seedModels,
      source: "local_catalog",
      intentional: true,
      warning: "No SYNTX Bearer JWT — using seed model list",
    });
  }

  try {
    const models = await discoverSyntxModels({
      token,
      fetchImpl: (url, init) =>
        safeOutboundFetch(url, {
          ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
          guard: getProviderOutboundGuard(),
          proxyConfig: options.proxy,
          ...init,
        }),
    });
    return options.buildApiDiscoveryResponse(models);
  } catch (error) {
    console.log("Error fetching models from syntx", {
      error: sanitizeErrorMessage(error instanceof Error ? error.message : error),
    });
    const fallback = options.buildDiscoveryFallbackResponse({
      cacheWarning: "SYNTX model discovery failed — using cached catalog",
      localWarning: "SYNTX model discovery failed — using seed catalog",
    });
    if (fallback) return fallback;
    return options.buildResponse({
      provider: options.provider,
      connectionId: options.connectionId,
      models: seedModels,
      source: "local_catalog",
      intentional: true,
      warning: "API unavailable — using seed SYNTX model list",
    });
  }
}
