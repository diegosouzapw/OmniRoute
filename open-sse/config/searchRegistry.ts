/**
 * Search Provider Registry
 *
 * Defines providers that support the /v1/search endpoint.
 * Unlike LLM/embedding providers, search providers don't have "models" —
 * a provider IS the model (Serper = Google SERP, Brave = Brave index).
 *
 * API keys are stored in the same provider credentials system,
 * keyed by provider ID (e.g. "serper-search", "brave-search").
 * perplexity-search reuses credentials from the "perplexity" chat provider.
 */

import { isProviderBlockedByIdOrAlias } from "@/shared/utils/noAuthProviders";

export interface SearchProviderConfig {
  id: string;
  name: string;
  baseUrl: string;
  method: "GET" | "POST";
  authType: "apikey" | "none";
  authHeader: string;
  costPerQuery: number;
  freeMonthlyQuota: number;
  searchTypes: string[];
  defaultMaxResults: number;
  maxMaxResults: number;
  timeoutMs: number;
  cacheTTLMs: number;
  /**
   * Last-resort provider: excluded from automatic (cost-based) selection so a
   * cost-0 free provider never overrides a configured paid one. Only used when no
   * credentialed provider is available, or when requested explicitly by id.
   */
  fallbackOnly?: boolean;
  disabled?: boolean;
  /**
   * May a CALLER-supplied `provider_options.baseUrl` redirect this provider?
   *
   * Only ever true for a keyless, self-hosted provider. For anything with
   * `authType: "apikey"` the builder attaches the OPERATOR's key to whatever
   * host the base URL resolves to, so honoring a caller-chosen value hands that
   * key to the caller's server (GHSA-3f8g-pfh9-j687). The invariant
   * "never set alongside authType: apikey" is enforced by
   * tests/unit/search/search-baseurl-client-override-3f8g.test.ts.
   */
  allowClientBaseUrlOverride?: boolean;
}

