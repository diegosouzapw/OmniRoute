import { NextResponse } from "next/server";
import {
  isClaudeCodeCompatibleProvider,
  isAnthropicCompatibleProvider,
  isOpenAICompatibleProvider,
  isSelfHostedChatProvider,
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
import { getStaticQoderModels } from "@omniroute/open-sse/services/qoderCli.ts";
import { fetchGitHubCopilotModels } from "@omniroute/open-sse/services/githubCopilotModels.ts";
import { getAntigravityHeaders } from "@omniroute/open-sse/services/antigravityHeaders.ts";
import { ensureAntigravityProjectAssigned } from "@omniroute/open-sse/services/antigravityProjectBootstrap.ts";
import {
  getAntigravityModelsDiscoveryUrls,
  getAntigravityFetchAvailableModelsUrls,
} from "@omniroute/open-sse/config/antigravityUpstream.ts";
import {
  buildGlmCodingHeaders,
  buildGlmModelsUrl,
} from "@omniroute/open-sse/config/glmProvider.ts";
import { getImageProvider } from "@omniroute/open-sse/config/imageRegistry.ts";
import { getVideoProvider } from "@omniroute/open-sse/config/videoRegistry.ts";
import { resolveAntigravityVersion } from "@omniroute/open-sse/services/antigravityVersion.ts";
import {
  discoverBedrockNativeModels,
  isBedrockNativeApiError,
} from "@omniroute/open-sse/services/bedrock.ts";
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
  getClientVisibleAntigravityModelName,
  isUserCallableAntigravityModelId,
  toClientAntigravityModelId,
} from "@omniroute/open-sse/config/antigravityModelAliases.ts";
import { normalizeAntigravityClientProfile } from "@/shared/constants/antigravityClientProfile";
import { getEmbeddingProvider } from "@omniroute/open-sse/config/embeddingRegistry.ts";
import { getRerankProvider } from "@omniroute/open-sse/config/rerankRegistry.ts";
import {
  getSpeechProvider,
  getTranscriptionProvider,
} from "@omniroute/open-sse/config/audioRegistry.ts";
import {
  getCachedDiscoveredModels,
  isAutoFetchModelsEnabled,
  persistDiscoveredModels,
} from "@/lib/providerModels/modelDiscovery";
import { getSyncedAvailableModels } from "@/lib/db/models";
import { fetchCursorAgentModels } from "@/lib/providerModels/cursorAgent";

import { ModelsRequestContext } from "../types.ts";
import { getProviderBaseUrl, buildOptionalBearerHeaders } from "../utils.ts";
import { normalizeDataRobotCatalogResponse } from "../customNormalizers.ts";

export async function handleDatarobotModels(ctx: ModelsRequestContext): Promise<any> {
  const { provider, connectionId, connection, apiKey, accessToken, proxy, id, maybeReturnCachedDiscovery, maybeReturnAutoFetchDisabled, buildDiscoveryFallbackResponse, buildDiscoveryErrorFallbackResponse, buildApiDiscoveryResponse, buildResponse, buildLocalCatalogResponse } = ctx;
  const cachedResponse = maybeReturnCachedDiscovery();
      if (cachedResponse) return cachedResponse;

      const autoFetchDisabledResponse = maybeReturnAutoFetchDisabled();
      if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

      const token = accessToken || apiKey;
      if (!token) {
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
          { status: 400 }
        );
      }

      const configuredBaseUrl =
        getProviderBaseUrl(connection.providerSpecificData) || DATAROBOT_DEFAULT_BASE_URL;

      if (isDataRobotDeploymentUrl(configuredBaseUrl)) {
        const fallback = buildDiscoveryFallbackResponse({
          cacheWarning: "Deployment URL does not expose catalog — using cached catalog",
          localWarning: "Deployment URL does not expose catalog — using local catalog",
        });
        if (fallback) return fallback;
        return buildResponse({
          provider,
          connectionId,
          models: toLocalCatalogModels(),
          source: "local_catalog",
          warning: "Deployment URL does not expose catalog — using local catalog",
        });
      }

      const catalogUrl = buildDataRobotCatalogUrl(configuredBaseUrl);
      if (!catalogUrl) {
        const fallback = buildDiscoveryFallbackResponse({
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
          proxyConfig: proxy,
          method: "GET",
          headers: buildOptionalBearerHeaders(token),
        });
      } catch (error) {
        const fallback = buildDiscoveryErrorFallbackResponse(error, {
          cacheWarning: "DataRobot catalog unavailable — using cached catalog",
          localWarning: "DataRobot catalog unavailable — using local catalog",
        });
        if (fallback) return fallback;
        throw error;
      }

      if (!response.ok) {
        const fallback = buildDiscoveryFallbackResponse({
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
      return buildApiDiscoveryResponse(
        models.map((model) => ({
          ...model,
          owned_by: "datarobot",
        }))
      );
  return null;
}