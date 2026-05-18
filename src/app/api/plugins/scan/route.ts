import { NextRequest, NextResponse } from "next/server";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { pluginManager } from "@/lib/plugins/manager";

export async function OPTIONS() {
  return handleCorsOptions();
}

/**
 * POST /api/plugins/scan — Scan plugin directory for new plugins
 */
export async function POST(_request: NextRequest) {
  try {
    const result = await pluginManager.scan();
    return NextResponse.json(
      { discovered: result.discovered, errors: result.errors },
      { headers: CORS_HEADERS }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: CORS_HEADERS });
  }
}