export const SEARCH_PROVIDERS: Record<string, SearchProviderConfig> = {
  "serper-search": {
    id: "serper-search",
    name: "Serper Search",
    baseUrl: "https://google.serper.dev",
    method: "POST",
    authType: "apikey",
    authHeader: "x-api-key",
    costPerQuery: 0.001,
    freeMonthlyQuota: 2500,
    searchTypes: ["web", "news"],
    defaultMaxResults: 5,
    maxMaxResults: 100,
    timeoutMs: 10_000,
    cacheTTLMs: 5 * 60 * 1000,
  },

  "brave-search": {
    id: "brave-search",
    name: "Brave Search",
    baseUrl: "https://api.search.brave.com/res/v1",
    method: "GET",
    authType: "apikey",
    authHeader: "x-subscription-token",
    costPerQuery: 0.005,
    freeMonthlyQuota: 1000,
    searchTypes: ["web", "news"],
    defaultMaxResults: 5,
    maxMaxResults: 20,
    timeoutMs: 10_000,
    cacheTTLMs: 5 * 60 * 1000,
  },

  "perplexity-search": {
    id: "perplexity-search",
    name: "Perplexity Search",
    baseUrl: "https://api.perplexity.ai/search",
    method: "POST",
    authType: "apikey",
    authHeader: "bearer",
    costPerQuery: 0.005,
    freeMonthlyQuota: 0,
    searchTypes: ["web"],
    defaultMaxResults: 5,
    maxMaxResults: 20,
    timeoutMs: 10_000,
    cacheTTLMs: 5 * 60 * 1000,
  },

  "exa-search": {
    id: "exa-search",
    name: "Exa Search",
    baseUrl: "https://api.exa.ai/search",
    method: "POST",
    authType: "apikey",
    authHeader: "x-api-key",
    costPerQuery: 0.007,
    freeMonthlyQuota: 1000,
    searchTypes: ["web", "news"],
    defaultMaxResults: 5,
    maxMaxResults: 100,
    timeoutMs: 10_000,
    cacheTTLMs: 5 * 60 * 1000,
  },

  "tavily-search": {
    id: "tavily-search",
    name: "Tavily Search",
    baseUrl: "https://api.tavily.com/search",
    method: "POST",
    authType: "apikey",
    authHeader: "bearer",
    costPerQuery: 0.008,
    freeMonthlyQuota: 1000,
    searchTypes: ["web", "news"],
    defaultMaxResults: 5,
    maxMaxResults: 20,
    timeoutMs: 10_000,
    cacheTTLMs: 5 * 60 * 1000,
  },

  // Nimble also serves POST /v1/web/fetch through the same credential — see
  // open-sse/executors/nimble-fetch.ts.
  "nimble-search": {
    id: "nimble-search",
    name: "Nimble Search",
    baseUrl: "https://sdk.nimbleway.com/v1/search",
    method: "POST",
    authType: "apikey",
    authHeader: "bearer",
    costPerQuery: 0.005,
    freeMonthlyQuota: 0,
    searchTypes: ["web", "news"],
    defaultMaxResults: 5,
    maxMaxResults: 100,
    // Kept below GLOBAL_TIMEOUT_MS (handlers/search.ts) so a stalled Nimble call
    // still leaves budget for the failover provider instead of burning the whole
    // request window.
    timeoutMs: 10_000,
    cacheTTLMs: 5 * 60 * 1000,
  },

  firecrawl: {
    id: "firecrawl",
    name: "Firecrawl",
    baseUrl: "https://api.firecrawl.dev/v2/search",
    method: "POST",
    authType: "apikey",
    authHeader: "bearer",
    costPerQuery: 0.002,
    freeMonthlyQuota: 1000,
    searchTypes: ["web", "news"],
    defaultMaxResults: 5,
    maxMaxResults: 100,
    timeoutMs: 30_000,
    cacheTTLMs: 5 * 60 * 1000,
  },

  "google-pse-search": {
    id: "google-pse-search",
    name: "Google Programmable Search",
    baseUrl: "https://www.googleapis.com/customsearch/v1",
    method: "GET",
    authType: "apikey",
    authHeader: "key",
    costPerQuery: 0.005,
    freeMonthlyQuota: 3000,
    searchTypes: ["web", "news"],
    defaultMaxResults: 5,
    maxMaxResults: 10,
    timeoutMs: 10_000,
    cacheTTLMs: 5 * 60 * 1000,
  },

  "linkup-search": {
    id: "linkup-search",
    name: "Linkup Search",
    baseUrl: "https://api.linkup.so/v1/search",
    method: "POST",
    authType: "apikey",
    authHeader: "bearer",
    costPerQuery: 0.005,
    freeMonthlyQuota: 1000,
    searchTypes: ["web"],
    defaultMaxResults: 5,
    maxMaxResults: 50,
    timeoutMs: 10_000,
    cacheTTLMs: 5 * 60 * 1000,
  },

  "searchapi-search": {
    id: "searchapi-search",
    name: "SearchAPI",
    baseUrl: "https://www.searchapi.io/api/v1/search",
    method: "GET",
    authType: "apikey",
    authHeader: "api_key",
    costPerQuery: 0.004,
    freeMonthlyQuota: 100,
    searchTypes: ["web", "news"],
    defaultMaxResults: 5,
    maxMaxResults: 100,
    timeoutMs: 10_000,
    cacheTTLMs: 5 * 60 * 1000,
  },

  "youcom-search": {
    id: "youcom-search",
    name: "You.com Search",
    baseUrl: "https://ydc-index.io/v1/search",
    method: "GET",
    authType: "apikey",
    authHeader: "x-api-key",
    costPerQuery: 0.005,
    freeMonthlyQuota: 0,
    searchTypes: ["web", "news"],
    defaultMaxResults: 5,
    maxMaxResults: 100,
    timeoutMs: 10_000,
    cacheTTLMs: 5 * 60 * 1000,
  },

  "searxng-search": {
    id: "searxng-search",
    name: "SearXNG Search",
    baseUrl: "http://localhost:8888/search",
    method: "GET",
    authType: "none",
    authHeader: "none",
    costPerQuery: 0,
    freeMonthlyQuota: 999999,
    searchTypes: ["web", "news"],
    defaultMaxResults: 5,
    maxMaxResults: 50,
    timeoutMs: 10_000,
    cacheTTLMs: 3 * 60 * 1000,
    fallbackOnly: true,
    // Keyless and self-hosted by definition: the caller names their own SearXNG
    // instance and no operator credential travels with the request. This is a
    // documented flow (tests/unit/search-route.test.ts). Still block-metadata
    // guarded, so IMDS stays unreachable.
    allowClientBaseUrlOverride: true,
  },

  "ollama-search": {
    id: "ollama-search",
    name: "Ollama Search",
    baseUrl: "https://ollama.com/api/web_search",
    method: "POST",
    authType: "apikey",
    authHeader: "bearer",
    costPerQuery: 0,
    freeMonthlyQuota: 1000,
    searchTypes: ["web"],
    defaultMaxResults: 5,
    maxMaxResults: 10,
    timeoutMs: 10_000,
    cacheTTLMs: 5 * 60 * 1000,
  },

  "zai-search": {
    id: "zai-search",
    name: "Z.AI Coding Plan Search",
    baseUrl: "https://api.z.ai/api/mcp/web_search_prime/mcp",
    method: "POST",
    authType: "apikey",
    authHeader: "bearer",
    costPerQuery: 0,
    freeMonthlyQuota: 0,
    searchTypes: ["web"],
    defaultMaxResults: 5,
    maxMaxResults: 50,
    timeoutMs: 10_000,
    cacheTTLMs: 5 * 60 * 1000,
  },

  // Jina Search (s.jina.ai). No extra dashboard card — credentials reuse
  // jina-ai / jina-reader / JINA_AI_API_KEY via SEARCH_CREDENTIAL_FALLBACKS.
  "jina-search": {
    id: "jina-search",
    name: "Jina Search (s.jina.ai)",
    baseUrl: "https://s.jina.ai",
    method: "POST",
    authType: "apikey",
    authHeader: "bearer",
    costPerQuery: 0.002,
    freeMonthlyQuota: 1000,
    searchTypes: ["web"],
    defaultMaxResults: 5,
    maxMaxResults: 50,
    timeoutMs: 15_000,
    cacheTTLMs: 5 * 60 * 1000,
  },

  // Context7 (context7.com) — library-docs search. Anonymous tier works without a
  // key (per-minute rate limit, context7-quota-tier: anonymous); a configured
  // ctx7sk-* key raises the quota, sent as Bearer when a connection exists.
  // fallbackOnly: doc-focused corpus, never auto-selected for generic web search.
  context7: {
    id: "context7",
    name: "Context7 (library docs)",
    baseUrl: "https://context7.com/api/v1",
    method: "GET",
    // authType "none" means the framework skips credential injection entirely
    // (registryUtils.ts). A configured ctx7sk-* key still reaches the builder
    // via params.token, which attaches it as Bearer manually — authHeader
    // stays "none" so the generic injector never double-writes it.
    // The Bearer attachment lives in buildContext7Request
    // (open-sse/handlers/search.ts) — keep the two in sync when editing.
    authType: "none",
    authHeader: "none",
    costPerQuery: 0,
    // Anonymous tier is unlimited per-minute (rate-limited, not metered):
    // a 0 here would let the quota preflight reject anonymous traffic (the
    // same reason DuckDuckGo uses 999999 — see its entry above).
    freeMonthlyQuota: 999999,
    searchTypes: ["web"],
    defaultMaxResults: 5,
    maxMaxResults: 20,
    timeoutMs: 10_000,
    cacheTTLMs: 5 * 60 * 1000,
    fallbackOnly: true,
  },

  // Free, no-API-key DuckDuckGo lite scraping (free-claude-code port). Last-resort
  // only (fallbackOnly): never auto-selected over a configured provider; served by
  // the dedicated HTML path in open-sse/handlers/search.ts (not the generic JSON one).
  "duckduckgo-free": {
    id: "duckduckgo-free",
    name: "DuckDuckGo (free)",
    baseUrl: "https://lite.duckduckgo.com/lite/",
    method: "POST",
    authType: "none",
    authHeader: "none",
    costPerQuery: 0,
    freeMonthlyQuota: 999999,
    searchTypes: ["web"],
    defaultMaxResults: 5,
    maxMaxResults: 25,
    timeoutMs: 10_000,
    cacheTTLMs: 5 * 60 * 1000,
    fallbackOnly: true,
  },

  // SuperGrok / xAI server-side X Search. Not web search. Explicit provider or
  // search_type "x" only — never auto-selected for generic web queries.
  "x-search": {
    id: "x-search",
    name: "X Search (Grok)",
    baseUrl: "https://api.x.ai/v1/responses",
    method: "POST",
    authType: "apikey",
    authHeader: "bearer",
    costPerQuery: 0,
    freeMonthlyQuota: 0,
    searchTypes: ["x"],
    defaultMaxResults: 5,
    maxMaxResults: 20,
    timeoutMs: 60_000,
    cacheTTLMs: 5 * 60 * 1000,
  },

  // Direct X API search through Xquik. Keep it fallback-only so the existing
  // SuperGrok provider remains the default for search_type "x".
  "xquik-search": {
    id: "xquik-search",
    name: "Xquik X Search",
    baseUrl: "https://xquik.com/api/v1/x/tweets/search",
    method: "GET",
    authType: "apikey",
    authHeader: "x-api-key",
    costPerQuery: 0.00075,
    freeMonthlyQuota: 0,
    searchTypes: ["x"],
    defaultMaxResults: 5,
    maxMaxResults: 20,
    timeoutMs: 15_000,
    cacheTTLMs: 5 * 60 * 1000,
    fallbackOnly: true,
  },

  // Free public web search for AI agents (https://anysearch.com). fallback-only:
  // a cost-0 provider never overrides configured paid providers in automatic
  // selection. max_results is capped at 10 upstream.
  "anysearch-search": {
    id: "anysearch-search",
    name: "AnySearch",
    baseUrl: "https://api.anysearch.com/v1/search",
    method: "POST",
    authType: "apikey",
    authHeader: "bearer",
    costPerQuery: 0,
    freeMonthlyQuota: 0, // free tier is 1000 req/day (daily reset, not monthly) — 0 matches the xquik convention; the daily figure lives in the UI catalog authHint
    searchTypes: ["web"],
    defaultMaxResults: 5,
    maxMaxResults: 10,
    timeoutMs: 10_000,
    cacheTTLMs: 5 * 60 * 1000,
    fallbackOnly: true,
  },
};

