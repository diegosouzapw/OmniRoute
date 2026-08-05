import {
  discoverAdobeFireflyModels,
  resolveAdobeAccessToken,
} from "@omniroute/open-sse/services/adobeFireflyClient.ts";
import {
  getAdobeFireflyFallbackCatalog,
  mapDiscoveredToCatalog,
  toAdobeMediaCapabilitiesApi,
  type AdobeFireflyCatalogModel,
} from "@omniroute/open-sse/services/adobeFireflyModels.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

type AdobeProviderData = { cookie?: unknown; access_token?: unknown; accessToken?: unknown };

interface AdobeProviderModelsResult {
  models: Array<Record<string, unknown>>;
  source: "api" | "local_catalog";
  warning?: string;
}

function toModelResponse(model: AdobeFireflyCatalogModel): Record<string, unknown> {
  const endpoint = model.modality === "image" ? "images" : "videos";
  return {
    id: model.id,
    name: model.name,
    owned_by: "adobe-firefly",
    apiFormat: endpoint,
    supportedEndpoints: [endpoint],
    type: model.modality,
    input_modalities: model.inputModalities,
    output_modalities: [model.modality],
    supported_sizes: model.capabilities.supportedSizes,
    media_capabilities: toAdobeMediaCapabilitiesApi(model),
  };
}

function fallback(warning: string): AdobeProviderModelsResult {
  return {
    models: getAdobeFireflyFallbackCatalog().map(toModelResponse),
    source: "local_catalog",
    warning,
  };
}

export async function getAdobeModels(
  apiKey: string | undefined,
  accessToken: string | undefined,
  providerData: unknown,
  fetchImpl: typeof fetch = fetch
): Promise<AdobeProviderModelsResult> {
  const providerSpecificData =
    providerData && typeof providerData === "object" ? (providerData as AdobeProviderData) : {};
  try {
    const token = await resolveAdobeAccessToken(
      {
        apiKey,
        accessToken,
        providerSpecificData,
      },
      fetchImpl
    );
    const models = mapDiscoveredToCatalog(await discoverAdobeFireflyModels(token, fetchImpl));
    return models.length > 0
      ? { models: models.map(toModelResponse), source: "api" }
      : fallback("Adobe Firefly discovery returned no callable image or video models");
  } catch (error) {
    return fallback(
      `Adobe Firefly discovery unavailable: ${sanitizeErrorMessage(
        error instanceof Error ? error.message : String(error)
      )}`
    );
  }
}
