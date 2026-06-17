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
export async function validatePerplexityWebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    let sessionToken = apiKey;
    let bearerToken: string | null = null;

    if (sessionToken.startsWith("__Secure-next-auth.session-token=")) {
      sessionToken = sessionToken.slice("__Secure-next-auth.session-token=".length);
    } else if (/^bearer\s+/i.test(sessionToken)) {
      bearerToken = sessionToken.replace(/^bearer\s+/i, "").trim();
      sessionToken = "";
    }

    const timezone =
      typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC";
    const headers = applyCustomUserAgent(
      {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
        Origin: "https://www.perplexity.ai",
        Referer: "https://www.perplexity.ai/",
        // Firefox 148 — must match the firefox_148 TLS profile of perplexityTlsClient (issue #2459).
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:148.0) Gecko/20100101 Firefox/148.0",
        "X-App-ApiClient": "default",
        "X-App-ApiVersion": "client-1.11.0",
        ...(bearerToken
          ? { Authorization: `Bearer ${bearerToken}` }
          : sessionToken
            ? { Cookie: `__Secure-next-auth.session-token=${sessionToken}` }
            : {}),
      },
      providerSpecificData
    );

    // Perplexity is behind Cloudflare Enterprise which pins JA3/JA4 to a real
    // browser handshake — plain fetch is challenged with a 403 page from
    // VPS/datacenter IPs even with a valid cookie. Use the Firefox-fingerprinted
    // TLS client so the validator's verdict reflects the cookie, not the IP (issue #2459).
    const { tlsFetchPerplexity, isCloudflareChallenge, TlsClientUnavailableError } =
      await import("@omniroute/open-sse/services/perplexityTlsClient.ts");

    let response: { status: number; text: string | null };
    try {
      response = await tlsFetchPerplexity("https://www.perplexity.ai/rest/sse/perplexity_ask", {
        method: "POST",
        headers,
        body: JSON.stringify({
          query_str: "test",
          params: {
            query_str: "test",
            search_focus: "internet",
            mode: "concise",
            model_preference: "default",
            sources: ["web"],
            attachments: [],
            frontend_uuid: crypto.randomUUID(),
            frontend_context_uuid: crypto.randomUUID(),
            version: "client-1.11.0",
            language: "en-US",
            timezone,
            search_recency_filter: null,
            is_incognito: true,
            use_schematized_api: true,
            last_backend_uuid: null,
          },
        }),
        timeoutMs: 30_000,
      });
    } catch (err) {
      if (err instanceof TlsClientUnavailableError) {
        return {
          valid: false,
          error: `${err.message} perplexity-web requires it — without it Cloudflare blocks every request.`,
        };
      }
      throw err;
    }

    if (response.status === 401 || response.status === 403) {
      if (isCloudflareChallenge(response.text)) {
        return {
          valid: false,
          error:
            "Cloudflare is blocking connections from this server's IP (TLS fingerprint rejected). " +
            "The session cookie may still be valid — install tls-client-node's native binary or route " +
            "perplexity-web through a residential proxy.",
        };
      }
      return {
        valid: false,
        error:
          "Invalid Perplexity session cookie — re-paste __Secure-next-auth.session-token from perplexity.ai",
      };
    }

    if (response.status === 200 || (response.status >= 400 && response.status < 500)) {
      return { valid: true, error: null };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Perplexity unavailable (${response.status})` };
    }

    return { valid: false, error: `Validation failed: ${response.status}` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}
