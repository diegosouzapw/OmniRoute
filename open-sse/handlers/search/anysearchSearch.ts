/** AnySearch-backed web search for the unified search gateway. */

import { z } from "zod";
import type { SearchProviderConfig } from "../../config/searchRegistry.ts";
import type { SearchResult } from "../search.ts";

export const ANYSEARCH_SEARCH_PROVIDER_ID = "anysearch-search";

/**
 * Thrown by normalizeAnysearchSearchResponse when the upstream envelope
 * reports failure: HTTP 200 with `{ code: -1, error_code?, message? }`.
 * A quota-shaped message maps to 402 (failover, mirroring the webFetch
 * QUOTA_STATUS_PROVIDERS pattern); any other non-zero code maps to 502
 * instead of silently degrading to an empty result set.
 */
export class AnysearchSearchEnvelopeError extends Error {
  constructor(
    public readonly code: number,
    public readonly quota: boolean,
    message: string
  ) {
    super(message);
    this.name = "AnysearchSearchEnvelopeError";
  }
}

const QUOTA_SIGNAL = /quota|exceed|limit|balance|credit|exhaust/i;

export function detectAnysearchEnvelopeError(data: unknown): AnysearchSearchEnvelopeError | null {
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;
  const record = data as Record<string, unknown>;
  const code = record.code;
  if (typeof code !== "number" || code === 0) return null;
  const message =
    (typeof record.message === "string" && record.message) ||
    (typeof record.error === "string" && record.error) ||
    (typeof record.error_code === "string" && record.error_code) ||
    `AnySearch envelope error (code ${code})`;
  return new AnysearchSearchEnvelopeError(code, QUOTA_SIGNAL.test(message), message);
}

export interface AnysearchSearchParams {
  query: string;
  maxResults: number;
  token?: string;
  providerOptions?: Record<string, unknown>;
  providerSpecificData?: Record<string, unknown>;
}

export interface AnysearchSearchItem {
  title?: string;
  url: string;
  snippet?: string;
  score?: number;
  publishedAt?: string;
}

type MakeResult = (
  providerId: string,
  item: {
    title?: string;
    url?: string;
    snippet?: string;
    score?: number;
    published_at?: string;
    source_type?: string;
  },
  index: number,
  now: string
) => SearchResult;

// Upstream REST envelope: { code: 0, message: "success", data: { results: [...] } }
// with a server-generated request_id echoed in the X-Request-ID header. The
// published docs truncate before pinning the exact results field name, so
// extraction tolerates the plausible shapes and skips rows that cannot become
// citations (no url).
const AnysearchItemSchema = z
  .object({
    title: z.string().optional(),
    url: z.string().optional(),
    snippet: z.string().optional(),
    summary: z.string().optional(),
    score: z.number().optional(),
    date: z.string().optional(),
    published_at: z.string().optional(),
  })
  .passthrough();

export function extractAnysearchSearchItems(
  data: unknown,
  maxResults: number
): AnysearchSearchItem[] {
  if (!data || typeof data !== "object") return [];
  const record = data as Record<string, unknown>;
  const inner =
    record.data && typeof record.data === "object" && !Array.isArray(record.data)
      ? (record.data as Record<string, unknown>)
      : {};
  const candidates: unknown[] = [
    inner.results,
    record.results,
    inner.items,
    record.items,
    Array.isArray(record.data) ? record.data : undefined,
  ];
  const rows = candidates.find((c): c is unknown[] => Array.isArray(c)) ?? [];
  const items: AnysearchSearchItem[] = [];
  for (const row of rows) {
    const parsed = AnysearchItemSchema.safeParse(row);
    if (!parsed.success || !parsed.data.url) continue;
    items.push({
      title: parsed.data.title,
      url: parsed.data.url,
      snippet: parsed.data.snippet ?? parsed.data.summary,
      score: parsed.data.score,
      publishedAt: parsed.data.published_at ?? parsed.data.date,
    });
    if (items.length >= maxResults) break;
  }
  return items;
}

export function buildAnysearchSearchRequest(
  config: SearchProviderConfig,
  params: AnysearchSearchParams
): { url: string; init: RequestInit } {
  // Upstream hard cap: max_results 1-10.
  const maxResults = Math.min(Math.max(Math.trunc(params.maxResults) || 5, 1), 10);
  return {
    url: config.baseUrl.replace(/\/+$/, ""),
    init: {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(params.token ? { Authorization: `Bearer ${params.token}` } : {}),
      },
      body: JSON.stringify({ query: params.query, max_results: maxResults }),
    },
  };
}

export function normalizeAnysearchSearchResponse(
  data: unknown,
  makeResult: MakeResult
): { results: SearchResult[]; totalResults: number } {
  const envelopeError = detectAnysearchEnvelopeError(data);
  if (envelopeError) throw envelopeError;
  const now = new Date().toISOString();
  const items = extractAnysearchSearchItems(data, 10);
  const results = items.map((item, index) =>
    makeResult(
      ANYSEARCH_SEARCH_PROVIDER_ID,
      {
        title: item.title || item.url,
        url: item.url,
        snippet: item.snippet ?? "",
        score: item.score,
        published_at: item.publishedAt,
        source_type: "web",
      },
      index,
      now
    )
  );
  return { results, totalResults: results.length };
}
