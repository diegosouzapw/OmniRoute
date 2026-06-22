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
import { asRecord } from "../utils.ts";

export async function handleGlmModels(ctx: ModelsRequestContext): Promise<any> {
  const { provider, connectionId, connection, apiKey, accessToken, proxy, id, maybeReturnCachedDiscovery, maybeReturnAutoFetchDisabled, buildDiscoveryFallbackResponse, buildDiscoveryErrorFallbackResponse, buildApiDiscoveryResponse, buildResponse, buildLocalCatalogResponse } = ctx;
  const cachedResponse = maybeReturnCachedDiscovery();
      if (cachedResponse) return cachedResponse;

      const autoFetchDisabledResponse = maybeReturnAutoFetchDisabled();
      if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

      const token = apiKey || accessToken;
      const glmProviderSpecificData = {
        ...asRecord(connection.providerSpecificData),
        ...(provider === "glm-cn" ? { apiRegion: "china" } : {}),
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
            proxyConfig: proxy,
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
        const fallback = buildDiscoveryErrorFallbackResponse(error);
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
        const fallback = buildDiscoveryFallbackResponse();
        if (fallback) return fallback;
        return NextResponse.json(
          { error: `Failed to fetch models: ${response?.status || 502}` },
          { status: response?.status || 502 }
        );
      }

      const data = await response.json();
      const models = data.data || data.models || [];

      return buildApiDiscoveryResponse(models);
  return null;
}