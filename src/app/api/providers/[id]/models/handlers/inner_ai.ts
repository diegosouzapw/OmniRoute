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

export async function handleInnerAiModels(ctx: ModelsRequestContext): Promise<any> {
  const { provider, connectionId, connection, apiKey, accessToken, proxy, id, maybeReturnCachedDiscovery, maybeReturnAutoFetchDisabled, buildDiscoveryFallbackResponse, buildDiscoveryErrorFallbackResponse, buildApiDiscoveryResponse, buildResponse, buildLocalCatalogResponse } = ctx;
  const cachedResponse = maybeReturnCachedDiscovery();
      if (cachedResponse) return cachedResponse;

      const autoFetchDisabledResponse = maybeReturnAutoFetchDisabled();
      if (autoFetchDisabledResponse) return autoFetchDisabledResponse;

      try {
        // Parse "TOKEN EMAIL" credential format
        const raw = apiKey.trim();
        const eqIdx = raw.indexOf("=");
        const stripped = eqIdx > 0 && !raw.startsWith("eyJ") ? raw.slice(eqIdx + 1).trim() : raw;
        const lastSpace = stripped.lastIndexOf(" ");
        let innerAiToken = stripped;
        let innerAiEmail = "";
        if (lastSpace > 0) {
          const possibleEmail = stripped.slice(lastSpace + 1).trim();
          if (possibleEmail.includes("@")) {
            innerAiToken = stripped.slice(0, lastSpace).trim();
            innerAiEmail = possibleEmail;
          }
        }

        // Decode device_id from JWT payload
        let innerAiDeviceId = "";
        try {
          const parts = innerAiToken.split(".");
          if (parts.length >= 2) {
            const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
            const payload = JSON.parse(Buffer.from(b64, "base64").toString("utf8"));
            innerAiDeviceId = String(
              payload?.device_id ??
                payload?.deviceId ??
                payload?.["device-id"] ??
                payload?.did ??
                ""
            ).trim();
          }
        } catch {
          /* ignore */
        }

        const innerAiHeaders: Record<string, string> = {
          "USER-TOKEN": innerAiToken,
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
          Origin: "https://app.innerai.com",
          Referer: "https://app.innerai.com/",
        };
        if (innerAiEmail) innerAiHeaders["USER-EMAIL"] = innerAiEmail;
        if (innerAiDeviceId) innerAiHeaders["DEVICE-ID"] = innerAiDeviceId;

        const modelsResp = await safeOutboundFetch(
          "https://platformapi.innerai.com/api/v1/ai_models",
          { headers: innerAiHeaders },
          getProviderOutboundGuard(provider)
        );
        if (!modelsResp.ok) {
          throw new Error(`Inner.ai models API returned HTTP ${modelsResp.status}`);
        }

        const modelsBody = await modelsResp.json().catch(() => null);
        const rawModels: Array<Record<string, unknown>> = Array.isArray(modelsBody?.ai_models)
          ? modelsBody.ai_models
          : Array.isArray(modelsBody)
            ? modelsBody
            : [];

        // Filter: enabled, available, text/chat category only.
        // Use ai_model_categories[].unique_identifier === "text" when available;
        // fall back to llm_model name heuristic for models without categories.
        const nonTextPattern =
          /image|video|audio|img|vid|sound|music|voice|tts|stt|track|clip|avatar|cartoon|flux|stable.diff|recraft|ideogram|leonardo|magnific|bria|seedream|luma|kling|pika|veo|wan-|heygen|did-|vidu|pixverse|sora-|gen-[0-9]|playground|gemini-fal|gamma|lyria|clothes|whisper/i;
        const textModels = rawModels.filter((m) => {
          if (m.enable === false || m.unavailable_api) return false;
          if (typeof m.llm_model !== "string") return false;
          const cats = Array.isArray(m.ai_model_categories) ? m.ai_model_categories : null;
          if (cats && cats.length > 0) {
            return cats.some(
              (c: Record<string, unknown>) =>
                String(c.unique_identifier ?? c.name ?? "").toLowerCase() === "text"
            );
          }
          // No categories field — fall back to name heuristic
          return !nonTextPattern.test(m.llm_model as string);
        });

        const models = textModels.map((m) => ({
          id: String(m.llm_model),
          name: String(m.name || m.llm_model),
        }));

        return buildApiDiscoveryResponse(models);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        const fallback = buildDiscoveryFallbackResponse({
          cacheWarning: `Inner.ai models unavailable (${message}) — using cached catalog`,
          localWarning: `Inner.ai models unavailable (${message}) — using local catalog`,
        });
        if (fallback) return fallback;
        return NextResponse.json(
          { error: `Failed to fetch Inner.ai models: ${message}` },
          { status: 502 }
        );
      }
  return null;
}