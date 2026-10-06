import { NextResponse } from "next/server";

import { createErrorResponse } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { probeVideoRuntime } from "@/lib/guardrails/videoBridgeRuntime";
import { AUTHZ_HEADER_PEER_LOCALITY } from "@/server/authz/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface VideoRuntimeStatusDependencies {
  probe?: typeof probeVideoRuntime;
}

export async function handleVideoRuntimeStatus(
  request: Request,
  dependencies: VideoRuntimeStatusDependencies = {}
): Promise<Response> {
  if (request.headers.get(AUTHZ_HEADER_PEER_LOCALITY) !== "loopback") {
    return createErrorResponse({
      status: 403,
      message: "This endpoint is available only to trusted loopback requests",
    });
  }
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const status = await (dependencies.probe ?? probeVideoRuntime)();
  return NextResponse.json(status, { headers: { "Cache-Control": "no-store" } });
}

export async function GET(request: Request): Promise<Response> {
  return handleVideoRuntimeStatus(request);
}
