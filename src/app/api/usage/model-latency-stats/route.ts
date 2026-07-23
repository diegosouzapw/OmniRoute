import { NextResponse } from "next/server";
import { z } from "zod";

import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getModelLatencyStats } from "@/lib/usageDb";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

const querySchema = z.object({
  windowHours: z.coerce
    .number()
    .positive()
    .max(24 * 30)
    .optional(),
  minSamples: z.coerce.number().int().positive().optional(),
  maxRows: z.coerce.number().int().positive().max(50000).optional(),
  provider: z.string().trim().min(1).max(64).optional(),
  model: z.string().trim().min(1).max(256).optional(),
});

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const parsed = querySchema.safeParse({
      windowHours: searchParams.get("windowHours") || undefined,
      minSamples: searchParams.get("minSamples") || undefined,
      maxRows: searchParams.get("maxRows") || undefined,
      provider: searchParams.get("provider") || undefined,
      model: searchParams.get("model") || undefined,
    });

    if (!parsed.success) {
      return NextResponse.json(
        buildErrorBody(400, parsed.error.issues[0]?.message ?? "Invalid query parameters"),
        { status: 400 }
      );
    }

    const { windowHours, minSamples, maxRows, provider, model } = parsed.data;
    const statsByKey = await getModelLatencyStats({
      windowHours,
      minSamples,
      maxRows,
      provider,
      model,
    });

    return NextResponse.json({
      entries: Object.values(statsByKey),
      windowHours: windowHours ?? 24,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[API] GET /api/usage/model-latency-stats error:", error);
    return NextResponse.json(buildErrorBody(500, "Failed to build model latency stats"), {
      status: 500,
    });
  }
}
