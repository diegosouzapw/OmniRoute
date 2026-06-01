import { NextRequest, NextResponse } from "next/server";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { pluginManager } from "@/lib/plugins/manager";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function OPTIONS() {
  return handleCorsOptions();
}

/**
 * POST /api/plugins/[name]/deactivate — Deactivate a plugin
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const { name } = await params;

  try {
    await pluginManager.deactivate(name);
    return NextResponse.json(
      { success: true, message: `Plugin '${name}' deactivated` },
      { headers: CORS_HEADERS }
    );
  } catch (err: unknown) {
    console.error("[plugins] Failed to deactivate plugin:", err);
    return NextResponse.json(buildErrorBody(400, "Failed to deactivate plugin"), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }
}
