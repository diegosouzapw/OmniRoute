/**
 * GET  /api/tools/agent-bridge/config — export portable AgentBridge config
 * POST /api/tools/agent-bridge/config — import portable AgentBridge config
 *
 * Lets users replicate a setup (bypass patterns + custom hosts + per-agent
 * model mappings) across machines via a versioned JSON blob. Built-in defaults
 * are not exported, so importing never duplicates them. (Gap 4.)
 *
 * LOCAL_ONLY: covered by the "/api/tools/agent-bridge/" prefix in routeGuard.ts.
 */
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { createErrorResponse } from "@/lib/api/errorResponse";
import {
  AgentBridgeConfigSchema,
  exportConfig,
  importConfig,
} from "@/lib/inspector/configPortability";

export async function GET(): Promise<Response> {
  try {
    return Response.json(exportConfig());
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}

export async function POST(request: Request): Promise<Response> {
  const raw = await request.json().catch(() => null);
  const parsed = AgentBridgeConfigSchema.safeParse(raw);
  if (!parsed.success) {
    return createErrorResponse({
      status: 400,
      message: parsed.error.issues[0]?.message ?? "Invalid AgentBridge config",
    });
  }
  try {
    const result = importConfig(parsed.data);
    return Response.json({ ok: true, ...result });
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}
