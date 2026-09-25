/**
 * POST /api/tools/agent-bridge/agents/[id]/reset
 * LOCAL_ONLY + SPAWN_CAPABLE: registered in routeGuard.ts (prefix
 * /api/tools/agent-bridge/)
 *
 * Fully reverts one agent's AgentBridge configuration so the IDE goes back to
 * talking to the real upstream once restarted:
 *   1. Un-spoofs only THIS agent's hosts from the OS hosts file (other agents'
 *      hosts are untouched — DNS is per-agent, see #8466).
 *   2. Best-effort flushes the Windows DNS resolver cache (hosts-file entries
 *      are cached there and don't disappear just because the file changed).
 *   3. Clears this agent's saved model mappings (both agent_bridge_mappings
 *      and the mitmAlias key_value mirror the proxy reads at request time).
 *   4. Resets dns_enabled/setup_completed in agent_bridge_state.
 *
 * Deliberately does NOT touch the shared MITM server or root CA — those are
 * shared across every agent and are kept installed across stop/start by
 * design (see docs/frameworks/AGENTBRIDGE.md §3.6); removing them is the
 * explicit, separate DELETE /api/tools/agent-bridge/cert action.
 */
import { AgentBridgeResetBodySchema } from "@/shared/schemas/agentBridge";
import { checkDNSEntryForAgent, flushWindowsDnsCache, removeDNSEntry } from "@/mitm/dns/dnsConfig";
import { getAllAgentBridgeStates, upsertAgentBridgeState } from "@/lib/db/agentBridgeState";
import { setMappings, syncAgentBridgeMappingsToMitmAlias } from "@/lib/db/agentBridgeMappings";
import { getCachedPassword, setCachedPassword } from "@/mitm/manager";
import {
  isMitmSudoPasswordRequired,
  normalizeMitmSudoPasswordInput,
  resolveMitmSudoPassword,
} from "@/mitm/sudoGate";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { ALL_TARGETS } from "@/mitm/targets/index";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Params): Promise<Response> {
  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return createErrorResponse({ status: 400, message: "Invalid JSON body" });
  }

  const parsed = AgentBridgeResetBodySchema.safeParse(body);
  if (!parsed.success) {
    return createErrorResponse({
      status: 400,
      message: "Invalid request body",
      details: parsed.error.flatten(),
    });
  }

  // Validate the agent ID maps to a known target (mirrors the dns route's
  // guard — an unknown id must never silently fall back to legacy Antigravity
  // hosts).
  const target = ALL_TARGETS.find((t) => t.id === id);
  if (!target) {
    return createErrorResponse({ status: 404, message: `Unknown agent: ${id}` });
  }

  const sudoPassword = resolveMitmSudoPassword(parsed.data.sudoPassword, getCachedPassword());
  if (isMitmSudoPasswordRequired(sudoPassword)) {
    return createErrorResponse({ status: 400, message: "Missing sudoPassword" });
  }

  try {
    await removeDNSEntry(sudoPassword, id);
    flushWindowsDnsCache();

    setMappings(id, []);
    syncAgentBridgeMappingsToMitmAlias(id);

    upsertAgentBridgeState({ agent_id: id, dns_enabled: false, setup_completed: false });

    const suppliedPassword = normalizeMitmSudoPasswordInput(parsed.data.sudoPassword);
    if (process.platform !== "win32" && suppliedPassword) {
      setCachedPassword(suppliedPassword);
    }

    const verified = !checkDNSEntryForAgent(id);
    const otherAgentsStillActive = getAllAgentBridgeStates().some(
      (s) => s.agent_id !== id && s.dns_enabled
    );

    return Response.json({
      ok: true,
      agent_id: id,
      dns_enabled: false,
      mappingsCleared: true,
      verified,
      otherAgentsStillActive,
      restartRequired: true,
    });
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}
