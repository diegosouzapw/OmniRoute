import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { RERANK_PROVIDERS } from "@omniroute/open-sse/config/rerankRegistry.ts";
import { getProviderCredentials } from "@/sse/services/auth";
import {
  buildRerankProviderListing,
  mergeRerankProviderListings,
} from "@/lib/memory/embedding/rerankListings";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

/**
 * GET /api/memory/rerank-providers
 *
 * Lists rerank providers with hasKey state for the memory Rerank selector:
 * curated RERANK_PROVIDERS entries first, then local provider_nodes.
 */
export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const curated = [];
    for (const [providerId, config] of Object.entries(RERANK_PROVIDERS)) {
      let hasKey = false;
      try {
        const creds = await getProviderCredentials(providerId);
        hasKey = !!(
          creds &&
          !("allRateLimited" in creds && (creds as { allRateLimited?: boolean }).allRateLimited) &&
          ((creds as { apiKey?: string | null }).apiKey ||
            (creds as { accessToken?: string | null }).accessToken)
        );
      } catch {
        hasKey = false;
      }
      curated.push(buildRerankProviderListing(providerId, config, hasKey));
    }

    // Local rerank-capable provider_nodes appended after curated entries.
    const extra = [];
    try {
      const { getCachedProviderNodes } = await import("@/lib/db/readCache");
      const nodes = await getCachedProviderNodes();
      for (const n of Array.isArray(nodes) ? nodes : []) {
        const apiType = (n as { apiType?: string }).apiType || "";
        if (!["chat", "responses", "rerank"].includes(apiType)) continue;
        const prefix = (n as { prefix?: string }).prefix;
        const baseUrl = (n as { baseUrl?: string }).baseUrl;
        if (!prefix || !baseUrl) continue;
        extra.push({ provider: prefix, hasKey: true, models: [] });
      }
    } catch {
      // best-effort
    }

    return NextResponse.json({ providers: mergeRerankProviderListings(curated, extra) });
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}
