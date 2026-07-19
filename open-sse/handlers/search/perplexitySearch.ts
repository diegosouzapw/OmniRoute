import { z } from "zod";

import type { SearchProviderConfig } from "../../config/searchRegistry.ts";

interface PerplexitySearchParams {
  query: string;
  maxResults: number;
  token?: string;
  country?: string;
  language?: string;
  timeRange?: string;
  domainFilter?: string[];
  providerOptions?: Record<string, unknown>;
}

const searchDateSchema = z
  .string()
  .regex(/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/, "Expected MM/DD/YYYY");

const searchOptionsSchema = z.object({
  max_tokens: z.coerce.number().int().min(1).max(1_000_000).optional(),
  max_tokens_per_page: z.coerce.number().int().min(1).max(1_000_000).optional(),
  search_language_filter: z
    .array(
      z
        .string()
        .regex(/^[A-Za-z]{2}$/, "Expected a two-letter ISO 639-1 language code")
        .transform((value) => value.toLowerCase())
    )
    .max(10)
    .optional(),
  last_updated_after_filter: searchDateSchema.optional(),
  last_updated_before_filter: searchDateSchema.optional(),
  search_after_date_filter: searchDateSchema.optional(),
  search_before_date_filter: searchDateSchema.optional(),
  search_recency_filter: z.enum(["hour", "day", "week", "month", "year"]).optional(),
});

type PerplexitySearchOptions = z.infer<typeof searchOptionsSchema>;

function normalizeLanguage(language?: string): string | undefined {
  const primary = language?.split(/[-_]/, 1)[0]?.toLowerCase();
  return primary && /^[a-z]{2}$/.test(primary) ? primary : undefined;
}

export function parsePerplexitySearchOptions(params: PerplexitySearchParams): {
  options?: PerplexitySearchOptions;
  error?: string;
} {
  const parsed = searchOptionsSchema.safeParse(params.providerOptions ?? {});
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { error: `Invalid Perplexity Search option: ${issue?.message || "invalid value"}` };
  }

  const includes = params.domainFilter?.some((domain) => !domain.startsWith("-"));
  const excludes = params.domainFilter?.some((domain) => domain.startsWith("-"));
  if (includes && excludes) {
    return {
      error:
        "Perplexity Search domain filters must use either include_domains or exclude_domains, not both",
    };
  }

  if (
    params.language &&
    !parsed.data.search_language_filter &&
    !normalizeLanguage(params.language)
  ) {
    return { error: "Perplexity Search language must be a two-letter ISO 639-1 code" };
  }

  return { options: parsed.data };
}

export function buildPerplexityRequest(
  config: SearchProviderConfig,
  params: PerplexitySearchParams
): { url: string; init: RequestInit } {
  const options = parsePerplexitySearchOptions(params).options ?? {};
  const body: Record<string, unknown> = {
    query: params.query,
    max_results: params.maxResults,
    ...options,
  };
  if (params.country) body.country = params.country.toUpperCase();
  const language = normalizeLanguage(params.language);
  if (language && !body.search_language_filter) body.search_language_filter = [language];
  if (params.domainFilter?.length) body.search_domain_filter = params.domainFilter;
  if (params.timeRange && params.timeRange !== "any" && !body.search_recency_filter) {
    body.search_recency_filter = params.timeRange;
  }
  return {
    url: config.baseUrl,
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${params.token}` },
      body: JSON.stringify(body),
    },
  };
}
