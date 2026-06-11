
import { getEmbeddingProvider } from "@omniroute/open-sse/config/embeddingRegistry.ts";

import { getRerankProvider } from "@omniroute/open-sse/config/rerankRegistry.ts";

import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";

import {
  isClaudeCodeCompatibleProvider,
  isAnthropicCompatibleProvider,
  isLocalProvider,
  isOpenAICompatibleProvider,
  isSelfHostedChatProvider,
  providerAllowsOptionalApiKey,
} from "@/shared/constants/providers";

import {
  SAFE_OUTBOUND_FETCH_PRESETS,
  SafeOutboundFetchError,
  getSafeOutboundFetchErrorStatus,
  safeOutboundFetch,
} from "@/shared/network/safeOutboundFetch";

import { getProviderOutboundGuard, isPrivateHost } from "@/shared/network/outboundUrlGuard";

import {
  buildGrokCookieHeader,
  extractCookieValue,
  normalizeSessionCookieHeader,
} from "@/lib/providers/webCookieAuth";

import { resolveNvidiaValidationModel } from "@/lib/providers/nvidiaValidationModel";

import {
  AZURE_AI_DEFAULT_BASE_URL,
  buildAzureAiChatUrl,
  buildAzureAiModelsUrl,
} from "@omniroute/open-sse/config/azureAi.ts";

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

import { validateImageProviderApiKey } from "@/lib/providers/imageValidation";

import { validationWrite, withCustomUserAgent, toValidationErrorResult } from "./utils.ts";



// ── Search provider validators (factored) ──

async function validateGenericProvider(
  baseUrl: string,
  apiKey: string,
  providerSpecificData: any = {},
  provider: string,
  isLocal: boolean = false
) {
  const config = SEARCH_VALIDATOR_CONFIGS[provider];
  if (!config) {
    return { valid: false, error: "Validator not found", unsupported: true };
  }
  const { url, init } = config(apiKey, providerSpecificData);
  return validateSearchProvider(url, init, providerSpecificData, isLocal);
}



export async function validateSearchProvider(
  url: string,
  init: RequestInit,
  providerSpecificData: any = {},
  isLocal: boolean = false
): Promise<{ valid: boolean; error: string | null; unsupported: false }> {
  try {
    const response = await safeOutboundFetch(url, {
      ...SAFE_OUTBOUND_FETCH_PRESETS.validationWrite,
      guard: isLocal ? "none" : getProviderOutboundGuard(),
      ...withCustomUserAgent(init, providerSpecificData),
    });
    if (response.ok) return { valid: true, error: null, unsupported: false };
    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key", unsupported: false };
    }
    // For provider setup we only need to confirm authentication passed.
    // Search providers may return non-auth statuses for exhausted credits,
    // rate limiting, or request-shape quirks while still accepting the key.
    if (response.status < 500) {
      return { valid: true, error: null, unsupported: false };
    }
    return { valid: false, error: `Validation failed: ${response.status}`, unsupported: false };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}



export const SEARCH_VALIDATOR_CONFIGS: Record<
  string,
  (apiKey: string, providerSpecificData?: any) => { url: string; init: RequestInit }
> = {
  "serper-search": (apiKey) => ({
    url: "https://google.serper.dev/search",
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-API-Key": apiKey },
      body: JSON.stringify({ q: "test", num: 1 }),
    },
  }),
  "brave-search": (apiKey) => ({
    url: "https://api.search.brave.com/res/v1/web/search?q=test&count=1",
    init: {
      method: "GET",
      headers: { Accept: "application/json", "X-Subscription-Token": apiKey },
    },
  }),
  "perplexity-search": (apiKey) => ({
    url: "https://api.perplexity.ai/search",
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ query: "test", max_results: 1 }),
    },
  }),
  "exa-search": (apiKey) => ({
    url: "https://api.exa.ai/search",
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify({ query: "test", numResults: 1 }),
    },
  }),
  "tavily-search": (apiKey) => ({
    url: "https://api.tavily.com/search",
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ query: "test", max_results: 1 }),
    },
  }),
  "google-pse-search": (apiKey, providerSpecificData = {}) => {
    const cx = providerSpecificData?.cx;
    if (!cx || typeof cx !== "string") {
      throw new Error("Programmable Search Engine ID (cx) is required");
    }
    return {
      url: `https://www.googleapis.com/customsearch/v1?key=${encodeURIComponent(apiKey)}&cx=${encodeURIComponent(
        cx
      )}&q=test&num=1`,
      init: {
        method: "GET",
        headers: { Accept: "application/json" },
      },
    };
  },
  "linkup-search": (apiKey) => ({
    url: "https://api.linkup.so/v1/search",
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        q: "test",
        depth: "standard",
        outputType: "searchResults",
        maxResults: 1,
      }),
    },
  }),
  "searchapi-search": (apiKey) => ({
    url: `https://www.searchapi.io/api/v1/search?engine=google&q=test&api_key=${encodeURIComponent(
      apiKey
    )}`,
    init: {
      method: "GET",
      headers: { Accept: "application/json" },
    },
  }),
  "youcom-search": (apiKey) => ({
    url: "https://ydc-index.io/v1/search?query=test&count=1",
    init: {
      method: "GET",
      headers: { Accept: "application/json", "X-API-Key": apiKey },
    },
  }),
  "searxng-search": (apiKey, providerSpecificData = {}) => {
    const baseUrl =
      typeof providerSpecificData?.baseUrl === "string" && providerSpecificData.baseUrl.trim()
        ? providerSpecificData.baseUrl.trim().replace(/\/+$/, "")
        : "http://localhost:8888/search";
    const searchUrl = baseUrl.endsWith("/search") ? baseUrl : `${baseUrl}/search`;
    const headers: Record<string, string> = { Accept: "application/json" };
    if (apiKey) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }
    return {
      url: `${searchUrl}?q=test&format=json`,
      init: {
        method: "GET",
        headers,
      },
    };
  },
  "ollama-search": (apiKey) => ({
    url: "https://ollama.com/api/web_search",
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ query: "test", max_results: 1 }),
    },
  }),
  "zai-search": (apiKey, providerSpecificData = {}) => {
    const baseUrl =
      typeof providerSpecificData?.baseUrl === "string" && providerSpecificData.baseUrl.trim()
        ? providerSpecificData.baseUrl.trim().replace(/\/+$/, "")
        : "https://api.z.ai/api/mcp/web_search_prime/mcp";
    return {
      url: baseUrl,
      init: {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "tools/call",
          params: { name: "web_search_prime", arguments: { search_query: "test" } },
          id: 1,
        }),
      },
    };
  },
};

