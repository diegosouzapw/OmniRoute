import { getProviderCredentials } from "@/sse/services/auth";
import { recordCost } from "@/domain/costRules";
import * as defaultLog from "@/sse/utils/logger";
import {
  getAllSearchProviders,
  getSearchProvider,
  selectProvider,
  supportsSearchType,
  SEARCH_CREDENTIAL_FALLBACKS,
  SEARCH_PROVIDERS,
  type SearchProviderConfig,
} from "@omniroute/open-sse/config/searchRegistry.ts";
import { handleSearch, type SearchResponse } from "@omniroute/open-sse/handlers/search.ts";
import {
  computeCacheKey,
  getOrCoalesce,
  SEARCH_CACHE_DEFAULT_TTL_MS,
} from "@omniroute/open-sse/services/searchCache.ts";

type SearchLogger = typeof defaultLog;

export interface ExecuteWebSearchInput {
  query: string;
  provider?: string;
  max_results?: number;
  limit?: number;
  search_type?: "web" | "news";
  offset?: number;
  country?: string;
  language?: string;
  time_range?: "any" | "day" | "week" | "month" | "year";
  content?: {
    snippet?: boolean;
    full_page?: boolean;
    format?: "text" | "markdown";
    max_characters?: number;
  };
  filters?: {
    include_domains?: string[];
    exclude_domains?: string[];
    safe_search?: "off" | "moderate" | "strict";
  };
  provider_options?: Record<string, unknown>;
  strict_filters?: boolean;
  apiKeyId?: string | null;
  log?: SearchLogger;
}

export interface ExecuteWebSearchResult {
  cached: boolean;
  data: SearchResponse;
}

export class WebSearchExecutionError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

async function resolveSearchCredentials(providerId: string) {
  const creds = await getProviderCredentials(providerId).catch(() => null);
  if (creds) return creds;
  const fallbackId = SEARCH_CREDENTIAL_FALLBACKS[providerId];
  if (fallbackId) return getProviderCredentials(fallbackId).catch(() => null);
  return null;
}

function buildDomainFilter(filters?: {
  include_domains?: string[];
  exclude_domains?: string[];
}): string[] | undefined {
  if (!filters) return undefined;
  const parts: string[] = [];
  if (filters.include_domains?.length) parts.push(...filters.include_domains);
  if (filters.exclude_domains?.length) parts.push(...filters.exclude_domains.map((d) => `-${d}`));
  return parts.length > 0 ? parts : undefined;
}

function normalizeMaxResults(input: ExecuteWebSearchInput, providerConfig: SearchProviderConfig) {
  const fromMaxResults =
    typeof input.max_results === "number"
      ? input.max_results
      : typeof input.max_results === "string"
        ? Number(input.max_results)
        : Number.NaN;
  const fromLimit =
    typeof input.limit === "number"
      ? input.limit
      : typeof input.limit === "string"
        ? Number(input.limit)
        : Number.NaN;
  const requested = Number.isFinite(fromMaxResults)
    ? fromMaxResults
    : Number.isFinite(fromLimit)
      ? fromLimit
      : providerConfig.defaultMaxResults;
  return Math.min(Math.max(1, requested), providerConfig.maxMaxResults);
}

function assertValidSearchInput(input: ExecuteWebSearchInput) {
  if (typeof input.query !== "string" || input.query.trim().length === 0) {
    throw new WebSearchExecutionError("Missing required field: query", 400);
  }
  if (input.query.trim().length > 500) {
    throw new WebSearchExecutionError("Query must be 500 characters or fewer", 400);
  }
  if (input.search_type && input.search_type !== "web" && input.search_type !== "news") {
    throw new WebSearchExecutionError(`Unsupported search_type: ${String(input.search_type)}`, 400);
  }
}

