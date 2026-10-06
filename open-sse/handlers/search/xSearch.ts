/**
 * SuperGrok / xAI X Search for POST /v1/search.
 *
 * This is Grok's server-side `x_search` tool on api.x.ai — not web search,
 * and not the X Developer Platform MCP at api.x.com/mcp.
 */

import type { SearchProviderConfig } from "../../config/searchRegistry.ts";

export const X_SEARCH_PROVIDER_ID = "x-search";
export const DEFAULT_X_SEARCH_MODEL = "grok-4.6";
export const X_SEARCH_RESPONSES_URL = "https://api.x.ai/v1/responses";

export interface XSearchParams {
  query: string;
  maxResults: number;
  token?: string;
  timeRange?: string;
  domainFilter?: string[];
  providerOptions?: Record<string, unknown>;
  providerSpecificData?: Record<string, unknown>;
}

export type XSearchHit = {
  title: string;
  url: string;
  snippet: string;
  author?: string;
};

const X_POST_URL_RE = /^https?:\/\/(?:www\.)?(?:x|twitter)\.com\/([^/?#]+)\/status\/(\d+)/i;
const X_PROFILE_URL_RE = /^https?:\/\/(?:www\.)?(?:x|twitter)\.com\/([^/?#]+)\/?$/i;

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function timeRangeToFromDate(timeRange?: string): string | undefined {
  if (!timeRange || timeRange === "any" || timeRange === "hour") return undefined;
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  const deltas: Record<string, number> = {
    day: day,
    week: 7 * day,
    month: 30 * day,
    year: 365 * day,
  };
  const delta = deltas[timeRange];
  if (!delta) return undefined;
  return new Date(now - delta).toISOString().slice(0, 10);
}

function handlesFromDomainFilter(domainFilter?: string[]): string[] | undefined {
  if (!domainFilter?.length) return undefined;
  const handles = domainFilter
    .filter((d) => !d.startsWith("-"))
    .map((d) => d.replace(/^@/, "").replace(/^(?:www\.)?(?:x|twitter)\.com\//i, "").split("/")[0])
    .filter((h) => /^[A-Za-z0-9_]{1,15}$/.test(h))
    .slice(0, 20);
  return handles.length ? handles : undefined;
}

export function titleFromXUrl(url: string): string {
  const post = url.match(X_POST_URL_RE);
  if (post) return `@${post[1]}`;
  const profile = url.match(X_PROFILE_URL_RE);
  if (profile && !["i", "intent", "share", "search"].includes(profile[1].toLowerCase())) {
    return `@${profile[1]}`;
  }
  return "X post";
}

function addUrl(urls: string[], seen: Set<string>, raw: unknown): void {
  if (typeof raw !== "string") return;
  const url = raw.trim();
  if (!url.startsWith("http")) return;
  if (seen.has(url)) return;
  seen.add(url);
  urls.push(url);
}

function walkForUrls(value: unknown, urls: string[], seen: Set<string>, depth = 0): void {
  if (depth > 8 || value == null) return;
  if (typeof value === "string") {
    if (/^https?:\/\//.test(value) && /(?:x|twitter)\.com\//i.test(value)) {
      addUrl(urls, seen, value);
    }
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) walkForUrls(item, urls, seen, depth + 1);
    return;
  }
  const rec = asRecord(value);
  if (!rec) return;
  for (const key of ["url", "uri", "href", "source"]) {
    addUrl(urls, seen, rec[key]);
  }
  for (const nested of Object.values(rec)) walkForUrls(nested, urls, seen, depth + 1);
}

export function extractXSearchHits(
  data: unknown,
  query: string,
  maxResults: number
): XSearchHit[] {
  const rec = asRecord(data) ?? {};
  const urls: string[] = [];
  const seen = new Set<string>();

  if (Array.isArray(rec.citations)) {
    for (const c of rec.citations) addUrl(urls, seen, c);
  }

  walkForUrls(rec.output, urls, seen);
  walkForUrls(rec.output_text, urls, seen);

  let snippet = "";
  if (typeof rec.output_text === "string") snippet = rec.output_text.trim();
  if (!snippet && Array.isArray(rec.output)) {
    for (const item of rec.output) {
      const row = asRecord(item);
      if (!row) continue;
      if (typeof row.text === "string" && row.text.trim()) {
        snippet = row.text.trim();
        break;
      }
      if (Array.isArray(row.content)) {
        for (const part of row.content) {
          const p = asRecord(part);
          if (p && typeof p.text === "string" && p.text.trim()) {
            snippet = p.text.trim();
            break;
          }
        }
      }
      if (snippet) break;
    }
  }
  if (!snippet) snippet = query;

  const xUrls = urls.filter((u) => /(?:x|twitter)\.com\//i.test(u));
  const chosen = (xUrls.length ? xUrls : urls).slice(0, maxResults);

  return chosen.map((url) => ({
    title: titleFromXUrl(url),
    url,
    snippet: snippet.slice(0, 500),
    author: titleFromXUrl(url).startsWith("@") ? titleFromXUrl(url).slice(1) : undefined,
  }));
}

export function buildXSearchRequest(
  config: SearchProviderConfig,
  params: XSearchParams
): { url: string; init: RequestInit } {
  const model =
    (typeof params.providerSpecificData?.model === "string" &&
      params.providerSpecificData.model.trim()) ||
    (typeof params.providerOptions?.model === "string" && params.providerOptions.model.trim()) ||
    DEFAULT_X_SEARCH_MODEL;

  const tool: Record<string, unknown> = { type: "x_search" };
  const fromDate = timeRangeToFromDate(params.timeRange);
  if (fromDate) tool.from_date = fromDate;
  const handles = handlesFromDomainFilter(params.domainFilter);
  if (handles) tool.allowed_x_handles = handles;

  const url = (config.baseUrl || X_SEARCH_RESPONSES_URL).replace(/\/+$/, "");
  return {
    url,
    init: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(params.token ? { Authorization: `Bearer ${params.token}` } : {}),
      },
      body: JSON.stringify({
        model,
        stream: false,
        input: params.query,
        tools: [tool],
      }),
    },
  };
}
