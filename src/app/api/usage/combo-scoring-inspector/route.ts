import { NextResponse } from "next/server";
import { z } from "zod";

import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { buildComboScoringInspectorResponse } from "@/lib/usage/comboScoringInspector";

const querySchema = z.object({
  range: z.enum(["1h", "24h", "7d", "30d"]).default("24h"),
  horizon: z.enum(["24h", "7d", "30d"]).default("30d"),
  comboId: z
    .string()
    .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    .optional(),
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
        { error: parsed.error.issues[0]?.message ?? "Invalid query parameters" },
        { status: 400 }
      );
    }

    const response = await buildComboScoringInspectorResponse(parsed.data);
    if (parsed.data.comboId && response.combos.length === 0) {
      return NextResponse.json({ error: "Combo not found" }, { status: 404 });
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("[API] GET /api/usage/combo-scoring-inspector error:", error);
    return NextResponse.json({ error: "Failed to build combo scoring inspector" }, { status: 500 });
  }
}
