/**
 * GET /api/tools/agent-bridge/agents
 * Returns the full list of registered MITM targets mapped to a stable UI shape.
 * LOCAL_ONLY: registered in routeGuard.ts
 */
import { ALL_TARGETS } from "@/mitm/targets/index";
import { detectAgent } from "@/mitm/detection/index";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { createErrorResponse } from "@/lib/api/errorResponse";

export async function GET(): Promise<Response> {
  try {
    const agents = ALL_TARGETS.map((t) => ({
      id: t.id,
      name: t.name,
      hosts: t.hosts,
      viability: t.viability ?? "supported",
      state: detectAgent(t.id),
    }));
    return Response.json({ agents });
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}
