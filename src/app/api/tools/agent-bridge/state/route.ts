/**
 * GET /api/tools/agent-bridge/state
 * Returns global MITM server status + per-agent detection/status.
 * LOCAL_ONLY: registered in routeGuard.ts
 */
import { getMitmStatus, getAllAgentsStatus, getCachedPassword } from "@/mitm/manager";
import { isSudoPasswordRequired } from "@/mitm/dns/dnsConfig";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { createErrorResponse } from "@/lib/api/errorResponse";

export async function GET(): Promise<Response> {
  try {
    const [server, agents] = await Promise.all([getMitmStatus(), getAllAgentsStatus()]);
    const isWin = process.platform === "win32";
    const hasCachedPassword = !!getCachedPassword();
    const needsSudoPassword = !isWin && !hasCachedPassword && isSudoPasswordRequired();
    return Response.json({
      server: { ...server, hasCachedPassword, needsSudoPassword, isWin },
      agents,
    });
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}
