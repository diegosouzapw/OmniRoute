/**
 * GET /api/tools/agent-bridge/state
 * Returns global MITM server status + per-agent detection/status.
 * LOCAL_ONLY: registered in routeGuard.ts
 *
 * Fix #8656: Now returns the full payload shape the UI expects:
 * { serverState, agentStates, bypassPatterns, mappings } while maintaining
 * backward-compat legacy keys { server, agents } for integration tests.
 */
import { getMitmStatus, getAllAgentsStatus, getCachedPassword } from "@/mitm/manager";
import { isSudoPasswordRequired, checkDNSEntryForAgent } from "@/mitm/dns/dnsConfig";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { getAllAgentBridgeStates } from "@/lib/db/agentBridgeState";
import { getAllBypassPatterns } from "@/lib/db/agentBridgeBypass";
import { getMappingsForAgent } from "@/lib/db/agentBridgeMappings";
import { checkCertInstalled } from "@/mitm/cert/install";
import { resolveMitmDataDir } from "@/mitm/dataDir";
import { ALL_TARGETS } from "@/mitm/targets/index";
import path from "path";
import fs from "fs";

export async function GET(): Promise<Response> {
  try {
    // Fetch all data in parallel for performance
    const [serverStatus, agents, agentStates, bypassPatterns] = await Promise.all([
      getMitmStatus(),
      getAllAgentsStatus(),
      getAllAgentBridgeStates(),
      getAllBypassPatterns(),
    ]);

    // Load mappings for all registered agents
    const mappingsEntries = await Promise.all(
      ALL_TARGETS.map(async (t) => {
        const mappings = getMappingsForAgent(t.id);
        return [
          t.id,
          mappings.map((m) => ({ source: m.source_model, target: m.target_model })),
        ] as const;
      })
    );
    const mappings = Object.fromEntries(mappingsEntries);

    // Compute REAL certTrusted (OS trust store check, not just file exists)
    const certDir = path.join(resolveMitmDataDir(), "mitm");
    const certPath = path.join(certDir, "server.crt");
    const certExists = fs.existsSync(certPath);
    const certTrusted = certExists ? await checkCertInstalled(certPath) : false;

    // Compute aggregate dnsConfigured: true if ANY agent has hosts spoofed
    // This fixes the Maintenance card "dns-configured" showing ❌ for non-Antigravity agents
    const dnsConfigured =
      agentStates.length > 0 &&
      agentStates.some((s) => s.dns_enabled && checkDNSEntryForAgent(s.agent_id));

    const isWin = process.platform === "win32";
    const hasCachedPassword = !!getCachedPassword();
    const needsSudoPassword = !isWin && !hasCachedPassword && isSudoPasswordRequired();

    // Build enriched server state
    const enrichedServer = {
      ...serverStatus,
      certExists,
      certTrusted,
      dnsConfigured,
      hasCachedPassword,
      needsSudoPassword,
      isWin,
    };

    return Response.json({
      // Legacy keys for backward compat (integration tests + settings/mitm depend on these)
      server: enrichedServer,
      agents,
      // New keys the UI actually reads (fix #8656)
      serverState: enrichedServer,
      agentStates,
      bypassPatterns: bypassPatterns.map((b) => b.pattern),
      mappings,
    });
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}
