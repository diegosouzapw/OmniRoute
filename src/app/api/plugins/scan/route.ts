import { NextRequest, NextResponse } from "next/server";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { pluginManager } from "@/lib/plugins/manager";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function OPTIONS() {
  return handleCorsOptions();
}

/**
 * POST /api/plugins/scan — Scan plugin directory for new plugins
 */
export async function POST(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const result = await pluginManager.scan();
    return NextResponse.json(
      { discovered: result.discovered, errors: result.errors },
      { headers: CORS_HEADERS }
    );
  } catch (err: unknown) {
    console.error("[plugins] Failed to scan plugin directory:", err);
    return NextResponse.json(buildErrorBody(500, "Failed to scan plugin directory"), {
      status: 500,
      headers: CORS_HEADERS,
    });
  }
}
