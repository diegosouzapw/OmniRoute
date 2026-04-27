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
  },
};

/**
 * Credential fallback mapping — search providers that can reuse credentials
 * from a related provider (e.g., perplexity-search uses the same API key as perplexity chat).
 */
export const SEARCH_CREDENTIAL_FALLBACKS: Record<string, string> = {
  "perplexity-search": "perplexity",
};

/**
 * Get search provider config by ID
 */
export function getSearchProvider(providerId: string): SearchProviderConfig | null {
  return SEARCH_PROVIDERS[providerId] || null;
}

export function supportsSearchType(
  providerOrId: SearchProviderConfig | string | null | undefined,
  searchType: string
): boolean {
  const provider =
    typeof providerOrId === "string" ? getSearchProvider(providerOrId) : providerOrId || null;
  if (!provider) return false;
  return provider.searchTypes.includes(searchType);
}

/**
 * Get all search providers as a flat list
 */
export function getAllSearchProviders(): Array<{
  id: string;
  name: string;
  searchTypes: string[];
}> {
  return Object.values(SEARCH_PROVIDERS).map((p) => ({
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
    const provider = SEARCH_PROVIDERS[explicitProvider] || null;
    if (!provider) return null;
    if (searchType && !supportsSearchType(provider, searchType)) return null;
    return provider;
  }

  const providers = Object.values(SEARCH_PROVIDERS).filter((provider) =>
    searchType ? supportsSearchType(provider, searchType) : true
  );
  if (providers.length === 0) return null;

  return providers.reduce((cheapest, p) => (p.costPerQuery < cheapest.costPerQuery ? p : cheapest));
}