/**
 * Credential fallback mapping — search providers that can reuse credentials
 * from a related provider (e.g., perplexity-search uses the same API key as perplexity chat).
 */
export const SEARCH_CREDENTIAL_FALLBACKS: Record<string, string | string[]> = {
  "perplexity-search": "perplexity",
  "ollama-search": "ollama-cloud",
  "zai-search": "zai",
  "jina-search": "jina-ai",
  "x-search": ["xai-oauth", "xao", "xai"],
};

export function getSearchCredentialFallbacks(providerId: string): string[] {
  const mapped = SEARCH_CREDENTIAL_FALLBACKS[providerId];
  if (!mapped) return [];
  return Array.isArray(mapped) ? mapped : [mapped];
}

/**
 * Request-only aliases for POST /v1/search.
 *
 * Do not apply these in getSearchProvider(). jina-ai is the Foundation
 * embed/rerank/classify provider; remapping it here made the models
 * catalog treat jina-ai as a search-only card (searchTypes → "web").
 */
export const SEARCH_PROVIDER_ALIASES: Record<string, string> = {
  "jina-ai": "jina-search",
  jina: "jina-search",
  brave: "brave-search",
  serper: "serper-search",
  perplexity: "perplexity-search",
  exa: "exa-search",
  tavily: "tavily-search",
  "google-pse": "google-pse-search",
  linkup: "linkup-search",
  ollama: "ollama-search",
  searchapi: "searchapi-search",
  youcom: "youcom-search",
  searxng: "searxng-search",
  zai: "zai-search",
  duckduckgo: "duckduckgo-free",
  ctx7: "context7",
  c7: "context7",
  x_search: "x-search",
  x: "x-search",
  xquik: "xquik-search",
  xquik_search: "xquik-search",
  anysearch: "anysearch-search",
  anysearch_search: "anysearch-search",
};

