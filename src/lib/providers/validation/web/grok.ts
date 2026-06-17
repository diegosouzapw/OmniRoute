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
export async function validateGrokWebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const token = extractCookieValue(apiKey, "sso");
    if (!token) {
      return {
        valid: false,
        error: "Missing sso cookie — paste the value (or the full grok.com cookie line)",
      };
    }

    // Use the TLS-impersonating client — Cloudflare on grok.com pins
    // cf_clearance to JA3/JA4 + HTTP/2 SETTINGS, so plain Node fetch always
    // gets "Request rejected by anti-bot rules." regardless of cookies (#3180).
    const { tlsFetchGrok, TlsClientUnavailableError, isCloudflareChallenge } =
      await import("@omniroute/open-sse/services/grokTlsClient.ts");

    // Generate the same Cloudflare-bypass headers the GrokWebExecutor uses.
    const randomHex = (n: number) => {
      const a = new Uint8Array(n);
      crypto.getRandomValues(a);
      return Array.from(a, (b) => b.toString(16).padStart(2, "0")).join("");
    };
    const statsigMsg = `e:TypeError: Cannot read properties of null (reading 'children')`;
    const traceId = randomHex(16);
    const spanId = randomHex(8);

    let response;
    try {
      response = await tlsFetchGrok("https://grok.com/rest/app-chat/conversations/new", {
        method: "POST",
        headers: applyCustomUserAgent(
          {
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br, zstd",
            "Accept-Language": "en-US,en;q=0.9",
            Baggage:
              "sentry-environment=production,sentry-release=d6add6fb0460641fd482d767a335ef72b9b6abb8,sentry-public_key=b311e0f2690c81f25e2c4cf6d4f7ce1c",
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            Cookie: buildGrokCookieHeader(apiKey),
            Origin: "https://grok.com",
            Pragma: "no-cache",
            Referer: "https://grok.com/",
            "Sec-Ch-Ua": '"Google Chrome";v="147", "Chromium";v="147", "Not(A:Brand";v="24"',
            "Sec-Ch-Ua-Mobile": "?0",
            "Sec-Ch-Ua-Platform": '"macOS"',
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36",
            "x-statsig-id": btoa(statsigMsg),
            "x-xai-request-id": crypto.randomUUID(),
            traceparent: `00-${traceId}-${spanId}-00`,
          },
          providerSpecificData
        ),
        body: JSON.stringify({
          temporary: true,
          modeId: "fast",
          message: "test",
          fileAttachments: [],
          imageAttachments: [],
          disableSearch: true,
          enableImageGeneration: false,
          returnImageBytes: false,
          returnRawGrokInXaiRequest: false,
          enableImageStreaming: false,
          imageGenerationCount: 0,
          forceConcise: true,
          toolOverrides: {},
          enableSideBySide: false,
          sendFinalMetadata: false,
          isReasoning: false,
          disableTextFollowUps: true,
          disableMemory: true,
          forceSideBySide: false,
          isAsyncChat: false,
          disableSelfHarmShortCircuit: false,
        }),
        timeoutMs: 15_000,
      });
    } catch (err: any) {
      if (err instanceof TlsClientUnavailableError) {
        return {
          valid: false,
          error: `TLS impersonation client unavailable: ${err.message}`,
        };
      }
      throw err;
    }

    let errorDetail = "";
    try {
      errorDetail = (response.text || "").slice(0, 240);
    } catch {}

    // Detect Cloudflare challenge pages even with a 200 status from tls-client-node
    if (isCloudflareChallenge(errorDetail)) {
      return {
        valid: false,
        error: "Grok validation blocked by Cloudflare anti-bot. Try a residential IP or proxy.",
      };
    }

    if (response.status >= 200 && response.status < 300) {
      return { valid: true, error: null };
    }

    if (response.status === 401) {
      return {
        valid: false,
        error: "Invalid SSO cookie — re-paste from grok.com DevTools → Cookies → sso",
      };
    }

    if (response.status === 403) {
      // Grok uses 403 for auth failures, entitlement issues, geo blocks, and
      // resource errors. Default-deny: only the auth-shaped 403 gets the
      // re-paste hint; anything else surfaces the upstream body so the user
      // (or maintainer, if upstream renames the probe model) sees the real
      // cause instead of a misleading "valid" verdict.
      if (/invalid-credentials|unauthenticated|unauthorized/i.test(errorDetail)) {
        return {
          valid: false,
          error: "Invalid SSO cookie — re-paste from grok.com DevTools → Cookies → sso",
        };
      }
      return {
        valid: false,
        error: `Grok rejected validation (403)${errorDetail ? `: ${errorDetail.slice(0, 160)}` : ""}`,
      };
    }

    if (response.status === 429) {
      return { valid: false, error: "Grok rate limited during validation (429)" };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Grok unavailable (${response.status})` };
    }

    return {
      valid: false,
      error: `Grok validation failed (${response.status})${errorDetail ? `: ${errorDetail}` : ""}`,
    };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}
