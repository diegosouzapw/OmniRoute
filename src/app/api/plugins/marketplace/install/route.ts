import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import { installMarketplacePlugin } from "@/lib/plugins/marketplace";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

const InstallBodySchema = z.object({
  name: z.string().trim().min(1),
});

export async function OPTIONS() {
  return handleCorsOptions();
}

/**
 * POST /api/plugins/marketplace/install — Install a plugin from marketplace by name
 */
export async function POST(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const parsed = InstallBodySchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(buildErrorBody(400, "Missing or invalid 'name' field"), {
        status: 400,
        headers: CORS_HEADERS,
      });
    }
    const result = await installMarketplacePlugin(parsed.data.name);
    return NextResponse.json(result, { status: 201, headers: CORS_HEADERS });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to install marketplace plugin";
    console.error("[plugins/marketplace] Install error:", msg);
    return NextResponse.json(buildErrorBody(400, msg), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }
}
