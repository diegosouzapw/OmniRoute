import { NextResponse } from "next/server";
import {
  SEARCH_PROVIDERS,
  SEARCH_CREDENTIAL_FALLBACKS,
} from "@omniroute/open-sse/config/searchRegistry.ts";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { getProviderCredentials } from "@/sse/services/auth";
import { isAllRateLimitedCredentials } from "@/app/api/v1/_shared/rateLimit";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import {
  SearchProviderCatalogResponseSchema,
  type SearchProviderCatalogItem,
} from "@/shared/schemas/searchTools";
import * as log from "@/sse/utils/logger";

// ---------------------------------------------------------------------------
// Fetch provider metadata (hardcoded — no registry for these 4)
// ---------------------------------------------------------------------------

interface FetchProviderDef {
  id: string;
  name: string;
  costPerQuery: number;
  freeMonthlyQuota: number;
  fetchFormats: string[];
}

const FETCH_PROVIDERS: FetchProviderDef[] = [
  {
    id: "firecrawl",
    name: "Firecrawl",
    costPerQuery: 0.002,
    freeMonthlyQuota: 500,
    fetchFormats: ["markdown", "html", "links", "screenshot"],
  },
  {
    id: "jina-reader",
    name: "Jina Reader",
    costPerQuery: 0.0005,
    freeMonthlyQuota: 1000,
    fetchFormats: ["markdown", "text"],
  },
  {
    id: "tavily-search",
    name: "Tavily Extract",
    costPerQuery: 0.001,
    freeMonthlyQuota: 1000,
    fetchFormats: ["markdown", "text"],
  },
  {
    id: "tinyfish",
    name: "TinyFish Fetch",
    costPerQuery: 0,
    freeMonthlyQuota: 0,
    fetchFormats: ["markdown", "html"],
  },
];

// ---------------------------------------------------------------------------
// Credential status resolution
// ---------------------------------------------------------------------------

type ProviderStatus = "configured" | "missing" | "rate_limited";

/**
 * Determine credential status for a provider (search or fetch).
 * - "configured"  : at least one active key is available
 * - "rate_limited": all keys exist but are currently rate-limited
 * - "missing"     : no credentials found
 *
 * Respects SEARCH_CREDENTIAL_FALLBACKS (e.g. perplexity-search → perplexity).
 */
async function resolveProviderStatus(
  providerId: string,
  useCredentialFallback = true
): Promise<ProviderStatus> {
  try {
    const credentials = await getProviderCredentials(providerId).catch(() => null);

    // Active credentials available
    if (credentials && !isAllRateLimitedCredentials(credentials)) {
      return "configured";
    }

    // All rate limited — check fallback before returning rate_limited
    if (isAllRateLimitedCredentials(credentials)) {
      if (useCredentialFallback) {
        const fallbackId = SEARCH_CREDENTIAL_FALLBACKS[providerId];
        if (fallbackId) {
          const fallbackCreds = await getProviderCredentials(fallbackId).catch(() => null);
          if (fallbackCreds && !isAllRateLimitedCredentials(fallbackCreds)) {
            return "configured";
          }
        }
      }
      return "rate_limited";
    }

    // null → no credentials; try fallback
    if (useCredentialFallback) {
      const fallbackId = SEARCH_CREDENTIAL_FALLBACKS[providerId];
      if (fallbackId) {
        const fallbackCreds = await getProviderCredentials(fallbackId).catch(() => null);
        if (fallbackCreds && !isAllRateLimitedCredentials(fallbackCreds)) {
          return "configured";
        }
        if (isAllRateLimitedCredentials(fallbackCreds)) {
          return "rate_limited";
        }
      }
    }

    return "missing";
  } catch {
    return "missing";
  }
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function GET(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json(buildErrorBody(401, "Unauthorized"), { status: 401 });
  }

  try {
    const timestamp = Math.floor(Date.now() / 1000);

    // -----------------------------------------------------------------------
    // 1. Build search providers (12 from registry)
    // -----------------------------------------------------------------------
    const searchProviderStatuses = await Promise.all(
      Object.values(SEARCH_PROVIDERS).map((p) =>
        resolveProviderStatus(p.id).then((status) => ({ p, status }))
      )
    );

    const searchItems: SearchProviderCatalogItem[] = searchProviderStatuses.map(
      ({ p, status }) => ({
        id: p.id,
        name: p.name,
        kind: "search" as const,
        costPerQuery: p.costPerQuery,
        freeMonthlyQuota: p.freeMonthlyQuota,
        searchTypes: p.searchTypes,
        status,
        configureHref: "/dashboard/providers",
      })
    );

    // -----------------------------------------------------------------------
    // 2. Build fetch providers (4 hardcoded)
    // -----------------------------------------------------------------------
    const fetchProviderStatuses = await Promise.all(
      FETCH_PROVIDERS.map((fp) =>
        resolveProviderStatus(fp.id, false).then((status) => ({ fp, status }))
      )
    );

    const fetchItems: SearchProviderCatalogItem[] = fetchProviderStatuses.map(({ fp, status }) => ({
      id: fp.id,
      name: fp.name,
      kind: "fetch" as const,
      costPerQuery: fp.costPerQuery,
      freeMonthlyQuota: fp.freeMonthlyQuota,
      fetchFormats: fp.fetchFormats,
      status,
      configureHref: "/dashboard/providers",
    }));

    // -----------------------------------------------------------------------
    // 3. Combine: search first, then fetch
    // -----------------------------------------------------------------------
    const providers: SearchProviderCatalogItem[] = [...searchItems, ...fetchItems];

    // -----------------------------------------------------------------------
    // 4. Defensive schema validation — log warning but still return on failure
    // -----------------------------------------------------------------------
    const parseResult = SearchProviderCatalogResponseSchema.safeParse({ providers });
    if (!parseResult.success) {
      log.warn(
        "SEARCH_PROVIDERS",
        `Response schema validation warning: ${parseResult.error.message}`
      );
    }

    // -----------------------------------------------------------------------
    // 5. Back-compat: include legacy `data` array for callers using old shape
    //    Old shape: { id, object, created, name, search_types }
    // -----------------------------------------------------------------------
    const data = providers.map((p) => ({
      id: p.id,
      object: "search_provider",
      created: timestamp,
      name: p.name,
      search_types: p.searchTypes ?? [],
    }));

    return NextResponse.json({ providers, data });
  } catch (error) {
    log.error("SEARCH_PROVIDERS", "Failed to list providers", error);
    return NextResponse.json(buildErrorBody(500, "Failed to list providers"), { status: 500 });
  }
}
