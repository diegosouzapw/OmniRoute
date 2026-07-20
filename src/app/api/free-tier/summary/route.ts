import { computeFreeModelTotals } from "@omniroute/open-sse/config/freeModelCatalog.ts";
import { FREE_CATALOG_CURATED_AT } from "@omniroute/open-sse/config/freeModelCatalog.data.ts";
import { listNoCredentialProviders } from "@/shared/utils/providerCredentialRequirement";
import { sumUsageTokensThisMonth } from "@/lib/db/usageSummary";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function OPTIONS(): Response {
  return new Response(null, { status: 204, headers: CORS });
}

export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const excludeTosAvoid = url.searchParams.get("excludeTosAvoid") === "1";
  const totals = computeFreeModelTotals({ excludeTosAvoid });
  const usedThisMonth = sumUsageTokensThisMonth();
  const body = {
    ...totals,
    usedThisMonth,
    remaining: Math.max(0, totals.steadyRecurringTokens - usedThisMonth),
    catalogUpdatedAt: FREE_CATALOG_CURATED_AT,
    // Computed here, not in the component: deriving it client-side would pull
    // the whole provider REGISTRY into the browser bundle.
    noCredentialProviders: listNoCredentialProviders(),
  };
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}
