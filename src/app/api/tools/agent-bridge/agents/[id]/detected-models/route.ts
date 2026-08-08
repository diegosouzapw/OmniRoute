/**
 * GET /api/tools/agent-bridge/agents/[id]/detected-models
 *
 * Returns unique source models detected from intercepted traffic for the given agent.
 * Used by Setup Wizard to auto-suggest model mappings.
 *
 * LOCAL_ONLY: covered by the "/api/tools/agent-bridge/" prefix in routeGuard.ts.
 */
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { globalTrafficBuffer } from "@/mitm/inspector/buffer";
import type { AgentId } from "@/mitm/types";

const VALID_IDS = new Set<AgentId>([
  "antigravity",
  "kiro",
  "copilot",
  "codex",
  "cursor",
  "zed",
  "claude-code",
  "open-code",
  "trae",
  "windsurf",
  "jules",
]);

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params): Promise<Response> {
  const { id } = await params;

  if (!VALID_IDS.has(id as AgentId)) {
    return createErrorResponse({ status: 404, message: `Unknown agent id: ${id}` });
  }

  try {
    const agentId = id as AgentId;

    // Get all intercepted requests for this agent
    const allRequests = globalTrafficBuffer.list();
    const agentRequests = allRequests.filter(
      (req) => req.source === "agent-bridge" && req.agent === agentId
    );

    // Extract unique source models (filter out nulls/undefined)
    const uniqueModels = new Set<string>();
    for (const req of agentRequests) {
      if (req.sourceModel && typeof req.sourceModel === "string") {
        uniqueModels.add(req.sourceModel);
      }
    }

    // Sort alphabetically for consistent ordering
    const models = Array.from(uniqueModels).sort();

    return Response.json({
      agentId,
      detectedModels: models,
      requestCount: agentRequests.length,
    });
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}
