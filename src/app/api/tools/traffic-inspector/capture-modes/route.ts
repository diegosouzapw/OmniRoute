/**
 * GET /api/tools/traffic-inspector/capture-modes
 *
 * Returns the current status of all 4 capture modes:
 *   1. agentBridge  — always active when the MITM server is running
 *   2. customHosts  — count from DB
 *   3. httpProxy    — running flag + port
 *   4. systemProxy  — applied flag + guardUntil
 *
 * LOCAL_ONLY enforced by routeGuard.
 */

import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { listCustomHosts } from "@/lib/db/inspectorCustomHosts";
import {
  getHttpProxyHandle,
  getSystemProxyState,
  isTlsInterceptEnabled,
} from "@/lib/inspector/captureState";

export async function GET(): Promise<Response> {
  try {
    const customHosts = listCustomHosts();
    const httpProxy = getHttpProxyHandle();
    const systemProxy = getSystemProxyState();

    return Response.json({
      agentBridge: true,
      customHosts: {
        count: customHosts.length,
        enabledCount: customHosts.filter((h) => h.enabled).length,
      },
      httpProxy: {
        running: httpProxy !== null,
        port: httpProxy?.port ?? null,
      },
      systemProxy: {
        applied: systemProxy.applied,
        guardUntil: systemProxy.guardUntil,
        port: systemProxy.port,
      },
      tlsIntercept: {
        enabled: isTlsInterceptEnabled(),
      },
    });
  } catch (err) {
    const msg = sanitizeErrorMessage(err);
    return new Response(
      JSON.stringify(buildErrorBody(500, msg || "Failed to get capture mode status")),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
