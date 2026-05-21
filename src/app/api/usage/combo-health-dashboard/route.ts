import { NextResponse } from "next/server";
import { z } from "zod";

import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { buildComboHealthDashboardResponse } from "@/lib/usage/comboHealthDashboard";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

const querySchema = z.object({
  range: z.enum(["1h", "24h", "7d", "30d"]).default("24h"),
  horizon: z.enum(["24h", "7d", "30d"]).default("30d"),
  comboId: z.string().uuid().optional(),
  taskType: z.string().trim().min(1).max(64).optional(),
});

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const parsed = querySchema.safeParse({
      range: searchParams.get("range") || undefined,
      horizon: searchParams.get("horizon") || undefined,
      comboId: searchParams.get("comboId") || undefined,
      taskType: searchParams.get("taskType") || undefined,
    });

    if (!parsed.success) {
      return NextResponse.json(
        buildErrorBody(400, parsed.error.issues[0]?.message ?? "Invalid query parameters"),
        { status: 400 }
      );
    }

    const response = await buildComboHealthDashboardResponse(parsed.data);
    if (parsed.data.comboId && response.health.combos.length === 0) {
      return NextResponse.json(buildErrorBody(404, "Combo not found"), { status: 404 });
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("[API] GET /api/usage/combo-health-dashboard error:", error);
    return NextResponse.json(buildErrorBody(500, "Failed to build combo health dashboard"), {
      status: 500,
    });
  }
}
