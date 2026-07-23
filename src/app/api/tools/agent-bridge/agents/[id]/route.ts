/**
 * GET  /api/tools/agent-bridge/agents/[id]   — agent detail
 * PATCH /api/tools/agent-bridge/agents/[id]  — update setup_completed flag
 * LOCAL_ONLY: registered in routeGuard.ts
 */
import { z } from "zod";
import { resolveTarget } from "@/mitm/targets/index";
import { detectAgent } from "@/mitm/detection/index";
import { getAgentBridgeState, upsertAgentBridgeState } from "@/lib/db/agentBridgeState";
import type { AgentId } from "@/mitm/types";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { createErrorResponse } from "@/lib/api/errorResponse";

const PatchSchema = z.object({
  setup_completed: z.boolean(),
});

type Params = { params: { id: string } };

export async function GET(_request: Request, { params }: Params): Promise<Response> {
  try {
    const { id } = params;
    const target = resolveTarget(id) ?? null;
    if (!target) {
      return createErrorResponse({ status: 404, message: `Agent not found: ${id}` });
    }
    const detection = detectAgent(id as AgentId);
    const state = getAgentBridgeState(id) ?? null;
    return Response.json({ agent: target, detection, state });
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}

export async function PATCH(request: Request, { params }: Params): Promise<Response> {
  const { id } = params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return createErrorResponse({ status: 400, message: "Invalid JSON body" });
  }

  const parsed = PatchSchema.safeParse(body);
  if (!parsed.success) {
    return createErrorResponse({
      status: 400,
      message: "Invalid request body",
      details: parsed.error.flatten(),
    });
  }

  try {
    upsertAgentBridgeState({ agent_id: id, setup_completed: parsed.data.setup_completed });
    const state = getAgentBridgeState(id);
    return Response.json({ ok: true, state });
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}
