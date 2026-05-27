import { NextResponse } from "next/server";
import { z } from "zod";

import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { buildComboHealthAutopilotReport } from "@/lib/monitoring/comboHealthAutopilot";

const querySchema = z.object({
  range: z.enum(["1h", "24h", "7d", "30d"]).default("24h"),
  horizon: z.enum(["24h", "7d", "30d"]).default("30d"),
  comboId: z
    .string()
    .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    .optional(),
  includeHealthy: z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .default("false"),
  includeActions: z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .default("true"),
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
      includeHealthy: searchParams.get("includeHealthy") || undefined,
      includeActions: searchParams.get("includeActions") || undefined,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid query parameters" },
        { status: 400 }
      );
    }

    const report = await buildComboHealthAutopilotReport(parsed.data);
    if (parsed.data.comboId && report.summary.comboCount === 0) {
      return NextResponse.json({ error: "Combo not found" }, { status: 404 });
    }

    return NextResponse.json(report);
  } catch (error) {
    console.error("[API] GET /api/usage/combo-health-autopilot error:", error);
    return NextResponse.json(
      { error: "Failed to build combo health autopilot report" },
      { status: 500 }
    );
  }
}
