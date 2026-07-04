/**
 * Shared helpers for /api/services/bifrost/* route handlers.
 * Creates a supervisor on demand if bootstrap hasn't registered one yet.
 */

import { getSupervisor, registerSupervisor } from "@/lib/services/registry";
import { ServiceSupervisor } from "@/lib/services/ServiceSupervisor";
import { resolveSpawnArgs, BIFROST_DEFAULT_PORT } from "@/lib/services/installers/bifrost";

const TOOL = "bifrost";
const PORT = parseInt(process.env.BIFROST_PORT ?? String(BIFROST_DEFAULT_PORT), 10);

export async function getOrInitSupervisor(): Promise<ServiceSupervisor> {
  const existing = getSupervisor(TOOL);
  if (existing) return existing;

  const sup = new ServiceSupervisor({
    tool: TOOL,
    port: PORT,
    spawnArgs: () => resolveSpawnArgs(PORT),
    healthUrl: () => `http://127.0.0.1:${PORT}/v1/models`,
    healthIntervalMs: 5_000,
    stopTimeoutMs: 15_000,
    logsBufferBytes: 5_242_880,
  });

  registerSupervisor(sup);
  return sup;
}
