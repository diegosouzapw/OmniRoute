import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { buildOmniRouteStatus } from "@/lib/omnirouteStatus";

export const dynamic = "force-dynamic";

/** Read-only operational status; never performs an upstream model request. */
export async function GET(request: Request): Promise<Response> {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      liveRequestExecuted: false,
      ...(await buildOmniRouteStatus()),
    });
  } catch {
    return NextResponse.json({ error: "Failed to build OmniRoute status" }, { status: 500 });
  }
}
