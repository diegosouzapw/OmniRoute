import { NextResponse } from "next/server";

import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { buildProviderHealthMatrix } from "@/lib/monitoring/providerHealthMatrix";

function getBooleanParam(value: string | null, fallback: boolean): boolean {
  if (value === null) return fallback;
  return value === "1" || value.toLowerCase() === "true";
}

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const url = new URL(request.url);
    const report = await buildProviderHealthMatrix({
      provider: url.searchParams.get("provider"),
      range: url.searchParams.get("range"),
      includeHealthy: getBooleanParam(url.searchParams.get("includeHealthy"), true),
    });
    return NextResponse.json(report);
  } catch (error) {
    console.error("[API] GET /api/providers/health-matrix error:", error);
    return NextResponse.json(buildErrorBody(500, "Failed to build provider health matrix"), {
      status: 500,
    });
  }
}
