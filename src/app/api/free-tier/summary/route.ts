import { computeFreeModelTotals } from "@omniroute/open-sse/config/freeModelCatalog.ts";
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
  };
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}