export async function executeWebSearch(
  input: ExecuteWebSearchInput
): Promise<ExecuteWebSearchResult> {
  assertValidSearchInput(input);

  const log = input.log || defaultLog;
  const searchType = input.search_type || "web";

  if (input.provider) {
    const explicitProvider = getSearchProvider(input.provider);
    if (!explicitProvider) {
      throw new WebSearchExecutionError(`Unknown search provider: ${input.provider}`, 400);
    }
    if (!supportsSearchType(explicitProvider, searchType)) {
      throw new WebSearchExecutionError(
        `Search provider ${input.provider} does not support search_type: ${searchType}`,
        400
      );
    }
  }

  let providerConfig = selectProvider(input.provider, searchType);
  if (!providerConfig) {
    throw new WebSearchExecutionError(
      input.provider
        ? `Unknown search provider: ${input.provider}`
        : `No search providers available. Add an API key for a search provider (${getAllSearchProviders()
            .map((provider) => provider.id)
            .join(", ")}) in the dashboard.`,
      400
    );
  }

  let credentials: Record<string, any> | null = null;
  let alternateProviderId: string | undefined;
  let alternateCredentials: Record<string, any> | null = null;

  if (input.provider) {
    credentials = await resolveSearchCredentials(providerConfig.id);
    if (
      !credentials &&
      providerConfig.authType === "none" &&
      typeof input.provider_options?.baseUrl === "string" &&
      input.provider_options.baseUrl.trim().length > 0
    ) {
      credentials = {
        providerSpecificData: { baseUrl: input.provider_options.baseUrl.trim() },
      };
    }
    if (!credentials) {
      throw new WebSearchExecutionError(
        providerConfig.authType === "none"
          ? `Search provider ${providerConfig.id} is not configured. Set its base URL in the dashboard or pass provider_options.baseUrl.`
          : `No credentials configured for search provider: ${providerConfig.id}. Add an API key for "${providerConfig.id}" in the dashboard.`,
        400
      );
    }
  } else {
    credentials = await resolveSearchCredentials(providerConfig.id);

    if (!credentials) {
      const sortedIds = Object.values(SEARCH_PROVIDERS)
        .filter((provider) => supportsSearchType(provider, searchType))
        .sort((a, b) => a.costPerQuery - b.costPerQuery)
        .map((provider) => provider.id);

      for (const providerId of sortedIds) {
        if (providerId === providerConfig.id) continue;
        const altConfig = getSearchProvider(providerId);
        const altCreds = await resolveSearchCredentials(providerId);
        if (altConfig && altCreds) {
          providerConfig = altConfig;
          credentials = altCreds;
          break;
        }
      }
    }

    if (!credentials) {
      throw new WebSearchExecutionError(
        `No credentials configured for any search provider. Add an API key for a search provider (${Object.keys(
          SEARCH_PROVIDERS
        ).join(", ")}) in the dashboard.`,
        400
      );
    }

    const otherIds = Object.values(SEARCH_PROVIDERS)
      .filter((provider) => supportsSearchType(provider, searchType))
      .sort((a, b) => a.costPerQuery - b.costPerQuery)
      .map((provider) => provider.id)
      .filter((providerId) => providerId !== providerConfig.id);

    for (const providerId of otherIds) {
      const creds = await resolveSearchCredentials(providerId);
      if (creds) {
        alternateProviderId = providerId;
        alternateCredentials = creds;
        break;
      }
    }
  }

  const clampedMaxResults = normalizeMaxResults(input, providerConfig);
  const cacheKey = computeCacheKey(
    input.query.trim(),
    providerConfig.id,
    searchType,
    clampedMaxResults,
    input.country,
    input.language,
    {
      filters: input.filters,
      offset: input.offset,
      time_range: input.time_range,
    }
  );
  const ttl = providerConfig.cacheTTLMs ?? SEARCH_CACHE_DEFAULT_TTL_MS;

  const { data, cached } = await getOrCoalesce(cacheKey, ttl, async () => {
    const result = await handleSearch({
      query: input.query.trim(),
      provider: providerConfig.id,
      maxResults: clampedMaxResults,
      searchType,
      country: input.country,
      language: input.language,
      timeRange: input.time_range,
      offset: input.offset,
      domainFilter: buildDomainFilter(input.filters),
      contentOptions: input.content,
      strictFilters: input.strict_filters,
      providerOptions: input.provider_options,
      credentials,
      alternateProvider: alternateProviderId,
      alternateCredentials,
      log,
    });

    if (!result.success || !result.data) {
      throw new WebSearchExecutionError(result.error || "Search failed", result.status || 502);
    }

    return result.data;
  });

  if (!cached && input.apiKeyId && input.apiKeyId !== "local" && data.usage?.search_cost_usd > 0) {
    try {
      recordCost(input.apiKeyId, data.usage.search_cost_usd);
    } catch (error: any) {
      log.warn("SEARCH", `Cost recording failed: ${error?.message || String(error)}`);
    }
  }

  return { data, cached };
}
