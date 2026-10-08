/**
 * Shared helpers for /api/services/openwa/* route handlers.
 * Creates a supervisor on demand if bootstrap hasn't registered one yet.
 */

import { getSupervisor, registerSupervisor } from "@/lib/services/registry";
import { ServiceSupervisor } from "@/lib/services/ServiceSupervisor";
import { resolveSpawnArgs, OPENWA_DEFAULT_PORT } from "@/lib/services/installers/openwa";
import { getOrCreateApiKey } from "@/lib/services/apiKey";

const TOOL = "openwa";
const PORT = parseInt(process.env.OPENWA_SERVICE_PORT ?? String(OPENWA_DEFAULT_PORT), 10);

export async function getOrInitSupervisor(): Promise<ServiceSupervisor> {
  const existing = getSupervisor(TOOL);
  if (existing) return existing;

  const apiKey = await getOrCreateApiKey(TOOL);

  const sup = new ServiceSupervisor({
    tool: TOOL,
    port: PORT,
    spawnArgs: () => resolveSpawnArgs(apiKey, PORT),
    healthUrl: () => `http://127.0.0.1:${PORT}/api-docs/`,
    // 60s, not the usual 5s — open-wa doesn't listen on its HTTP port until
    // the full WhatsApp handshake resolves, which blocks on a human QR scan
    // on first pairing. See bootstrap.ts's SERVICES[] "openwa" entry comment
    // for the full verified explanation (must stay in sync with this value).
    healthIntervalMs: 60_000,
    stopTimeoutMs: 30_000,
    logsBufferBytes: 5_242_880,
    // #6205: mirrors bootstrap.ts's own supervisor construction — adopt a
    // healthy prior instance instead of crashing on-demand creation (e.g. a
    // direct API hit before bootstrap runs) into a raw EADDRINUSE.
    probeBeforeSpawn: true,
  });

  registerSupervisor(sup);
  return sup;
}
