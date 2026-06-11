import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  getAutoRoutingTotalCount,
  getAutoRoutingVariantBreakdown,
  getAutoRoutingTopProviders,
} from "@/lib/db/usageLogs";

export const dynamic = "force-dynamic";

/**
 * GET /api/analytics/auto-routing
 * Returns auto-routing usage statistics and metrics.
 */
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    // Query usage_logs for auto/ prefix requests
    const totalRequests = getAutoRoutingTotalCount();

    // Variant breakdown
    const variantRows = getAutoRoutingVariantBreakdown();

    const variantBreakdown: Record<string, number> = {};
    variantRows.forEach((row) => {
      variantBreakdown[row.variant] = row.count;
    });

    // Top providers (from LKGP cache or usage logs)
    const topProviders = getAutoRoutingTopProviders();

    return NextResponse.json({
      totalRequests: totalRequests.count,
      variantBreakdown,
      topProviders,
    });
  } catch (error) {
    console.error("Auto-routing analytics error:", error);
    return NextResponse.json({
      totalRequests: 0,
      variantBreakdown: {},
      topProviders: [],
    });
  }
}
