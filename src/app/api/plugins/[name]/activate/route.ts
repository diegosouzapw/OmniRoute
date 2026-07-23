import { NextRequest, NextResponse } from "next/server";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { pluginManager } from "@/lib/plugins/manager";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function OPTIONS() {
  return handleCorsOptions();
}

/**
 * POST /api/plugins/[name]/activate — Activate a plugin
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const { name } = await params;

  try {
    await pluginManager.activate(name);
    return NextResponse.json(
      { success: true, message: `Plugin '${name}' activated` },
      { headers: CORS_HEADERS }
    );
  } catch (err: unknown) {
    console.error("[plugins] Failed to activate plugin:", err);
    return NextResponse.json(buildErrorBody(400, "Failed to activate plugin"), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }
}
