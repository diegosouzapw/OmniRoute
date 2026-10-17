import { SAFE_OUTBOUND_FETCH_PRESETS, safeOutboundFetch } from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuardPolicy";
import { mergeModelsWithCustomPrecedence } from "@/lib/providers/modelMetadataPrecedence";
import {
  DEVIN_MODEL_CATALOG,
  discoverDevinDesktopModels,
  type DevinDesktopDiscoveredModel,
} from "@omniroute/open-sse/services/devinDesktopModels.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

interface DiscoveryWarnings {
  cacheWarning?: string;
  localWarning?: string;
}

interface DevinDesktopDiscoveryRouteOptions {
  provider: string;
  connectionId: string;
  apiKey: unknown;
  accessToken: unknown;
  proxy?: unknown;
  maybeReturnCachedDiscovery: () => Response | null;
  maybeReturnAutoFetchDisabled: () => Response | null;
  buildDiscoveryFallbackResponse: (warnings: DiscoveryWarnings) => Response | null;
  buildResponse: (payload: Record<string, unknown>) => Response;
  buildApiDiscoveryResponse: (models: Record<string, unknown>[]) => Promise<Response>;
  /** Test seam; defaults to the guarded, proxy-aware outbound fetch. */
  fetchImpl?: typeof fetch;
}

function staticCatalogResponse(
  options: DevinDesktopDiscoveryRouteOptions,
  warnings: DiscoveryWarnings,
  warning: string
): Response {
  const fallback = options.buildDiscoveryFallbackResponse(warnings);
  if (fallback) return fallback;
  return options.buildResponse({
    provider: options.provider,
    connectionId: options.connectionId,
    models: DEVIN_MODEL_CATALOG,
    source: "local_catalog",
    warning,
  });
}

/** Live ids win membership; a curated entry's fields (name, output limit) win for its id. */
function overlayCuratedMetadata(discovered: DevinDesktopDiscoveredModel[]) {
  const liveIds = new Set(discovered.map((model) => model.id));
  const curated = DEVIN_MODEL_CATALOG.filter((model) => liveIds.has(model.id)).map((model) => ({
    ...model,
  }));
  return mergeModelsWithCustomPrecedence(
    discovered.map((model) => ({ ...model })),
    curated
  );
}

/** GetCliModelConfigs discovery for devin-desktop, falling back to the curated catalog. */
export async function maybeHandleDevinDesktopModelDiscovery(
  options: DevinDesktopDiscoveryRouteOptions
): Promise<Response | null> {
  if (options.provider !== "devin-desktop") return null;

  const cachedResponse = options.maybeReturnCachedDiscovery();
  if (cachedResponse) return cachedResponse;

  const autoFetchDisabledResponse = options.maybeReturnAutoFetchDisabled();
  if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

  const token =
    (typeof options.accessToken === "string" && options.accessToken.trim()) ||
    (typeof options.apiKey === "string" && options.apiKey.trim()) ||
    "";
  if (!token) {
    return staticCatalogResponse(
      options,
      {
        cacheWarning: "No Devin token configured — using cached catalog",
        localWarning: "No Devin token configured — using local catalog",
      },
      "No Devin token configured — using the curated Devin catalog"
    );
  }

  const fetchImpl =
    options.fetchImpl ??
    (((url: string, init?: RequestInit) =>
      safeOutboundFetch(url, {
        ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
        guard: getProviderOutboundGuard(),
        proxyConfig: options.proxy,
        ...init,
      })) as typeof fetch);

  try {
    const models = await discoverDevinDesktopModels(token, { fetchImpl });
    if (models.length === 0) throw new Error("Devin returned no enabled models");
    return options.buildApiDiscoveryResponse(overlayCuratedMetadata(models));
  } catch (error) {
    const reason = sanitizeErrorMessage(error instanceof Error ? error.message : String(error));
    console.log("Error fetching models from devin-desktop", { error: reason });
    return staticCatalogResponse(
      options,
      {
        cacheWarning: `Devin model discovery failed (${reason}) — using cached catalog`,
        localWarning: `Devin model discovery failed (${reason}) — using local catalog`,
      },
      `Devin model discovery failed (${reason}) — using the curated Devin catalog`
    );
  }
}
