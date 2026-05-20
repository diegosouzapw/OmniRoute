import { NextResponse } from "next/server";

import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { buildProviderHealthAutopilotReport } from "@/lib/monitoring/providerHealthAutopilot";

function getBooleanParam(value: string | null, fallback: boolean): boolean {
  if (value === null) return fallback;
  return value === "1" || value.toLowerCase() === "true";
}

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const url = new URL(request.url);
    const report = await buildProviderHealthAutopilotReport({
      provider: url.searchParams.get("provider"),
      includeHealthy: getBooleanParam(url.searchParams.get("includeHealthy"), false),
      includeActions: getBooleanParam(url.searchParams.get("includeActions"), true),
    });
    return NextResponse.json(report);
  } catch (error) {
    console.error("[API] GET /api/providers/health-autopilot error:", error);
    return NextResponse.json(
      { error: { message: "Failed to build provider health autopilot report" } },
      { status: 500 }
    );
  }
}
