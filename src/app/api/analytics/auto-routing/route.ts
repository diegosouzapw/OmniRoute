import { NextResponse } from "next/server";
import { getDbInstance } from "@/lib/db/core";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export const dynamic = "force-dynamic";

/**
 * GET /api/analytics/auto-routing
 * Returns auto-routing usage statistics and metrics.
 */
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const db = getDbInstance();

    // Query usage_logs for auto/ prefix requests
    const totalRequests = db
      .prepare(
        `
        SELECT COUNT(*) as count 
        FROM usage_logs 
        WHERE model = 'auto' OR model LIKE 'auto/%'
      `
      )
      .get() as { count: number };

    // Variant breakdown
    const variantRows = db
      .prepare(
        `
        SELECT 
          CASE 
            WHEN model = 'auto' THEN 'default'
            WHEN model LIKE 'auto/%' THEN SUBSTR(model, 6)
            ELSE 'other'
          END as variant,
          COUNT(*) as count
        FROM usage_logs
        WHERE model = 'auto' OR model LIKE 'auto/%'
        GROUP BY variant
        ORDER BY count DESC
      `
      )
      .all() as Array<{ variant: string; count: number }>;

    const variantBreakdown: Record<string, number> = {};
    variantRows.forEach((row) => {
      variantBreakdown[row.variant] = row.count;
    });

    // Top providers (from LKGP cache or usage logs)
    const topProviders = db
      .prepare(
        `
        SELECT provider, COUNT(*) as count
        FROM usage_logs
        WHERE model = 'auto' OR model LIKE 'auto/%'
        GROUP BY provider
        ORDER BY count DESC
        LIMIT 10
        `
      )
      .all() as Array<{ provider: string; count: number }>;

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
