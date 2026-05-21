import { NextRequest, NextResponse } from "next/server";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { getAnomalies } from "@/lib/gamification/antiCheat";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function OPTIONS() {
  return handleCorsOptions();
}

/**
 * GET /api/gamification/anomalies — Admin anomaly list
 */
export async function GET(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const anomalies = await getAnomalies();
  return NextResponse.json({ anomalies }, { headers: CORS_HEADERS });
}
