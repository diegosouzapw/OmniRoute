/**
 * GET /api/tools/agent-bridge/diagnose
 *
 * Capture-pipeline self-test (Gap 12). Runs the independent checks that
 * determine whether interception can work — server running, server reachable on
 * its port, cert generated, cert trusted by the OS store, target hosts spoofed
 * in DNS — and returns an actionable report (per-failure hints + a single
 * `healthy` verdict). Answers "why is nothing being captured?" in one call.
 *
 * LOCAL_ONLY: covered by the "/api/tools/agent-bridge/" prefix in routeGuard.ts.
 *
 * Fix #8656 follow-up: Compute aggregate dnsConfigured when no agentId provided
 * (matches state route behavior for consistency).
 */
import net from "node:net";
import path from "node:path";
import fs from "node:fs";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { getMitmStatus } from "@/mitm/manager";
import { checkCertInstalled } from "@/mitm/cert/install";
import { resolveMitmDataDir } from "@/mitm/dataDir";
import { summarizeDiagnostics } from "@/mitm/inspector/diagnostics";
import { getAllAgentBridgeStates } from "@/lib/db/agentBridgeState";
import { checkDNSEntryForAgent } from "@/mitm/dns/dnsConfig";

/** Best-effort TCP reachability probe; resolves false on error/timeout. */
function probeTcp(port: number, host = "127.0.0.1", timeoutMs = 1500): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = net.connect({ port, host });
    const done = (ok: boolean) => {
      try {
        socket.destroy();
      } catch {
        // ignore
      }
      resolve(ok);
    };
    socket.setTimeout(timeoutMs, () => done(false));
    socket.once("connect", () => done(true));
    socket.once("error", () => done(false));
  });
}

export async function GET(request: Request): Promise<Response> {
  try {
    const agentId = new URL(request.url).searchParams.get("agentId") ?? undefined;
    const status = await getMitmStatus(agentId);
    const certPath = path.join(resolveMitmDataDir(), "mitm", "server.crt");
    const certExists = fs.existsSync(certPath);
    const certTrusted = certExists ? await checkCertInstalled(certPath) : false;
    const port =
      Number(process.env.MITM_LOCAL_PORT) > 0 ? Number(process.env.MITM_LOCAL_PORT) : 443;
    const serverReachable = status.running ? await probeTcp(port) : false;

    // Compute aggregate dnsConfigured when no agentId provided (matches state route)
    // This fixes diagnose showing DNS ❌ for non-Antigravity agents (Kiro, Codex, Cursor)
    let dnsConfigured = status.dnsConfigured;
    if (!agentId) {
      // Check if ANY agent has DNS configured (aggregate view)
      const agentStates = await getAllAgentBridgeStates();
      dnsConfigured =
        agentStates.length > 0 &&
        agentStates.some((s) => s.dns_enabled && checkDNSEntryForAgent(s.agent_id));
    }

    const report = summarizeDiagnostics({
      serverRunning: status.running,
      serverReachable,
      certExists,
      certTrusted,
      dnsConfigured,
    });

    return Response.json({ ...report, port });
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}
