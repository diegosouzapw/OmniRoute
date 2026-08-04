import type { SearchProviderConfig } from "../../config/searchRegistry.ts";

export interface FirecrawlSearchParams {
  query: string;
  searchType: string;
  maxResults: number;
  token?: string;
  country?: string;
  language?: string;
  timeRange?: string;
  domainFilter?: string[];
}

export type FirecrawlNormalizedHit = {
  title?: string;
  url?: string;
  snippet?: string;
  published_at?: string | null;
  image_url?: string;
  source_type?: string;
};

type FirecrawlSearchHit = {
  title?: string;
  url?: string;
  link?: string;
  description?: string;
  snippet?: string;
  markdown?: string;
  content?: string;
  date?: string | null;
  published_at?: string | null;
  imageUrl?: string | null;
  metadata?: {
    title?: string;
    sourceURL?: string;
    publishedTime?: string | null;
  };
};

export type FirecrawlSearchEnvelope = {
  data?: {
    web?: FirecrawlSearchHit[];
    news?: FirecrawlSearchHit[];
  };
};

function parseDomainFilter(domainFilter?: string[]): { includes: string[]; excludes: string[] } {
  if (!domainFilter?.length) return { includes: [], excludes: [] };
  const includes = domainFilter.filter((d) => !d.startsWith("-"));
  const excludes = domainFilter.filter((d) => d.startsWith("-")).map((d) => d.slice(1));
  return { includes, excludes };
}

function firecrawlSearchTbs(timeRange?: string): string | undefined {
  if (!timeRange || timeRange === "any") return undefined;
  const map: Record<string, string> = {
    day: "qdr:d",
    week: "qdr:w",
    month: "qdr:m",
    year: "qdr:y",
  };
  return map[timeRange];
}

export function buildFirecrawlSearchRequest(
  config: SearchProviderConfig,
  params: FirecrawlSearchParams
): { url: string; init: RequestInit } {
  const envBase = process.env.FIRECRAWL_BASE_URL?.trim().replace(/\/+$/, "");
  const url = envBase ? `${envBase}/v2/search` : config.baseUrl;
  const { includes, excludes } = parseDomainFilter(params.domainFilter);
  const source = params.searchType === "news" ? "news" : "web";

  const body: Record<string, unknown> = {
    query: params.query,
    limit: params.maxResults,
    sources: [source],
  };
  if (params.country) body.country = params.country.toLowerCase();
  if (params.language) body.lang = params.language;
  const tbs = firecrawlSearchTbs(params.timeRange);
  if (tbs) body.tbs = tbs;
  if (includes.length) body.includeDomains = includes.map((d) => d.toLowerCase());
  if (excludes.length) body.excludeDomains = excludes.map((d) => d.toLowerCase());

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (params.token) {
    headers.Authorization = `Bearer ${params.token}`;
  }

  return {
    url,
    init: {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    },
  };
}

function pickFirecrawlSearchItems(
  data: FirecrawlSearchEnvelope,
  searchType: string
): FirecrawlSearchHit[] {
  const buckets = data?.data;
  if (!buckets || Array.isArray(buckets)) return [];
  const items = searchType === "news" ? buckets.news : buckets.web;
  return Array.isArray(items) ? items : [];
}

export function collectFirecrawlSearchHits(
  data: FirecrawlSearchEnvelope,
  searchType: string
): FirecrawlNormalizedHit[] {
  const isNews = searchType === "news";
  return pickFirecrawlSearchItems(data, searchType).map((item) => ({
    title: item.title || item.metadata?.title || "",
    url: item.url || item.metadata?.sourceURL || item.link || "",
    snippet:
      item.description ||
      item.snippet ||
      item.markdown?.slice(0, 300) ||
      item.content?.slice(0, 300) ||
      "",
    published_at: item.date || item.published_at || item.metadata?.publishedTime || null,
    image_url: item.imageUrl || undefined,
    source_type: isNews ? "news" : undefined,
  }));
}

export function normalizeFirecrawlSearchResponse<T>(
  data: FirecrawlSearchEnvelope,
  searchType: string,
  makeResult: (providerId: string, item: FirecrawlNormalizedHit, idx: number, now: string) => T
): { results: T[]; totalResults: number | null } {
  const now = new Date().toISOString();
  const results = collectFirecrawlSearchHits(data, searchType).map((item, idx) =>
    makeResult("firecrawl", item, idx, now)
  );
  return { results, totalResults: results.length };
}
