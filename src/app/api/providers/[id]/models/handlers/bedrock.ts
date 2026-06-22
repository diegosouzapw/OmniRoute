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

export async function handleBedrockModels(ctx: ModelsRequestContext): Promise<any> {
  const { provider, connectionId, connection, apiKey, accessToken, proxy, id, maybeReturnCachedDiscovery, maybeReturnAutoFetchDisabled, buildDiscoveryFallbackResponse, buildDiscoveryErrorFallbackResponse, buildApiDiscoveryResponse, buildResponse, buildLocalCatalogResponse } = ctx;
  const cachedResponse = maybeReturnCachedDiscovery();
      if (cachedResponse) return cachedResponse;

      const autoFetchDisabledResponse = maybeReturnAutoFetchDisabled();
      if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

      const token = apiKey || accessToken;
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

      try {
        const discovery = await discoverBedrockNativeModels({
          apiKey: token,
          providerSpecificData: connection.providerSpecificData,
          fetcher: (url, init) =>
            safeOutboundFetch(url, {
              ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
              guard: getProviderOutboundGuard(),
              proxyConfig: proxy,
              ...init,
            }),
        });
        const models = discovery.models.map((model) => ({
          id: model.id,
          name: model.name || model.id,
          owned_by: model.provider || "bedrock",
          source: model.source,
          ...(model.supportsStreaming !== undefined
            ? { supportsStreaming: model.supportsStreaming }
            : {}),
          ...(model.supportsVision !== undefined ? { supportsVision: model.supportsVision } : {}),
          ...(typeof model.inputTokenLimit === "number"
            ? { inputTokenLimit: model.inputTokenLimit }
            : {}),
          ...(typeof model.outputTokenLimit === "number"
            ? { outputTokenLimit: model.outputTokenLimit }
            : {}),
        }));
        return buildApiDiscoveryResponse(models, discovery.warnings[0]);
      } catch (error) {
        const status = isBedrockNativeApiError(error)
          ? error.status
          : getSafeOutboundFetchErrorStatus(error);
        if (status === 401 || status === 403) {
          const fallback = buildDiscoveryFallbackResponse({
            cacheWarning: `Auth failed (${status}) — using cached catalog`,
            localWarning: `Auth failed (${status}) — using local catalog`,
          });
          if (fallback) return fallback;
          return NextResponse.json({ error: `Auth failed: ${status}` }, { status });
        }
        if (status === 400) {
          return NextResponse.json(
            { error: "Invalid Bedrock region or models request" },
            { status }
          );
        }
        const fallback = buildDiscoveryFallbackResponse({
          cacheWarning: "Bedrock models API unavailable — using cached catalog",
          localWarning: "Bedrock models API unavailable — using local catalog",
        });
        if (fallback) return fallback;
        if (status) {
          return NextResponse.json({ error: `Bedrock models API failed: ${status}` }, { status });
        }
        throw error;
      }
  return null;
}