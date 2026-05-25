/**
 * Shared helpers for /api/services/9router/* route handlers.
 * Ensures a supervisor is created on demand (e.g. if bootstrap hasn't run yet).
 */

import { getSupervisor, registerSupervisor } from "@/lib/services/registry";
import { ServiceSupervisor } from "@/lib/services/ServiceSupervisor";
import { resolveSpawnArgs } from "@/lib/services/installers/ninerouter";
import { getOrCreateApiKey } from "@/lib/services/apiKey";

const TOOL = "9router";
const PORT = 20130;

export async function getOrInitSupervisor(): Promise<ServiceSupervisor> {
  const existing = getSupervisor(TOOL);
  if (existing) return existing;

  const apiKey = await getOrCreateApiKey(TOOL);

  const sup = new ServiceSupervisor({
    tool: TOOL,
    port: PORT,
    spawnArgs: () => resolveSpawnArgs(apiKey, PORT),
    healthUrl: () => `http://127.0.0.1:${PORT}/api/health`,
    healthIntervalMs: 2_000,
    stopTimeoutMs: 15_000,
    logsBufferBytes: 5_242_880,
  });

  registerSupervisor(sup);
  return sup;
}
