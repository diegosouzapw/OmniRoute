/**
 * Shared helpers for /api/services/9router/* route handlers.
 * Ensures a supervisor is created on demand (e.g. if bootstrap hasn't run yet).
 */

import { getSupervisor, registerSupervisor } from "@/lib/services/registry";
import { ServiceSupervisor } from "@/lib/services/ServiceSupervisor";
import { resolveSpawnArgs } from "@/lib/services/installers/ninerouter";
import { getOrCreateApiKey } from "@/lib/services/apiKey";
import {
  buildLoopbackUrl,
  getRouterBackendServiceMetadata,
} from "@/lib/services/routerBackendService";

const SERVICE = getRouterBackendServiceMetadata("9router");

// Module-level in-flight guard. Without this, two concurrent requests that
// both observe `getSupervisor() === null` and then await getOrCreateApiKey
// would each construct a supervisor and the second register overwrites the
// first — orphaning the first child process beyond lifecycle control.
let initInFlight: Promise<ServiceSupervisor> | null = null;

export async function getOrInitSupervisor(): Promise<ServiceSupervisor> {
  const existing = getSupervisor(SERVICE.tool);
  if (existing) return existing;

  if (initInFlight) return initInFlight;

  initInFlight = (async () => {
    // Double-check after entering the in-flight branch — a competing caller
    // may have completed initialization while we awaited the lock check.
    const racy = getSupervisor(SERVICE.tool);
    if (racy) return racy;

    const apiKey = await getOrCreateApiKey(SERVICE.tool);

    const sup = new ServiceSupervisor({
      tool: SERVICE.tool,
      port: SERVICE.port,
      spawnArgs: () => resolveSpawnArgs(apiKey, SERVICE.port),
      healthUrl: () => buildLoopbackUrl(SERVICE.port, SERVICE.healthPath),
      healthIntervalMs: 2_000,
      stopTimeoutMs: 15_000,
      logsBufferBytes: 5_242_880,
    });

    registerSupervisor(sup);
    return sup;
  })().finally(() => {
    initInFlight = null;
  });

  return initInFlight;
}
