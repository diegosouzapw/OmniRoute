/**
 * Shared helpers for /api/services/llmlingua/* route handlers.
 * Creates a supervisor on demand if bootstrap hasn't registered one yet.
 */

import { getSupervisor, registerSupervisor } from "@/lib/services/registry";
import { ServiceSupervisor } from "@/lib/services/ServiceSupervisor";
import { resolveSpawnArgs, LLMLINGUA_DEFAULT_PORT } from "@/lib/services/installers/llmlingua";

const TOOL = "llmlingua";
const PORT = parseInt(process.env.LLMLINGUA_PORT ?? String(LLMLINGUA_DEFAULT_PORT), 10);

export async function getOrInitSupervisor(): Promise<ServiceSupervisor> {
  const existing = getSupervisor(TOOL);
  if (existing) return existing;

  const sup = new ServiceSupervisor({
    tool: TOOL,
    port: PORT,
    spawnArgs: () => resolveSpawnArgs(PORT),
    healthUrl: () => `http://127.0.0.1:${PORT}/health`,
    healthIntervalMs: 5_000,
    stopTimeoutMs: 15_000,
    logsBufferBytes: 5_242_880,
    // #6205: mirrors bootstrap.ts's own supervisor construction — adopt a
    // healthy prior instance instead of crashing on-demand creation (e.g. a
    // direct API hit before bootstrap runs) into a raw EADDRINUSE.
    probeBeforeSpawn: true,
  });

  registerSupervisor(sup);
  return sup;
}
