import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { diagnoseAllEgressIps, validateProxyPool } from "@/lib/proxyEgress";

/**
 * GET  /api/settings/proxies/egress — diagnose the egress IP of every OAuth
 *   connection: by which IP each account is entering (clientIp) and leaving
 *   (egressIp), plus warnings for same-rotation-group accounts sharing one
 *   egress IP (the codex anomaly-revocation trigger).
 *
 * POST /api/settings/proxies/egress — validate the whole proxy pool by probing
 *   each proxy's real egress IP and persisting status=active/error, so dead
 *   proxies are taken out of rotation automatically.
 */
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const diagnostic = await diagnoseAllEgressIps();
    return NextResponse.json(diagnostic);
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to diagnose egress IPs");
  }
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const report = await validateProxyPool();
    const dead = report.filter((r) => !r.alive);
    return NextResponse.json({
      validated: report.length,
      alive: report.length - dead.length,
      dead: dead.length,
      report,
    });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to validate proxy pool");
  }
}
