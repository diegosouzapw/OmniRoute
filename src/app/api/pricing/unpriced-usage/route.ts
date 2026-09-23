import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getUnpricedUsageReport } from "@/lib/usage/unpricedUsage";
import * as log from "@/sse/utils/logger";

/**
 * GET /api/pricing/unpriced-usage
 * Recent successful usage whose provider/model has no pricing row (#12341), with
 * the number of per-key-limited API keys it affects and the active
 * UNPRICED_USAGE_BUDGET_POLICY. Management-only: it reveals model usage counts.
 */
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    return NextResponse.json(await getUnpricedUsageReport());
  } catch (error) {
    log.error("pricing", "Error building unpriced usage report", error);
    return NextResponse.json({ error: "Failed to build unpriced usage report" }, { status: 500 });
  }
}