export function resolveSearchProviderId(providerId: string): string {
  return SEARCH_PROVIDER_ALIASES[providerId] || providerId;
}

/**
 * Exact catalog lookup. Used by model listing / static catalogs.
 * Request routing should use resolveSearchProvider() so aliases work
 * without colliding with the Foundation jina-ai provider id.
 */
const CATALOG_SEARXNG_DEFAULT_URL = "http://localhost:8888/search";

/**
 * Catalog default SearXNG URL is a desktop convenience. In Docker/K8s nothing
 * listens on :8888, and OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS (needed for
 * ClusterIP providers) lets ProxyFetch attempt it, producing ECONNREFUSED and
 * a 502 that then burns the next fallback's quota. Skip unless the operator
 * overrode baseUrl.
 */
export function isUnconfiguredLoopbackSearchProvider(
  provider: SearchProviderConfig | null | undefined
): boolean {
  if (!provider || provider.id !== "searxng-search") return false;
  const configured = String(provider.baseUrl || "").replace(/\/+$/, "");
  const catalog = CATALOG_SEARXNG_DEFAULT_URL.replace(/\/+$/, "");
  return configured === catalog;
}

export function getSearchProvider(providerId: string): SearchProviderConfig | null {
  return SEARCH_PROVIDERS[providerId] || null;
}

