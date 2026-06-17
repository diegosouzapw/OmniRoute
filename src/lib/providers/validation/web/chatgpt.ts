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
export async function validateChatGptWebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    // Accept bare value, unchunked cookie, chunked (.0/.1) cookies, or full
    // "Cookie: ..." DevTools line. Pass through verbatim once recognised.
    let cookieHeader = String(apiKey || "").trim();
    if (/^cookie\s*:\s*/i.test(cookieHeader)) {
      cookieHeader = cookieHeader.replace(/^cookie\s*:\s*/i, "");
    }
    if (!/__Secure-next-auth\.session-token(?:\.\d+)?\s*=/.test(cookieHeader)) {
      cookieHeader = `__Secure-next-auth.session-token=${cookieHeader}`;
    }

    // Use the TLS-impersonating client — Cloudflare on chatgpt.com pins
    // cf_clearance to JA3/JA4 + HTTP/2 SETTINGS, so plain Node fetch always
    // gets cf-mitigated: challenge regardless of cookies.
    const { tlsFetchChatGpt, TlsClientUnavailableError } =
      await import("@omniroute/open-sse/services/chatgptTlsClient.ts");

    let response;
    try {
      response = await tlsFetchChatGpt("https://chatgpt.com/api/auth/session", {
        method: "GET",
        headers: applyCustomUserAgent(
          {
            Accept: "application/json",
            "Accept-Language": "en-US,en;q=0.9",
            "Cache-Control": "no-cache",
            Cookie: cookieHeader,
            Origin: "https://chatgpt.com",
            Pragma: "no-cache",
            Referer: "https://chatgpt.com/",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:148.0) Gecko/20100101 Firefox/148.0",
          },
          providerSpecificData
        ),
        timeoutMs: 30_000,
      });
    } catch (err: any) {
      if (err instanceof TlsClientUnavailableError) {
        return {
          valid: false,
          error: `${err.message} (chatgpt-web requires this — without it, Cloudflare blocks every request)`,
        };
      }
      throw err;
    }

    const contentType = response.headers.get("content-type") || "";
    const cfRay = response.headers.get("cf-ray");
    const cfMitigated = response.headers.get("cf-mitigated");

    if (response.status === 401 || response.status === 403) {
      const bodyText = response.text || "";
      if (cfMitigated || /just a moment|cloudflare|cf-chl|attention required/i.test(bodyText)) {
        return {
          valid: false,
          error:
            "Cloudflare blocked the validator — open chatgpt.com in your browser, then copy the FULL Cookie line from DevTools (Network → request → Cookie) including cf_clearance, __cf_bm, _cfuvid, and the session-token chunks.",
        };
      }
      return {
        valid: false,
        error:
          "Invalid ChatGPT session cookie — re-paste __Secure-next-auth.session-token from chatgpt.com DevTools → Cookies",
      };
    }

    if (response.status >= 500) {
      return { valid: false, error: `ChatGPT unavailable (${response.status})` };
    }

    if (response.status >= 400) {
      return { valid: false, error: `Validation failed: ${response.status}` };
    }

    if (!contentType.includes("json")) {
      return {
        valid: false,
        error: `ChatGPT returned non-JSON (${contentType || "no content-type"}${cfRay ? `, cf-ray=${cfRay}` : ""}) — paste the FULL Cookie line including cf_clearance, __cf_bm, _cfuvid alongside the session-token chunks.`,
      };
    }

    let data: any = {};
    try {
      data = JSON.parse(response.text || "{}");
    } catch {
      return {
        valid: false,
        error:
          "ChatGPT session response was not JSON — paste the FULL Cookie line including cf_clearance and __cf_bm.",
      };
    }
    if (!data?.accessToken) {
      return {
        valid: false,
        error: "ChatGPT session expired — log into chatgpt.com and copy a fresh cookie",
      };
    }
    return { valid: true, error: null };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}
