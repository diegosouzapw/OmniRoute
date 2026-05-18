import { NextRequest, NextResponse } from "next/server";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { pluginManager } from "@/lib/plugins/manager";

export async function OPTIONS() {
  return handleCorsOptions();
}

/**
 * POST /api/plugins/[name]/activate — Activate a plugin
 */
export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;

  try {
    await pluginManager.activate(name);
    return NextResponse.json(
      { success: true, message: `Plugin '${name}' activated` },
      { headers: CORS_HEADERS }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400, headers: CORS_HEADERS });
  }
}
