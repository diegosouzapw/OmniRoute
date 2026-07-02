/**
 * Shared helpers for /api/services/cliproxy/* route handlers.
 * Creates a supervisor on demand if bootstrap hasn't registered one yet.
 */

import { getSupervisor, registerSupervisor } from "@/lib/services/registry";
import { ServiceSupervisor } from "@/lib/services/ServiceSupervisor";
import { resolveSpawnArgs } from "@/lib/services/installers/cliproxy";
import {
  buildLoopbackUrl,
  getRouterBackendServiceMetadata,
} from "@/lib/services/routerBackendService";

const SERVICE = getRouterBackendServiceMetadata("cliproxy");

export async function getOrInitSupervisor(): Promise<ServiceSupervisor> {
  const existing = getSupervisor(SERVICE.tool);
  if (existing) return existing;

  const sup = new ServiceSupervisor({
    tool: SERVICE.tool,
    port: SERVICE.port,
    spawnArgs: () => resolveSpawnArgs(SERVICE.port),
    healthUrl: () => buildLoopbackUrl(SERVICE.port, SERVICE.healthPath),
    healthIntervalMs: 5_000,
    stopTimeoutMs: 15_000,
    logsBufferBytes: 5_242_880,
  });

  registerSupervisor(sup);
  return sup;
}
