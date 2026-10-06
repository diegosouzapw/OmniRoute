import { NextResponse } from "next/server";
import { getProviderConnectionById } from "@/lib/db/providers";
import { refreshKimiProviderConnection } from "@/lib/kimi/tokenRefresh";
import { parseKimiJwt } from "@omniroute/open-sse/utils/kimiJwt.ts";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const authResponse = await requireManagementAuth(req);
  if (authResponse) return authResponse;

  const { id } = await props.params;
  const conn = await getProviderConnectionById(id);
  if (!conn) {
    return NextResponse.json(
      buildErrorBody(404, `Provider connection ${id} not found`),
      { status: 404 }
    );
  }

  const provider = String(conn.provider || "").toLowerCase();
  if (provider === "kimi-web" || provider === "kimi_web") {
    const result = await refreshKimiProviderConnection(id);
    if (!result.success || !result.accessToken) {
      return NextResponse.json(
        buildErrorBody(400, result.error || "Failed to refresh Kimi token"),
        { status: 400 }
      );
    }

    const payload = parseKimiJwt(result.accessToken);
    return NextResponse.json({
      success: true,
      message: "Token refreshed successfully",
      expiresAt: result.expiresAtSec
        ? new Date(result.expiresAtSec * 1000).toISOString()
        : null,
      user: {
        userId: payload?.sub || null,
        region: payload?.region || null,
        spaceId: payload?.space_id || null,
      },
    });
  }

  return NextResponse.json(
    buildErrorBody(400, `Manual token refresh not supported for provider ${conn.provider}`),
    { status: 400 }
  );
}
