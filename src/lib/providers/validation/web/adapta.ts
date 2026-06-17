import crypto from "node:crypto";

import { getEmbeddingProvider } from "@omniroute/open-sse/config/embeddingRegistry.ts";

import { getRerankProvider } from "@omniroute/open-sse/config/rerankRegistry.ts";

import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";

import { selectProxyForValidation } from "@omniroute/open-sse/services/proxyAutoSelector.ts";

import {
  buildClaudeCodeCompatibleHeaders,
  buildClaudeCodeCompatibleValidationPayload,
  CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH,
  CLAUDE_CODE_COMPATIBLE_DEFAULT_MODELS_PATH,
  joinClaudeCodeCompatibleUrl,
  joinBaseUrlAndPath,
  stripClaudeCodeCompatibleEndpointSuffix,
  stripAnthropicMessagesSuffix,
} from "@omniroute/open-sse/services/claudeCodeCompatible.ts";

import {
  buildGrokCookieHeader,
  extractCookieValue,
  normalizeSessionCookieHeader,
} from "@/lib/providers/webCookieAuth";

import { buildJulesApiUrl } from "@/lib/cloudAgent/julesApi.ts";

import { getGigachatAccessToken } from "@omniroute/open-sse/services/gigachatAuth.ts";

import { validateQoderCliPat } from "@omniroute/open-sse/services/qoderCli.ts";

import {
  AZURE_AI_DEFAULT_BASE_URL,
  buildAzureAiChatUrl,
  buildAzureAiModelsUrl,
} from "@omniroute/open-sse/config/azureAi.ts";

import {
  discoverBedrockNativeModels,
  isBedrockNativeApiError,
  isBedrockNativeAuthError,
} from "@omniroute/open-sse/services/bedrock.ts";

import {
  DATAROBOT_DEFAULT_BASE_URL,
  buildDataRobotCatalogUrl,
  buildDataRobotChatUrl,
  isDataRobotDeploymentUrl,
} from "@omniroute/open-sse/config/datarobot.ts";

import {
  OCI_DEFAULT_BASE_URL,
  buildOciChatUrl,
  buildOciModelsUrl,
} from "@omniroute/open-sse/config/oci.ts";

import {
  SAP_DEFAULT_BASE_URL,
  buildSapChatUrl,
  buildSapModelsUrl,
  getSapResourceGroup,
  isSapDeploymentUrl,
} from "@omniroute/open-sse/config/sap.ts";

import {
  WATSONX_DEFAULT_BASE_URL,
  buildWatsonxChatUrl,
  buildWatsonxModelsUrl,
} from "@omniroute/open-sse/config/watsonx.ts";

import {
  buildRunwayApiUrl,
  buildRunwayHeaders,
  normalizeRunwayBaseUrl,
} from "@omniroute/open-sse/config/runway.ts";

import {
  buildMaritalkChatUrl,
  buildMaritalkModelsUrl,
} from "@omniroute/open-sse/config/maritalk.ts";

import { signAwsRequest } from "@omniroute/open-sse/utils/awsSigV4.ts";

import {
  toValidationErrorResult,
  applyCustomUserAgent,
  validationRead,
  validationWrite,
} from "../utils.ts";
export async function validateAdaptaWebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const raw = typeof apiKey === "string" ? apiKey.trim() : "";
    if (!raw)
      return { valid: false, error: "Paste your __client cookie from .clerk.agent.adapta.one" };
    const eqIdx = raw.indexOf("=");
    const clientJwt = eqIdx > 0 && !raw.startsWith("eyJ") ? raw.slice(eqIdx + 1).trim() : raw;

    const response = await validationRead("https://clerk.agent.adapta.one/v1/client", {
      headers: applyCustomUserAgent(
        {
          Cookie: `__client=${clientJwt}`,
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
          Origin: "https://agent.adapta.one",
        },
        providerSpecificData
      ),
    });

    if (response.status === 401 || response.status === 403) {
      return {
        valid: false,
        error: "Invalid or expired __client cookie — re-paste from .clerk.agent.adapta.one",
      };
    }

    if (!response.ok) {
      return { valid: false, error: `Adapta Clerk returned HTTP ${response.status}` };
    }

    const body = await response.json().catch(() => null);
    const sessions: Array<{ id: string; status: string }> = body?.response?.sessions ?? [];
    const hasActive = sessions.some((s) => s.status === "active");
    if (!hasActive) {
      return {
        valid: false,
        error: "No active Adapta session — your __client cookie may be expired",
      };
    }

    return { valid: true, error: null };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

export async function validateClaudeWebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const cookieHeader = normalizeSessionCookieHeader(String(apiKey || ""), "sessionKey");
    if (!cookieHeader) {
      return { valid: false, error: "Paste your sessionKey cookie from claude.ai" };
    }

    const { tlsFetchClaude, TlsClientUnavailableError } =
      await import("@omniroute/open-sse/services/claudeTlsClient.ts");

    let response: { status: number; text: string | null };
    try {
      response = await tlsFetchClaude("https://claude.ai/api/organizations", {
        method: "GET",
        headers: applyCustomUserAgent(
          {
            Accept: "application/json",
            "Accept-Language": "en-US,en;q=0.9",
            "Cache-Control": "no-cache",
            Cookie: cookieHeader,
            Origin: "https://claude.ai",
            Pragma: "no-cache",
            Referer: "https://claude.ai/new",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "anthropic-client-platform": "web_claude_ai",
          },
          providerSpecificData
        ),
        timeoutMs: 30_000,
      });
    } catch (err: any) {
      if (err instanceof TlsClientUnavailableError) {
        return {
          valid: false,
          error: `${err.message} (claude-web requires this — without it, Cloudflare blocks every request)`,
        };
      }
      throw err;
    }

    if (response.status === 200) {
      return { valid: true, error: null };
    }

    if (response.status === 401 || response.status === 403) {
      return {
        valid: false,
        error:
          "Invalid or expired session cookie — re-paste sessionKey from claude.ai DevTools → Cookies",
      };
    }

    if (response.status === 429) {
      return { valid: true, error: null };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Claude.ai unavailable (${response.status})` };
    }

    return { valid: false, error: `Claude.ai validation failed (${response.status})` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}
