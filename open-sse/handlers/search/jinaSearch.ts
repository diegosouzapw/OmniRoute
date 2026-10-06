/**
 * Jina Search (s.jina.ai) request builder + response normalizer.
 *
 * Uses the same Bearer token as the Jina Foundation API. OmniRoute does not
 * add a third dashboard card — credentials come from jina-ai / jina-reader /
 * JINA_AI_API_KEY.
 */

import type { SearchProviderConfig } from "../../config/searchRegistry.ts";

export interface JinaSearchRequestParams {
  query: string;
  maxResults: number;
  token?: string | null;
  country?: string;
  language?: string;
  offset?: number;
}

export interface JinaSearchNormalizeItem {
  title?: string;
  url?: string;
  description?: string;
  snippet?: string;
  content?: string;
  text?: string;
}

export function buildJinaSearchRequest(
  config: SearchProviderConfig,
  params: JinaSearchRequestParams
): { url: string; init: RequestInit } {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (params.token) {
    headers.Authorization = `Bearer ${params.token}`;
  }

  const body: Record<string, unknown> = {
    q: params.query,
    num: params.maxResults,
  };
  if (params.country) body.gl = params.country;
  if (params.language) body.hl = params.language;
  if (typeof params.offset === "number" && params.offset > 0) {
    body.page = params.offset;
  }

  return {
    url: config.baseUrl.endsWith("/") ? config.baseUrl : `${config.baseUrl}/`,
    init: {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    },
  };
}

export function extractJinaSearchItems(data: unknown): JinaSearchNormalizeItem[] {
  if (Array.isArray(data)) return data as JinaSearchNormalizeItem[];
  if (data && typeof data === "object") {
    const record = data as { data?: unknown; results?: unknown };
    if (Array.isArray(record.data)) return record.data as JinaSearchNormalizeItem[];
    if (Array.isArray(record.results)) return record.results as JinaSearchNormalizeItem[];
  }
  return [];
}
