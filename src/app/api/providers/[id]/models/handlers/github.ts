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
import { asRecord, toNonEmptyString, mergeLocalCatalogModels } from "../utils.ts";

export async function handleGithubModels(ctx: ModelsRequestContext): Promise<any> {
  const { provider, connectionId, connection, apiKey, accessToken, proxy, id, maybeReturnCachedDiscovery, maybeReturnAutoFetchDisabled, buildDiscoveryFallbackResponse, buildDiscoveryErrorFallbackResponse, buildApiDiscoveryResponse, buildResponse, buildLocalCatalogResponse } = ctx;
  // #3120/#3121 — GitHub Copilot's catalog is per-account and dynamic. The
      // registry static list never refreshes and advertises non-entitled models
      // (e.g. gemini previews) that fail upstream when tested. Discover the live
      // catalog from api.githubcopilot.com/models with the Copilot bearer +
      // Copilot chat headers; fall back to the static registry catalog when the
      // live fetch is unavailable (offline/unauthed/error) so import never breaks.
      const cachedResponse = maybeReturnCachedDiscovery();
      if (cachedResponse) return cachedResponse;

      const autoFetchDisabledResponse = maybeReturnAutoFetchDisabled();
      if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

      const psd = asRecord(connection.providerSpecificData);
      // The /models endpoint requires the short-lived Copilot token (same as the
      // chat executor), not the raw GitHub OAuth access token.
      const copilotToken =
        toNonEmptyString(psd.copilotToken) || toNonEmptyString(accessToken) || null;

      // Compute local catalog models for fallback within the handler
      const catalogModels = getModelsByProviderId(ctx.provider) || [];
      const staticModels = getStaticModelsForProvider(ctx.provider) || [];
      const mergedCatalog = mergeLocalCatalogModels(catalogModels, staticModels);
      const fallbackModels = mergedCatalog.map((model) => ({
        id: model.id,
        name: model.name || model.id,
        ...(catalogModels.length > 0 ? { owned_by: ctx.provider } : {}),
      }));

      const discovery = await fetchGitHubCopilotModels({
        token: copilotToken,
        fetchImpl: (url, init) =>
          safeOutboundFetch(url as string, {
            ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
            guard: getProviderOutboundGuard(),
            proxyConfig: proxy,
            ...(init as Record<string, unknown>),
          }),
        fallbackModels,
      });
      if (discovery.source === "api") {
        return buildApiDiscoveryResponse(discovery.models);
      }

      // Live discovery unavailable — preserve cached/static catalog behavior.
      const fallback = buildDiscoveryFallbackResponse({
        cacheWarning: "Copilot models API unavailable — using cached catalog",
        localWarning: "Copilot models API unavailable — using local catalog",
      });
      if (fallback) return fallback;
      return buildResponse({
        provider,
        connectionId,
        models: discovery.models,
        source: "local_catalog",
        warning: "Copilot models API unavailable — using local catalog",
      });
  return null;
}