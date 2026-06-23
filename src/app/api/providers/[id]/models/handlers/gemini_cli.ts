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
import { asRecord, toGeminiCliProjectId } from "../utils.ts";

export async function handleGeminiCliModels(ctx: ModelsRequestContext): Promise<any> {
  const { provider, connectionId, connection, apiKey, accessToken, proxy, id, maybeReturnCachedDiscovery, maybeReturnAutoFetchDisabled, buildDiscoveryFallbackResponse, buildDiscoveryErrorFallbackResponse, buildApiDiscoveryResponse, buildResponse, buildLocalCatalogResponse } = ctx;
  const cachedResponse = maybeReturnCachedDiscovery();
      if (cachedResponse) return cachedResponse;

      const autoFetchDisabledResponse = maybeReturnAutoFetchDisabled();
      if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

      // Gemini CLI doesn't have a /models endpoint. Instead, query the quota
      // endpoint to discover available models from the quota buckets.
      if (!accessToken) {
        return NextResponse.json(
          { error: "No access token for Gemini CLI. Please reconnect OAuth." },
          { status: 400 }
        );
      }

      const psd = asRecord(connection.providerSpecificData);
      const projectId =
        toGeminiCliProjectId(psd.projectId) ||
        toGeminiCliProjectId(psd.project) ||
        toGeminiCliProjectId(connection.projectId);

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
            proxyConfig: proxy,
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
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
          const fallback = buildDiscoveryFallbackResponse();
          if (fallback) return fallback;
          return NextResponse.json(
            { error: `Failed to fetch Gemini CLI models: ${quotaRes.status}` },
            { status: quotaRes.status }
          );
        }

        const quotaData = await quotaRes.json();
        const buckets: Array<{ modelId?: string; tokenType?: string }> = quotaData.buckets || [];

        const models = buckets
          .filter((b) => b.modelId)
          .map((b) => ({
            id: b.modelId,
            name: b.modelId,
            owned_by: "google",
          }));

        return buildApiDiscoveryResponse(models);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.log("[models] Gemini CLI model fetch error:", msg);
        const fallback = buildDiscoveryFallbackResponse();
        if (fallback) return fallback;
        return NextResponse.json({ error: "Failed to fetch Gemini CLI models" }, { status: 500 });
      }
  return null;
}