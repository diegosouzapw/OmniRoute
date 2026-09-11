import {
  computeFreeModelTotals,
  type FreeModelBudget,
} from "@omniroute/open-sse/config/freeModelCatalog.ts";
import {
  FREE_CATALOG_CURATED_AT,
  FREE_MODEL_BUDGETS,
} from "@omniroute/open-sse/config/freeModelCatalog.data.ts";
import type { MergedEntry } from "@/lib/radar/applyFeed";
import { getCatalogWithoutOverlay, getRadarCatalog } from "@/lib/radar";
import { sumUsageTokensThisMonth } from "@/lib/db/usageSummary";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { listNoCredentialProviders } from "@/shared/utils/providerCredentialRequirement";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

/**
 * `hardStopGuaranteed` is a hand-curated fact about the upstream provider that
 * the Radar feed does not carry, so it is read back from the baseline entry
 * rather than dropped when the overlay is served.
 */
const HARD_STOP_BY_KEY = new Map(
  FREE_MODEL_BUDGETS.filter((m) => m.hardStopGuaranteed !== undefined).map((m) => [
    `${m.provider}:${m.modelId}`,
    m.hardStopGuaranteed,
  ])
);

/**
 * Project a merged catalog entry back onto the response's `FreeModelBudget`
 * shape: the overlay's extra fields (origin, provenance, capabilities…) stay
 * internal, so the published contract is identical whichever source answered.
 */
function toBudgetEntry(entry: MergedEntry): FreeModelBudget & { enabled?: boolean } {
  return {
    provider: entry.provider,
    modelId: entry.modelId,
    displayName: entry.displayName,
    monthlyTokens: entry.monthlyTokens,
    creditTokens: entry.creditTokens,
    freeType: entry.freeType,
    poolKey: entry.poolKey,
    tos: entry.tos,
    trainsOnPrompts: entry.trainsOnPrompts,
    eligibilityGate: entry.eligibilityGate,
    hardStopGuaranteed: HARD_STOP_BY_KEY.get(`${entry.provider}:${entry.modelId}`),
    enabled: entry.enabled,
  };
}

export function OPTIONS(): Response {
  return new Response(null, { status: 204, headers: CORS });
}

export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const excludeTosAvoid = url.searchParams.get("excludeTosAvoid") === "1";

  // Same catalog resolution as the dashboard screens: one source of
  // truth, with meta === null meaning "the baseline answered" (flag off, no
  // cache, or corrupt cache).
  const { entries, meta } = getRadarCatalog();

  // Entitlement follows the feed server's own download-time decision: the
  // community feed is the free public catalog, so it serves everyone; the
  // live feed is supporter-key content, so it only reaches callers this
  // instance has authenticated — never anonymous visitors, or an exposed
  // instance would re-publish the paid feed for free.
  // A feed built before the catalog this release ships is not an overlay, it is a
  // regression: the totals would be recomputed from data older than the baseline
  // the operator installed. An unknown build date — a cache row written before the
  // column existed — counts as older: unknown never outranks known.
  const overlayIsFresh =
    meta !== null &&
    meta.generatedAt !== null &&
    meta.generatedAt.slice(0, 10) >= FREE_CATALOG_CURATED_AT;

  const serveOverlay = overlayIsFresh && (meta.tier !== "live" || (await isAuthenticated(req)));

  // Withheld only because it is stale: drop the feed, keep the operator's own
  // local state. Falling back to the raw baseline here would resurrect models the
  // operator disabled or tombstoned.
  const overlayWithheldAsStale = meta !== null && !overlayIsFresh;

  const totals = serveOverlay
    ? computeFreeModelTotals({ excludeTosAvoid, entries: entries.map(toBudgetEntry) })
    : overlayWithheldAsStale
      ? computeFreeModelTotals({
          excludeTosAvoid,
          entries: getCatalogWithoutOverlay().map(toBudgetEntry),
        })
      : computeFreeModelTotals({ excludeTosAvoid });

  const usedThisMonth = sumUsageTokensThisMonth();
  const body = {
    ...totals,
    usedThisMonth,
    remaining: Math.max(0, totals.steadyRecurringTokens - usedThisMonth),
    // Which source answered, and the date of what was actually served — the
    // feed's own build date when the overlay answers (null when a cache row
    // predates build-date tracking; never the download time standing in),
    // the release curation date when the baseline does.
    catalogUpdatedAt: serveOverlay ? meta.generatedAt : FREE_CATALOG_CURATED_AT,
    catalogSource: serveOverlay ? ("radar-overlay" as const) : ("baseline" as const),
    // Computed here, not in the component: deriving it client-side would pull
    // the whole provider REGISTRY into the browser bundle.
    noCredentialProviders: listNoCredentialProviders(),
  };
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}
