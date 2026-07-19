// Web-search provider key validators + their per-provider request configs (serper, tavily, jina-reader,
// …). Extracted from validation.ts (god-file decomposition) — top-level functions/data with no
// dispatcher-state captures; behavior is byte-identical to the original inline defs.
import { SAFE_OUTBOUND_FETCH_PRESETS, safeOutboundFetch } from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuardPolicy";
import { withCustomUserAgent } from "./headers";
import { toValidationErrorResult, validationWrite } from "./transport";

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
  // ── Web-fetch providers (#4401) ──
  // firecrawl / jina-reader were added as webFetch-kind providers in #2645 with their
  // own executors but no validator, so the dashboard "Validate" step returned
  // "Provider validation not supported" and accounts could not be added through the UI.
  // Probe each provider's real fetch endpoint with the same Bearer auth the executor
  // uses; validateSearchProvider maps 200/<500 → valid, 401/403 → invalid key,
  // >=500 → failure (a credit-exhausted / rate-limited key still validates).
  firecrawl: (apiKey) => ({
    url: "https://api.firecrawl.dev/v1/scrape",
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ url: "https://example.com", formats: ["markdown"] }),
    },
  }),
  "jina-reader": (apiKey) => ({
    url: "https://r.jina.ai/https://example.com",
    init: {
      method: "GET",
      headers: { Authorization: `Bearer ${apiKey}` },
    },
  }),
  tinyfish: (apiKey) => ({
    url: "https://api.fetch.tinyfish.ai",
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-API-Key": apiKey },
      body: JSON.stringify({ urls: ["https://example.com"], format: "markdown" }),
    },
  }),
};
