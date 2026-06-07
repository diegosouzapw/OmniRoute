import { NextResponse } from "next/server";
import { z } from "zod";

import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { buildComboForecastResponse } from "@/lib/usage/comboForecast";

const querySchema = z.object({
  range: z.enum(["1h", "24h", "7d", "30d"]).default("7d"),
  horizon: z.enum(["24h", "7d", "30d"]).default("30d"),
  comboId: z
    .string()
    .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    .optional(),
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
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid query parameters" },
        { status: 400 }
      );
    }

    const response = await buildComboForecastResponse(parsed.data);
    if (parsed.data.comboId && response.combos.length === 0) {
      return NextResponse.json({ error: "Combo not found" }, { status: 404 });
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("[API] GET /api/usage/combo-forecast error:", error);
    return NextResponse.json({ error: "Failed to build combo forecast" }, { status: 500 });
  }
}
