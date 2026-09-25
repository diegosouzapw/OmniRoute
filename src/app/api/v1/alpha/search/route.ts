import { z } from "zod";
import { handleSearch } from "@omniroute/open-sse/handlers/search.ts";
import { getProviderCredentialsWithQuotaPreflight } from "@/sse/services/auth";
import {
  getSearchProvider,
  selectProvider,
  type SearchProviderConfig,
} from "@omniroute/open-sse/config/searchRegistry.ts";
import { buildErrorBody, errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import * as log from "@/sse/utils/logger";
import { toJsonErrorPayload } from "@/shared/utils/upstreamError";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import {
  formatValidationMessage,
  isValidationFailure,
  validateBody,
} from "@/shared/validation/helpers";
import { recordCost } from "@/domain/costRules";
import { isAllRateLimitedCredentials } from "@/app/api/v1/_shared/rateLimit";
import { getSettings } from "@/lib/db/settings";
import { isProviderBlockedByIdOrAlias } from "@/shared/utils/noAuthProviders";
import { withInjectionGuard } from "@/middleware/promptInjectionGuard";

const CORS_HEADERS = {
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

// Response-length tiers map to a fixed max_results budget per query, matching
// the Codex standalone-search adapter's coarse-grained size control.
const RESPONSE_LENGTH_MAX_RESULTS: Record<"short" | "medium" | "long", number> = {
  short: 3,
  medium: 5,
  long: 10,
};

const UNSUPPORTED_COMMAND_KEYS = ["open", "click", "find", "screenshot"] as const;

const codexSearchQueryItemSchema = z.object({
  q: z.string().trim().min(1, "commands.search_query[].q is required"),
  recency: z.coerce.number().int().positive().optional(),
  domains: z.array(z.string().trim().min(1)).optional(),
});

const codexAlphaSearchSchema = z
  .object({
    id: z.string().optional(),
    model: z.string().optional(),
    input: z.unknown().optional(),
    commands: z
      .object({
        search_query: z.array(codexSearchQueryItemSchema).optional(),
        open: z.array(z.unknown()).optional(),
        click: z.array(z.unknown()).optional(),
        find: z.array(z.unknown()).optional(),
        screenshot: z.array(z.unknown()).optional(),
      })
      .optional(),
    response_length: z.enum(["short", "medium", "long"]).optional(),
    settings: z.record(z.string(), z.unknown()).optional(),
    max_output_tokens: z.coerce.number().int().positive().optional(),
  })
  .catchall(z.unknown());

export async function OPTIONS() {
  return new Response(null, { headers: CORS_HEADERS });
}

// Recency (in days) maps onto the shared time_range vocabulary used by
// handleSearch()'s provider request builders.
function recencyToTimeRange(recency?: number): string | undefined {
  if (typeof recency !== "number") return undefined;
  if (recency <= 1) return "day";
  if (recency <= 7) return "week";
  if (recency <= 31) return "month";
  return "year";
}

function buildDomainFilter(domains?: string[]): string[] | undefined {
  return domains && domains.length > 0 ? domains : undefined;
}

/**
 * Resolve a single provider + credentials for the whole batch of queries.
 * Deliberately smaller than /v1/search's full failover cascade (no explicit
 * provider param, no alternate-provider retry) — the standalone-search
 * adapter only needs "cheapest available, else free no-key fallback".
 */
async function resolveAlphaSearchProvider(
  blockedProviders: string[]
): Promise<{ providerConfig: SearchProviderConfig; credentials: Record<string, any> } | null> {
  let providerConfig = selectProvider(undefined, "web");
  if (providerConfig && isProviderBlockedByIdOrAlias(providerConfig.id, blockedProviders)) {
    providerConfig = null;
  }

  if (providerConfig) {
    const credentials = await getProviderCredentialsWithQuotaPreflight(providerConfig.id).catch(
      () => null
    );
    if (credentials && !isAllRateLimitedCredentials(credentials)) {
      return { providerConfig, credentials };
    }
  }

  // Last resort: free, no-key DuckDuckGo search — same free fallback /v1/search
  // promotes when no credentialed provider is configured.
  const fallback = getSearchProvider("duckduckgo-free");
  if (fallback && !isProviderBlockedByIdOrAlias(fallback.id, blockedProviders)) {
    return { providerConfig: fallback, credentials: {} };
  }

  return null;
}

class AlphaSearchError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

function jsonError(status: number, message: string) {
  return new Response(JSON.stringify({ error: { message } }), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

/**
 * POST /v1/alpha/search — Codex standalone-search adapter.
 *
 * Accepts the Codex CLI's unified-tool "commands" envelope but only
 * implements the search_query command; open/click/find/screenshot are
 * rejected with a clear 400 rather than silently ignored.
 */
async function postHandler(request: Request) {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    log.warn("ALPHA_SEARCH", "Invalid JSON body");
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }

  const validation = validateBody(codexAlphaSearchSchema, rawBody);
  if (isValidationFailure(validation)) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, formatValidationMessage(validation.error));
  }
  const body = validation.data;

  const policy = await enforceApiKeyPolicy(request, "search");
  if (policy.rejection) return policy.rejection;

  const commands = body.commands || {};
  for (const key of UNSUPPORTED_COMMAND_KEYS) {
    const value = commands[key];
    if (Array.isArray(value) && value.length > 0) {
      return jsonError(
        HTTP_STATUS.BAD_REQUEST,
        `Unsupported operation for /v1/alpha/search: ${key}`
      );
    }
  }

  const searchQueries = commands.search_query;
  if (!searchQueries || searchQueries.length === 0) {
    return jsonError(
      HTTP_STATUS.BAD_REQUEST,
      "commands.search_query must contain at least one query"
    );
  }

  const settings = await getSettings().catch(() => ({}) as any);
  const blockedProviders = settings?.blockedProviders || [];

  const target = await resolveAlphaSearchProvider(blockedProviders);
  if (!target) {
    return jsonError(
      HTTP_STATUS.BAD_REQUEST,
      "No credentials configured for any search provider. Add an API key for a search provider in the dashboard."
    );
  }
  const { providerConfig, credentials } = target;

  const maxResults = Math.min(
    RESPONSE_LENGTH_MAX_RESULTS[body.response_length || "medium"],
    providerConfig.maxMaxResults
  );

  try {
    const allResults: { title: string; url: string; snippet: string }[] = [];
    let queriesUsed = 0;
    let searchCostUsd = 0;

    for (const item of searchQueries) {
      const result = await handleSearch({
        query: item.q,
        provider: providerConfig.id,
        maxResults,
        searchType: "web",
        timeRange: recencyToTimeRange(item.recency),
        domainFilter: buildDomainFilter(item.domains),
        credentials,
        log,
        apiKeyId: policy.apiKeyInfo?.id || undefined,
      });

      if (!result.success) {
        throw new AlphaSearchError(result.error || "Search failed", result.status || 502);
      }

      const data = result.data!;
      queriesUsed += data.usage?.queries_used || 1;
      searchCostUsd += data.usage?.search_cost_usd || 0;
      for (const r of data.results) {
        allResults.push({ title: r.title, url: r.url, snippet: r.snippet });
      }
    }

    if (policy.apiKeyInfo?.id && searchCostUsd > 0) {
      try {
        recordCost(policy.apiKeyInfo.id, searchCostUsd);
      } catch (e: any) {
        log.warn("ALPHA_SEARCH", `Cost recording failed: ${e?.message}`);
      }
    }

    const output = allResults.map((r) => `${r.title} — ${r.url} — ${r.snippet}`).join("\n");

    const response = {
      encrypted_output: null,
      output,
      results: allResults,
      usage: { queries_used: queriesUsed, search_cost_usd: searchCostUsd },
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    });
  } catch (err: any) {
    if (err instanceof AlphaSearchError) {
      const errorPayload = toJsonErrorPayload(err.message, "Search provider error");
      return new Response(JSON.stringify(errorPayload), {
        status: err.statusCode,
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      });
    }

    log.error("ALPHA_SEARCH", `Unexpected error: ${err?.message}`);
    // Hard Rule #12: an unexpected internal exception (as opposed to the
    // AlphaSearchError branch above, whose message is our own controlled
    // provider-failure text) must never reach the client verbatim.
    // toJsonErrorPayload() is designed for upstream provider bodies and
    // passes an unparseable plain string straight through with zero
    // sanitization — buildErrorBody()/sanitizeErrorMessage() is the
    // sanctioned boundary for this (docs/security/ERROR_SANITIZATION.md).
    const errorPayload = buildErrorBody(
      HTTP_STATUS.SERVER_ERROR,
      String(err?.message ?? err),
      undefined,
      {
        type: "internal_server_error",
        code: "internal_server_error",
      }
    );
    return new Response(JSON.stringify(errorPayload), {
      status: HTTP_STATUS.SERVER_ERROR,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    });
  }
}

export const POST = withInjectionGuard(postHandler);
