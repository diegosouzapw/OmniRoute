/** Xquik-backed X search for the unified search gateway. */

import { z } from "zod";
import type { SearchProviderConfig } from "../../config/searchRegistry.ts";
import type { SearchResult } from "../search.ts";

export const XQUIK_SEARCH_PROVIDER_ID = "xquik-search";

export interface XquikSearchParams {
  query: string;
  maxResults: number;
  token?: string;
  timeRange?: string;
  providerOptions?: Record<string, unknown>;
  providerSpecificData?: Record<string, unknown>;
}

export interface XquikSearchHit {
  title: string;
  url: string;
  snippet: string;
  author?: string;
  publishedAt?: string;
}

type MakeResult = (
  providerId: string,
  item: {
    title?: string;
    url?: string;
    snippet?: string;
    published_at?: string;
    author?: string;
    source_type?: string;
  },
  index: number,
  now: string
) => SearchResult;

const X_HANDLE_RE = /^[A-Za-z0-9_]{1,15}$/;
const TWEET_ID_RE = /^\d+$/;

const XquikTweetSchema = z
  .object({
    id: z.string().regex(TWEET_ID_RE),
    text: z.string(),
    createdAt: z.string().optional(),
    author: z
      .object({
        username: z.string().regex(X_HANDLE_RE),
        name: z.string().optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();

const XquikSearchEnvelopeSchema = z
  .object({
    tweets: z.array(z.unknown()).default([]),
  })
  .passthrough();

function getProviderSettingString(
  params: Pick<XquikSearchParams, "providerOptions" | "providerSpecificData">,
  key: string
): string | undefined {
  const option = params.providerOptions?.[key];
  if (typeof option === "string" && option.trim()) return option.trim();
  const configured = params.providerSpecificData?.[key];
  if (typeof configured === "string" && configured.trim()) return configured.trim();
  return undefined;
}

function sinceTimeForRange(timeRange: string | undefined, now = Date.now()): string | undefined {
  const hour = 60 * 60 * 1000;
  const durations: Record<string, number> = {
    hour,
    day: 24 * hour,
    week: 7 * 24 * hour,
    month: 30 * 24 * hour,
    year: 365 * 24 * hour,
  };
  const duration = timeRange ? durations[timeRange] : undefined;
  return duration ? new Date(now - duration).toISOString() : undefined;
}

export function buildXquikSearchRequest(
  config: SearchProviderConfig,
  params: XquikSearchParams
): { url: string; init: RequestInit } {
  const queryType = getProviderSettingString(params, "queryType") === "Top" ? "Top" : "Latest";
  const query = new URLSearchParams({
    q: params.query,
    queryType,
    limit: String(params.maxResults),
  });
  const sinceTime = sinceTimeForRange(params.timeRange);
  if (sinceTime) query.set("sinceTime", sinceTime);

  return {
    url: `${config.baseUrl.replace(/\/+$/, "")}?${query}`,
    init: {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...(params.token ? { "x-api-key": params.token } : {}),
      },
    },
  };
}

export function extractXquikSearchHits(data: unknown, maxResults: number): XquikSearchHit[] {
  const envelope = XquikSearchEnvelopeSchema.safeParse(data);
  if (!envelope.success) return [];

  const hits: XquikSearchHit[] = [];
  for (const value of envelope.data.tweets) {
    const parsed = XquikTweetSchema.safeParse(value);
    if (!parsed.success) continue;
    const tweet = parsed.data;
    const author = tweet.author?.username;
    hits.push({
      title: author ? `@${author}` : "X post",
      url: author
        ? `https://x.com/${author}/status/${tweet.id}`
        : `https://x.com/i/status/${tweet.id}`,
      snippet: tweet.text,
      author,
      publishedAt: tweet.createdAt,
    });
    if (hits.length >= maxResults) break;
  }
  return hits;
}

export function normalizeXquikSearchResponse(
  data: unknown,
  makeResult: MakeResult
): { results: SearchResult[]; totalResults: number } {
  const now = new Date().toISOString();
  const results = extractXquikSearchHits(data, 20).map((hit, index) =>
    makeResult(
      XQUIK_SEARCH_PROVIDER_ID,
      {
        title: hit.title,
        url: hit.url,
        snippet: hit.snippet,
        published_at: hit.publishedAt,
        author: hit.author,
        source_type: "x",
      },
      index,
      now
    )
  );
  return { results, totalResults: results.length };
}