/** Resolve a /v1/search provider id, including Foundation aliases. */
export function resolveSearchProvider(providerId: string): SearchProviderConfig | null {
  return SEARCH_PROVIDERS[resolveSearchProviderId(providerId)] || null;
}

export function supportsSearchType(
  providerOrId: SearchProviderConfig | string | null | undefined,
  searchType: string
): boolean {
  const provider =
    typeof providerOrId === "string" ? resolveSearchProvider(providerOrId) : providerOrId || null;
  if (!provider) return false;
  return provider.searchTypes.includes(searchType);
}

/**
 * Get all search providers as a flat list
 */
export function getAllSearchProviders(blockedProviders: string[] = []): Array<{
  id: string;
  name: string;
  searchTypes: string[];
}> {
  return Object.values(SEARCH_PROVIDERS)
    .filter((p) => !p.disabled && !isProviderBlockedByIdOrAlias(p.id, blockedProviders))
    .map((p) => ({
      id: p.id,
      name: p.name,
      searchTypes: p.searchTypes,
    }));
}

/**
 * Select the cheapest available provider.
 * If an explicit provider is given, validate and return it.
 * Otherwise, return the cheapest by costPerQuery.
 */
export function selectProvider(
  explicitProvider?: string,
  searchType?: string
): SearchProviderConfig | null {
  if (explicitProvider) {
    const provider = resolveSearchProvider(explicitProvider);
    if (!provider) return null;
    if (searchType && !supportsSearchType(provider, searchType)) return null;
    return provider;
  }

  // Auto-selection excludes fallbackOnly providers so a free cost-0 provider never
  // overrides a configured paid one — they are reached only via explicit id or the
  // route handler's last-resort step. Missing searchType follows the API default
  // (`web`) so X-only providers are never cheapest-wins for generic queries.
  const effectiveType = searchType || "web";
  const providers = Object.values(SEARCH_PROVIDERS).filter(
    (provider) => !provider.fallbackOnly && supportsSearchType(provider, effectiveType)
  );
  if (providers.length === 0) return null;

  return providers.reduce((cheapest, p) => (p.costPerQuery < cheapest.costPerQuery ? p : cheapest));
}
